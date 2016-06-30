"use strict";

const tester = require("tester")
    , fnResult = require("..")
    ;

tester.describe("fn-result", t => {
    t.should("handle sync functions", cb => {
        fnResult(() => 42, (err, res) => {
            t.expect(res).toBe(42);
            cb();
        });
    });

    t.should("handle async functions", cb => {
        fnResult(
            cb => setTimeout(
                () => cb(null, 42)
              , 1000
            )
          , (err, res) => {
                t.expect(res).toBe(42);
                cb();
            }
        );
    });

    t.it("throw errors from sync functions", cb => {
        fnResult(() => { throw new Error("foo") }, err => {
            t.expect(err.message).toBe("foo");
            cb();
        });
    });

    let syncSquare = x => x * x
      , asyncSquare = (x, cb) => cb(null, x * x)
      ;

    t.should("support passing arguments to sync functions", cb => {
        fnResult(syncSquare, [2], (err, res) => {
            t.expect(res).toBe(4);
            cb();
        });
    });

    t.should("support passing arguments to async functions", cb => {
        fnResult(asyncSquare, [2], (err, res) => {
            t.expect(res).toBe(4);
            cb();
        });
    });

    t.should("support passing arguments to async functions", cb => {
        fnResult(asyncSquare, [2], (err, res) => {
            t.expect(res).toBe(4);
            cb();
        });
    });

    t.should("support promises", cb => {
        fnResult(asyncSquare, [5]).then(res => {
            t.expect(res).toBe(55);
            cb();
        });
    });

    t.should("support custom context", cb => {
        fnResult(function () {
            return this.world;
        }, { world: "Mars" }, (err, res) => {
            t.expect(res).toBe("Mars");
            cb();
        })
    });

    t.should("support custom context and arguments", cb => {
        fnResult(function (world, cb) {
            cb(null, `${this.msg} ${world}!`);
        }, ["Pluto"], { msg: "Hello" }, (err, res) => {
            t.expect(res).toBe("Hello Pluto!");
            cb();
        });
    });
});
