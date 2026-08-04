'use strict';

/**
 * presentation router
 * Public create/find/delete intentionally open for self-service PoC (auth deferred).
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::presentation.presentation', {
  config: {
    find: {
      auth: false
    },
    findOne: {
      auth: false
    },
    create: {
      auth: false
    },
    delete: {
      auth: false
    }
  }
});
