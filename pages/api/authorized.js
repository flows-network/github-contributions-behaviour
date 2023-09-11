import querystring from 'querystring';
//when user login with GitHub success, will redirect like https://github.com/login/oauth/authorize?client_id= {user's code} and to get this code
export default async function (req, res) {
    if (req.query.code) {
        res.send(`
    <script>
      window.opener.sign('${req.query.code}',"GitHub");
      window.close();
    </script>
  `);

    } else if (req.body) {
        const params = querystring.parse(req.body);
        if (params.credential) {
            res.send(`
    <script>
      window.opener.sign('${params.credential}',"google");
      window.close();
    </script>
  `);
        } else {
            res.status(400).send('No code supplied');
        }
    } else {
        res.status(400).send('No code supplied');
    }

//pass code and request which header(components) set in window

}