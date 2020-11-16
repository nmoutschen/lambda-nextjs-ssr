'use strict';

const { app, server } = require("./server");
const awsServerlessExpress = require("aws-serverless-express"); 
const binaryMimeTypes = require("./binaryMimeTypes");

exports.handler = (event, context, callback) => {  
    app.prepare().then(() => { 
        return awsServerlessExpress.proxy(
            awsServerlessExpress.createServer(server, null, binaryMimeTypes), 
            event,
            context
        );   
    }).catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    });
};