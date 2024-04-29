const serverless = require("serverless-http")
const {app} = require("../src/index");

require("../src/index");



module.exports.handler = serverless(app); 