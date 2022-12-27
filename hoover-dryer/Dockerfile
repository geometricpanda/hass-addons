ARG BUILD_FROM
FROM $BUILD_FROM

RUN apk add --update nodejs

WORKDIR /var/wwww

# Copy data for add-on
COPY ["dist", "node_modules", "package.json", "./"]

COPY run.sh ./
RUN chmod a+x ./run.sh

CMD [ "./run.sh" ]
