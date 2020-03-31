const { dest, src } = require("gulp");
const { toJSON } = require("./syntaxes/scripts/toJSON");

exports.default = (callback) => {
  src("./syntaxes/src/rexx.tmLanguage.simple.yml")
    // .pipe(toJSON())

    .pipe(dest("./syntaxes/out/"));
  callback();
};
