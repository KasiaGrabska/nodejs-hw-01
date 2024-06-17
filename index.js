import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const getContact = await getContactById(id);
        console.log(getContact);
        break;

      case "add":
        await addContact(name, email, phone);
        console.log("A NEW CONTACT HAS BEEN ADDED");
        break;

      case "remove":
        await removeContact(id);
        console.log("CONTACT HAS BEEN REMOVED");
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

invokeAction(argv);
