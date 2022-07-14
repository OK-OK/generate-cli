/*
 * @Author: JL Guan
 * @Date: 2020-07-09 13:48:24
 * @LastEditTime: 2022-07-14 16:15:11
 * @Description: share util
 * @FilePath: \generate-cli\lib\share-util.js
 */

;["config"].forEach(m => Object.assign(exports, require(`./util/${m}`)))

const github = "OK-OK"
const downloadGitRepo = require("download-git-repo")
exports.download = (src, name) =>
  new Promise(resolve => {
    downloadGitRepo(
      `${github}/${src}`,
      `${process.cwd()}/${name}`,
      { clone: true },
      resolve
    )
  })

exports.fs = require("fs-extra")
exports.chalk = require("chalk")
exports.execa = require("execa")
exports.path = require("path")
exports.ora = require("ora")
