const os = require('os');
const { EventEmitter } = require('events');
const process = require('process');

// 1. Retrieve System Information
function getSystemInfo() {
    console.log('Operating System:', os.type());
    console.log('Release Version:', os.release());
    console.log('Total Memory:', (os.totalmem() / 1e9).toFixed(2), 'GB');
    console.log('Free Memory:', (os.freemem() / 1e9).toFixed(2), 'GB');
}

// 2. Monitor System Uptime
function getSystemUptime() {
    const uptimeSeconds = os.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    console.log(`System Uptime: ${hours}h ${minutes}m ${seconds}s`);
}

// 3. Inspect Process Environment Variables
function getEnvironmentVariable(variableName) {
    console.log(`Environment Variables (filtered by ${variableName}):`);
    console.log(process.env[variableName] || `Variable ${variableName} not found`);
}

// 4. Track Process Resource Usage
function getProcessResourceUsage() {
    const usage = process.resourceUsage();
    console.log('Resource Usage:', usage);
    console.log('CPU Usage:', process.cpuUsage());
}

// 5. Create and Trigger an Event
const emitter = new EventEmitter();
emitter.on('greet', () => {
    console.log('Hello! Event "greet" triggered.');
});

// 6. Pass Data with an Event
emitter.on('greetWithData', (data) => {
    console.log('Received Data:', data);
});

// 7. Listen for Multiple Events
emitter.on('start', () => {
    console.log('Event "start" detected.');
});
emitter.on('stop', () => {
    console.log('Event "stop" detected.');
});

// 8. Count Event Listeners
function countListeners(eventName) {
    console.log(`Listeners attached to "${eventName}":`, emitter.listenerCount(eventName));
}

// 9. Remove a Specific Listener
function customListener() {
    console.log('This listener will be removed.');
}
emitter.on('removable', customListener);

// Main Execution
getSystemInfo();
getSystemUptime();
getEnvironmentVariable('PATH');
getProcessResourceUsage();

// Trigger Events
emitter.emit('greet');
emitter.emit('greetWithData', { message: 'Hello with data!', timestamp: Date.now() });
emitter.emit('start');
emitter.emit('stop');

// Count and Remove Listeners
countListeners('removable');
emitter.removeListener('removable', customListener);
countListeners('removable');
