# 🐘 PARQ Api Nest y Postgres

Rest Api NestJS + Postgres SQL para usuarios y obtener sus coordenadas con la API de geolocalización de Google. Con auto documentación con Swagger.

## Contenido

Este proyecto tiene una rama: principal, contiene el producto final.
Llevando a cabo la estrategia de flujo de trabajo de git [desarrollo basado en troncos](https://trunkbaseddevelopment.com/)

## Instalación

```sh
# yarn
yarn

# npm
npm install
```

### Corriendo la API

```sh
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

### Cómo iniciar el contenedor de la base de datos 🐘

```sh
# Levantar en desarrollo
docker-compose up -d dev

# Levantar para ambientes productivos
docker-compose up -d prod
```

> No olvide completar las variables de `.env.example` en `.env`

## Data Flow

![data_flow](./diagrams/data_flow.png)

## Requerimientos

- [ ] Pruebas Unitarias.
- [x] Crear DockerFile para ejecución del código en container.
- [x] Documentación API.
- [x] Usar TypeScript.
- [x] End-points solicitados

## Documentación

La documentación se encuentra en el `/api/docs`, estando allí conocerá todos los endpoints y como usarlos
