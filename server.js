const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const {createServer} = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const expressServer = express()

    try {
        expressServer.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {secure: 'auto'},
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI,
                autoRemove: 'interval',
                autoRemoveInterval: 1 // In minutes. Default
            })
        }))
    } catch (err) {
        console.error(err)
    }

    const httpServer = createServer(expressServer)

    expressServer.all('*', (req, res) => {
        return handle(req, res)
    })

    httpServer.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })

}).catch(err => {
    console.error(err);
});
