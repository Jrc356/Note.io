sed -i -e 's/{DB_NAME}/"$DB_NAME"/g' /docker-entrypoint-initdb.d/Database.sql
sed -i -e 's/{DB_USER}/"$DB_USER"/g' /docker-entrypoint-initdb.d/Database.sql
sed -i -e 's/{DB_PASSWORD}/"$DB_PASSWORD"/g' /docker-entrypoint-initdb.d/Database.sql