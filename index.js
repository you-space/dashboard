const path = require("path");
const fs = require("fs");

async function fileExists(filename) {
    return fs.promises
        .stat(filename)
        .then(() => true)
        .catch(() => false);
}

function createDashboard(basePath = "") {
    async function getFile(name) {
        const filename = path.join(__dirname, "dist", name);

        const exists = await fileExists(filename);

        if (!exists) {
            return null;
        }

        const text = await fs.promises.readFile(filename, "utf8");

        return text.replace(/\{\{app-base-url\}\}/g, basePath);
    }

    async function render({ request, response }) {
        const url = path.resolve(request.url().replace(basePath, ""));

        if (url === "/") {
            response.type("html");
            return getFile("index.html");
        }

        const content = await getFile(url);

        response.type(path.extname(url));

        return content;
    }

    return {
        render,
        getFile,
    };
}

exports.createDashboard = createDashboard;
