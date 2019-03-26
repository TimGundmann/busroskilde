FROM xqdocker/ubuntu-nginx

ARG string=green

COPY dist /data/www
COPY string-index.html /data/www/${string}/index.html
EXPOSE 80
RUN service nginx start
