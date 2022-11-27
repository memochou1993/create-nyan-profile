#! /usr/bin/env node

const fs = require('fs')
const { execSync } = require('child_process');

const exec = (command) => new Promise((resolve) => {
  execSync(command, {
    stdio: 'inherit',
  });
  resolve();
});

const modify = (file, searchValue, replaceValue) => new Promise((resolve) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    const result = data.replace(searchValue, replaceValue);
    fs.writeFile(file, result, 'utf8', (err) => {
      if (err) throw err;
      resolve();
    });
  });
});

const dir = process.argv[2];

if (!dir) {
  console.error('Please specify the project directory.');
  return;
}

(async () => {
  await exec(`git clone git@github.com:memochou1993/nyan-profile.git ${dir}`);
  await modify(`${dir}/package.json`, /\"nyan-profile\"/g, `"${dir}"`);
  await modify(`${dir}/package-lock.json`, /\"nyan-profile\"/g, `"${dir}"`);
  await modify(`${dir}/docker-compose.yaml`, /\"nyan-profile\"/g, `"${dir}"`);
  await modify(`${dir}/nyan.config.json`, /\"\/nyan-profile\"/g, `"/${dir}"`);
  await exec(`cd ${dir} && rm -rf .git && git init && git add . && git commit -m "Initial commit"`);
  await exec(`cd ${dir} && npm ci`);
})();
