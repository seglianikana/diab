FROM node:14

RUN mkdir new
chmod a+x new
COPY .. new
RUN npm install
CMD [ "npm", "run","start" ]