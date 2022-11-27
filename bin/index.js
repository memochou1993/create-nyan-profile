#! /usr/bin/env node

const fs = require('fs')
const { execSync } = require('child_process');

const exec = (command) => {
  execSync(command, {
    stdio: 'inherit',
  });
};

const modify = (someFile, searchValue, replaceValue) => {
  fs.readFile(someFile, 'utf8', (err, data) => {
    if (err) throw err;
    const result = data.replace(searchValue, replaceValue);
    fs.writeFile(someFile, result, 'utf8', (err) => {
      if (err) throw err;
    });
  });
};

const dir = process.argv[2];

if (!dir) {
  console.error('Please specify the project directory.');
  return;
}

exec(`git clone git@github.com:memochou1993/nyan-profile.git ${dir}`);
modify(`${dir}/package.json`, /\"nyan-profile\"/g, `"${dir}"`);
modify(`${dir}/package-lock.json`, /\"nyan-profile\"/g, `"${dir}"`);
modify(`${dir}/docker-compose.yaml`, /\"nyan-profile\"/g, `"${dir}"`);
modify(`${dir}/nyan.config.json`, /\"\/nyan-profile\"/g, `"/${dir}"`);
exec(`cd ${dir} && npm ci`);
