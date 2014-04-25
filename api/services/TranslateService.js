var config = { };

// prod/heroku
if (process.env.GOOGLE_SERVER_KEY) {
  config.key = process.env.GOOGLE_SERVER_KEY;
}

// local dev
else {
  local_config = require('../../config/local');
  config = local_config["google_translate"];
}

googleTranslate = require("google-translate")(config.key);

exports.translate = function(text, langMap, cb) {
  if (langMap.source != undefined) {
    googleTranslate.translate(text, langMap.source, langMap.target, cb);
  }
  else
  {
    googleTranslate.translate(text, langMap.target, cb);
  }
};

exports.detectLanguage = function(text, cb) {
  googleTranslate.translate(text, cb);
};
