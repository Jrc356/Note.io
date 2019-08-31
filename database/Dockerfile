FROM mysql:5.6
COPY Database.sql /docker-entrypoint-initdb.d/

COPY configure.sh /tmp/
RUN . /tmp/configure.sh

EXPOSE 3306