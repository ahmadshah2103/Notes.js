const fs = require('fs');
const path = require('path');

// Define the folder and file structure
const folderStructure = {
    'src': {
        'configs': {},
        'controllers': {},
        'middlewares': {},
        'models': {},
        'routes': {},
        'services': {},
        'utils': {},
        'index.js': null
    },
    'test': {
        'unit': {},
        'integration': {},
    },
    'README.md': null,
    '.gitignore': null,
    '.env': null
};

// Function to create folders and files recursively
function createFolders(basePath, structure) {
    for (const item in structure) {
        const itemPath = path.join(basePath, item);
        if (structure[item] === null) {
            // Create file
            if (!fs.existsSync(itemPath)) {
                fs.writeFileSync(itemPath, '');
            }
        } else {
            // Create folder
            if (!fs.existsSync(itemPath)) {
                fs.mkdirSync(itemPath);
            }
            createFolders(itemPath, structure[item]);
        }
    }
}

// Base path where the folders and files should be created
const basePath = './';

// Create the base folder if it doesn't exist
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
}

// Generate the folder and file structure
createFolders(basePath, folderStructure);