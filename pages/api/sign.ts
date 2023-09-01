import gh from '../../helpers/gh';
import {default as db} from '../../db';

export default async function signin(req: Request, res: Response) {
    if (!req.query.code) {
        res.status(400).send('No code supplied');
        return;
    }
    //Now, you just got a temporary code from GitHub, so should to request an access_token to distinguish users
    const access = await gh.getAccess(req.query.code)

    if (access && access.access_token) {
        /*
            Nice job! you have got the access_token and refresh_token
            access_token expire after 8 hours, you can use refresh_token to renewing a new access_token
            refresh_token are valid for 6 months
         */
        let u
        try {
            u = await gh.getUser(access.access_token)
        } catch (e) {
            console.log("signError", e)
        }

        /*
            in our program we need the following information:
            id: github_id
            name: github_name
            login: username
            avatar_url: profile picture
            html_url: user profile(in fact this value is https://github.com/ + {login})
            if you need more about this request, you can open this url directly in your browser: https://api.github.com/users/{you username}
            or visit https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps
         */
        const {
            id: github_id,
            name: github_name,
            login: username,
            avatar_url: avatar,
            html_url: github_url,
            email: email
        } = u

        u = {github_id, github_name, username, avatar, github_url, email}
        //format user data
        let account = await db.Account.findOne({github_id: u.github_id})
        if (!account) {
            //create account object
            account = new db.Account({
                github_id: u.github_id,
                github_name: u.github_name,
                username: u.username,
                avatar: u.avatar,
                github_url: u.github_url,
                email: u.email
            })
            //if don't have this account, add it
        } else {
            account["email"] = u.email
        }
        await account.save();
        req.session.regenerate(function (err: Error) {
            if (err) {
                return res.status(500).send('Service unavailable');
            }

            req.session.user = account.id;
            req.session.access_token = access.access_token;
            req.session.gh_refresh_token = access.refresh_token;
            req.session.gh_refresh_token_expires_in = access.refresh_token_expires_in;

            // save the session before return to ensure page
            // load does not happen before session is saved
            req.session.save(function (err: Error) {
                if (err) {
                    return res.status(500).send('Service unavailable');
                }
                return res.send(u);
            });
        });
    }
}
