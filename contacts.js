const fs = require("fs/promises");
const path = require("path");
const textFormat = "utf8";
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require('nanoid');

async function listContacts() {
   try {
    const response = await fs.readFile(contactsPath, textFormat);
    const data = JSON.parse(response);
    console.table(data);
  } catch (e) {
        console.log(e.message);
    }
}

async function getContactById(contactId) {
        const contactsArray = await listContacts()

        const contactById = await contactsArray.find(
            (item) => item.id === contactId
    )
    if (!contactById) return null
    return contactById
}

async function removeContact(contactId) {
        const contactsArray = await listContacts()

        const contactIndex = contactsArray.findIndex(
            (item) => item.id === contactId
        );
       if(contactIndex === -1) return null
        const [contactById] =  contactsArray.splice(contactIndex, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    return contactById
}

async function addContact(name, email, phone) {

        const contactsArray = await listContacts()
        const data = {
            name,
            email,
            phone,
            id: nanoid(),
        };

        contactsArray.push(data);

        console.table(data);

        await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
        return data;
  
   
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};