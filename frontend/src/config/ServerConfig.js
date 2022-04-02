import utility from "../utility/utility";

const prod = {
    url: {
        API_URL: 'http://127.0.0.1:8000'
    }
};
const prodDev = {
    url: {
        API_URL: 'http://127.0.0.1:8000'
    }
};
const dev = {
    url: {
        API_URL: 'https://127.0.0.1:8000'
    }
};

function getEnvConfig() {
    var config;
    if (utility.removeSpace(process.env.REACT_APP_ENV_VAR) === 'development') {
        config = dev
    }
    else if (utility.removeSpace(process.env.REACT_APP_ENV_VAR) === 'prod-development') {
        config = prodDev
    }
    else {
        config = prod
    }
    return config
}


export const ServerConfig = getEnvConfig();