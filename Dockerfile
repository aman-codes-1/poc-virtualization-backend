FROM node:14-slim

# Create app directory in container
RUN mkdir -p /src/

# Set /app directory as default working directory
WORKDIR /src

# Copy all file from current dir to /app in container
COPY . /src/

# Install app dependencies
RUN npm install

# Exposing Port
EXPOSE 4000

CMD [ "npm", "run", "start:ts" ]
