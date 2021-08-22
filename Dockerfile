FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app/frontend
COPY package.json /app/frontend/
COPY . /app/frontend/
RUN npm install -g npm
RUN npm config set fetch-retry-maxtimeout 60000 -g
RUN npm cache clean --force
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]