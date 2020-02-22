"use strict";

import Vue from 'vue';
import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

const _config = process.env;

Plugin.install = function(Vue) {  
  window.config = _config;
  Object.defineProperties(Vue.prototype, {
    $config: {
      get() {
        return _config;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;