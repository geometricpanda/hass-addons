ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs npm

# Copy data for add-on
COPY [ "package.json", "dist", "node_modules", "run.sh", "./"]
RUN chmod a+x ./run.sh

CMD [ "./run.sh" ]


