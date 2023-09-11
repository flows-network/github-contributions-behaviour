import {default as db} from '../../db';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default async function (req, res) {
    if (!req.body.credential) {
        res.status(400).send('No code supplied')
        return
    }

    const access = parseJwt(req.body.credential)

    if (access && access.sub) {

        let u = {user_id: access.sub, username: access.name, avatar: access.picture, email: access.email}
        //format user data
        let account = await db.Account.findOne({user_id: u.user_id})
        if (!account) {
            //create account object
            account = new db.Account({
                user_id: u.user_id,
                username: u.username,
                avatar: u.avatar,
                email: u.email
            })
            //if don't have this account, add it
        } else {
            account["email"] = u.email
        }
        await account.save();
        req.session.regenerate(function (err) {
            if (err) {
                return res.status(500).send('Service unavailable')
            }

            req.session.user = account.id;

            req.session.save(function (err) {
                if (err) {
                    return res.status(500).send('Service unavailable')
                }
                return res.send(u)
            })
        })
    } else {
        res.status(400).send(access)
    }
}
