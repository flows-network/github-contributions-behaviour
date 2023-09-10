import {default as db} from '../db';

export default {
    serverSideLogin
}

async function serverSideLogin(context) {
    let returnObj = {}
    if (context.req.session && context.req.session.user) {
        let u = await db.Account.findById(context.req.session.user);
        console.log(u)

        if (!u) {
            return;
        }
        const {
            username,
            avatar,
        } = u
        returnObj = {username, avatar}

        return returnObj
    }
}