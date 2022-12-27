ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs npm

# Copy data for add-on
COPY ["dist", "node_modules", "rootfs", "package.json", "/"]
