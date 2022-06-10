const { networkInterfaces } = require('os');
const defaultOptions = { version: 'IPv4', isLocal: false };
const http = require('http');

const getLocalIp = version => {
    const nets = networkInterfaces();

    const result = Object.values(nets).reduce((acc, net) => {
        net.forEach(element => {
            if (element.family === version && !element.internal) {
                acc.push(element.address);
            }
        });

        return acc;
    }, []);

    return result[0];
};

const getPublicIp = version => {
    const url = version === 'IPv6' ? 'api64.ipify.org' : 'api.ipify.org';

    return new Promise((resolve, reject) => {
        http.get({ host: url, port: 80, path: '/' }, function (response) {
            response.on('data', function (ip) {
                resolve(ip.toString());
            });
        }).on('error"', function (error) {
            console.log('error :>> ', error);
            reject(error);
        });
    });
};
module.exports = (opt = {}) => {
    const { version, isLocal } = { ...defaultOptions, ...opt };
    if (isLocal) {
        return getLocalIp(version);
    }

    return getPublicIp(version);
};
