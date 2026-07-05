'use strict';

/**
 * deck-request service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deck-request.deck-request');
