import { request } from "@strapi/helper-plugin";

const explorerRequests = {
  getContentTypes: async () => {
    return await request("/content-type-explorer/get-content-types", {
      method: "GET",
    });
  },
};

export default explorerRequests;
