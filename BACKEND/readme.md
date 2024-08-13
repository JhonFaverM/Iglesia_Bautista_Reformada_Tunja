# docker run --name DBreportesUsuarios -d -p 3001:3000 -p 27019:27017 --network red_manejo_residuos -e MONGO_INITDB_ROOT_USERNAME=jhonfa -e MONGO_INITDB_ROOT_PASSWORD=83215793 mongo

#  docker run --name reportesusuarios -d -p 5002:5000 --network red_manejo_residuos --env-file .env reportesusuarios

# Comando para crear red
docker network create red_manejo_residuos

# Conectar contenedores manualmente a una red
docker network connect red_ibrt DBibrt
docker network connect red_ibrt iglesiareformada




# el siguiente comando para construir la imagen
docker build -t imgiglesiarefor --no-cache .

# Comando para crear red
docker network create red_ibrt

# comando para crear contenedor
docker run --name iglesiareformada -d -p 5003:5000 --network red_ibrt --link DBibrt --env-file .env imgiglesiarefor


# siguiente comando para crear y ejecutar un contenedor MongoDB
docker run --name DBibrt -d -p 3003:3000 -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=jhonfa -e MONGO_INITDB_ROOT_PASSWORD=83215793 mongo

git branch
git add .
git commit -m "Descripción breve de los cambios realizados"
git push origin nombre_de_la_rama
git push origin main


# Para mostrar los libros em postman
http://localhost:2500/api/libros

# Metodo para eliminar
http://localhost:2500/api/libros/nameBook/belleza
