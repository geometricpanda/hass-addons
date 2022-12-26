ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /opt/app

# Copy data for add-on
COPY [ "dist", "package.json", "yarn.lock", "/"]
CMD [ "node", "dist/main.js" ]
