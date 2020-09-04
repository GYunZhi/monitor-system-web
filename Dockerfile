FROM nginx

COPY dist /usr/share/nginx/html/vue_admin_template/dist

VOLUME /etc/nginx