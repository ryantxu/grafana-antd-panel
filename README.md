# Antd in grafana


[![CircleCI](https://circleci.com/gh/ryantxu/grafana-antd-panel/tree/master.svg?style=svg)](https://circleci.com/gh/ryantxu/grafana-antd-panel/tree/master)
[![dependencies Status](https://david-dm.org/ryantxu/grafana-antd-panel/status.svg)](https://david-dm.org/ryantxu/grafana-antd-panel)
[![devDependencies Status](https://david-dm.org/ryantxu/grafana-antd-panel/dev-status.svg)](https://david-dm.org/ryantxu/grafana-antd-panel?type=dev)
[![Coverage](https://circleci.com/api/v1.1/project/github/ryantxu/grafana-antd-panel/latest/artifacts/0/home/circleci/repo/coverage/badge-lines.svg)](https://circleci.com/api/v1.1/project/github/ryantxu/grafana-antd-panel/latest/artifacts/0/home/circleci/repo/coverage/lcov-report/index.html)


Antd has some great UI elements, would be nice to use them in grafana plugins, but still need to sort out style conflicts



Maybe try:
```
node_modules/less/bin/lessc --js public/sass/antd.less aaa.css
node_modules/postcss-cli/bin/postcss aaa.css --use autoprefixer --use > xxx.css

node_modules/postcss-cli/bin/postcss aaa.css > xxx.css


node_modules/less/bin/lessc --js public/sass/antd.less aaa.css
node_modules/postcss-cli/bin/postcss aaa.css > xxx.css

```
