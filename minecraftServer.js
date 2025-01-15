const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: '127.0.0.1', // Server IP
    port: 25565,       // Server port
    username: 'Bot',   // Bot username
    version: false     // Auto-detect version
});

// Serve static files from the gui directory
app.use(express.static(path.join(__dirname, 'gui')));
app.use(express.json()); // Middleware to parse JSON bodies

// Default route to serve the server settings page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gui', 'server-settings.html'));
});

// API endpoint to get the list of worlds
app.get('/api/worlds', (req, res) => {
    const worlds = fs.readdirSync('BedrockServer/worlds/');
    res.json(worlds);
});

// API endpoint to update server settings with XUID verification
app.post('/api/update-settings/:xuid', (req, res) => {
    const xuid = req.params.xuid;
    const settings = req.body;

    // Check if the user is an OP
    const opsFilePath = 'ops.json';
    if (fs.existsSync(opsFilePath)) {
        const ops = JSON.parse(fs.readFileSync(opsFilePath));
        const isOp = ops.some(op => op.xuid === xuid);
        if (!isOp) {
            return res.status(403).json({ message: 'Unauthorized: Not an operator' });
        }
    }

    // Update server.properties with new settings
    const propertiesFilePath = 'BedrockServer/server.properties';
    let properties = fs.readFileSync(propertiesFilePath, 'utf-8').split('\n');

    properties = properties.map(line => {
        const [key] = line.split('=');
        if (settings[key]) {
            console.log(`Setting ${key} changed to ${settings[key]}`); // Log the change
            return `${key}=${settings[key]}`;
        }
        return line;
    });

    fs.writeFileSync(propertiesFilePath, properties.join('\n'));
    res.json({ message: 'Settings updated successfully!' });
});

// Start the GUI server
app.listen(3000, () => {
    console.log('GUI server running on http://localhost:3000');
});

// List of available worlds
const worlds = fs.readdirSync('BedrockServer/worlds/'); // Automatically read available worlds

// Log when the bot is ready
bot.on('spawn', () => {
    console.log('Bot has spawned and is connected to the server.');
});

// Log when a player joins
bot.on('playerJoined', (player) => {
    console.log(`${player.username} has joined the server. XUID: ${player.xuid}`);
    
    // Prompt player to select a world
    bot.chat(`Welcome ${player.username}! Please select a world: ${worlds.join(', ')}`);
    
    // Prevent spawning until a world is selected
    bot.once('spawn', () => {
        // Logic to spawn player in the selected world
        // This part needs to be implemented based on your world management logic
    });
    
    checkOp(player.username, player.xuid);
});

// Log when the bot encounters an error
bot.on('error', (err) => {
    console.log(`Error: ${err}`);
});

// Function to check if a player is an OP
function checkOp(username, xuid) {
    const opsFilePath = 'ops.json';
    if (fs.existsSync(opsFilePath)) {
        const ops = JSON.parse(fs.readFileSync(opsFilePath));
        const isOp = ops.some(op => op.username === username && op.xuid === xuid);
        if (isOp) {
            console.log(`${username} is an operator.`);
            // Grant OP privileges here
        }
    }
}

// Handle command input for stopping the bot
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const args = input.split(' ');
    const command = args[0];

    if (command === 'stop') {
        bot.end(); // Use bot.end() instead of bot.quit()
        console.log('Bot has stopped.');
        rl.close();
    } else if (command === 'kick') {
        kickPlayer(args[1]);
    } else if (command === 'ban') {
        banPlayer(args[1]);
    } else if (command === 'tag') {
        tagPlayer(args[1], args[2], args[3]);
    } else {
        console.log(`Unknown command: ${input}`);
    }
});