"use strict";
/* eslint-disable no-console */
/* eslint-disable no-console */
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixed_reality_extension_sdk_1 = require("@microsoft/mixed-reality-extension-sdk");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = require("path");
var app_1 = __importDefault(require("./app"));
/* eslint-disable no-console */
process.on('uncaughtException', function (err) { return console.log('uncaughtException', err); });
process.on('unhandledRejection', function (reason) { return console.log('unhandledRejection', reason); });
/* eslint-enable no-console */
// Read .env if file exists
dotenv_1.default.config();
// This function starts the MRE server. It will be called immediately unless
// we detect that the code is running in a debuggable environment. If so, a
// small delay is introduced allowing time for the debugger to attach before
// the server starts accepting connections.
function runApp() {
    // // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const lt = require('localtunnel');
    // (async() => {
    // 	const tunnel = await lt({ port: 3901 });
    // 	// the assigned public url for your tunnel
    // 	// i.e. https://abcdefgjhij.localtunnel.me
    // 	// eslint-disable-next-line no-console
    // 	console.log(tunnel.url);
    // 	tunnel.on('close', () => {
    // 		// tunnels are closed
    // 		// eslint-disable-next-line no-console
    // 		console.log(tunnel.url);
    // 	});
    // })();
    // Start listening for connections, and serve static files.
    var server = new mixed_reality_extension_sdk_1.WebHost({
        // baseUrl: 'http://<ngrok-id>.ngrok.io',
        baseDir: path_1.resolve(__dirname, '../public')
    });
    // Handle new application sessions
    server.adapter.onConnection(function (context) { return new app_1.default(context, server.baseUrl); });
}
// Check whether code is running in a debuggable watched filesystem
// environment and if so, delay starting the app by one second to give
// the debugger time to detect that the server has restarted and reconnect.
// The delay value below is in milliseconds so 1000 is a one second delay.
// You may need to increase the delay or be able to decrease it depending
// on the speed of your machine.
var delay = 1000;
var argv = process.execArgv.join();
var isDebug = argv.includes('inspect') || argv.includes('debug');
if (isDebug) {
    setTimeout(runApp, delay);
}
else {
    runApp();
}
