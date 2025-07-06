## Chat Web

Chat Web simple hecho con MongoDB, React.js, Node.js-Express y Socket.io

### Configuracion Ansible
#### Requisitos para despliegue en red local automatizado con Ansible
- Tener la base de datos MongoDB local configurada
- Ansible instalado
- Configurar el ansible/group_vars/web.yml. En el ejemplo tenemos:
```
    APP_NAME: ChatWeb
    APP_DIR: "/home/renzoquispe/Escritorio/Renzo/Proyectos/ChatWeb"    //MODIFICAR
    FRONTEND_DIR: "{{ APP_DIR }}/frontend"
    BACKEND_DIR: "{{ APP_DIR }}/backend"
    BACKEND_PORT: 5001      // Modificar donde se ejecute el backend
    NGINX_SITE_PATH: /etc/nginx/sites-available/ChatWeb    //MODIFICAR(RECOMENDABLE)
    skip_install: true
    SERVER: 192.168.1.10    //MODIFICAR
```


#### Uso de Configuracion Ansible para levantar la aplicacion 
```
https://github.com/RenzoQuispe/ChatWeb.git
cd ansible
ansible-playbook -i inventory.ini playbooks/deploy-all.yml --ask-become-pass
```
### Diagrama de arquitectura de despliegue en red local automatizado con Ansible
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
![](https://drive.google.com/uc?export=view&id=12FgGooiLqKMId30fo-MA28y54PTFoHV3)

### Setup .env
Configurar el .env de ejemplo en el codigo
```
MONGODB_URI=
mongodb_user=
mongodb_password=
mongodb_database=
PORT=
JWT_SECRET=
NODE_ENV=localserver   //localserver, para despligue en red local
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