import fs from "fs";

const readData = (file) => {
    const data = fs.readFileSync(`./db/${file}`);
    return JSON.parse(data);
}

const saveData = (data, file) => {
    fs.writeFileSync(`./db/${file}`, JSON.stringify(data, null, 2));
}

export {
    readData,
    saveData
}