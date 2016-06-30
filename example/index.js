"use strict";

const fnResult = require("../lib");

// Simple sync function
fnResult(() => 42, (err, res) => console.log(res));
// => 42

// Same thing, but async
fnResult(
    cb => setTimeout(
        () => cb(null, 42)
      , 1000
    )
  , (err, res) => console.log(res)
);
// => 42

fnResult(() => { throw new Error("foo") }, err => console.log(err.message));
// => foo

let syncSquare = x => x * x
  , asyncSquare = (x, cb) => cb(null, x * x)
  ;

// Pass arguments to sync function
fnResult(syncSquare, [2], (err, res) => console.log(res));
// => 4

// Pass arguments to async function
fnResult(asyncSquare, [3], (err, res) => console.log(res));
// => 9

// Promise interface
fnResult(asyncSquare, [5]).then(res => {
    console.log(res);
});
// => 25

// Pass the scope
fnResult(function () {
    return this.world;
}, { world: "Mars" }, (err, res) => console.log(res))
// => Mars

// Pass args and scope to async function, with promise interface
fnResult(function (world, cb) {
    cb(null, `${this.msg} ${world}!`);
}, ["Pluto"], { msg: "Hello" }, (err, res) => console.log(res));
// => Hello Pluto!
