const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const getInfoIp = (version, type) => {
  return Object.values(nets).reduce((acc, net) => {
    net.forEach((element) => {
      if (element.family === version && element.internal === type.isLocal) {
        acc.push(element.address);
      }
    });

    return acc;
  }, []);
};

module.exports = getInfoIp;
