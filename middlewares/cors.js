const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto-express.ybon.nomoredomains.work/',
    'http://mesto-express.ybon.nomoredomains.work/',
    'https://github.com/Yulia-Bon',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = { options };