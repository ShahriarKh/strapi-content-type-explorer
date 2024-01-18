# 🗺 Content-Type Explorer

Content-Type Explorer is a Strapi plugin that visualizes your content types and their relationships like an ERD (Entity Relationship Diagram).

![image](https://github.com/ShahriarKh/strapi-content-type-explorer/assets/31452340/0cac9494-5dc3-43ad-a1b2-d46a1c3ea26c)

![image](https://github.com/ShahriarKh/strapi-content-type-explorer/assets/31452340/5f7abe98-f626-4838-a1fb-5f6e72e6ec15)

# Usage

## ⌨️ Installation

```bash
npm i strapi-content-type-explorer
```

## ⚙️ Options

- Field Data Types
- Field Icons
- Default Fields: toggle `createdBy`, `createdAt`, `updatedBy`, `updatedAt`
- Relational Fields Only
- `admin::` Types
- `plugin::` Types
- Edges
- Snap to Grid
- Background Pattern
- Edge Type

> [!TIP]
> If you encounter lags while dragging boxes, try changing edge types. "Smart" edges cause performance issues (this should be fixed in future releases)

# 🛠️ Development

## 🏗️ Setup

1. Create a new strapi project
2. Clone the plugin repo inside `src/plugins/` folder:

```
├── 📁 config
│   └── plugins.js (👈️ create this)
└── 📁 plugins
    └── 📁 strapi-content-type-explorer (👈️ clone here)
```

```bash
cd src/plugins
git clone https://github.com/ShahriarKh/strapi-content-type-explorer.git
```

3. Create `config/plugins.js` if it doesn't exist and add this:

```js
module.exports = {
  "strapi-content-type-explorer": {
    enabled: true,
    resolve: "./src/plugins/strapi-content-type-explorer",
  },
};
```

4. Go to `plugins/strapi-content-type-explorer` and install dependencies:

```bash
cd src/plugins/strapi-content-type-explorer
npm i
```

5. Run strapi and start developing!

```bash
npm run strapi develop -- --watch-admin
```

## 🚀 Collaboration

Have a question or found a bug? Feel free to [open an issue](https://github.com/ShahriarKh/strapi-content-type-explorer/issues). Wanna contribute and improve the plugin? PRs are welcome!

# Links

- Strapi Marketplace: https://market.strapi.io/plugins/strapi-content-type-explorer
- npm: https://www.npmjs.com/package/strapi-content-type-explorer
- GitHub: https://github.com/ShahriarKh/strapi-content-type-explorer
