/*
 * @Author: JL Guan
 * @Date: 2021-01-08 18:01:38
 * @description: file description
 * @LastEditTime: 2021-01-11 10:44:28
 * @FilePath: \mine\generate-cli\lib\util\writeEntry.js
 */
const { fs } = require('../share-util')

const getOutputContent = {
    vue(packages, mainContent) {
        let outputContent;
        if (packages.includes('fk')) {
            outputContent = 
`import faicomponent from '@fk/faicomponent';
import '@fk/faicomponent/dist/faicomponent.css';
`
            if (packages === '@it/fk-it-component') {
                outputContent += 
`import fkitcomponent from '@it/fk-it-component';
import '@it/fk-it-component/dist/index.css';

Vue.use(fkitcomponent);
`
            } else {
                outputContent += '\n'
            }
            outputContent += 
`Vue.use(faicomponent);
Vue.config.productionTip = false;
`
        }
        return mainContent.replace(`\nVue.config.productionTip = false;`, outputContent)
    }
}

module.exports = async (type, packages, outputPath) => {
    const mainPath = `${outputPath}/src/main.js`
    const mainContent = fs.readFileSync(mainPath, 'utf-8')
    const outputContent = getOutputContent[type](packages, mainContent);
    await fs.writeFile(mainPath, outputContent)
}