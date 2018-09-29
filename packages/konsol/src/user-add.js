const config = require("@todastic/config");
const { initDatabase } = require("@todastic/server-web/src/server/lib/database-mongo.js");
const { createUserModel } = require("@todastic/storage-users");
const { createEventModel } = require("@todastic/storage-events");
const yargs = require("yargs");

yargs
  .usage("Usage: $0 user-add -u [username] -p [password]")
  .command(
    "user-add -u [username] -p [password]",
    "Adds a user with a pre-defined todolist",
    yargs => {
      return yargs.option("from").array("status");
    },
    createUser
  )

async function createUser(argv) {
  const username = argv.u;
  const password = argv.p;
  if (username === undefined || password === undefined) {
    throw "Need username and password."
  }
  const db = await initDatabase({ config, logger: console })
  const User = createUserModel({ mongoose: db.mongoose });
  const Event = createEventModel({ mongoose: db.mongoose });
  const user = await User.create({ username, password })
  const uid = user._id + "-id-";
  const events = [
    { eventType: "ADDED_TODO", data: { todoId: uid + "1", title: "Ein erstes Todo anlegen", position: 0 } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-1", title: "Ein erstes SUB-Todo anlegen #power", position: 0, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-1-1", title: "Auf die drei Punkte klicken", position: 0, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-1-2", title: "\"plus\" anklicken", position: 1, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-1-3", title: "In das Textfeld ein neues Sub-Todo schreiben", position: 2, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-2", title: "Ein Todo an eine andere Stelle verschieben", position: 1, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "1-2-1", title: "Drag und drop verwenden", position: 0, parentId: uid + "2-1" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "2", title: "Passwort ändern #security", position: 1 } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "3", title: "Dem neugierigen Todastic Team tiefgründiges Feedback geben #help-us", position: 2 } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "3-1", title: "Über das Fragezeichen (?) rechts oben die Feedback E-Mailadresse finden", position: 0, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "3-2", title: "2 Minuten mit Todastic herumspielen #fun", position: 1, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4", title: "Eine Zeit tracken", position: 3 } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-1", title: "Zeit eintragen", position: 0, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-2", title: "Zeit ändern", position: 1, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-3", title: "Die getrackte Zeit über ein Skript ausgeben lassen", position: 2, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-3-1", title: "Skript aus dem Wiki kopieren (https://github.com/compose-us/todastic/wiki/User-scripts)", position: 0, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-3-2", title: "Skript laufen lassen", position: 1, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", data: { todoId: uid + "4-3-3", title: "Ergebnis begutachten #yay", position: 2, parentId: uid + "4-3" } }
  ];
  events.forEach(event => { Event.create(event).then(e => console.log(e)) });
}