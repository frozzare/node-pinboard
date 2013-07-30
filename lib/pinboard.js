var request = require('request'),
    pinboard = {

        /*
         * First function that need to be called to set username and password
         */

        init: function (options) {
            this.token = options.token || '';
            this.url = 'https://' + (!this.token ? (options.username + ':' + options.password + '@') : '') + 'api.pinboard.in/v1';
            this.format = options.format || 'json';
        },

        /*
         * Object with all the pinboard methods
         */

        methods: {

            /*
             * Returns all bookmarks in the user's account.
             *
             * options: {
             *      tag: 'filter by up to three tags',
             *      start: 'offset value (default is 0)',
             *      results: 'number of results to return. Default is all',
             *      fromdt: 'return only bookmarks created after this time. UTC timestamp in this format: 2010-12-11T19:48:02Z',
             *      todt: 'return only bookmarks created before this time. UTC timestamp in this format: 2010-12-11T19:48:02Z',
             *      meta: 'include a change detection signature for each bookmark',
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/dates', function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/all": function (options, callback) {
               pinboard.request('posts/all', options, callback, false);
            },

            /*
             * Returns a list of the user's most recent posts, filtered by tag.
             *
             * options: {
             *      tag: 'filter by up to three tags',
             *      count: 'number of results to return. Default is 15, max is 100',
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/dates', function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/recent": function (options, callback) {
                pinboard.request('posts/recent', options, callback, true);
            },

            /*
             * Returns a list of dates with the number of posts at each date.
             *
             * options: {
             *      tag: 'filter by up to three tags',
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/dates', function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/dates": function (options, callback) {
                pinboard.request('posts/dates', options, callback, true);
            },

            /*
             * Delete a bookmark. Arguments with ^ are required.
             *
             * options: { 
             *      ^url: 'URL to delete. URL as defined by RFC 3986. Allowed schemes are http, https, javascript, 
             *            mailto, ftp and file. Safari feed schema will be treated as a synonym for http'
             * }
             *
             * e.g. pinboard.get('posts/delete', { url: 'http://duofy.com' }, function(data) {
             *          console.log(data);
             *      });
             * 
             * or   pinboard.destroy('http://duofy.com', function(data) {
             *          console.log(data);
             *      });
             *
             *      This is the same as pinboard.get('posts/delete', options, callback);    
             */

            "posts/delete": function (options, callback) {
                if (options.url === undefined) throw 'Delete method require url value to work';
                pinboard.request('posts/delete', options, callback, true);
            },

            /*
             * Add a bookmark. Arguments with ^ are required.
             *
             * options: { 
             *      ^url: 'Returns bookmark of this URL. URL as defined by RFC 3986. Allowed schemes are http, https, javascript, 
             *            mailto, ftp and file. Safari feed schema will be treated as a synonym for http',
             *      ^description: 'title of the item',
             *      extended: 'description of the item',
             *      tags: 'list of up to 100 tags',
             *      dt: 'creation time for this bookmark. Defaults to current time. Datestamps more than 10 minutes ahead of server time will be reset to current server time',
             *      replace: 'yes/no - Replace any existing bookmark with this URL. Default is yes. If set to no, will throw an error if bookmark exists',
             *      shared: 'yes/no - Make bookmark public. Default is "yes" unless user has enabled the "save all bookmarks as private" user setting, in which case default is "no"',
             *      toread: 'yes/no - Marks the bookmark as unread. Default is "no"',
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/add', { url: 'http://duofy.com', description: 'Duofy team site' }, function(data) {
             *          console.log(data);
             *      });
             * 
             * or   pinboard.add({ url: 'http://duofy.com', description: 'Duofy team site' }, function(data) {
             *          console.log(data);
             *      });
             *
             *      This is the same as pinboard.get('posts/add', options, callback);
             */

            "posts/add": function (options, callback) {
                if (options.url === undefined || options.description === undefined) throw 'Add method require url and description value to work';
                pinboard.request('posts/add', options, callback, true);
            },

            /*
             * Returns one or more posts on a single day matching the arguments. If no date or url is given, date of most recent bookmark will be used.
             *
             * options: { 
             *      tag: 'filter up to three tags',
             *      dt: 'UTC date: 2010-12-11. Returns bookmarks on this day',
             *      url: 'returns bookmark of this URL. URL as defined by RFC 3986. Allowed schemes are http, https, javascript, 
             *            mailto, ftp and file. Safari feed schema will be treated as a synonym for http',
             *      meta: 'yes/no - include a change detection signature in a meta attribute',
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/get', { url: 'http://duofy.com' }, function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/get": function (options, callback) {
                pinboard.request('posts/get', options, callback, false);
            },

            /*
             * Returns a list of popular tags and recommended tags for a given URL.
             *
             * options: { 
             *      url: 'URL as defined by RFC 3986. Allowed schemes are http, https, javascript, 
             *            mailto, ftp and file. Safari feed schema will be treated as a synonym for http',
             *      format: 'default is xml. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/suggest', { url: 'http://duofy.com' }, function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/suggest": function (options, callback) {
                if (options.url === undefined) throw 'Suggest method require url value to work';
                pinboard.request('posts/suggest', options, callback, true);
            },

            /*
             * Returns the most recent time a bookmark was added, updated or deleted.
             * This is great to run before fetching all bookmarks to see if data has changed since the last fetch.
             *
             * options: {
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('posts/update', function(data) {
             *          console.log(data);
             *      });
             *
             */

            "posts/update": function (options, callback) {
                pinboard.request('posts/update', options, callback, true);
            },

            /*
             * Returns all bookmarks in the user's account
             *
             * options: {
             *      format: 'default is json. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('tags/get', function(data) {
             *          console.log(data);
             *      });
             * 
             * or   pinboard.tags(function(data) {
             *          console.log(data);
             *      });
             *
             *      This is the same as pinboard.get('tags/get', options, callback);
             */

            "tags/get": function (options, callback) {
                pinboard.request('tags/get', options, callback, true);
            },

            /*
             * Delete an existing tag
             *
             * options: { 
             *      tag: 'name of the tag to delete',
             *      format: 'default is xml. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('tags/delete', { tag: 'Java' }, function(data) {
             *          console.log(data);
             *      });
             *
             */

            "tags/delete": function (options, callback) {
                if (options.tag === undefined) throw 'Delete method require tag value to work';
                pinboard.request('tags/delete', options, callback, true);
            },

            /*
             * Rename an tag, or fold it in to an existing tag
             *
             * options: { 
             *      old: 'old tag name. match is not case sensitive', 
             *      new: 'new tag namem, if empty, nothing will happen',
             *      format: 'default is xml. This will override pinboard default format option'
             * }
             *
             * e.g. pinboard.get('tags/rename', { old: 'javascript', new: 'JavaScript' }, function(data) {
             *          console.log(data);
             *      });
             *
             */

            "tags/rename": function (options, callback) {
                if (options.old === undefined) throw 'Rename method require old value to work';
                pinboard.request('tags/rename', options, callback, true);
            }

        },

        /*
         * The request function that all method runs
         * and then when request are done it call the pinboard callback
         */

        request: function (method, options, callback) {
            request({
                url: pinboard.url + '/' + method + pinboard.formatArguments(options)
            }, function (error, response, body) {
                pinboard.callback({
                    err: error,
                    res: response,
                    body: body,
                    callback: callback,
                    format: options.format
                });
            });
        },

        /*
         * Format object with arguments into querstring. 
         * { format: 'json', url: 'http://duofy.com' } => ?format=json&url=http://duofy.com
         */

        formatArguments: function (obj) {
            var str = pinboard.token ? ('?auth_token=' + pinboard.token + '&') : '?';
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = typeof obj[key] === 'string' ? obj[key].replace(/\s+/g, '%20') : obj[key];
                    str += key + '=' + obj[key] + '&'
                }
            }
            return str[str.length - 1] === '&' ? str.slice(0, -1) : str;
        },

        /*
         * The callback function that runs when request are done
         * and then runs the callback function from the user
         */

        callback: function (item) {
            if (item.err) {
                throw item.err;
            } else if (item.res.statusCode == 200) {
                var data = item.format === 'json' && item.body[0] !== '<' ? eval('(' + item.body + ')') : item.body;
              
                item.callback.call(this, data);
                this.parseJSON = false;
            }
        }
    };

/*
 * The few functions that we exports, nothing special with them
 * some method has 'cover' functions so you can write e.g pinboard.all(...) instead of pinboard.get('posts/all', ...)
 */

module.exports = exports = {
    config: function (options) {
        pinboard.init(options);
    },
    get: function (method, options, callback) {
        callback = typeof (options) === 'function' ? options : callback;
        options.format = options.format !== undefined ? options.format : pinboard.format;
        pinboard.methods[method](options, callback);
        return this; // so you can run .get(...).get(...)
    },
    destroy: function (url, callback) {
        return this.get('posts/delete', {
            url: url
        }, callback);
    },
    add: function (options, callback) {
        return this.get('posts/add', options, callback);
    },
    all: function (options, callback) {
        return this.get('posts/all', options, callback);
    },
    tags: function (options, callback) {
        return this.get('tags/get', options, callback);
    }
};
