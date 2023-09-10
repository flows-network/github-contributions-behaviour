import express from 'express';
import session from 'express-session';
import {createServer} from 'http';
import next from 'next';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const expressServer = express();
    try {
        expressServer.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {secure: 'auto'}
        }))
    } catch (err) {
        console.error(err)
    }

    const httpServer = createServer(expressServer)

    expressServer.all('*', async (req, res) => {
        return handle(req, res)
    })

    httpServer.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })

}).catch(err => {
    console.error(err);
});
