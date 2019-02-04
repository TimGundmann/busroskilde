FROM xqdocker/ubuntu-nginx

COPY dist /data/www/bus
EXPOSE 80
RUN service nginx start
