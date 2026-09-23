FROM node:22-alpine
WORKDIR /app
COPY package.json src.js ./
EXPOSE 3000
USER node
CMD ["node", "src.js"]
