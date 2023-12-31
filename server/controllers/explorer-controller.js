"use strict";

module.exports = ({ strapi }) => ({
  getContentTypes(ctx) {
    const data = strapi
      .plugin("content-type-explorer")
      .service("explorerService")
      .getContentTypes();

    let neededData = Object.keys(data).map((key) => ({
      name: key,
      attributes: data[key]["attributes"],
      info: data[key]["info"],
      // kind: data[key]["kind"],
      key: data[key]["uid"],
    }));

    ctx.body = neededData;
  },
});
