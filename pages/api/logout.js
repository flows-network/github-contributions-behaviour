export default function (req, res) {
    return new Promise((resolve, reject) => {
        req.session.user = null;
        req.session.gh_refresh_token = null;
        req.session.gh_refresh_token_expires_in = null;

        req.session.save(function(err) {
            if (err) {
                reject(err);
            }

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function(err) {
                if (err) {
                    reject(err);
                }
                res.redirect(302, '/');
                resolve();
            });
        });
    });
}