var config = require("./webpack.config.dev");
if (process.env.NODE_ENV) {
    switch (process.env.NODE_ENV.toLowerCase()) {
        case "test":
            config = require("./webpack.config.test");
            break;
        case "dev":
            config = require("./webpack.config.dev");
            break;
    }
}

module.exports = config;