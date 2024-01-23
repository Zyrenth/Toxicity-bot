import console from 'node:console';

export async function log(...message) {
    console.log(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        '\x1b[34mLOG' + '\x1b[0m', ...message);
}

export async function info(...message) {
    console.log(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        '\x1b[34mINFO' + '\x1b[0m', ...message);
}

export async function warn(...message) {
    console.warn(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        '\x1b[33mWARN' + '\x1b[0m', ...message);
}

export async function error(...message) {
    console.warn(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        '\x1b[31mERROR' + '\x1b[0m', ...message);
}

export async function customLog(name: string, ...message) {
    console.log(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        `\x1b[31m${name}` + '\x1b[0m', ...message);
}

export async function customError(name: string, ...message) {
    console.warn(`\x1b[90m[${new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}]`,
        `\x1b[31m${name}` + '\x1b[0m', ...message);
}
