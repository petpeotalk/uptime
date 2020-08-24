const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

try {
  const urlToHit = core.getInput('url-to-hit');
  const expectedStatuses = core.getInput('expected-statuses').split(",").map((status) => Number(status)) ;
  console.log(`Pinging ${urlToHit} and expecting ${expectedStatuses}`);
  
  const options = {
    hostname: '13.124.8.141',
    port: 2500,
    path: '/devices/version',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }

  https.request(options, (resp) => {
    if (!expectedStatuses.includes(resp.statusCode)) {
      core.setFailed(`Request status was ${resp.statusCode}`);
    } else {
      console.log(`Successful check`);
      core.setOutput("status", resp.statusCode);
    }
  }).on("error", (err) => {
    console.log(`Request failed`);
    core.setFailed(err.message);
  })
} catch (error) {
  core.setFailed(error.message);
}
