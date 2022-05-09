const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto-express.ybon.nomoredomains.work/',
    'https://mesto-express.ybon.nomoredomains.work/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = { options };
