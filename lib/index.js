var lodashGroupBy = require('lodash.groupby');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin that groups collections by a property
 *
 * @param options
 * @returns {Function}
 */
function plugin(options) {
  options = normalize(options);

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    var collections = metadata.collections;
    var groups = {}

    for (var collection in options) {
      var opts = options[collection];
      var items = collections[collection];
      var groupBy = opts.groupBy;
      var meta = opts.meta || {}
      groups[collection] = {}

      if (typeof meta === 'string') meta = JSON.parse(files[meta].contents);

      var groupedItems = lodashGroupBy(items, function(item) {
        return item[groupBy];
      });

      for (var group in groupedItems) {
        groups[collection][group] = (meta[group] === undefined) ? {} : meta[group];
        groups[collection][group].items = groupedItems[group];
      }
    }

    metadata.groups = groups;
    done();
  }
}

/**
 * Normalize options from string/object into object
 *
 * @param options
 * @returns {*|{}}
 */
function normalize(options){
  options = options || {};

  for (var key in options) {
    var val = options[key];
    if ('string' == typeof val) options[key] = { pattern: val };
  }

  return options;
}