module.exports = {
  passport: {
    secret: "abc123",
  },
  resetPassword: {
    secret: "otpSecret",
  },
  postgres: {
    connectionString: "postgres://postgres:postgres@localhost:5432/seso",
    connectionName: "default",
    logging: true,
    logging: true,
    synchronize: false,
  },
  sendGrid: {
    apiKey: "SG.test",
  },
  host: "localhost:3000",
  redis: "",
};
