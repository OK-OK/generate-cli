#!/usr/bin/env node

const program = require("commander")
const Creator = require("../lib/creator")
const { projectName, version, commands, chalk } = require("../lib/share-util")

// 提示
program.name(projectName).action(() => {
  new Creator()
})

program
  .command("create [typeName]")
  .description("create a new [typeName] project")
  .action(typeName => {
    if (![...commands.keys()].includes(typeName)) {
      console.log()
      console.log(
        `  ` + chalk.red(`Unknown typeName ${chalk.yellow(typeName)}.`)
      )
      console.log()
      return
    }
    console.log()
    console.log()
    console.log(chalk.blue(`${projectName} v${version}`))
    new Creator(typeName)
  })

program.commands.forEach(c => {
  c.on("--help", () => console.log())
})

program
  .version(version, '-v, --version')

program.parse(process.argv)
