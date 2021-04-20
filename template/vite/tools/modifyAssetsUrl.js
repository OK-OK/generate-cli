/*
 * @Author: JL Guan
 * @Date: 2021-04-14 15:27:18
 * @description: file description
 * @LastEditTime: 2021-04-20 13:45:11
 * @FilePath: \mine\generate-cli\template\vite\tools\modifyAssetsUrl.js
 */
const fs = require('fs');
const path = require('path');
const viteConfig = fs.readFileSync(path.resolve(__dirname, '../vite.config.js'), 'utf-8');
const outDir = path.resolve(`${viteConfig.match(/outDir: ?'(.*)',/)?.[1] || 'dist'}/css`);
const fileList = fs.readdirSync(outDir);
fileList.forEach(it => {
    const content = fs.readFileSync(`${outDir}/${it}`, 'utf-8');
    fs.writeFileSync(`${outDir}/${it}`, content.replace(/url\(\.\//g, 'url(../assets/'));
})
