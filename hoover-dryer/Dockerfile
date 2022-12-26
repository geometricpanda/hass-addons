ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /opt/app

# Copy data for add-on
COPY [ "dist", "node_modules", "/"]
CMD [ "node", "dist/main.js" ]
