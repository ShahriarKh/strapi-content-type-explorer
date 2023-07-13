module.exports = [
  {
    method: "GET",
    path: "/get-content-types",
    handler: "explorerController.getContentTypes",
    config: {
      policies: [],
    },
  },
];
