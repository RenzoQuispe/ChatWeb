## Chat Web

Chat Web simple hecho con MongoDB, React.js, Node.js-Express y Socket.io

### Diagrama de arquitectura de despliegue local automatizado con Ansible
```
                    ╔═══════════════════════════════════════════╗
                    ║         Clientes en red local             ║
                    ║   (navegadores: PCs, tablets, móviles)    ║
                    ╚═══════════════════════════════════════════╝
                                         │
                              HTTP (puerto 80) a IP local
                                         │
                                         ▼
                               ┌────────────────────┐
                               │      NGINX         │
                               │ - Sirve frontend   │
                               │ - Proxy a backend  │
                               └────────┬───────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            ▼                           ▼                           ▼
    ┌────────────────┐     ┌────────────────────────┐     ┌────────────────────┐
    │ React frontend │     │  Node.js backend (API) │     │     Cloudinary     │
    │ - Build static │     │ - Express + Socket.IO  │     │ - Servicio externo │
    │ - Sirve desde  │     │ - Maneja lógica del    │     │ - Almacén de media │
    │   /dist vía    │     │   chat, login, etc     │     │ - Se accede vía API│
    │   NGINX        │     └────────────┬───────────┘     └────────────────────┘
    └────────────────┘                  │
                                        ▼
                            ┌─────────────────────┐
                            │   MongoDB (local)   │
                            │ - Base de datos     │
                            │ - Usuarios, mensajes│
                            └─────────────────────┘

                  Automatizado con Ansible y supervisado con PM2 
```

Ejemplo:
![](https://drive.google.com/file/d/12FgGooiLqKMId30fo-MA28y54PTFoHV3/view?usp=drive_link)

### Setup .env
Modificar el .env de ejemplo en el codigo
```
MONGODB_URI=
mongodb_user=
mongodb_password=
mongodb_database=
PORT=
JWT_SECRET=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
## Ejemplo de despliegue en Render, MongoDB Atlas y Cloudinary

![](https://drive.google.com/uc?export=view&id=1Y5unk2k6gZJxHPHt_yUWFg2lBKNwGBLW)
![](https://drive.google.com/uc?export=view&id=1l1VM3exYZ6TqGy04FT2abqOf40iZtmHS)
![](https://drive.google.com/uc?export=view&id=1Isx-0_l1XS9TFPM-IE9Qf6C7t0vWHlVP)

## Implementaciones futuras
- Buscar personas
- Peticion de agregar a contactos(circulo privado)
- bloquear personas
- Usar https con mkcert para despligue local