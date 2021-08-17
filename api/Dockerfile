FROM node:latest

WORKDIR /app/api

COPY . .

RUN npm install 
RUN npm rebuild bcrypt --build-from-source

CMD ["/bin/bash"]