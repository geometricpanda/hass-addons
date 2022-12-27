ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs npm

COPY rootfs /
COPY ["dist", "node_modules", "package.json", "/usr/app/"]

RUN chmod -R 777 /usr/bin/hoover-dryer
RUN chmod -R 777 /usr/bin/node
RUN chmod -R 777 /usr/app
RUN chmod -R 777 /etc/services.d/hoover-dryer

RUN ["ls", "-als", "/usr/bin"]
RUN ["ls", "-als", "/etc/services.d/hoover-dryer"]
