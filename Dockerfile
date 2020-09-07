From node:lts

RUN mkdir -p /opt/app/semantic_docs

ADD ./app /opt/app/semantic_docs

#RUN npm install -g typescript

WORKDIR /opt/app/semantic_docs

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start"]
