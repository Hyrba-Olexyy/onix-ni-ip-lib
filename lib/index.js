const { networkInterfaces } = require('os');
const defaultOptions = { version: 'IPv4', isLocal: false };

const getInfoIp = (opt = {}) => {
  const nets = networkInterfaces();
  const { version, isLocal } = { ...defaultOptions, ...opt };

  return Object.values(nets).reduce((acc, net) => {
    net.forEach((element) => {
      if (element.family === version && element.internal === isLocal) {
        acc.push(element.address);
      }
    });

    return acc;
  }, []);
};

module.exports = getInfoIp;
