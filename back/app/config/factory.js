var config = require("./config.dev");
if (process.env.NODE_ENV) {
    switch (process.env.NODE_ENV.toLowerCase()) {
        case "dev":
            config = require("./config.dev");
            break;
        case "prod":
            config = require("./config.prod");
            break;
    }
}

module.exports = config;