#!/usr/bin/env node

const yargs = require("yargs");
const todastic = require("./todastic");

yargs
  .usage("Usage: $0 <command> [options]")
  .command(
    "track [from] <file>",
    "Tracks time from todos",
    yargs => {
      return yargs.option("from");
    },
    track
  )
  .example("$0 track project.todo", "Sums up all tracked time in the 'project.todo' file.")
  .example(
    "$0 track --from 2018-05-29 project.todo",
    "Sums up all tracked time in the 'project.todo' file since 29th of May 2018."
  )
  .demandCommand(1, "You need to select a command")
  .help("h")
  .alias("h", "help")
  .epilog("Copyright 2018").argv;

async function track(argv) {
  const { file, from } = argv;
  console.log(`Tracked time for ${file}: ${await todastic(file).tracked({ minTime: from })}`);
}
