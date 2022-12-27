ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs

WORKDIR /usr/app

# Copy data for add-on
COPY ["dist", "node_modules", "package.json", "/usr/app/"]

COPY run.sh /usr/app/
RUN chmod -R 777 /usr/app/run.sh

CMD [ "/usr/app/run.sh" ]
