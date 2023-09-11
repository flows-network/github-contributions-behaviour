//when user login with GitHub success, will redirect like https://github.com/login/oauth/authorize?client_id= {user's code} and to get this code
export default async function (req, res) {
    if (req.query.code) {
        res.send(`
    <script>
      window.opener.sign('${req.query.code}',"GitHub");
      window.close();
    </script>
  `);

    } else if (req.body.code) {
        res.send(`
    <script>
      window.opener.sign('${req.body.code.credential}',"google");
      window.close();
    </script>
  `);
    } else {
        res.status(400).send('No code supplied');
        return;
    }

//pass code and request which header(components) set in window

}