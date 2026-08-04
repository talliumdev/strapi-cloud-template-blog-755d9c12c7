'use strict';
const bootstrapSeed = require('./bootstrap');

/**
 * Ensure Public role can manage presentations + upload HTML files.
 * Idempotent — safe to run on every boot.
 */
async function ensurePresentationPublicPermissions({ strapi }) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' }
  });

  if (!publicRole) {
    strapi.log.warn('Public role not found; skipping presentation permissions setup');
    return;
  }

  const actions = [
    'api::presentation.presentation.find',
    'api::presentation.presentation.findOne',
    'api::presentation.presentation.create',
    'api::presentation.presentation.delete',
    'plugin::upload.content-api.upload',
    'plugin::upload.content-api.destroy'
  ];

  for (const action of actions) {
    const existing = await strapi.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        role: publicRole.id
      }
    });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id
        }
      });
      strapi.log.info(`Granted public permission: ${action}`);
    }
  }
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap(args) {
    await bootstrapSeed();
    await ensurePresentationPublicPermissions(args);
  }
};
