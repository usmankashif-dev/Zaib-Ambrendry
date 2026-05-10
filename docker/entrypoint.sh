#!/bin/bash

# Start supervisor
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

# Keep container running
tail -f /dev/null
