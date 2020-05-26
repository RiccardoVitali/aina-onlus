const TWO_HOURS = 1000 * 60 * 60 * 2;

const configs = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: "development",
  SESS_NAME: "sid",
  SESS_LIFTETIME: TWO_HOURS,
  SESS_SECRET: "fjlsakfjfasdlkfjsdalkfj"
}; //=  //process.env);

module.exports = configs;
