/*
 * @Author: JL Guan
 * @Date: 2021-04-20 13:51:12
 * @description: file description
 * @LastEditTime: 2021-04-20 13:59:55
 * @FilePath: \mine\generate-cli\template\vite\src\modules\helloVite\router.js
 */
/*
 * @Author: JL Guan
 * @Date: 2021-04-08 17:33:42
 * @description: file description
 * @LastEditTime: 2021-04-19 11:36:51
 * @FilePath: \webbss\vite\src\modules\insideLetter\router.js
 */
export const router = {
    // 内部信
    path: '/helloVite',
    name: 'helloVite',
    component: () => import('./views/helloVite'),
}