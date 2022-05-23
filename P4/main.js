
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');

const PUERTO = 9090;

const app = express();
const server = http.Server(app);
const io = socket(server);

let usuarios_conect = 0;