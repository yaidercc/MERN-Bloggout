# Dev-deps stage

FROM node:20.9.0-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

# Prop-deps stage

FROM node:20.9.0-alpine as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --only-prod

# Prod stage

FROM node:20.9.0-alpine as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4400
CMD ["npm", "run", "dev"]