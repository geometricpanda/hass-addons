ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs

COPY ["rootfs", "/"]
COPY ["dist", "node_modules", "package.json", "/usr/app/"]
