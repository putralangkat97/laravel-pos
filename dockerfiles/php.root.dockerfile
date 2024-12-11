FROM php:8.4-fpm-alpine

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN sed -i "s/user = www-data/user = root/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = root/g" /usr/local/etc/php-fpm.d/www.conf
RUN echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "upload_max_filesize = 64M" >> /usr/local/etc/php/php.ini
RUN echo "post_max_size = 64M" >> /usr/local/etc/php/php.ini

RUN docker-php-ext-install pdo pdo_mysql

RUN set -eux; \
    apk add --no-cache \
        icu-dev; \
    docker-php-ext-install intl;

RUN mkdir -p /usr/src/php/ext/redis \
    && curl -L https://github.com/phpredis/phpredis/archive/6.1.0.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis
    
USER root

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
