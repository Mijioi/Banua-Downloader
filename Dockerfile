FROM node:18
RUN apt-get update && apt-get install -y python3-pip ffmpeg
RUN pip3 install yt-dlp --break-system-packages
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "server.js"]
