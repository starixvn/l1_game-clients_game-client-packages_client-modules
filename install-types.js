const fs = require("fs");
const path = require("path");
const destinationPath = path.join(__dirname, "../../@types/client-modules");
const sourcePath = path.join(__dirname, "types/index.d.ts");
const needToCreateTypesProject = __dirname.endsWith(path.join("node_modules/@nex3/client-modules"));
const packageJson = require("./package.json");
const typePackageJson = {
  name: "@types/client-modules",
  version: packageJson.version,
  description: `Typescript definitions for ${packageJson.name}`,
  license: packageJson.license,
  types: "index.d.ts",
  exports: {
    ".": {
      types: "./index.d.ts",
    },
    "./package.json": "./package.json",
  },
};

if (needToCreateTypesProject) {
  fs.mkdirSync(destinationPath, { recursive: true });
  fs.writeFileSync(
    path.join(destinationPath, "package.json"),
    JSON.stringify(typePackageJson, null, 2)
  );
  fs.copyFileSync(sourcePath, path.join(destinationPath, "index.d.ts"));
}
