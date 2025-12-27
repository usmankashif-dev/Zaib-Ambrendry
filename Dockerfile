# Use the official PHP image with Apache
FROM php:8.2-apache

RUN apt-get update \
    && apt-get install -y \
        libzip-dev \
        unzip \
        git \
        curl \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy composer and install dependencies
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer
COPY . /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node.js dependencies and build assets
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run Laravel storage link and migrate on container start
CMD php artisan storage:link && php artisan migrate --force && apache2-foreground

# Expose port 80
EXPOSE 80
