#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const { execSync } = require("child_process");
const package = require("../package.json");

const utilityName = Object.keys(package.bin)[0];
const dataStoragePath = path.resolve(__dirname, ".git-config-data.txt");

const args = process.argv.slice(2);

if (args[0] === "init") {
    const filePath = args[1];
    
    if (!filePath) {
        console.error("Set data file path. Example:");
        console.error(utilityName + " init ./data.txt");
        process.exit(1);
    }
    
    if (!fs.existsSync(filePath)) {
        console.error(`Файл ${filePath} не найден`);
        process.exit(1);
    }
    
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        fs.writeFileSync(dataStoragePath, data);
        console.log(`Data file writed successefully ${dataStoragePath}`);
    } catch (error) {
        console.error("Error during write data file:", error.message);
    }
}

else if (args[0] === "run") {
    
    if (!fs.existsSync(dataStoragePath)) {
        console.error("Data file not found. Use set-file for write data.");
        process.exit(1);
    }
    
    const fileContent = fs.readFileSync(dataStoragePath, "utf-8");
    const lines = fileContent.split("\n").filter(line => line.trim() !== "");
    
    if (lines.length === 0) {
        console.error("Data file is empty. Use set-file for write data.");
        process.exit(1);
    }
    
    const options = lines.map((line, index) => {
        const [email, name] = line.split("|");
        return { index, email: email.trim(), name: name.trim() };
    });
    
    console.log("Select a user for Git configuration:");
    options.forEach(option => {
        console.log(`${option.index + 1}. ${option.email} | ${option.name}`);
    });
    
    const selectedIndex = readlineSync.questionInt("Enter the user number: ") - 1;
    
    if (selectedIndex < 0 || selectedIndex >= options.length) {
        console.error("Invalid selection");
        process.exit(1);
    }
    
    const selectedUser = options[selectedIndex];
    
    try {
        execSync(`git config user.email "${selectedUser.email}"`);
        execSync(`git config user.name "${selectedUser.name}"`);
        console.log(`Git configuration updated successfully:`);
        console.log(`user.email = ${selectedUser.email}`);
        console.log(`user.name  = ${selectedUser.name}`);
    } catch (error) {
        console.error("Error executing git commands:", error.message);
    }
} else {
    console.log("Invalid command. Use:");
    console.log(`\t${utilityName} init <path_to_data_file>`);
    console.log(`\t${utilityName} run`);
}
