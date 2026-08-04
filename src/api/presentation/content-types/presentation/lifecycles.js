'use strict';

/**
 * When a presentation is deleted (Admin or API), also remove the linked HTML
 * file from the Media Library / storage provider.
 */

async function collectFileIds(where) {
  if (!where || Object.keys(where).length === 0) {
    return [];
  }

  const entries = await strapi.db.query('api::presentation.presentation').findMany({
    where,
    populate: { file: true }
  });

  return entries
    .map((entry) => entry.file?.id)
    .filter((id) => id != null);
}

async function deleteFilesByIds(fileIds = []) {
  const uniqueIds = [...new Set(fileIds)];
  const uploadService = strapi.plugin('upload').service('upload');

  for (const id of uniqueIds) {
    try {
      const file = await strapi.db.query('plugin::upload.file').findOne({
        where: { id }
      });

      if (!file) {
        continue;
      }

      await uploadService.remove(file);
      strapi.log.info(`[presentation] Deleted media file id=${id} name=${file.name}`);
    } catch (error) {
      strapi.log.error(`[presentation] Failed to delete media file id=${id}`, error);
    }
  }
}

module.exports = {
  async beforeDelete(event) {
    event.state = event.state || {};
    event.state.fileIds = await collectFileIds(event.params.where);
  },

  async afterDelete(event) {
    await deleteFilesByIds(event.state?.fileIds);
  },

  async beforeDeleteMany(event) {
    event.state = event.state || {};
    event.state.fileIds = await collectFileIds(event.params.where);
  },

  async afterDeleteMany(event) {
    await deleteFilesByIds(event.state?.fileIds);
  }
};
