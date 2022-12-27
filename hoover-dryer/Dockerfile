ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs npm

COPY rootfs /
COPY ["dist", "/usr/app/dist"]
COPY ["node_modules", "/usr/app/node_modules"]
COPY ["package.json", "/usr/app/"]

RUN chmod -R 777 /etc/services.d/hoover-dryer
RUN chmod -R 777 /usr/bin/hoover-dryer
RUN chmod -R 777 /usr/bin/node
RUN chmod -R 777 /usr/app

RUN ["ls", "-als", "/usr/app"]
RUN ["ls", "-als", "/usr/app/dist"]
