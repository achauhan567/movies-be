/* Don't expose credentials or any sensitive infomation. This is just for assignment */
const config = {
    db: {
      host: "localhost",
      user: "root",
      password: "root@123",
      database: "movies_db",
    },
    listPerPage: 10,
  };
  
  module.exports = config;