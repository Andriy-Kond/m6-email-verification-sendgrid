# Backend - Heroku (or render.com)

# DataBase - mongodbcloud.com

# Dockerfile

List of programs for install in docker hub

- node.js
- node_modules
- project files

## Download node package for docker in CLI: `docker pull node:20.11`

## Download node package for docker in Dockerfile: `FROM node:20.11`

# Docker CLI Commands

`docker help` show all commands

### Build Docker image by command: `docker build .`

This command will run the Dockerfile and execute the commands in this file sequentially

## Main useful commands

`docker images` - show all images

`docker ps -a` - show all containers (running and stopped)

`docker start id` - run exist container with this id (without blocking terminal)

`docker stop id` - stop docker container with this container id

`docker run -d -p 4000:3000 image-id` run docker container without blocking terminal (without transferring to container console). Used for first start image (when there is no any containers builded from this image)

Port 4000 — it is port of the Host (your PC), through with you access the application. You could made request to http://localhost:4000/api/contacts

Port 3000 — it is internal container's port (port inside of the container), when your application works. Showed in Dockerfile

## Additional commands

`docker run id` - run docker container with this image id (the console of terminal will be blocked, because you will be transferred to container console)

`docker ps` - show all running containers
