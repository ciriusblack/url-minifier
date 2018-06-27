FROM node:9

#Creating The Work Directory
WORKDIR /usr/src/app

#SET env to Production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

#Copy the Packages

COPY package.json package.json
COPY package-lock.json package-lock.json

#Get Dependencies
RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]
