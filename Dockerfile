FROM node:14 AS development

WORKDIR /usr/src/app

# # Both package.json and yarn.lock.json are copied
COPY package.json yarn.lock ./
# # Copy important files
COPY ormconfig.js ./

RUN yarn --only=development

COPY . .

RUN yarn build

FROM node:14 as production

WORKDIR /usr/src/app

# # Both package.json and yarn.lock.json are copied
COPY package.json yarn.lock ./
# # Copy important files
COPY ormconfig.js ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
