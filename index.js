
const httpsServer = require('./server').httpsServer

httpsServer.listen(process.env.PORT || 5433)
