import db from '../db';

export default {
    authorize
};

function authorize() {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])

    return async function (req, res) {
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