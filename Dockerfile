FROM node:lts-hydrogen

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./.env ./
ADD ./src ./src/
ADD ./prisma ./prisma/

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD npx prisma migrate deploy && npm run start
