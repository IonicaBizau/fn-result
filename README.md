
# fn-result

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/fn-result.svg)](https://www.npmjs.com/package/fn-result) [![Downloads](https://img.shields.io/npm/dt/fn-result.svg)](https://www.npmjs.com/package/fn-result) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Take an (a)sync function result and pass it forward.

## :cloud: Installation

```sh
$ npm i --save fn-result
```


## :clipboard: Example



```js
const fnResult = require("fn-result");

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
```

## :memo: Documentation


### `fnResult(a, b)`
Take an (a)sync function result and pass it forward.

#### Params
- **Number** `a`: Param descrpition.
- **Number** `b`: Param descrpition.

#### Return
- **Number** Return description.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
