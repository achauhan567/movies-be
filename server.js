const app = require('./app');
const port = 3000;

const server = app.listen(port, () => {
    console.log(`Movies app listening at http://localhost:${port}`);
});

module.exports = server;