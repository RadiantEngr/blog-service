FROM node:20
LABEL Garage Developers <developers@garagemobility.com>
RUN mkdir -p /blog-service && \
    mkdir -p /logs 
RUN cd /blog-service && rm -rf *
WORKDIR /blog-service
ADD package.json /blog-service/package.json
RUN yarn && \
    yarn global add pm2
COPY . /blog-service
RUN yarn tsc
EXPOSE 4088
CMD [ "node", "dist/server.js" ]
