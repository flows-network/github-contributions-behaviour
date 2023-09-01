import {default as db} from '../db';

export default {
    serverSideLogin
}

async function serverSideLogin(context) {
    let returnObj = {}
    if (context.req.session && context.req.session.user) {
        let u = await db.Account.findById(context.req.session.user);
        if (!u) {
            return;
        }
        const {
            github_id,
            github_name,
            username,
            avatar,
            role,
            github_url
        } = u
        returnObj = {github_id, github_name, username, avatar, role, github_url}

        return returnObj
    }
}