FROM httpd:2.4
COPY ./src/ /usr/local/apache2/htdocs/geocodes

ADD ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["httpd"]
