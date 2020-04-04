const { dest, watch, src } = require("gulp");
const yaml = require("gulp-yaml");

function toJSON(callback) {
  src("./syntaxes/src/rexx.tmLanguage.yml")
    .pipe(yaml({ space: 2 }))
    .pipe(dest("./syntaxes/out/"));
  callback(null);
}

exports.default = () => {
  watch("./syntaxes/src/rexx.tmLanguage.yml", toJSON);
};
