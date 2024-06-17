import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = join(__dirname, "/db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading contacts file");
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    throw new Error("Error removing contact");
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Error adding contact");
  }
}
