# node-pinboard
node-pinboard is a node module for Pinboard.in API

# installation
1. install npm `curl http://npmjs.org/install.sh | sh`
2. `npm install pinboard`

# usage
a quick example using `node-pinboard`, this module require that you have a [Pinboard](http://pinboard.in) account.

to use `node-pinboard` you need to do include the module in your code

    var pinboard = require('pinboard');

then you need to auth yourself so you are good to go with the API

    pinboard.config({
        username: 'username',
        password: 'password',
        format: 'json' // or 'xml', default is 'json'. 
    });

all Pinboard methods is paste into the `pinboard.get` function, e.g.

    pinboard.get( method, [options,] callback );

    pinboard.get('posts/all', function(data) {
        console.log(data); // => xml or json output of all your bookmarks
    });

the `pinboard.get` have differnt options depending on the method you are requesting. The only option that all method have is the format option.
when you set format option inside the `pinboard.get` function you will use that format instead of the `pinboard.config` format.

## methods
`node-pinboard` support all the method that are on [Pinboard API](http://pinboard.in/api) documentation except the `user/secret` method (maybe later).

`node-pinboard` have some build in alias functions for the `pinboard.get` function. so instead of writing 

    pinboard.get('posts/all', function(data) {
        console.log(data); // => xml or json output of all your bookmarks
    });

you can write

    pinboard.all(function(data) {
        console.log(data); // => xml or json output of all your bookmarks
    });

the methods that have alias is

    "posts/all" => pinboard.all([options,] callback)
    "posts/add" => pinboard.add([options,] callback)
    "posts/delete" => pinboard.destroy([options,] callback)
    "tags/get" => pinboard.tags([options,] callback)

# pinboard functions
all callback function have the data argument `function(data) {...}`

`pinboard.config(options)` `pinboard.get(method, [options,] callback)` `pinboard.all([options,] callback)` `pinboard.add([options,] callback)` `pinboard.destroy([options,] callback)` `pinboard.tags([options,] callback)`

# meta
    * code: `git clone git://github.com/duofy/node-pinboard.git`
    * home: <http://github.com/duofy/node-pinboard>
    * bugs: <http://github.com/duofy/node-pinboard/issues>

# copyright and license 
`node-pinboard` is release under MIT license.

Copyright 2011 [Fredrik Forsmo](http://forsmo.me), [Duofy team](http://duofy.com)