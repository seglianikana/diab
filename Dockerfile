FROM node:14

RUN mkdir new
COPY package.json new
COPY app new
RUN npm install
CMD [ "npm", "run","start" ]