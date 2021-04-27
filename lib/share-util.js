/*
 * @Author: JL Guan
 * @Date: 2020-07-09 13:48:24
 * @LastEditTime: 2021-04-27 16:38:31
 * @Description: share util
 * @FilePath: \mine\generate-cli\lib\share-util.js
 */

['config'].forEach(m =>
    Object.assign(exports, require(`./util/${m}`))
)

exports.fs = require('fs-extra')
exports.chalk = require('chalk')
exports.execa = require('execa')
exports.path = require('path')
exports.ora = require('ora')
