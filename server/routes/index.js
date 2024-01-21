module.exports = {
  "pass-data": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/get-types",
        handler: "explorerController.getTypes",
        config: {
          policies: [],
          // auth: false,
        },
      },
    ],
  },
};
