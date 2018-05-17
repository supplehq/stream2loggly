"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = require("yargs");
const split2_1 = tslib_1.__importDefault(require("split2"));
const pump_1 = tslib_1.__importDefault(require("pump"));
const through2_1 = tslib_1.__importDefault(require("through2"));
const node_loggly_bulk_1 = tslib_1.__importDefault(require("node-loggly-bulk"));
const client = (node_loggly_bulk_1.default).createClient({
    token: yargs_1.argv.token,
    subdomain: yargs_1.argv.subdomain,
    bufferOptions: {
        size: 500,
        retriesInMilliSeconds: 5 * 1000,
    },
    json: yargs_1.argv.json || true,
    verbose: yargs_1.argv.verbose || false,
    tags: ['stream2loggly'],
});
pump_1.default(process.stdin, split2_1.default(JSON.parse), through2_1.default.obj((chunk, enc, cb) => {
    client.log(Object.assign({}, chunk, { timestamp: new Date().toISOString() }), (err, res) => {
        if (err) {
            console.error(err);
        }
        else if (yargs_1.argv.verbose) {
            console.log(res);
        }
    });
    cb();
}));
//# sourceMappingURL=index.js.map