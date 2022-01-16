FROM node:14


COPY .. new
RUN npm install
CMD [ "npm", "run","start" ]