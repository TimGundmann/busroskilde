FROM xqdocker/ubuntu-nginx

COPY dist /data/www
EXPOSE 80
RUN service nginx start
