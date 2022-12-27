ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /opt/app

RUN apk add --update nodejs npm

# Copy data for add-on
COPY [ "dist", "node_modules", "run.sh", "./"]
RUN chmod a+x ./run.sh

CMD [ "sh", "/opt/app/run.sh" ]


