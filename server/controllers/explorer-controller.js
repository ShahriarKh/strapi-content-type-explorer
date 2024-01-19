"use strict";

module.exports = ({ strapi }) => ({
  async getTypes(ctx) {
    const contentTypes = await strapi
      .service("plugin::strapi-content-type-explorer.explorerService")
      .getContentTypes();

    ctx.body = contentTypes;
  },
});
