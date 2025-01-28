const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.API_PORT || "3000"),
  dbUrl: process.env.DATABASE_URL,
};

export default config;
