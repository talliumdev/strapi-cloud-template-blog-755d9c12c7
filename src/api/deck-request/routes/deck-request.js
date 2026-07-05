'use strict';

/**
 * deck-request router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::deck-request.deck-request', {
  config: {
    create: {
      auth: false
    }
  }
});
