# Chat Web

Chat Web simple hecho con MongoDB, React.js, Node.js-Express y Socket.io

## Inicio rápido con Docker

### Configurar el archivo `.env` de ejemplo

```
VITE_DEPLOY_MODE=LocalServerDocker          # Definir modo inicio rápido con Docker - LocalServerDocker

MONGO_DB_NAME=gestortareas
MONGO_USER=admingestortareas
MONGO_PASS=admin123456789
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_URI=mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin

NODE_PORT=5001

JWT_SECRET=unallavesecretadificildedescifrar

HOST_IP=192.168.1.16     # ¡MODIFICAR!

VITE_API_URL=http://${HOST_IP}:${NODE_PORT}

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Levantar los contenedor y acceder a la aplicación web
```
docker compose up --build
```
Accede a la aplicación web desde cualquier dispositivo en tu red local usando: `http://HOST_IP:5173` (En el ejemplo: `http://192.168.1.16:5173`)