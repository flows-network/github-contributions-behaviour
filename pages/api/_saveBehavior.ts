import {default as db} from '@/db';
async function fetchGitHubData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function replaceGitHubLinks(text) {
    const regex = /https:\/\/github\.com\/[^ \n]*(commit)?[^ \n]*/g;

    let replacedText = text;
    const matches = text.match(regex);
    let commitId = 1
    let issueId = 1
    for (const match of matches) {
        let replacedUrl = match.replace('https://github.com/', 'https://api.github.com/repos/');
        if (replacedUrl.includes('commit')) {
            replacedUrl = replacedUrl.replace('commit', 'commits');
            const data = await fetchGitHubData(replacedUrl);
            const message = data && data.commit ? data.commit.message : null;
            if (message) {
                replacedText = replacedText.replace(match, `<span class="text-2xl">${commitId}. <a class="underline" href="${match}" target="_blank">${message}</a></span>`);
                commitId += 1
            }
        } else {
            const data = await fetchGitHubData(replacedUrl);
            const title = data && data.title ? data.title : null;
            if (title) {
                replacedText = replacedText.replace(match, `<span class="text-2xl">${issueId}. <a class="underline" href="${match}" target="_blank">${title}</a></span>`);
                issueId += 1
            }
        }
    }

    return replacedText;
}

export default async function handler(req, res) {
    const { id, owner, repo } = req.query;
    // const id = "jaykchen";
    // const owner = "flows-network";
    // const repo = "slack-github-issue-summarizer";
    let response
    // 发送 GET 请求获取数据
    try {
        response = await fetch(`https://code.flows.network/webhook/pRNFjLQGuMJ1fpEE1Us0?owner=${owner}&repo=${repo}&username=${id}`, {
            method: "post"
        });
    } catch (e) {
        console.log(e)
    }
    const analyzingData = await response.text()
    const replaceAnalyzingData = await replaceGitHubLinks(analyzingData)
    const behavior = new db.Behavior();
    behavior["githubId"] = id
    behavior["owner"] = owner
    behavior["repo"] = repo
    behavior["data"] = replaceAnalyzingData
    behavior.save()
// 最后发送 API 响应
// 可以根据需要进行其他操作，例如将获取的数据传递给页面等
    res.end(JSON.stringify({data: replaceAnalyzingData,behaviorId:behavior._id}));
}