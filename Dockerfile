FROM node:12.17-alpine as builder

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]