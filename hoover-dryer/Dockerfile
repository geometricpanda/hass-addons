ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /opt/app

RUN apk update
RUN apk add nodejs

# Copy data for add-on
COPY [ "dist", "node_modules", "run.sh", "./"]
RUN chmod a+x ./run.sh

CMD [ "sh", "/opt/app/run.sh" ]


