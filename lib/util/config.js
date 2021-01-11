const version = require('../../package.json').version;
const projectName = 'generate-cli';
const commands = new Map([
    ['vue', 'vue create '],
    ['react', 'npx create-react-app '],
    ['vite', 'npm init vite-app '],
    ['uni-app', 'vue create -p dcloudio/uni-preset-vue ']
]);
const packageQuestions = [
    {
        when: ({ type, preset }) => type === 'vue' && !preset.includes('default'),
        type: 'list',
        message: 'Pick the package: ',
        name: 'packages',
        choices: [
            '@fk/faicomponent',
            '@it/fk-it-component',
        ],
    }
]

module.exports = {
    version,
    projectName,
    commands,
    packageQuestions
}