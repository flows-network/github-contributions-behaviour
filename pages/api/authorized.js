//when user login with GitHub success, will redirect like https://github.com/login/oauth/authorize?client_id= {user's code} and to get this code
export default async function ({query: {code, installation_id, setup_action}}, res) {
    if (!code) {
        res.status(400).send('No code supplied');
        return;
    }

//pass code and request which header(components) set in window
        res.send(`
    <script>
      window.opener.sign('${code}');
      window.close();
    </script>
  `);
}