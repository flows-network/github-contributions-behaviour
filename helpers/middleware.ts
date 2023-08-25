import db from '../db';
import {NextFunction, Request, Response} from 'express';

interface User {
    github_id: string;
    github_name: string;
    username: string;
    avatar: string;
    github_url: string;
}

export default {
    authorize
};

function authorize() {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])

    return async function (req: Request, res: Response) {
        return new Promise(async (resolve, reject) => {
            // authenticate and attach user to request object (req.user)
            if (req.session.user) {
                let u = await db.Account.findById(req.session.user);
                if (u) {
                    const {
                        github_id,
                        github_name,
                        username,
                        avatar,
                        github_url
                    } = u

                    req.user = {github_id, github_name, username, avatar, github_url}
                    return resolve();
                }
            }
            res.status(401).json({message: 'Unauthorized'});
            return reject();
        })
    };
}