ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs

ARG TEMPIO_VERSION BUILD_ARCH
RUN \
    curl -sSLf -o /usr/bin/tempio \
    "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}" \

COPY rootfs /
COPY ["dist", "node_modules", "package.json", "/usr/app/"]
