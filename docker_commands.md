# Docker Setup (Manually using 2 separate `Dockerfiles`)

dev commands

```bash
docker network create shadow-voice-net
docker build -t frontend-image /frontend
docker build -t backend-image /backend
docker run -d --env-file .env --name shadow-voice-backend --network shadow-voice-net backend-image
docker run -d -p 5173:80 --name shadow-voice-frontend --network shadow-voice-net frontend-image
```

prod commands

```bash

docker buildx build --platform linux/amd64 -t lokeshwar777/shadow-voice-backend .
docker push lokeshwar777/shadow-voice-backend
docker buildx build --platform linux/amd64 -t lokeshwar777/shadow-voice-frontend .
docker push lokeshwar777/shadow-voice-frontend
```
