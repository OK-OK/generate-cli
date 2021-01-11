/*
 * @Author: JL Guan
 * @Date: 2021-01-08 18:01:38
 * @description: file description
 * @LastEditTime: 2021-01-11 10:12:54
 * @FilePath: \mine\generate-cli\lib\util\writeEntry.js
 */
const { fs, path } = require('../share-util')

module.exports = async (type, packages, outputPath) => {
    const mainPath = `${outputPath}/src/main.js`
    const mainContent = fs.readFileSync(mainPath, 'utf-8')
    let packagesContent;
    if (packages.includes('fk')) {
        packagesContent = 
`import faicomponent from '@fk/faicomponent';
import '@fk/faicomponent/dist/faicomponent.css';
`
        if (packages === '@it/fk-it-component') {
            packagesContent += 
`import fkitcomponent from '@it/fk-it-component';
import '@it/fk-it-component/dist/index.css';

Vue.use(fkitcomponent);
`
        } else {
            packagesContent += '\n'
        }
        packagesContent += 
`Vue.use(faicomponent);
Vue.config.productionTip = false;
`
    }
    await fs.writeFile(mainPath, mainContent.replace(`\nVue.config.productionTip = false;`, packagesContent))
}