# 馃悩 PARQ Api Nest y Postgres

Rest Api NestJS + Postgres SQL para usuarios y obtener sus coordenadas con la API de geolocalizaci贸n de Google. Con auto documentaci贸n con Swagger.

## Contenido

Este proyecto tiene una rama: principal, contiene el producto final.
Llevando a cabo la estrategia de flujo de trabajo de git [desarrollo basado en troncos](https://trunkbaseddevelopment.com/)

## Instalaci贸n

### C贸mo iniciar el contenedor y correr la API 馃悩

```sh
# Levantar en desarrollo
docker-compose up dev

# Levantar para ambientes productivos
docker-compose up prod
```

> No olvide completar las variables de `.env.example` en `.env`

### Migraciones

```sh
# dev o prod seg煤n sea el caso
docker-compose exec dev bash
# Estando conectamos corremos las migraciones necesarias
```

> Mirar el `package.json` para ver todos los comando scripts de migraciones

## Data Flow

![data_flow](./diagrams/data_flow.png)

## Requerimientos

- [ ] Pruebas Unitarias.
- [x] Crear DockerFile para ejecuci贸n del c贸digo en container.
- [x] Documentaci贸n API.
- [x] Usar TypeScript.
- [x] End-points solicitados

## Documentaci贸n

La documentaci贸n se encuentra en el `/api/docs`, estando all铆 conocer谩 todos los endpoints y como usarlos
