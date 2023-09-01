const GITHUB_OAUTH_ACCESS_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_GET_USER_URL = 'https://api.github.com/user';
import fetch from 'node-fetch';
export default {
    getAccess,
    refreshToken,
    getUser,
    getCommit
};

//POST this code back to GitHub in exchange for an access_token
async function getAccess(code) {
    let result = await fetch(GITHUB_OAUTH_ACCESS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
            code
        })
    });

    return await result.json();
}

async function refreshToken(refreshToken) {
    let result = await fetch(GITHUB_OAUTH_ACCESS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET
        })
    });

    return await result.json();
}

//In this request you can get user info
export async function getUser(accessToken) {
    let result = await fetch(GITHUB_GET_USER_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${accessToken}`
        }
    });

    return await result.json();
}

export async function getCommit(org, repo, branch, accessToken) {
    const commitUrl = `https://api.github.com/repos/${org}/${repo}/commits/${branch}`;
    try {
        const result = await fetch(commitUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (result.ok) {
            const r = await result.json();
            return r.sha;
        }
        return null;
    } catch (e) {
        return null;
    }
}
