"use strict";

const assured = require("assured");

/**
 * fnResult
 * Take an (a)sync function result and pass it forward.
 *
 * @name fnResult
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
module.exports = function fnResult (fn, args, scope, cb) {

    // fnResult(fn, [], cb)
    // fnResult(fn, {...}, cb)
    if (typeof scope === "function") {
        cb = scope;
        if (!Array.isArray(args)) {
            scope = args;
            args = [];
        } else {
            scope = this;
        }
    }

    // fnResult(fn, cb)
    if (typeof args === "function") {
        cb = args;
        args = [];
        scope = this;
    }

    cb = assured(cb);

    if (args.length >= fn.length) {
        process.nextTick(() => {
            let res = null;
            try {
                res = fn.apply(scope, args)
            } catch (e) {
                return cb(e);
            }
            cb(null, res);
        });
    } else {
        args.push(cb);
        process.nextTick(() => {
            debugger
            fn.apply(scope, args);
        });
    }

    return cb._;
};
