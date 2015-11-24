'use strict';

/**
 * Module dependencies.
 */

module.exports = {

  runService(context, service) {
    const taskContext = Object.assign({}, context);
    Object.seal(taskContext);
    service(taskContext);
  }
};
