FROM node

WORKDIR /usr/src/Telegram-CMD
COPY . .
RUN npm install

EXPOSE 3333

CMD ["node", "index.js"]