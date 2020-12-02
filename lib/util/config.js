const version = require('../../package.json').version;
const projectName = 'generate-cli';
const commands = new Map([
    ['vue', 'vue create '],
    ['react', 'npx create-react-app '],
    ['vite', 'npm init vite-app '],
    ['uni-app', 'vue create -p dcloudio/uni-preset-vue ']
]);

module.exports = {
    version,
    projectName,
    commands
}