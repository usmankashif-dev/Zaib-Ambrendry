# ================================
# Stage 1: Build frontend assets
# ================================
FROM node:18 AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ================================
# Stage 2: PHP + Laravel
# ================================
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    nginx \
    supervisor \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application
COPY . .

# Copy frontend build files
COPY --from=frontend /app/public/build ./public/build

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Create required directories
RUN mkdir -p \
    storage/logs \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Copy nginx + supervisor configs
COPY docker/nginx.conf /etc/nginx/sites-available/default
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy entrypoint
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 10000

# Start container
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]