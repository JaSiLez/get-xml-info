var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name2, message = "") {
      issueCommand(name2, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify(arr, offset = 0) {
      const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name2, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name2;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.substr(14, 1), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
    var fs = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var uuid_1 = require_dist();
    var utils_1 = require_utils();
    function issueFileCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueFileCommand = issueFileCommand;
    function prepareKeyValueMessage(key, value) {
      const delimiter = `ghadelimiter_${uuid_1.v4()}`;
      const convertedValue = utils_1.toCommandValue(value);
      if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
      }
      if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
      }
      return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
    }
    exports.prepareKeyValueMessage = prepareKeyValueMessage;
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkBypass = exports.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug2("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug2(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug2("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug2("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug2(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug2;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports.debug = debug2;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
    var path = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path.sep);
    }
    exports.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name2, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name2] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("ENV", file_command_1.prepareKeyValueMessage(name2, val));
      }
      command_1.issueCommand("set-env", { name: name2 }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueFileCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput(name2, options) {
      const val = process.env[`INPUT_${name2.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name2}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function getMultilineInput(name2, options) {
      const inputs = getInput(name2, options).split("\n").filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name2, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name2, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name2}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name2, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("OUTPUT", file_command_1.prepareKeyValueMessage(name2, value));
      }
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name: name2 }, utils_1.toCommandValue(value));
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug2(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug2;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info;
    function startGroup(name2) {
      command_1.issue("group", name2);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name2, fn2) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name2);
        let result;
        try {
          result = yield fn2();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name2, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("STATE", file_command_1.prepareKeyValueMessage(name2, value));
      }
      command_1.issueCommand("save-state", { name: name2 }, utils_1.toCommandValue(value));
    }
    exports.saveState = saveState;
    function getState(name2) {
      return process.env[`STATE_${name2}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/xpath/xpath.js
var require_xpath = __commonJS({
  "node_modules/xpath/xpath.js"(exports) {
    var xpath = typeof exports === "undefined" ? {} : exports;
    (function(exports2) {
      "use strict";
      function curry(func) {
        var slice = Array.prototype.slice, totalargs = func.length, partial = function(args, fn3) {
          return function() {
            return fn3.apply(this, args.concat(slice.call(arguments)));
          };
        }, fn2 = function() {
          var args = slice.call(arguments);
          return args.length < totalargs ? partial(args, fn2) : func.apply(this, slice.apply(arguments, [0, totalargs]));
        };
        return fn2;
      }
      var forEach = function(f, xs) {
        for (var i = 0; i < xs.length; i += 1) {
          f(xs[i], i, xs);
        }
      };
      var reduce = function(f, seed, xs) {
        var acc = seed;
        forEach(function(x, i) {
          acc = f(acc, x, i);
        }, xs);
        return acc;
      };
      var map = function(f, xs) {
        var mapped = new Array(xs.length);
        forEach(function(x, i) {
          mapped[i] = f(x);
        }, xs);
        return mapped;
      };
      var filter = function(f, xs) {
        var filtered = [];
        forEach(function(x, i) {
          if (f(x, i)) {
            filtered.push(x);
          }
        }, xs);
        return filtered;
      };
      var includes = function(values, value) {
        for (var i = 0; i < values.length; i += 1) {
          if (values[i] === value) {
            return true;
          }
        }
        return false;
      };
      function always(value) {
        return function() {
          return value;
        };
      }
      function toString(x) {
        return x.toString();
      }
      var join = function(s, xs) {
        return xs.join(s);
      };
      var wrap = function(pref, suf, str) {
        return pref + str + suf;
      };
      var prototypeConcat = Array.prototype.concat;
      var MAX_ARGUMENT_LENGTH = 32767;
      function flatten(arr) {
        var result = [];
        for (var start = 0; start < arr.length; start += MAX_ARGUMENT_LENGTH) {
          var chunk = arr.slice(start, start + MAX_ARGUMENT_LENGTH);
          result = prototypeConcat.apply(result, chunk);
        }
        return result;
      }
      function assign(target, varArgs) {
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      }
      XPathParser.prototype = new Object();
      XPathParser.prototype.constructor = XPathParser;
      XPathParser.superclass = Object.prototype;
      function XPathParser() {
        this.init();
      }
      XPathParser.prototype.init = function() {
        this.reduceActions = [];
        this.reduceActions[3] = function(rhs) {
          return new OrOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[5] = function(rhs) {
          return new AndOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[7] = function(rhs) {
          return new EqualsOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[8] = function(rhs) {
          return new NotEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[10] = function(rhs) {
          return new LessThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[11] = function(rhs) {
          return new GreaterThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[12] = function(rhs) {
          return new LessThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[13] = function(rhs) {
          return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[15] = function(rhs) {
          return new PlusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[16] = function(rhs) {
          return new MinusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[18] = function(rhs) {
          return new MultiplyOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[19] = function(rhs) {
          return new DivOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[20] = function(rhs) {
          return new ModOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[22] = function(rhs) {
          return new UnaryMinusOperation(rhs[1]);
        };
        this.reduceActions[24] = function(rhs) {
          return new BarOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[25] = function(rhs) {
          return new PathExpr(void 0, void 0, rhs[0]);
        };
        this.reduceActions[27] = function(rhs) {
          rhs[0].locationPath = rhs[2];
          return rhs[0];
        };
        this.reduceActions[28] = function(rhs) {
          rhs[0].locationPath = rhs[2];
          rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          return rhs[0];
        };
        this.reduceActions[29] = function(rhs) {
          return new PathExpr(rhs[0], [], void 0);
        };
        this.reduceActions[30] = function(rhs) {
          if (Utilities.instance_of(rhs[0], PathExpr)) {
            if (rhs[0].filterPredicates == void 0) {
              rhs[0].filterPredicates = [];
            }
            rhs[0].filterPredicates.push(rhs[1]);
            return rhs[0];
          } else {
            return new PathExpr(rhs[0], [rhs[1]], void 0);
          }
        };
        this.reduceActions[32] = function(rhs) {
          return rhs[1];
        };
        this.reduceActions[33] = function(rhs) {
          return new XString(rhs[0]);
        };
        this.reduceActions[34] = function(rhs) {
          return new XNumber(rhs[0]);
        };
        this.reduceActions[36] = function(rhs) {
          return new FunctionCall(rhs[0], []);
        };
        this.reduceActions[37] = function(rhs) {
          return new FunctionCall(rhs[0], rhs[2]);
        };
        this.reduceActions[38] = function(rhs) {
          return [rhs[0]];
        };
        this.reduceActions[39] = function(rhs) {
          rhs[2].unshift(rhs[0]);
          return rhs[2];
        };
        this.reduceActions[43] = function(rhs) {
          return new LocationPath(true, []);
        };
        this.reduceActions[44] = function(rhs) {
          rhs[1].absolute = true;
          return rhs[1];
        };
        this.reduceActions[46] = function(rhs) {
          return new LocationPath(false, [rhs[0]]);
        };
        this.reduceActions[47] = function(rhs) {
          rhs[0].steps.push(rhs[2]);
          return rhs[0];
        };
        this.reduceActions[49] = function(rhs) {
          return new Step(rhs[0], rhs[1], []);
        };
        this.reduceActions[50] = function(rhs) {
          return new Step(Step.CHILD, rhs[0], []);
        };
        this.reduceActions[51] = function(rhs) {
          return new Step(rhs[0], rhs[1], rhs[2]);
        };
        this.reduceActions[52] = function(rhs) {
          return new Step(Step.CHILD, rhs[0], rhs[1]);
        };
        this.reduceActions[54] = function(rhs) {
          return [rhs[0]];
        };
        this.reduceActions[55] = function(rhs) {
          rhs[1].unshift(rhs[0]);
          return rhs[1];
        };
        this.reduceActions[56] = function(rhs) {
          if (rhs[0] == "ancestor") {
            return Step.ANCESTOR;
          } else if (rhs[0] == "ancestor-or-self") {
            return Step.ANCESTORORSELF;
          } else if (rhs[0] == "attribute") {
            return Step.ATTRIBUTE;
          } else if (rhs[0] == "child") {
            return Step.CHILD;
          } else if (rhs[0] == "descendant") {
            return Step.DESCENDANT;
          } else if (rhs[0] == "descendant-or-self") {
            return Step.DESCENDANTORSELF;
          } else if (rhs[0] == "following") {
            return Step.FOLLOWING;
          } else if (rhs[0] == "following-sibling") {
            return Step.FOLLOWINGSIBLING;
          } else if (rhs[0] == "namespace") {
            return Step.NAMESPACE;
          } else if (rhs[0] == "parent") {
            return Step.PARENT;
          } else if (rhs[0] == "preceding") {
            return Step.PRECEDING;
          } else if (rhs[0] == "preceding-sibling") {
            return Step.PRECEDINGSIBLING;
          } else if (rhs[0] == "self") {
            return Step.SELF;
          }
          return -1;
        };
        this.reduceActions[57] = function(rhs) {
          return Step.ATTRIBUTE;
        };
        this.reduceActions[59] = function(rhs) {
          if (rhs[0] == "comment") {
            return NodeTest.commentTest;
          } else if (rhs[0] == "text") {
            return NodeTest.textTest;
          } else if (rhs[0] == "processing-instruction") {
            return NodeTest.anyPiTest;
          } else if (rhs[0] == "node") {
            return NodeTest.nodeTest;
          }
          return new NodeTest(-1, void 0);
        };
        this.reduceActions[60] = function(rhs) {
          return new NodeTest.PITest(rhs[2]);
        };
        this.reduceActions[61] = function(rhs) {
          return rhs[1];
        };
        this.reduceActions[63] = function(rhs) {
          rhs[1].absolute = true;
          rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          return rhs[1];
        };
        this.reduceActions[64] = function(rhs) {
          rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          rhs[0].steps.push(rhs[2]);
          return rhs[0];
        };
        this.reduceActions[65] = function(rhs) {
          return new Step(Step.SELF, NodeTest.nodeTest, []);
        };
        this.reduceActions[66] = function(rhs) {
          return new Step(Step.PARENT, NodeTest.nodeTest, []);
        };
        this.reduceActions[67] = function(rhs) {
          return new VariableReference(rhs[1]);
        };
        this.reduceActions[68] = function(rhs) {
          return NodeTest.nameTestAny;
        };
        this.reduceActions[69] = function(rhs) {
          return new NodeTest.NameTestPrefixAny(rhs[0].split(":")[0]);
        };
        this.reduceActions[70] = function(rhs) {
          return new NodeTest.NameTestQName(rhs[0]);
        };
      };
      XPathParser.actionTable = [
        " s s        sssssssss    s ss  s  ss",
        "                 s                  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                rrrrr               ",
        " s s        sssssssss    s ss  s  ss",
        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
        " s s        sssssssss    s ss  s  ss",
        "                            s       ",
        "                            s       ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "  s                                 ",
        "                            s       ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "a                                   ",
        "r       s                    rr  r  ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrs  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr sr  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                sssss               ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "              s                     ",
        "                             s      ",
        "                rrrrr               ",
        " s s        sssssssss    s sss s  ss",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss      ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             rr     ",
        "                             s      ",
        "                             rs     ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "                                 r  ",
        "                                 s  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s s        sssssssss    s ss  s  ss",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             r      "
      ];
      XPathParser.actionTableNumber = [
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                 J                  ",
        "a  aaaaaaaaa         aaaaaaa aa  a  ",
        "                YYYYY               ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        `K1  KKKKKKKK .  +*)('KKKKKK  KK# K" `,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                            N       ",
        "                            O       ",
        "e  eeeeeeeee         eeeeeee ee ee  ",
        "f  fffffffff         fffffff ff ff  ",
        "d  ddddddddd         ddddddd dd dd  ",
        "B  BBBBBBBBB         BBBBBBB BB BB  ",
        "A  AAAAAAAAA         AAAAAAA AA AA  ",
        "  P                                 ",
        "                            Q       ",
        ` 1           .  +*)('          #  " `,
        "b  bbbbbbbbb         bbbbbbb bb  b  ",
        "                                    ",
        "!       S                    !!  !  ",
        '"      T"                    ""  "  ',
        "$   V  $$            U       $$  $  ",
        "&   &ZY&&            &XW     &&  &  ",
        ")   )))))            )))\\[   ))  )  ",
        ".   ....._^]         .....   ..  .  ",
        "1   11111111         11111   11  1  ",
        "5   55555555         55555`  55  5  ",
        "7   77777777         777777  77  7  ",
        "9   99999999         999999  99  9  ",
        ":  c::::::::         ::::::b :: a:  ",
        "I  fIIIIIIII         IIIIIIe II  I  ",
        "=  =========         ======= == ==  ",
        "?  ?????????         ??????? ?? ??  ",
        "C  CCCCCCCCC         CCCCCCC CC CC  ",
        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
        "M   MMMMMMMM         MMMMMM  MM  M  ",
        "N  NNNNNNNNN         NNNNNNN NN  N  ",
        "P  PPPPPPPPP         PPPPPPP PP  P  ",
        "                +*)('               ",
        "R  RRRRRRRRR         RRRRRRR RR aR  ",
        "U  UUUUUUUUU         UUUUUUU UU  U  ",
        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
        "c  ccccccccc         ccccccc cc cc  ",
        "                             j      ",
        "L  fLLLLLLLL         LLLLLLe LL  L  ",
        "6   66666666         66666   66  6  ",
        "              k                     ",
        "                             l      ",
        "                XXXXX               ",
        ` 1 0        /.-,+*)('    & %$m #  "!`,
        "_  f________         ______e __  _  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('      %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        ">  >>>>>>>>>         >>>>>>> >> >>  ",
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
        "V  VVVVVVVVV         VVVVVVV VV aV  ",
        "T  TTTTTTTTT         TTTTTTT TT  T  ",
        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
        "                             \x87      ",
        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
        "D  DDDDDDDDD         DDDDDDD DD DD  ",
        "                             HH     ",
        "                             \x88      ",
        "                             F\x89     ",
        "#      T#                    ##  #  ",
        "%   V  %%            U       %%  %  ",
        "'   'ZY''            'XW     ''  '  ",
        "(   (ZY((            (XW     ((  (  ",
        "+   +++++            +++\\[   ++  +  ",
        "*   *****            ***\\[   **  *  ",
        "-   -----            ---\\[   --  -  ",
        ",   ,,,,,            ,,,\\[   ,,  ,  ",
        "0   00000_^]         00000   00  0  ",
        "/   /////_^]         /////   //  /  ",
        "2   22222222         22222   22  2  ",
        "3   33333333         33333   33  3  ",
        "4   44444444         44444   44  4  ",
        "8   88888888         888888  88  8  ",
        "                                 ^  ",
        "                                 \x8A  ",
        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
        "<  f<<<<<<<<         <<<<<<e <<  <  ",
        "O  OOOOOOOOO         OOOOOOO OO  O  ",
        "`  `````````         ``````` ``  `  ",
        "S  SSSSSSSSS         SSSSSSS SS  S  ",
        "W  WWWWWWWWW         WWWWWWW WW  W  ",
        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
        "E  EEEEEEEEE         EEEEEEE EE EE  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
        "                             G      "
      ];
      XPathParser.gotoTable = [
        "3456789:;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "L456789:;<=>?@ AB  CDEFGH IJ ",
        "            M        EFGH IJ ",
        "       N;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "            S        EFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "              e              ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                        h  J ",
        "              i          j   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ ABpqCDEFGH IJ ",
        "                             ",
        "  r6789:;<=>?@ AB  CDEFGH IJ ",
        "   s789:;<=>?@ AB  CDEFGH IJ ",
        "    t89:;<=>?@ AB  CDEFGH IJ ",
        "    u89:;<=>?@ AB  CDEFGH IJ ",
        "     v9:;<=>?@ AB  CDEFGH IJ ",
        "     w9:;<=>?@ AB  CDEFGH IJ ",
        "     x9:;<=>?@ AB  CDEFGH IJ ",
        "     y9:;<=>?@ AB  CDEFGH IJ ",
        "      z:;<=>?@ AB  CDEFGH IJ ",
        "      {:;<=>?@ AB  CDEFGH IJ ",
        "       |;<=>?@ AB  CDEFGH IJ ",
        "       };<=>?@ AB  CDEFGH IJ ",
        "       ~;<=>?@ AB  CDEFGH IJ ",
        "         \x7F=>?@ AB  CDEFGH IJ ",
        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
        "            \x82        EFGH IJ ",
        "            \x83        EFGH IJ ",
        "                             ",
        "                     \x84 GH IJ ",
        "                     \x85 GH IJ ",
        "              i          \x86   ",
        "              i          \x87   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ AB\x8CqCDEFGH IJ ",
        "                             ",
        "                             "
      ];
      XPathParser.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18]
      ];
      XPathParser.DOUBLEDOT = 2;
      XPathParser.DOUBLECOLON = 3;
      XPathParser.DOUBLESLASH = 4;
      XPathParser.NOTEQUAL = 5;
      XPathParser.LESSTHANOREQUAL = 6;
      XPathParser.GREATERTHANOREQUAL = 7;
      XPathParser.AND = 8;
      XPathParser.OR = 9;
      XPathParser.MOD = 10;
      XPathParser.DIV = 11;
      XPathParser.MULTIPLYOPERATOR = 12;
      XPathParser.FUNCTIONNAME = 13;
      XPathParser.AXISNAME = 14;
      XPathParser.LITERAL = 15;
      XPathParser.NUMBER = 16;
      XPathParser.ASTERISKNAMETEST = 17;
      XPathParser.QNAME = 18;
      XPathParser.NCNAMECOLONASTERISK = 19;
      XPathParser.NODETYPE = 20;
      XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
      XPathParser.EQUALS = 22;
      XPathParser.LESSTHAN = 23;
      XPathParser.GREATERTHAN = 24;
      XPathParser.PLUS = 25;
      XPathParser.MINUS = 26;
      XPathParser.BAR = 27;
      XPathParser.SLASH = 28;
      XPathParser.LEFTPARENTHESIS = 29;
      XPathParser.RIGHTPARENTHESIS = 30;
      XPathParser.COMMA = 31;
      XPathParser.AT = 32;
      XPathParser.LEFTBRACKET = 33;
      XPathParser.RIGHTBRACKET = 34;
      XPathParser.DOT = 35;
      XPathParser.DOLLAR = 36;
      XPathParser.prototype.tokenize = function(s1) {
        var types = [];
        var values = [];
        var s = s1 + "\0";
        var pos = 0;
        var c = s.charAt(pos++);
        while (1) {
          while (c == " " || c == "	" || c == "\r" || c == "\n") {
            c = s.charAt(pos++);
          }
          if (c == "\0" || pos >= s.length) {
            break;
          }
          if (c == "(") {
            types.push(XPathParser.LEFTPARENTHESIS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ")") {
            types.push(XPathParser.RIGHTPARENTHESIS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "[") {
            types.push(XPathParser.LEFTBRACKET);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "]") {
            types.push(XPathParser.RIGHTBRACKET);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "@") {
            types.push(XPathParser.AT);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ",") {
            types.push(XPathParser.COMMA);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "|") {
            types.push(XPathParser.BAR);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "+") {
            types.push(XPathParser.PLUS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "-") {
            types.push(XPathParser.MINUS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "=") {
            types.push(XPathParser.EQUALS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "$") {
            types.push(XPathParser.DOLLAR);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ".") {
            c = s.charAt(pos++);
            if (c == ".") {
              types.push(XPathParser.DOUBLEDOT);
              values.push("..");
              c = s.charAt(pos++);
              continue;
            }
            if (c >= "0" && c <= "9") {
              var number = "." + c;
              c = s.charAt(pos++);
              while (c >= "0" && c <= "9") {
                number += c;
                c = s.charAt(pos++);
              }
              types.push(XPathParser.NUMBER);
              values.push(number);
              continue;
            }
            types.push(XPathParser.DOT);
            values.push(".");
            continue;
          }
          if (c == "'" || c == '"') {
            var delimiter = c;
            var literal = "";
            while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
              literal += c;
              pos += 1;
            }
            if (c !== delimiter) {
              throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
            }
            pos += 1;
            types.push(XPathParser.LITERAL);
            values.push(literal);
            c = s.charAt(pos++);
            continue;
          }
          if (c >= "0" && c <= "9") {
            var number = c;
            c = s.charAt(pos++);
            while (c >= "0" && c <= "9") {
              number += c;
              c = s.charAt(pos++);
            }
            if (c == ".") {
              if (s.charAt(pos) >= "0" && s.charAt(pos) <= "9") {
                number += c;
                number += s.charAt(pos++);
                c = s.charAt(pos++);
                while (c >= "0" && c <= "9") {
                  number += c;
                  c = s.charAt(pos++);
                }
              }
            }
            types.push(XPathParser.NUMBER);
            values.push(number);
            continue;
          }
          if (c == "*") {
            if (types.length > 0) {
              var last = types[types.length - 1];
              if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                types.push(XPathParser.MULTIPLYOPERATOR);
                values.push(c);
                c = s.charAt(pos++);
                continue;
              }
            }
            types.push(XPathParser.ASTERISKNAMETEST);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ":") {
            if (s.charAt(pos) == ":") {
              types.push(XPathParser.DOUBLECOLON);
              values.push("::");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
          }
          if (c == "/") {
            c = s.charAt(pos++);
            if (c == "/") {
              types.push(XPathParser.DOUBLESLASH);
              values.push("//");
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.SLASH);
            values.push("/");
            continue;
          }
          if (c == "!") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.NOTEQUAL);
              values.push("!=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
          }
          if (c == "<") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.LESSTHANOREQUAL);
              values.push("<=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.LESSTHAN);
            values.push("<");
            c = s.charAt(pos++);
            continue;
          }
          if (c == ">") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.GREATERTHANOREQUAL);
              values.push(">=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.GREATERTHAN);
            values.push(">");
            c = s.charAt(pos++);
            continue;
          }
          if (c == "_" || Utilities.isLetter(c.charCodeAt(0))) {
            var name2 = c;
            c = s.charAt(pos++);
            while (Utilities.isNCNameChar(c.charCodeAt(0))) {
              name2 += c;
              c = s.charAt(pos++);
            }
            if (types.length > 0) {
              var last = types[types.length - 1];
              if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                if (name2 == "and") {
                  types.push(XPathParser.AND);
                  values.push(name2);
                  continue;
                }
                if (name2 == "or") {
                  types.push(XPathParser.OR);
                  values.push(name2);
                  continue;
                }
                if (name2 == "mod") {
                  types.push(XPathParser.MOD);
                  values.push(name2);
                  continue;
                }
                if (name2 == "div") {
                  types.push(XPathParser.DIV);
                  values.push(name2);
                  continue;
                }
              }
            }
            if (c == ":") {
              if (s.charAt(pos) == "*") {
                types.push(XPathParser.NCNAMECOLONASTERISK);
                values.push(name2 + ":*");
                pos++;
                c = s.charAt(pos++);
                continue;
              }
              if (s.charAt(pos) == "_" || Utilities.isLetter(s.charCodeAt(pos))) {
                name2 += ":";
                c = s.charAt(pos++);
                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                  name2 += c;
                  c = s.charAt(pos++);
                }
                if (c == "(") {
                  types.push(XPathParser.FUNCTIONNAME);
                  values.push(name2);
                  continue;
                }
                types.push(XPathParser.QNAME);
                values.push(name2);
                continue;
              }
              if (s.charAt(pos) == ":") {
                types.push(XPathParser.AXISNAME);
                values.push(name2);
                continue;
              }
            }
            if (c == "(") {
              if (name2 == "comment" || name2 == "text" || name2 == "node") {
                types.push(XPathParser.NODETYPE);
                values.push(name2);
                continue;
              }
              if (name2 == "processing-instruction") {
                if (s.charAt(pos) == ")") {
                  types.push(XPathParser.NODETYPE);
                } else {
                  types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
                }
                values.push(name2);
                continue;
              }
              types.push(XPathParser.FUNCTIONNAME);
              values.push(name2);
              continue;
            }
            types.push(XPathParser.QNAME);
            values.push(name2);
            continue;
          }
          throw new Error("Unexpected character " + c);
        }
        types.push(1);
        values.push("[EOF]");
        return [types, values];
      };
      XPathParser.SHIFT = "s";
      XPathParser.REDUCE = "r";
      XPathParser.ACCEPT = "a";
      XPathParser.prototype.parse = function(s) {
        var types;
        var values;
        var res = this.tokenize(s);
        if (res == void 0) {
          return void 0;
        }
        types = res[0];
        values = res[1];
        var tokenPos = 0;
        var state = [];
        var tokenType = [];
        var tokenValue = [];
        var s;
        var a;
        var t;
        state.push(0);
        tokenType.push(1);
        tokenValue.push("_S");
        a = types[tokenPos];
        t = values[tokenPos++];
        while (1) {
          s = state[state.length - 1];
          switch (XPathParser.actionTable[s].charAt(a - 1)) {
            case XPathParser.SHIFT:
              tokenType.push(-a);
              tokenValue.push(t);
              state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
              a = types[tokenPos];
              t = values[tokenPos++];
              break;
            case XPathParser.REDUCE:
              var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
              var rhs = [];
              for (var i = 0; i < num; i++) {
                tokenType.pop();
                rhs.unshift(tokenValue.pop());
                state.pop();
              }
              var s_ = state[state.length - 1];
              tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
              if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == void 0) {
                tokenValue.push(rhs[0]);
              } else {
                tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
              }
              state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
              break;
            case XPathParser.ACCEPT:
              return new XPath(tokenValue.pop());
            default:
              throw new Error("XPath parse error");
          }
        }
      };
      XPath.prototype = new Object();
      XPath.prototype.constructor = XPath;
      XPath.superclass = Object.prototype;
      function XPath(e) {
        this.expression = e;
      }
      XPath.prototype.toString = function() {
        return this.expression.toString();
      };
      function setIfUnset(obj, prop, value) {
        if (!(prop in obj)) {
          obj[prop] = value;
        }
      }
      XPath.prototype.evaluate = function(c) {
        c.contextNode = c.expressionContextNode;
        c.contextSize = 1;
        c.contextPosition = 1;
        if (c.isHtml) {
          setIfUnset(c, "caseInsensitive", true);
          setIfUnset(c, "allowAnyNamespaceForNoPrefix", true);
        }
        setIfUnset(c, "caseInsensitive", false);
        return this.expression.evaluate(c);
      };
      XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
      XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
      Expression.prototype = new Object();
      Expression.prototype.constructor = Expression;
      Expression.superclass = Object.prototype;
      function Expression() {
      }
      Expression.prototype.init = function() {
      };
      Expression.prototype.toString = function() {
        return "<Expression>";
      };
      Expression.prototype.evaluate = function(c) {
        throw new Error("Could not evaluate expression.");
      };
      UnaryOperation.prototype = new Expression();
      UnaryOperation.prototype.constructor = UnaryOperation;
      UnaryOperation.superclass = Expression.prototype;
      function UnaryOperation(rhs) {
        if (arguments.length > 0) {
          this.init(rhs);
        }
      }
      UnaryOperation.prototype.init = function(rhs) {
        this.rhs = rhs;
      };
      UnaryMinusOperation.prototype = new UnaryOperation();
      UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
      UnaryMinusOperation.superclass = UnaryOperation.prototype;
      function UnaryMinusOperation(rhs) {
        if (arguments.length > 0) {
          this.init(rhs);
        }
      }
      UnaryMinusOperation.prototype.init = function(rhs) {
        UnaryMinusOperation.superclass.init.call(this, rhs);
      };
      UnaryMinusOperation.prototype.evaluate = function(c) {
        return this.rhs.evaluate(c).number().negate();
      };
      UnaryMinusOperation.prototype.toString = function() {
        return "-" + this.rhs.toString();
      };
      BinaryOperation.prototype = new Expression();
      BinaryOperation.prototype.constructor = BinaryOperation;
      BinaryOperation.superclass = Expression.prototype;
      function BinaryOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      BinaryOperation.prototype.init = function(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
      };
      OrOperation.prototype = new BinaryOperation();
      OrOperation.prototype.constructor = OrOperation;
      OrOperation.superclass = BinaryOperation.prototype;
      function OrOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      OrOperation.prototype.init = function(lhs, rhs) {
        OrOperation.superclass.init.call(this, lhs, rhs);
      };
      OrOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
      };
      OrOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (b.booleanValue()) {
          return b;
        }
        return this.rhs.evaluate(c).bool();
      };
      AndOperation.prototype = new BinaryOperation();
      AndOperation.prototype.constructor = AndOperation;
      AndOperation.superclass = BinaryOperation.prototype;
      function AndOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      AndOperation.prototype.init = function(lhs, rhs) {
        AndOperation.superclass.init.call(this, lhs, rhs);
      };
      AndOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
      };
      AndOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (!b.booleanValue()) {
          return b;
        }
        return this.rhs.evaluate(c).bool();
      };
      EqualsOperation.prototype = new BinaryOperation();
      EqualsOperation.prototype.constructor = EqualsOperation;
      EqualsOperation.superclass = BinaryOperation.prototype;
      function EqualsOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      EqualsOperation.prototype.init = function(lhs, rhs) {
        EqualsOperation.superclass.init.call(this, lhs, rhs);
      };
      EqualsOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
      };
      EqualsOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
      };
      NotEqualOperation.prototype = new BinaryOperation();
      NotEqualOperation.prototype.constructor = NotEqualOperation;
      NotEqualOperation.superclass = BinaryOperation.prototype;
      function NotEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      NotEqualOperation.prototype.init = function(lhs, rhs) {
        NotEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      NotEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
      };
      NotEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
      };
      LessThanOperation.prototype = new BinaryOperation();
      LessThanOperation.prototype.constructor = LessThanOperation;
      LessThanOperation.superclass = BinaryOperation.prototype;
      function LessThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      LessThanOperation.prototype.init = function(lhs, rhs) {
        LessThanOperation.superclass.init.call(this, lhs, rhs);
      };
      LessThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
      };
      LessThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
      };
      GreaterThanOperation.prototype = new BinaryOperation();
      GreaterThanOperation.prototype.constructor = GreaterThanOperation;
      GreaterThanOperation.superclass = BinaryOperation.prototype;
      function GreaterThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      GreaterThanOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOperation.superclass.init.call(this, lhs, rhs);
      };
      GreaterThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
      };
      GreaterThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
      };
      LessThanOrEqualOperation.prototype = new BinaryOperation();
      LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
      LessThanOrEqualOperation.superclass = BinaryOperation.prototype;
      function LessThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      LessThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
      };
      LessThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
      };
      GreaterThanOrEqualOperation.prototype = new BinaryOperation();
      GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
      GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;
      function GreaterThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
      };
      GreaterThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
      };
      PlusOperation.prototype = new BinaryOperation();
      PlusOperation.prototype.constructor = PlusOperation;
      PlusOperation.superclass = BinaryOperation.prototype;
      function PlusOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      PlusOperation.prototype.init = function(lhs, rhs) {
        PlusOperation.superclass.init.call(this, lhs, rhs);
      };
      PlusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
      };
      PlusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
      };
      MinusOperation.prototype = new BinaryOperation();
      MinusOperation.prototype.constructor = MinusOperation;
      MinusOperation.superclass = BinaryOperation.prototype;
      function MinusOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      MinusOperation.prototype.init = function(lhs, rhs) {
        MinusOperation.superclass.init.call(this, lhs, rhs);
      };
      MinusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
      };
      MinusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
      };
      MultiplyOperation.prototype = new BinaryOperation();
      MultiplyOperation.prototype.constructor = MultiplyOperation;
      MultiplyOperation.superclass = BinaryOperation.prototype;
      function MultiplyOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      MultiplyOperation.prototype.init = function(lhs, rhs) {
        MultiplyOperation.superclass.init.call(this, lhs, rhs);
      };
      MultiplyOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
      };
      MultiplyOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
      };
      DivOperation.prototype = new BinaryOperation();
      DivOperation.prototype.constructor = DivOperation;
      DivOperation.superclass = BinaryOperation.prototype;
      function DivOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      DivOperation.prototype.init = function(lhs, rhs) {
        DivOperation.superclass.init.call(this, lhs, rhs);
      };
      DivOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
      };
      DivOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
      };
      ModOperation.prototype = new BinaryOperation();
      ModOperation.prototype.constructor = ModOperation;
      ModOperation.superclass = BinaryOperation.prototype;
      function ModOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      ModOperation.prototype.init = function(lhs, rhs) {
        ModOperation.superclass.init.call(this, lhs, rhs);
      };
      ModOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
      };
      ModOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
      };
      BarOperation.prototype = new BinaryOperation();
      BarOperation.prototype.constructor = BarOperation;
      BarOperation.superclass = BinaryOperation.prototype;
      function BarOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      BarOperation.prototype.init = function(lhs, rhs) {
        BarOperation.superclass.init.call(this, lhs, rhs);
      };
      BarOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
      };
      BarOperation.prototype.toString = function() {
        return map(toString, [this.lhs, this.rhs]).join(" | ");
      };
      PathExpr.prototype = new Expression();
      PathExpr.prototype.constructor = PathExpr;
      PathExpr.superclass = Expression.prototype;
      function PathExpr(filter2, filterPreds, locpath) {
        if (arguments.length > 0) {
          this.init(filter2, filterPreds, locpath);
        }
      }
      PathExpr.prototype.init = function(filter2, filterPreds, locpath) {
        PathExpr.superclass.init.call(this);
        this.filter = filter2;
        this.filterPredicates = filterPreds;
        this.locationPath = locpath;
      };
      function findRoot(node) {
        while (node && node.parentNode) {
          node = node.parentNode;
        }
        return node;
      }
      PathExpr.applyPredicates = function(predicates, c, nodes) {
        if (predicates.length === 0) {
          return nodes;
        }
        var ctx = c.extend({});
        return reduce(
          function(inNodes, pred) {
            ctx.contextSize = inNodes.length;
            return filter(
              function(node, i) {
                ctx.contextNode = node;
                ctx.contextPosition = i + 1;
                return PathExpr.predicateMatches(pred, ctx);
              },
              inNodes
            );
          },
          nodes,
          predicates
        );
      };
      PathExpr.getRoot = function(xpc, nodes) {
        var firstNode = nodes[0];
        if (firstNode.nodeType === 9) {
          return firstNode;
        }
        if (xpc.virtualRoot) {
          return xpc.virtualRoot;
        }
        var ownerDoc = firstNode.ownerDocument;
        if (ownerDoc) {
          return ownerDoc;
        }
        var n = firstNode;
        while (n.parentNode != null) {
          n = n.parentNode;
        }
        return n;
      };
      PathExpr.applyStep = function(step, xpc, node) {
        var self = this;
        var newNodes = [];
        xpc.contextNode = node;
        switch (step.axis) {
          case Step.ANCESTOR:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            var m;
            if (xpc.contextNode.nodeType == 2) {
              m = PathExpr.getOwnerElement(xpc.contextNode);
            } else {
              m = xpc.contextNode.parentNode;
            }
            while (m != null) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
              if (m === xpc.virtualRoot) {
                break;
              }
              m = m.parentNode;
            }
            break;
          case Step.ANCESTORORSELF:
            for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 ? PathExpr.getOwnerElement(m) : m.parentNode) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
              if (m === xpc.virtualRoot) {
                break;
              }
            }
            break;
          case Step.ATTRIBUTE:
            var nnm = xpc.contextNode.attributes;
            if (nnm != null) {
              for (var k = 0; k < nnm.length; k++) {
                var m = nnm.item(k);
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
              }
            }
            break;
          case Step.CHILD:
            for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.DESCENDANT:
            var st = [xpc.contextNode.firstChild];
            while (st.length > 0) {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            }
            break;
          case Step.DESCENDANTORSELF:
            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
              newNodes.push(xpc.contextNode);
            }
            var st = [xpc.contextNode.firstChild];
            while (st.length > 0) {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            }
            break;
          case Step.FOLLOWING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            var st = [];
            if (xpc.contextNode.firstChild != null) {
              st.unshift(xpc.contextNode.firstChild);
            } else {
              st.unshift(xpc.contextNode.nextSibling);
            }
            for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 && m !== xpc.virtualRoot; m = m.parentNode) {
              st.unshift(m.nextSibling);
            }
            do {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            } while (st.length > 0);
            break;
          case Step.FOLLOWINGSIBLING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.NAMESPACE:
            var n = {};
            if (xpc.contextNode.nodeType == 1) {
              n["xml"] = XPath.XML_NAMESPACE_URI;
              n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
              for (var m = xpc.contextNode; m != null && m.nodeType == 1; m = m.parentNode) {
                for (var k = 0; k < m.attributes.length; k++) {
                  var attr = m.attributes.item(k);
                  var nm = String(attr.name);
                  if (nm == "xmlns") {
                    if (n[""] == void 0) {
                      n[""] = attr.value;
                    }
                  } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
                    var pre = nm.substring(6, nm.length);
                    if (n[pre] == void 0) {
                      n[pre] = attr.value;
                    }
                  }
                }
              }
              for (var pre in n) {
                var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
                if (step.nodeTest.matches(nsn, xpc)) {
                  newNodes.push(nsn);
                }
              }
            }
            break;
          case Step.PARENT:
            m = null;
            if (xpc.contextNode !== xpc.virtualRoot) {
              if (xpc.contextNode.nodeType == 2) {
                m = PathExpr.getOwnerElement(xpc.contextNode);
              } else {
                m = xpc.contextNode.parentNode;
              }
            }
            if (m != null && step.nodeTest.matches(m, xpc)) {
              newNodes.push(m);
            }
            break;
          case Step.PRECEDING:
            var st;
            if (xpc.virtualRoot != null) {
              st = [xpc.virtualRoot];
            } else {
              st = [findRoot(xpc.contextNode)];
            }
            outer:
              while (st.length > 0) {
                for (var m = st.pop(); m != null; ) {
                  if (m == xpc.contextNode) {
                    break outer;
                  }
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.unshift(m);
                  }
                  if (m.firstChild != null) {
                    st.push(m.nextSibling);
                    m = m.firstChild;
                  } else {
                    m = m.nextSibling;
                  }
                }
              }
            break;
          case Step.PRECEDINGSIBLING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.SELF:
            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
              newNodes.push(xpc.contextNode);
            }
            break;
          default:
        }
        return newNodes;
      };
      function applyStepWithPredicates(step, xpc, node) {
        return PathExpr.applyPredicates(
          step.predicates,
          xpc,
          PathExpr.applyStep(step, xpc, node)
        );
      }
      function applyStepToNodes(context, nodes, step) {
        return flatten(
          map(
            applyStepWithPredicates.bind(null, step, context),
            nodes
          )
        );
      }
      PathExpr.applySteps = function(steps, xpc, nodes) {
        return reduce(
          applyStepToNodes.bind(null, xpc),
          nodes,
          steps
        );
      };
      PathExpr.prototype.applyFilter = function(c, xpc) {
        if (!this.filter) {
          return { nodes: [c.contextNode] };
        }
        var ns = this.filter.evaluate(c);
        if (!Utilities.instance_of(ns, XNodeSet)) {
          if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
            throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
          }
          return { nonNodes: ns };
        }
        return {
          nodes: PathExpr.applyPredicates(this.filterPredicates || [], xpc, ns.toUnsortedArray())
        };
      };
      PathExpr.applyLocationPath = function(locationPath, xpc, nodes) {
        if (!locationPath) {
          return nodes;
        }
        var startNodes = locationPath.absolute ? [PathExpr.getRoot(xpc, nodes)] : nodes;
        return PathExpr.applySteps(locationPath.steps, xpc, startNodes);
      };
      PathExpr.prototype.evaluate = function(c) {
        var xpc = assign(new XPathContext(), c);
        var filterResult = this.applyFilter(c, xpc);
        if ("nonNodes" in filterResult) {
          return filterResult.nonNodes;
        }
        var ns = new XNodeSet();
        ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
        return ns;
      };
      PathExpr.predicateMatches = function(pred, c) {
        var res = pred.evaluate(c);
        return Utilities.instance_of(res, XNumber) ? c.contextPosition === res.numberValue() : res.booleanValue();
      };
      PathExpr.predicateString = function(predicate) {
        return wrap("[", "]", predicate.toString());
      };
      PathExpr.predicatesString = function(predicates) {
        return join(
          "",
          map(PathExpr.predicateString, predicates)
        );
      };
      PathExpr.prototype.toString = function() {
        if (this.filter != void 0) {
          var filterStr = toString(this.filter);
          if (Utilities.instance_of(this.filter, XString)) {
            return wrap("'", "'", filterStr);
          }
          if (this.filterPredicates != void 0 && this.filterPredicates.length) {
            return wrap("(", ")", filterStr) + PathExpr.predicatesString(this.filterPredicates);
          }
          if (this.locationPath != void 0) {
            return filterStr + (this.locationPath.absolute ? "" : "/") + toString(this.locationPath);
          }
          return filterStr;
        }
        return toString(this.locationPath);
      };
      PathExpr.getOwnerElement = function(n) {
        if (n.ownerElement) {
          return n.ownerElement;
        }
        try {
          if (n.selectSingleNode) {
            return n.selectSingleNode("..");
          }
        } catch (e) {
        }
        var doc = n.nodeType == 9 ? n : n.ownerDocument;
        var elts = doc.getElementsByTagName("*");
        for (var i = 0; i < elts.length; i++) {
          var elt = elts.item(i);
          var nnm = elt.attributes;
          for (var j = 0; j < nnm.length; j++) {
            var an = nnm.item(j);
            if (an === n) {
              return elt;
            }
          }
        }
        return null;
      };
      LocationPath.prototype = new Object();
      LocationPath.prototype.constructor = LocationPath;
      LocationPath.superclass = Object.prototype;
      function LocationPath(abs, steps) {
        if (arguments.length > 0) {
          this.init(abs, steps);
        }
      }
      LocationPath.prototype.init = function(abs, steps) {
        this.absolute = abs;
        this.steps = steps;
      };
      LocationPath.prototype.toString = function() {
        return (this.absolute ? "/" : "") + map(toString, this.steps).join("/");
      };
      Step.prototype = new Object();
      Step.prototype.constructor = Step;
      Step.superclass = Object.prototype;
      function Step(axis, nodetest, preds) {
        if (arguments.length > 0) {
          this.init(axis, nodetest, preds);
        }
      }
      Step.prototype.init = function(axis, nodetest, preds) {
        this.axis = axis;
        this.nodeTest = nodetest;
        this.predicates = preds;
      };
      Step.prototype.toString = function() {
        return Step.STEPNAMES[this.axis] + "::" + this.nodeTest.toString() + PathExpr.predicatesString(this.predicates);
      };
      Step.ANCESTOR = 0;
      Step.ANCESTORORSELF = 1;
      Step.ATTRIBUTE = 2;
      Step.CHILD = 3;
      Step.DESCENDANT = 4;
      Step.DESCENDANTORSELF = 5;
      Step.FOLLOWING = 6;
      Step.FOLLOWINGSIBLING = 7;
      Step.NAMESPACE = 8;
      Step.PARENT = 9;
      Step.PRECEDING = 10;
      Step.PRECEDINGSIBLING = 11;
      Step.SELF = 12;
      Step.STEPNAMES = reduce(function(acc, x) {
        return acc[x[0]] = x[1], acc;
      }, {}, [
        [Step.ANCESTOR, "ancestor"],
        [Step.ANCESTORORSELF, "ancestor-or-self"],
        [Step.ATTRIBUTE, "attribute"],
        [Step.CHILD, "child"],
        [Step.DESCENDANT, "descendant"],
        [Step.DESCENDANTORSELF, "descendant-or-self"],
        [Step.FOLLOWING, "following"],
        [Step.FOLLOWINGSIBLING, "following-sibling"],
        [Step.NAMESPACE, "namespace"],
        [Step.PARENT, "parent"],
        [Step.PRECEDING, "preceding"],
        [Step.PRECEDINGSIBLING, "preceding-sibling"],
        [Step.SELF, "self"]
      ]);
      NodeTest.prototype = new Object();
      NodeTest.prototype.constructor = NodeTest;
      NodeTest.superclass = Object.prototype;
      function NodeTest(type, value) {
        if (arguments.length > 0) {
          this.init(type, value);
        }
      }
      NodeTest.prototype.init = function(type, value) {
        this.type = type;
        this.value = value;
      };
      NodeTest.prototype.toString = function() {
        return "<unknown nodetest type>";
      };
      NodeTest.prototype.matches = function(n, xpc) {
        console.warn("unknown node test type");
      };
      NodeTest.NAMETESTANY = 0;
      NodeTest.NAMETESTPREFIXANY = 1;
      NodeTest.NAMETESTQNAME = 2;
      NodeTest.COMMENT = 3;
      NodeTest.TEXT = 4;
      NodeTest.PI = 5;
      NodeTest.NODE = 6;
      NodeTest.isNodeType = function(types) {
        return function(node) {
          return includes(types, node.nodeType);
        };
      };
      NodeTest.makeNodeTestType = function(type, members, ctor) {
        var newType = ctor || function() {
        };
        newType.prototype = new NodeTest(type);
        newType.prototype.constructor = newType;
        assign(newType.prototype, members);
        return newType;
      };
      NodeTest.makeNodeTypeTest = function(type, nodeTypes, stringVal) {
        return new (NodeTest.makeNodeTestType(type, {
          matches: NodeTest.isNodeType(nodeTypes),
          toString: always(stringVal)
        }))();
      };
      NodeTest.hasPrefix = function(node) {
        return node.prefix || (node.nodeName || node.tagName).indexOf(":") !== -1;
      };
      NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
      NodeTest.nameSpaceMatches = function(prefix, xpc, n) {
        var nNamespace = n.namespaceURI || "";
        if (!prefix) {
          return !nNamespace || xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n);
        }
        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);
        if (ns == null) {
          throw new Error("Cannot resolve QName " + prefix);
        }
        return ns === nNamespace;
      };
      NodeTest.localNameMatches = function(localName, xpc, n) {
        var nLocalName = n.localName || n.nodeName;
        return xpc.caseInsensitive ? localName.toLowerCase() === nLocalName.toLowerCase() : localName === nLocalName;
      };
      NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(
        NodeTest.NAMETESTPREFIXANY,
        {
          matches: function(n, xpc) {
            return NodeTest.isElementOrAttribute(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n);
          },
          toString: function() {
            return this.prefix + ":*";
          }
        },
        function NameTestPrefixAny(prefix) {
          this.prefix = prefix;
        }
      );
      NodeTest.NameTestQName = NodeTest.makeNodeTestType(
        NodeTest.NAMETESTQNAME,
        {
          matches: function(n, xpc) {
            return NodeTest.isNodeType([1, 2, XPathNamespace.XPATH_NAMESPACE_NODE])(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n) && NodeTest.localNameMatches(this.localName, xpc, n);
          },
          toString: function() {
            return this.name;
          }
        },
        function NameTestQName(name2) {
          var nameParts = name2.split(":");
          this.name = name2;
          this.prefix = nameParts.length > 1 ? nameParts[0] : null;
          this.localName = nameParts[nameParts.length > 1 ? 1 : 0];
        }
      );
      NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
        matches: function(n, xpc) {
          return NodeTest.isNodeType([7])(n) && (n.target || n.nodeName) === this.name;
        },
        toString: function() {
          return wrap('processing-instruction("', '")', this.name);
        }
      }, function(name2) {
        this.name = name2;
      });
      NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(NodeTest.NAMETESTANY, [1, 2, XPathNamespace.XPATH_NAMESPACE_NODE], "*");
      NodeTest.textTest = NodeTest.makeNodeTypeTest(NodeTest.TEXT, [3, 4], "text()");
      NodeTest.commentTest = NodeTest.makeNodeTypeTest(NodeTest.COMMENT, [8], "comment()");
      NodeTest.nodeTest = NodeTest.makeNodeTypeTest(NodeTest.NODE, [1, 2, 3, 4, 7, 8, 9], "node()");
      NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(NodeTest.PI, [7], "processing-instruction()");
      VariableReference.prototype = new Expression();
      VariableReference.prototype.constructor = VariableReference;
      VariableReference.superclass = Expression.prototype;
      function VariableReference(v) {
        if (arguments.length > 0) {
          this.init(v);
        }
      }
      VariableReference.prototype.init = function(v) {
        this.variable = v;
      };
      VariableReference.prototype.toString = function() {
        return "$" + this.variable;
      };
      VariableReference.prototype.evaluate = function(c) {
        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);
        if (parts[0] == null) {
          throw new Error("Cannot resolve QName " + fn);
        }
        var result = c.variableResolver.getVariable(parts[1], parts[0]);
        if (!result) {
          throw XPathException.fromMessage("Undeclared variable: " + this.toString());
        }
        return result;
      };
      FunctionCall.prototype = new Expression();
      FunctionCall.prototype.constructor = FunctionCall;
      FunctionCall.superclass = Expression.prototype;
      function FunctionCall(fn2, args) {
        if (arguments.length > 0) {
          this.init(fn2, args);
        }
      }
      FunctionCall.prototype.init = function(fn2, args) {
        this.functionName = fn2;
        this.arguments = args;
      };
      FunctionCall.prototype.toString = function() {
        var s = this.functionName + "(";
        for (var i = 0; i < this.arguments.length; i++) {
          if (i > 0) {
            s += ", ";
          }
          s += this.arguments[i].toString();
        }
        return s + ")";
      };
      FunctionCall.prototype.evaluate = function(c) {
        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);
        if (!f) {
          throw new Error("Unknown function " + this.functionName);
        }
        var a = [c].concat(this.arguments);
        return f.apply(c.functionResolver.thisArg, a);
      };
      var Operators = new Object();
      Operators.equals = function(l, r) {
        return l.equals(r);
      };
      Operators.notequal = function(l, r) {
        return l.notequal(r);
      };
      Operators.lessthan = function(l, r) {
        return l.lessthan(r);
      };
      Operators.greaterthan = function(l, r) {
        return l.greaterthan(r);
      };
      Operators.lessthanorequal = function(l, r) {
        return l.lessthanorequal(r);
      };
      Operators.greaterthanorequal = function(l, r) {
        return l.greaterthanorequal(r);
      };
      XString.prototype = new Expression();
      XString.prototype.constructor = XString;
      XString.superclass = Expression.prototype;
      function XString(s) {
        if (arguments.length > 0) {
          this.init(s);
        }
      }
      XString.prototype.init = function(s) {
        this.str = String(s);
      };
      XString.prototype.toString = function() {
        return this.str;
      };
      XString.prototype.evaluate = function(c) {
        return this;
      };
      XString.prototype.string = function() {
        return this;
      };
      XString.prototype.number = function() {
        return new XNumber(this.str);
      };
      XString.prototype.bool = function() {
        return new XBoolean(this.str);
      };
      XString.prototype.nodeset = function() {
        throw new Error("Cannot convert string to nodeset");
      };
      XString.prototype.stringValue = function() {
        return this.str;
      };
      XString.prototype.numberValue = function() {
        return this.number().numberValue();
      };
      XString.prototype.booleanValue = function() {
        return this.bool().booleanValue();
      };
      XString.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.number().equals(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithString(this, Operators.equals);
        }
        return new XBoolean(this.str == r.str);
      };
      XString.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.number().notequal(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithString(this, Operators.notequal);
        }
        return new XBoolean(this.str != r.str);
      };
      XString.prototype.lessthan = function(r) {
        return this.number().lessthan(r);
      };
      XString.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r);
      };
      XString.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r);
      };
      XString.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r);
      };
      XNumber.prototype = new Expression();
      XNumber.prototype.constructor = XNumber;
      XNumber.superclass = Expression.prototype;
      function XNumber(n) {
        if (arguments.length > 0) {
          this.init(n);
        }
      }
      XNumber.prototype.init = function(n) {
        this.num = typeof n === "string" ? this.parse(n) : Number(n);
      };
      XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;
      XNumber.prototype.parse = function(s) {
        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
      };
      function padSmallNumber(numberStr) {
        var parts = numberStr.split("e-");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        for (var i = 0; i < exponent - 1; i += 1) {
          base = "0" + base;
        }
        return "0." + base;
      }
      function padLargeNumber(numberStr) {
        var parts = numberStr.split("e");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        var zerosToAppend = exponent + 1 - base.length;
        for (var i = 0; i < zerosToAppend; i += 1) {
          base += "0";
        }
        return base;
      }
      XNumber.prototype.toString = function() {
        var strValue = this.num.toString();
        if (strValue.indexOf("e-") !== -1) {
          return padSmallNumber(strValue);
        }
        if (strValue.indexOf("e") !== -1) {
          return padLargeNumber(strValue);
        }
        return strValue;
      };
      XNumber.prototype.evaluate = function(c) {
        return this;
      };
      XNumber.prototype.string = function() {
        return new XString(this.toString());
      };
      XNumber.prototype.number = function() {
        return this;
      };
      XNumber.prototype.bool = function() {
        return new XBoolean(this.num);
      };
      XNumber.prototype.nodeset = function() {
        throw new Error("Cannot convert number to nodeset");
      };
      XNumber.prototype.stringValue = function() {
        return this.string().stringValue();
      };
      XNumber.prototype.numberValue = function() {
        return this.num;
      };
      XNumber.prototype.booleanValue = function() {
        return this.bool().booleanValue();
      };
      XNumber.prototype.negate = function() {
        return new XNumber(-this.num);
      };
      XNumber.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XString)) {
          return this.equals(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.equals);
        }
        return new XBoolean(this.num == r.num);
      };
      XNumber.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XString)) {
          return this.notequal(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.notequal);
        }
        return new XBoolean(this.num != r.num);
      };
      XNumber.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.greaterthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.lessthan(r.number());
        }
        return new XBoolean(this.num < r.num);
      };
      XNumber.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.lessthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.greaterthan(r.number());
        }
        return new XBoolean(this.num > r.num);
      };
      XNumber.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.greaterthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.lessthanorequal(r.number());
        }
        return new XBoolean(this.num <= r.num);
      };
      XNumber.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.lessthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.greaterthanorequal(r.number());
        }
        return new XBoolean(this.num >= r.num);
      };
      XNumber.prototype.plus = function(r) {
        return new XNumber(this.num + r.num);
      };
      XNumber.prototype.minus = function(r) {
        return new XNumber(this.num - r.num);
      };
      XNumber.prototype.multiply = function(r) {
        return new XNumber(this.num * r.num);
      };
      XNumber.prototype.div = function(r) {
        return new XNumber(this.num / r.num);
      };
      XNumber.prototype.mod = function(r) {
        return new XNumber(this.num % r.num);
      };
      XBoolean.prototype = new Expression();
      XBoolean.prototype.constructor = XBoolean;
      XBoolean.superclass = Expression.prototype;
      function XBoolean(b) {
        if (arguments.length > 0) {
          this.init(b);
        }
      }
      XBoolean.prototype.init = function(b) {
        this.b = Boolean(b);
      };
      XBoolean.prototype.toString = function() {
        return this.b.toString();
      };
      XBoolean.prototype.evaluate = function(c) {
        return this;
      };
      XBoolean.prototype.string = function() {
        return new XString(this.b);
      };
      XBoolean.prototype.number = function() {
        return new XNumber(this.b);
      };
      XBoolean.prototype.bool = function() {
        return this;
      };
      XBoolean.prototype.nodeset = function() {
        throw new Error("Cannot convert boolean to nodeset");
      };
      XBoolean.prototype.stringValue = function() {
        return this.string().stringValue();
      };
      XBoolean.prototype.numberValue = function() {
        return this.number().numberValue();
      };
      XBoolean.prototype.booleanValue = function() {
        return this.b;
      };
      XBoolean.prototype.not = function() {
        return new XBoolean(!this.b);
      };
      XBoolean.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
          return this.equals(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithBoolean(this, Operators.equals);
        }
        return new XBoolean(this.b == r.b);
      };
      XBoolean.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
          return this.notequal(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithBoolean(this, Operators.notequal);
        }
        return new XBoolean(this.b != r.b);
      };
      XBoolean.prototype.lessthan = function(r) {
        return this.number().lessthan(r);
      };
      XBoolean.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r);
      };
      XBoolean.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r);
      };
      XBoolean.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r);
      };
      XBoolean.true_ = new XBoolean(true);
      XBoolean.false_ = new XBoolean(false);
      AVLTree.prototype = new Object();
      AVLTree.prototype.constructor = AVLTree;
      AVLTree.superclass = Object.prototype;
      function AVLTree(n) {
        this.init(n);
      }
      AVLTree.prototype.init = function(n) {
        this.left = null;
        this.right = null;
        this.node = n;
        this.depth = 1;
      };
      AVLTree.prototype.balance = function() {
        var ldepth = this.left == null ? 0 : this.left.depth;
        var rdepth = this.right == null ? 0 : this.right.depth;
        if (ldepth > rdepth + 1) {
          var lldepth = this.left.left == null ? 0 : this.left.left.depth;
          var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
          if (lldepth < lrdepth) {
            this.left.rotateRR();
          }
          this.rotateLL();
        } else if (ldepth + 1 < rdepth) {
          var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
          var rldepth = this.right.left == null ? 0 : this.right.left.depth;
          if (rldepth > rrdepth) {
            this.right.rotateLL();
          }
          this.rotateRR();
        }
      };
      AVLTree.prototype.rotateLL = function() {
        var nodeBefore = this.node;
        var rightBefore = this.right;
        this.node = this.left.node;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.node = nodeBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation();
      };
      AVLTree.prototype.rotateRR = function() {
        var nodeBefore = this.node;
        var leftBefore = this.left;
        this.node = this.right.node;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.node = nodeBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation();
      };
      AVLTree.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren();
      };
      AVLTree.prototype.getDepthFromChildren = function() {
        this.depth = this.node == null ? 0 : 1;
        if (this.left != null) {
          this.depth = this.left.depth + 1;
        }
        if (this.right != null && this.depth <= this.right.depth) {
          this.depth = this.right.depth + 1;
        }
      };
      function nodeOrder(n1, n2) {
        if (n1 === n2) {
          return 0;
        }
        if (n1.compareDocumentPosition) {
          var cpos = n1.compareDocumentPosition(n2);
          if (cpos & 1) {
            return 1;
          }
          if (cpos & 10) {
            return 1;
          }
          if (cpos & 20) {
            return -1;
          }
          return 0;
        }
        var d1 = 0, d2 = 0;
        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
          d1++;
        }
        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
          d2++;
        }
        if (d1 > d2) {
          while (d1 > d2) {
            n1 = n1.parentNode || n1.ownerElement;
            d1--;
          }
          if (n1 === n2) {
            return 1;
          }
        } else if (d2 > d1) {
          while (d2 > d1) {
            n2 = n2.parentNode || n2.ownerElement;
            d2--;
          }
          if (n1 === n2) {
            return -1;
          }
        }
        var n1Par = n1.parentNode || n1.ownerElement, n2Par = n2.parentNode || n2.ownerElement;
        while (n1Par !== n2Par) {
          n1 = n1Par;
          n2 = n2Par;
          n1Par = n1.parentNode || n1.ownerElement;
          n2Par = n2.parentNode || n2.ownerElement;
        }
        var n1isAttr = Utilities.isAttribute(n1);
        var n2isAttr = Utilities.isAttribute(n2);
        if (n1isAttr && !n2isAttr) {
          return -1;
        }
        if (!n1isAttr && n2isAttr) {
          return 1;
        }
        if (n1Par) {
          var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes, len = cn.length;
          for (var i = 0; i < len; i += 1) {
            var n = cn[i];
            if (n === n1) {
              return -1;
            }
            if (n === n2) {
              return 1;
            }
          }
        }
        throw new Error("Unexpected: could not determine node order");
      }
      AVLTree.prototype.add = function(n) {
        if (n === this.node) {
          return false;
        }
        var o = nodeOrder(n, this.node);
        var ret = false;
        if (o == -1) {
          if (this.left == null) {
            this.left = new AVLTree(n);
            ret = true;
          } else {
            ret = this.left.add(n);
            if (ret) {
              this.balance();
            }
          }
        } else if (o == 1) {
          if (this.right == null) {
            this.right = new AVLTree(n);
            ret = true;
          } else {
            ret = this.right.add(n);
            if (ret) {
              this.balance();
            }
          }
        }
        if (ret) {
          this.getDepthFromChildren();
        }
        return ret;
      };
      XNodeSet.prototype = new Expression();
      XNodeSet.prototype.constructor = XNodeSet;
      XNodeSet.superclass = Expression.prototype;
      function XNodeSet() {
        this.init();
      }
      XNodeSet.prototype.init = function() {
        this.tree = null;
        this.nodes = [];
        this.size = 0;
      };
      XNodeSet.prototype.toString = function() {
        var p = this.first();
        if (p == null) {
          return "";
        }
        return this.stringForNode(p);
      };
      XNodeSet.prototype.evaluate = function(c) {
        return this;
      };
      XNodeSet.prototype.string = function() {
        return new XString(this.toString());
      };
      XNodeSet.prototype.stringValue = function() {
        return this.toString();
      };
      XNodeSet.prototype.number = function() {
        return new XNumber(this.string());
      };
      XNodeSet.prototype.numberValue = function() {
        return Number(this.string());
      };
      XNodeSet.prototype.bool = function() {
        return new XBoolean(this.booleanValue());
      };
      XNodeSet.prototype.booleanValue = function() {
        return !!this.size;
      };
      XNodeSet.prototype.nodeset = function() {
        return this;
      };
      XNodeSet.prototype.stringForNode = function(n) {
        if (n.nodeType == 9 || n.nodeType == 1 || n.nodeType === 11) {
          return this.stringForContainerNode(n);
        }
        if (n.nodeType === 2) {
          return n.value || n.nodeValue;
        }
        if (n.isNamespaceNode) {
          return n.namespace;
        }
        return n.nodeValue;
      };
      XNodeSet.prototype.stringForContainerNode = function(n) {
        var s = "";
        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
          var nt = n2.nodeType;
          if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
            s += this.stringForNode(n2);
          }
        }
        return s;
      };
      XNodeSet.prototype.buildTree = function() {
        if (!this.tree && this.nodes.length) {
          this.tree = new AVLTree(this.nodes[0]);
          for (var i = 1; i < this.nodes.length; i += 1) {
            this.tree.add(this.nodes[i]);
          }
        }
        return this.tree;
      };
      XNodeSet.prototype.first = function() {
        var p = this.buildTree();
        if (p == null) {
          return null;
        }
        while (p.left != null) {
          p = p.left;
        }
        return p.node;
      };
      XNodeSet.prototype.add = function(n) {
        for (var i = 0; i < this.nodes.length; i += 1) {
          if (n === this.nodes[i]) {
            return;
          }
        }
        this.tree = null;
        this.nodes.push(n);
        this.size += 1;
      };
      XNodeSet.prototype.addArray = function(ns) {
        var self = this;
        forEach(function(x) {
          self.add(x);
        }, ns);
      };
      XNodeSet.prototype.toArray = function() {
        var a = [];
        this.toArrayRec(this.buildTree(), a);
        return a;
      };
      XNodeSet.prototype.toArrayRec = function(t, a) {
        if (t != null) {
          this.toArrayRec(t.left, a);
          a.push(t.node);
          this.toArrayRec(t.right, a);
        }
      };
      XNodeSet.prototype.toUnsortedArray = function() {
        return this.nodes.slice();
      };
      XNodeSet.prototype.compareWithString = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
          var n = a[i];
          var l = new XString(this.stringForNode(n));
          var res = o(l, r);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.prototype.compareWithNumber = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
          var n = a[i];
          var l = new XNumber(this.stringForNode(n));
          var res = o(l, r);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.prototype.compareWithBoolean = function(r, o) {
        return o(this.bool(), r);
      };
      XNodeSet.prototype.compareWithNodeSet = function(r, o) {
        var arr = this.toUnsortedArray();
        var oInvert = function(lop, rop) {
          return o(rop, lop);
        };
        for (var i = 0; i < arr.length; i++) {
          var l = new XString(this.stringForNode(arr[i]));
          var res = r.compareWithString(l, oInvert);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.compareWith = curry(function(o, r) {
        if (Utilities.instance_of(r, XString)) {
          return this.compareWithString(r, o);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.compareWithNumber(r, o);
        }
        if (Utilities.instance_of(r, XBoolean)) {
          return this.compareWithBoolean(r, o);
        }
        return this.compareWithNodeSet(r, o);
      });
      XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
      XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
      XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
      XNodeSet.prototype.greaterthan = XNodeSet.compareWith(Operators.greaterthan);
      XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
      XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);
      XNodeSet.prototype.union = function(r) {
        var ns = new XNodeSet();
        ns.addArray(this.toUnsortedArray());
        ns.addArray(r.toUnsortedArray());
        return ns;
      };
      XPathNamespace.prototype = new Object();
      XPathNamespace.prototype.constructor = XPathNamespace;
      XPathNamespace.superclass = Object.prototype;
      function XPathNamespace(pre, ns, p) {
        this.isXPathNamespace = true;
        this.ownerDocument = p.ownerDocument;
        this.nodeName = "#namespace";
        this.prefix = pre;
        this.localName = pre;
        this.namespaceURI = ns;
        this.nodeValue = ns;
        this.ownerElement = p;
        this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
      }
      XPathNamespace.prototype.toString = function() {
        return '{ "' + this.prefix + '", "' + this.namespaceURI + '" }';
      };
      XPathContext.prototype = new Object();
      XPathContext.prototype.constructor = XPathContext;
      XPathContext.superclass = Object.prototype;
      function XPathContext(vr, nr, fr) {
        this.variableResolver = vr != null ? vr : new VariableResolver();
        this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
        this.functionResolver = fr != null ? fr : new FunctionResolver();
      }
      XPathContext.prototype.extend = function(newProps) {
        return assign(new XPathContext(), this, newProps);
      };
      VariableResolver.prototype = new Object();
      VariableResolver.prototype.constructor = VariableResolver;
      VariableResolver.superclass = Object.prototype;
      function VariableResolver() {
      }
      VariableResolver.prototype.getVariable = function(ln, ns) {
        return null;
      };
      FunctionResolver.prototype = new Object();
      FunctionResolver.prototype.constructor = FunctionResolver;
      FunctionResolver.superclass = Object.prototype;
      function FunctionResolver(thisArg) {
        this.thisArg = thisArg != null ? thisArg : Functions;
        this.functions = new Object();
        this.addStandardFunctions();
      }
      FunctionResolver.prototype.addStandardFunctions = function() {
        this.functions["{}last"] = Functions.last;
        this.functions["{}position"] = Functions.position;
        this.functions["{}count"] = Functions.count;
        this.functions["{}id"] = Functions.id;
        this.functions["{}local-name"] = Functions.localName;
        this.functions["{}namespace-uri"] = Functions.namespaceURI;
        this.functions["{}name"] = Functions.name;
        this.functions["{}string"] = Functions.string;
        this.functions["{}concat"] = Functions.concat;
        this.functions["{}starts-with"] = Functions.startsWith;
        this.functions["{}contains"] = Functions.contains;
        this.functions["{}substring-before"] = Functions.substringBefore;
        this.functions["{}substring-after"] = Functions.substringAfter;
        this.functions["{}substring"] = Functions.substring;
        this.functions["{}string-length"] = Functions.stringLength;
        this.functions["{}normalize-space"] = Functions.normalizeSpace;
        this.functions["{}translate"] = Functions.translate;
        this.functions["{}boolean"] = Functions.boolean_;
        this.functions["{}not"] = Functions.not;
        this.functions["{}true"] = Functions.true_;
        this.functions["{}false"] = Functions.false_;
        this.functions["{}lang"] = Functions.lang;
        this.functions["{}number"] = Functions.number;
        this.functions["{}sum"] = Functions.sum;
        this.functions["{}floor"] = Functions.floor;
        this.functions["{}ceiling"] = Functions.ceiling;
        this.functions["{}round"] = Functions.round;
      };
      FunctionResolver.prototype.addFunction = function(ns, ln, f) {
        this.functions["{" + ns + "}" + ln] = f;
      };
      FunctionResolver.getFunctionFromContext = function(qName, context) {
        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);
        if (parts[0] === null) {
          throw new Error("Cannot resolve QName " + name);
        }
        return context.functionResolver.getFunction(parts[1], parts[0]);
      };
      FunctionResolver.prototype.getFunction = function(localName, namespace) {
        return this.functions["{" + namespace + "}" + localName];
      };
      NamespaceResolver.prototype = new Object();
      NamespaceResolver.prototype.constructor = NamespaceResolver;
      NamespaceResolver.superclass = Object.prototype;
      function NamespaceResolver() {
      }
      NamespaceResolver.prototype.getNamespace = function(prefix, n) {
        if (prefix == "xml") {
          return XPath.XML_NAMESPACE_URI;
        } else if (prefix == "xmlns") {
          return XPath.XMLNS_NAMESPACE_URI;
        }
        if (n.nodeType == 9) {
          n = n.documentElement;
        } else if (n.nodeType == 2) {
          n = PathExpr.getOwnerElement(n);
        } else if (n.nodeType != 1) {
          n = n.parentNode;
        }
        while (n != null && n.nodeType == 1) {
          var nnm = n.attributes;
          for (var i = 0; i < nnm.length; i++) {
            var a = nnm.item(i);
            var aname = a.name || a.nodeName;
            if (aname === "xmlns" && prefix === "" || aname === "xmlns:" + prefix) {
              return String(a.value || a.nodeValue);
            }
          }
          n = n.parentNode;
        }
        return null;
      };
      var Functions = new Object();
      Functions.last = function(c) {
        if (arguments.length != 1) {
          throw new Error("Function last expects ()");
        }
        return new XNumber(c.contextSize);
      };
      Functions.position = function(c) {
        if (arguments.length != 1) {
          throw new Error("Function position expects ()");
        }
        return new XNumber(c.contextPosition);
      };
      Functions.count = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
          throw new Error("Function count expects (node-set)");
        }
        return new XNumber(ns.size);
      };
      Functions.id = function() {
        var c = arguments[0];
        var id;
        if (arguments.length != 2) {
          throw new Error("Function id expects (object)");
        }
        id = arguments[1].evaluate(c);
        if (Utilities.instance_of(id, XNodeSet)) {
          id = id.toArray().join(" ");
        } else {
          id = id.stringValue();
        }
        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
        var count = 0;
        var ns = new XNodeSet();
        var doc = c.contextNode.nodeType == 9 ? c.contextNode : c.contextNode.ownerDocument;
        for (var i = 0; i < ids.length; i++) {
          var n;
          if (doc.getElementById) {
            n = doc.getElementById(ids[i]);
          } else {
            n = Utilities.getElementById(doc, ids[i]);
          }
          if (n != null) {
            ns.add(n);
            count++;
          }
        }
        return ns;
      };
      Functions.localName = function(c, eNode) {
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = eNode.evaluate(c).first();
        } else {
          throw new Error("Function local-name expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        return new XString(
          n.localName || n.baseName || n.target || n.nodeName || ""
        );
      };
      Functions.namespaceURI = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = arguments[1].evaluate(c).first();
        } else {
          throw new Error("Function namespace-uri expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        return new XString(n.namespaceURI);
      };
      Functions.name = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = arguments[1].evaluate(c).first();
        } else {
          throw new Error("Function name expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        if (n.nodeType == 1) {
          return new XString(n.nodeName);
        } else if (n.nodeType == 2) {
          return new XString(n.name || n.nodeName);
        } else if (n.nodeType === 7) {
          return new XString(n.target || n.nodeName);
        } else if (n.localName == null) {
          return new XString("");
        } else {
          return new XString(n.localName);
        }
      };
      Functions.string = function() {
        var c = arguments[0];
        if (arguments.length == 1) {
          return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
        } else if (arguments.length == 2) {
          return arguments[1].evaluate(c).string();
        }
        throw new Error("Function string expects (object?)");
      };
      Functions.concat = function(c) {
        if (arguments.length < 3) {
          throw new Error("Function concat expects (string, string[, string]*)");
        }
        var s = "";
        for (var i = 1; i < arguments.length; i++) {
          s += arguments[i].evaluate(c).stringValue();
        }
        return new XString(s);
      };
      Functions.startsWith = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function startsWith expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.substring(0, s2.length) == s2);
      };
      Functions.contains = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function contains expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.indexOf(s2) !== -1);
      };
      Functions.substringBefore = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function substring-before expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XString(s1.substring(0, s1.indexOf(s2)));
      };
      Functions.substringAfter = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function substring-after expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        if (s2.length == 0) {
          return new XString(s1);
        }
        var i = s1.indexOf(s2);
        if (i == -1) {
          return new XString("");
        }
        return new XString(s1.substring(i + s2.length));
      };
      Functions.substring = function() {
        var c = arguments[0];
        if (!(arguments.length == 3 || arguments.length == 4)) {
          throw new Error("Function substring expects (string, number, number?)");
        }
        var s = arguments[1].evaluate(c).stringValue();
        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : void 0;
        return new XString(s.substring(n1, n2));
      };
      Functions.stringLength = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
          s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
          s = arguments[1].evaluate(c).stringValue();
        } else {
          throw new Error("Function string-length expects (string?)");
        }
        return new XNumber(s.length);
      };
      Functions.normalizeSpace = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
          s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
          s = arguments[1].evaluate(c).stringValue();
        } else {
          throw new Error("Function normalize-space expects (string?)");
        }
        var i = 0;
        var j = s.length - 1;
        while (Utilities.isSpace(s.charCodeAt(j))) {
          j--;
        }
        var t = "";
        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
          i++;
        }
        while (i <= j) {
          if (Utilities.isSpace(s.charCodeAt(i))) {
            t += " ";
            while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
              i++;
            }
          } else {
            t += s.charAt(i);
            i++;
          }
        }
        return new XString(t);
      };
      Functions.translate = function(c, eValue, eFrom, eTo) {
        if (arguments.length != 4) {
          throw new Error("Function translate expects (string, string, string)");
        }
        var value = eValue.evaluate(c).stringValue();
        var from = eFrom.evaluate(c).stringValue();
        var to = eTo.evaluate(c).stringValue();
        var cMap = reduce(function(acc, ch, i) {
          if (!(ch in acc)) {
            acc[ch] = i > to.length ? "" : to[i];
          }
          return acc;
        }, {}, from);
        var t = join(
          "",
          map(function(ch) {
            return ch in cMap ? cMap[ch] : ch;
          }, value)
        );
        return new XString(t);
      };
      Functions.boolean_ = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function boolean expects (object)");
        }
        return arguments[1].evaluate(c).bool();
      };
      Functions.not = function(c, eValue) {
        if (arguments.length != 2) {
          throw new Error("Function not expects (object)");
        }
        return eValue.evaluate(c).bool().not();
      };
      Functions.true_ = function() {
        if (arguments.length != 1) {
          throw new Error("Function true expects ()");
        }
        return XBoolean.true_;
      };
      Functions.false_ = function() {
        if (arguments.length != 1) {
          throw new Error("Function false expects ()");
        }
        return XBoolean.false_;
      };
      Functions.lang = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function lang expects (string)");
        }
        var lang;
        for (var n = c.contextNode; n != null && n.nodeType != 9; n = n.parentNode) {
          var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
          if (a != null) {
            lang = String(a);
            break;
          }
        }
        if (lang == null) {
          return XBoolean.false_;
        }
        var s = arguments[1].evaluate(c).stringValue();
        return new XBoolean(lang.substring(0, s.length) == s && (lang.length == s.length || lang.charAt(s.length) == "-"));
      };
      Functions.number = function() {
        var c = arguments[0];
        if (!(arguments.length == 1 || arguments.length == 2)) {
          throw new Error("Function number expects (object?)");
        }
        if (arguments.length == 1) {
          return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
        }
        return arguments[1].evaluate(c).number();
      };
      Functions.sum = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
          throw new Error("Function sum expects (node-set)");
        }
        ns = ns.toUnsortedArray();
        var n = 0;
        for (var i = 0; i < ns.length; i++) {
          n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
        }
        return new XNumber(n);
      };
      Functions.floor = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function floor expects (number)");
        }
        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
      };
      Functions.ceiling = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function ceiling expects (number)");
        }
        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
      };
      Functions.round = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function round expects (number)");
        }
        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
      };
      var Utilities = new Object();
      Utilities.isAttribute = function(val) {
        return val && (val.nodeType === 2 || val.ownerElement);
      };
      Utilities.splitQName = function(qn) {
        var i = qn.indexOf(":");
        if (i == -1) {
          return [null, qn];
        }
        return [qn.substring(0, i), qn.substring(i + 1)];
      };
      Utilities.resolveQName = function(qn, nr, n, useDefault) {
        var parts = Utilities.splitQName(qn);
        if (parts[0] != null) {
          parts[0] = nr.getNamespace(parts[0], n);
        } else {
          if (useDefault) {
            parts[0] = nr.getNamespace("", n);
            if (parts[0] == null) {
              parts[0] = "";
            }
          } else {
            parts[0] = "";
          }
        }
        return parts;
      };
      Utilities.isSpace = function(c) {
        return c == 9 || c == 13 || c == 10 || c == 32;
      };
      Utilities.isLetter = function(c) {
        return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 255 || c >= 256 && c <= 305 || c >= 308 && c <= 318 || c >= 321 && c <= 328 || c >= 330 && c <= 382 || c >= 384 && c <= 451 || c >= 461 && c <= 496 || c >= 500 && c <= 501 || c >= 506 && c <= 535 || c >= 592 && c <= 680 || c >= 699 && c <= 705 || c == 902 || c >= 904 && c <= 906 || c == 908 || c >= 910 && c <= 929 || c >= 931 && c <= 974 || c >= 976 && c <= 982 || c == 986 || c == 988 || c == 990 || c == 992 || c >= 994 && c <= 1011 || c >= 1025 && c <= 1036 || c >= 1038 && c <= 1103 || c >= 1105 && c <= 1116 || c >= 1118 && c <= 1153 || c >= 1168 && c <= 1220 || c >= 1223 && c <= 1224 || c >= 1227 && c <= 1228 || c >= 1232 && c <= 1259 || c >= 1262 && c <= 1269 || c >= 1272 && c <= 1273 || c >= 1329 && c <= 1366 || c == 1369 || c >= 1377 && c <= 1414 || c >= 1488 && c <= 1514 || c >= 1520 && c <= 1522 || c >= 1569 && c <= 1594 || c >= 1601 && c <= 1610 || c >= 1649 && c <= 1719 || c >= 1722 && c <= 1726 || c >= 1728 && c <= 1742 || c >= 1744 && c <= 1747 || c == 1749 || c >= 1765 && c <= 1766 || c >= 2309 && c <= 2361 || c == 2365 || c >= 2392 && c <= 2401 || c >= 2437 && c <= 2444 || c >= 2447 && c <= 2448 || c >= 2451 && c <= 2472 || c >= 2474 && c <= 2480 || c == 2482 || c >= 2486 && c <= 2489 || c >= 2524 && c <= 2525 || c >= 2527 && c <= 2529 || c >= 2544 && c <= 2545 || c >= 2565 && c <= 2570 || c >= 2575 && c <= 2576 || c >= 2579 && c <= 2600 || c >= 2602 && c <= 2608 || c >= 2610 && c <= 2611 || c >= 2613 && c <= 2614 || c >= 2616 && c <= 2617 || c >= 2649 && c <= 2652 || c == 2654 || c >= 2674 && c <= 2676 || c >= 2693 && c <= 2699 || c == 2701 || c >= 2703 && c <= 2705 || c >= 2707 && c <= 2728 || c >= 2730 && c <= 2736 || c >= 2738 && c <= 2739 || c >= 2741 && c <= 2745 || c == 2749 || c == 2784 || c >= 2821 && c <= 2828 || c >= 2831 && c <= 2832 || c >= 2835 && c <= 2856 || c >= 2858 && c <= 2864 || c >= 2866 && c <= 2867 || c >= 2870 && c <= 2873 || c == 2877 || c >= 2908 && c <= 2909 || c >= 2911 && c <= 2913 || c >= 2949 && c <= 2954 || c >= 2958 && c <= 2960 || c >= 2962 && c <= 2965 || c >= 2969 && c <= 2970 || c == 2972 || c >= 2974 && c <= 2975 || c >= 2979 && c <= 2980 || c >= 2984 && c <= 2986 || c >= 2990 && c <= 2997 || c >= 2999 && c <= 3001 || c >= 3077 && c <= 3084 || c >= 3086 && c <= 3088 || c >= 3090 && c <= 3112 || c >= 3114 && c <= 3123 || c >= 3125 && c <= 3129 || c >= 3168 && c <= 3169 || c >= 3205 && c <= 3212 || c >= 3214 && c <= 3216 || c >= 3218 && c <= 3240 || c >= 3242 && c <= 3251 || c >= 3253 && c <= 3257 || c == 3294 || c >= 3296 && c <= 3297 || c >= 3333 && c <= 3340 || c >= 3342 && c <= 3344 || c >= 3346 && c <= 3368 || c >= 3370 && c <= 3385 || c >= 3424 && c <= 3425 || c >= 3585 && c <= 3630 || c == 3632 || c >= 3634 && c <= 3635 || c >= 3648 && c <= 3653 || c >= 3713 && c <= 3714 || c == 3716 || c >= 3719 && c <= 3720 || c == 3722 || c == 3725 || c >= 3732 && c <= 3735 || c >= 3737 && c <= 3743 || c >= 3745 && c <= 3747 || c == 3749 || c == 3751 || c >= 3754 && c <= 3755 || c >= 3757 && c <= 3758 || c == 3760 || c >= 3762 && c <= 3763 || c == 3773 || c >= 3776 && c <= 3780 || c >= 3904 && c <= 3911 || c >= 3913 && c <= 3945 || c >= 4256 && c <= 4293 || c >= 4304 && c <= 4342 || c == 4352 || c >= 4354 && c <= 4355 || c >= 4357 && c <= 4359 || c == 4361 || c >= 4363 && c <= 4364 || c >= 4366 && c <= 4370 || c == 4412 || c == 4414 || c == 4416 || c == 4428 || c == 4430 || c == 4432 || c >= 4436 && c <= 4437 || c == 4441 || c >= 4447 && c <= 4449 || c == 4451 || c == 4453 || c == 4455 || c == 4457 || c >= 4461 && c <= 4462 || c >= 4466 && c <= 4467 || c == 4469 || c == 4510 || c == 4520 || c == 4523 || c >= 4526 && c <= 4527 || c >= 4535 && c <= 4536 || c == 4538 || c >= 4540 && c <= 4546 || c == 4587 || c == 4592 || c == 4601 || c >= 7680 && c <= 7835 || c >= 7840 && c <= 7929 || c >= 7936 && c <= 7957 || c >= 7960 && c <= 7965 || c >= 7968 && c <= 8005 || c >= 8008 && c <= 8013 || c >= 8016 && c <= 8023 || c == 8025 || c == 8027 || c == 8029 || c >= 8031 && c <= 8061 || c >= 8064 && c <= 8116 || c >= 8118 && c <= 8124 || c == 8126 || c >= 8130 && c <= 8132 || c >= 8134 && c <= 8140 || c >= 8144 && c <= 8147 || c >= 8150 && c <= 8155 || c >= 8160 && c <= 8172 || c >= 8178 && c <= 8180 || c >= 8182 && c <= 8188 || c == 8486 || c >= 8490 && c <= 8491 || c == 8494 || c >= 8576 && c <= 8578 || c >= 12353 && c <= 12436 || c >= 12449 && c <= 12538 || c >= 12549 && c <= 12588 || c >= 44032 && c <= 55203 || c >= 19968 && c <= 40869 || c == 12295 || c >= 12321 && c <= 12329;
      };
      Utilities.isNCNameChar = function(c) {
        return c >= 48 && c <= 57 || c >= 1632 && c <= 1641 || c >= 1776 && c <= 1785 || c >= 2406 && c <= 2415 || c >= 2534 && c <= 2543 || c >= 2662 && c <= 2671 || c >= 2790 && c <= 2799 || c >= 2918 && c <= 2927 || c >= 3047 && c <= 3055 || c >= 3174 && c <= 3183 || c >= 3302 && c <= 3311 || c >= 3430 && c <= 3439 || c >= 3664 && c <= 3673 || c >= 3792 && c <= 3801 || c >= 3872 && c <= 3881 || c == 46 || c == 45 || c == 95 || Utilities.isLetter(c) || c >= 768 && c <= 837 || c >= 864 && c <= 865 || c >= 1155 && c <= 1158 || c >= 1425 && c <= 1441 || c >= 1443 && c <= 1465 || c >= 1467 && c <= 1469 || c == 1471 || c >= 1473 && c <= 1474 || c == 1476 || c >= 1611 && c <= 1618 || c == 1648 || c >= 1750 && c <= 1756 || c >= 1757 && c <= 1759 || c >= 1760 && c <= 1764 || c >= 1767 && c <= 1768 || c >= 1770 && c <= 1773 || c >= 2305 && c <= 2307 || c == 2364 || c >= 2366 && c <= 2380 || c == 2381 || c >= 2385 && c <= 2388 || c >= 2402 && c <= 2403 || c >= 2433 && c <= 2435 || c == 2492 || c == 2494 || c == 2495 || c >= 2496 && c <= 2500 || c >= 2503 && c <= 2504 || c >= 2507 && c <= 2509 || c == 2519 || c >= 2530 && c <= 2531 || c == 2562 || c == 2620 || c == 2622 || c == 2623 || c >= 2624 && c <= 2626 || c >= 2631 && c <= 2632 || c >= 2635 && c <= 2637 || c >= 2672 && c <= 2673 || c >= 2689 && c <= 2691 || c == 2748 || c >= 2750 && c <= 2757 || c >= 2759 && c <= 2761 || c >= 2763 && c <= 2765 || c >= 2817 && c <= 2819 || c == 2876 || c >= 2878 && c <= 2883 || c >= 2887 && c <= 2888 || c >= 2891 && c <= 2893 || c >= 2902 && c <= 2903 || c >= 2946 && c <= 2947 || c >= 3006 && c <= 3010 || c >= 3014 && c <= 3016 || c >= 3018 && c <= 3021 || c == 3031 || c >= 3073 && c <= 3075 || c >= 3134 && c <= 3140 || c >= 3142 && c <= 3144 || c >= 3146 && c <= 3149 || c >= 3157 && c <= 3158 || c >= 3202 && c <= 3203 || c >= 3262 && c <= 3268 || c >= 3270 && c <= 3272 || c >= 3274 && c <= 3277 || c >= 3285 && c <= 3286 || c >= 3330 && c <= 3331 || c >= 3390 && c <= 3395 || c >= 3398 && c <= 3400 || c >= 3402 && c <= 3405 || c == 3415 || c == 3633 || c >= 3636 && c <= 3642 || c >= 3655 && c <= 3662 || c == 3761 || c >= 3764 && c <= 3769 || c >= 3771 && c <= 3772 || c >= 3784 && c <= 3789 || c >= 3864 && c <= 3865 || c == 3893 || c == 3895 || c == 3897 || c == 3902 || c == 3903 || c >= 3953 && c <= 3972 || c >= 3974 && c <= 3979 || c >= 3984 && c <= 3989 || c == 3991 || c >= 3993 && c <= 4013 || c >= 4017 && c <= 4023 || c == 4025 || c >= 8400 && c <= 8412 || c == 8417 || c >= 12330 && c <= 12335 || c == 12441 || c == 12442 || c == 183 || c == 720 || c == 721 || c == 903 || c == 1600 || c == 3654 || c == 3782 || c == 12293 || c >= 12337 && c <= 12341 || c >= 12445 && c <= 12446 || c >= 12540 && c <= 12542;
      };
      Utilities.coalesceText = function(n) {
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
          if (m.nodeType == 3 || m.nodeType == 4) {
            var s = m.nodeValue;
            var first = m;
            m = m.nextSibling;
            while (m != null && (m.nodeType == 3 || m.nodeType == 4)) {
              s += m.nodeValue;
              var del = m;
              m = m.nextSibling;
              del.parentNode.removeChild(del);
            }
            if (first.nodeType == 4) {
              var p = first.parentNode;
              if (first.nextSibling == null) {
                p.removeChild(first);
                p.appendChild(p.ownerDocument.createTextNode(s));
              } else {
                var next = first.nextSibling;
                p.removeChild(first);
                p.insertBefore(p.ownerDocument.createTextNode(s), next);
              }
            } else {
              first.nodeValue = s;
            }
            if (m == null) {
              break;
            }
          } else if (m.nodeType == 1) {
            Utilities.coalesceText(m);
          }
        }
      };
      Utilities.instance_of = function(o, c) {
        while (o != null) {
          if (o.constructor === c) {
            return true;
          }
          if (o === Object) {
            return false;
          }
          o = o.constructor.superclass;
        }
        return false;
      };
      Utilities.getElementById = function(n, id) {
        if (n.nodeType == 1) {
          if (n.getAttribute("id") == id || n.getAttributeNS(null, "id") == id) {
            return n;
          }
        }
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
          var res = Utilities.getElementById(m, id);
          if (res != null) {
            return res;
          }
        }
        return null;
      };
      var XPathException = function() {
        function getMessage(code, exception) {
          var msg = exception ? ": " + exception.toString() : "";
          switch (code) {
            case XPathException2.INVALID_EXPRESSION_ERR:
              return "Invalid expression" + msg;
            case XPathException2.TYPE_ERR:
              return "Type error" + msg;
          }
          return null;
        }
        function XPathException2(code, error, message) {
          var err = Error.call(this, getMessage(code, error) || message);
          err.code = code;
          err.exception = error;
          return err;
        }
        XPathException2.prototype = Object.create(Error.prototype);
        XPathException2.prototype.constructor = XPathException2;
        XPathException2.superclass = Error;
        XPathException2.prototype.toString = function() {
          return this.message;
        };
        XPathException2.fromMessage = function(message, error) {
          return new XPathException2(null, error, message);
        };
        XPathException2.INVALID_EXPRESSION_ERR = 51;
        XPathException2.TYPE_ERR = 52;
        return XPathException2;
      }();
      XPathExpression.prototype = {};
      XPathExpression.prototype.constructor = XPathExpression;
      XPathExpression.superclass = Object.prototype;
      function XPathExpression(e, r, p) {
        this.xpath = p.parse(e);
        this.context = new XPathContext();
        this.context.namespaceResolver = new XPathNSResolverWrapper(r);
      }
      XPathExpression.getOwnerDocument = function(n) {
        return n.nodeType === 9 ? n : n.ownerDocument;
      };
      XPathExpression.detectHtmlDom = function(n) {
        if (!n) {
          return false;
        }
        var doc = XPathExpression.getOwnerDocument(n);
        try {
          return doc.implementation.hasFeature("HTML", "2.0");
        } catch (e) {
          return true;
        }
      };
      XPathExpression.prototype.evaluate = function(n, t, res) {
        this.context.expressionContextNode = n;
        this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);
        var result = this.xpath.evaluate(this.context);
        return new XPathResult(result, t);
      };
      XPathNSResolverWrapper.prototype = {};
      XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
      XPathNSResolverWrapper.superclass = Object.prototype;
      function XPathNSResolverWrapper(r) {
        this.xpathNSResolver = r;
      }
      XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
        if (this.xpathNSResolver == null) {
          return null;
        }
        return this.xpathNSResolver.lookupNamespaceURI(prefix);
      };
      NodeXPathNSResolver.prototype = {};
      NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
      NodeXPathNSResolver.superclass = Object.prototype;
      function NodeXPathNSResolver(n) {
        this.node = n;
        this.namespaceResolver = new NamespaceResolver();
      }
      NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
        return this.namespaceResolver.getNamespace(prefix, this.node);
      };
      XPathResult.prototype = {};
      XPathResult.prototype.constructor = XPathResult;
      XPathResult.superclass = Object.prototype;
      function XPathResult(v, t) {
        if (t == XPathResult.ANY_TYPE) {
          if (v.constructor === XString) {
            t = XPathResult.STRING_TYPE;
          } else if (v.constructor === XNumber) {
            t = XPathResult.NUMBER_TYPE;
          } else if (v.constructor === XBoolean) {
            t = XPathResult.BOOLEAN_TYPE;
          } else if (v.constructor === XNodeSet) {
            t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
          }
        }
        this.resultType = t;
        switch (t) {
          case XPathResult.NUMBER_TYPE:
            this.numberValue = v.numberValue();
            return;
          case XPathResult.STRING_TYPE:
            this.stringValue = v.stringValue();
            return;
          case XPathResult.BOOLEAN_TYPE:
            this.booleanValue = v.booleanValue();
            return;
          case XPathResult.ANY_UNORDERED_NODE_TYPE:
          case XPathResult.FIRST_ORDERED_NODE_TYPE:
            if (v.constructor === XNodeSet) {
              this.singleNodeValue = v.first();
              return;
            }
            break;
          case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
          case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
            if (v.constructor === XNodeSet) {
              this.invalidIteratorState = false;
              this.nodes = v.toArray();
              this.iteratorIndex = 0;
              return;
            }
            break;
          case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
          case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
            if (v.constructor === XNodeSet) {
              this.nodes = v.toArray();
              this.snapshotLength = this.nodes.length;
              return;
            }
            break;
        }
        throw new XPathException(XPathException.TYPE_ERR);
      }
      ;
      XPathResult.prototype.iterateNext = function() {
        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
          throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[this.iteratorIndex++];
      };
      XPathResult.prototype.snapshotItem = function(i) {
        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
          throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[i];
      };
      XPathResult.ANY_TYPE = 0;
      XPathResult.NUMBER_TYPE = 1;
      XPathResult.STRING_TYPE = 2;
      XPathResult.BOOLEAN_TYPE = 3;
      XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
      XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
      XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
      XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
      function installDOM3XPathSupport(doc, p) {
        doc.createExpression = function(e, r) {
          try {
            return new XPathExpression(e, r, p);
          } catch (e2) {
            throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e2);
          }
        };
        doc.createNSResolver = function(n) {
          return new NodeXPathNSResolver(n);
        };
        doc.evaluate = function(e, cn, r, t, res) {
          if (t < 0 || t > 9) {
            throw { code: 0, toString: function() {
              return "Request type not supported";
            } };
          }
          return doc.createExpression(e, r, p).evaluate(cn, t, res);
        };
      }
      ;
      try {
        var shouldInstall = true;
        try {
          if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XPath", null)) {
            shouldInstall = false;
          }
        } catch (e) {
        }
        if (shouldInstall) {
          installDOM3XPathSupport(document, new XPathParser());
        }
      } catch (e) {
      }
      installDOM3XPathSupport(exports2, new XPathParser());
      (function() {
        var parser = new XPathParser();
        var defaultNSResolver = new NamespaceResolver();
        var defaultFunctionResolver = new FunctionResolver();
        var defaultVariableResolver = new VariableResolver();
        function makeNSResolverFromFunction(func) {
          return {
            getNamespace: function(prefix, node) {
              var ns = func(prefix, node);
              return ns || defaultNSResolver.getNamespace(prefix, node);
            }
          };
        }
        function makeNSResolverFromObject(obj) {
          return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
        }
        function makeNSResolverFromMap(map2) {
          return makeNSResolverFromFunction(function(prefix) {
            return map2[prefix];
          });
        }
        function makeNSResolver(resolver) {
          if (resolver && typeof resolver.getNamespace === "function") {
            return makeNSResolverFromObject(resolver);
          }
          if (typeof resolver === "function") {
            return makeNSResolverFromFunction(resolver);
          }
          if (typeof resolver === "object") {
            return makeNSResolverFromMap(resolver);
          }
          return defaultNSResolver;
        }
        function convertValue(value) {
          if (value === null || typeof value === "undefined" || value instanceof XString || value instanceof XBoolean || value instanceof XNumber || value instanceof XNodeSet) {
            return value;
          }
          switch (typeof value) {
            case "string":
              return new XString(value);
            case "boolean":
              return new XBoolean(value);
            case "number":
              return new XNumber(value);
          }
          var ns = new XNodeSet();
          ns.addArray([].concat(value));
          return ns;
        }
        function makeEvaluator(func) {
          return function(context) {
            var args = Array.prototype.slice.call(arguments, 1).map(function(arg) {
              return arg.evaluate(context);
            });
            var result = func.apply(this, [].concat(context, args));
            return convertValue(result);
          };
        }
        function makeFunctionResolverFromFunction(func) {
          return {
            getFunction: function(name2, namespace) {
              var found = func(name2, namespace);
              if (found) {
                return makeEvaluator(found);
              }
              return defaultFunctionResolver.getFunction(name2, namespace);
            }
          };
        }
        function makeFunctionResolverFromObject(obj) {
          return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
        }
        function makeFunctionResolverFromMap(map2) {
          return makeFunctionResolverFromFunction(function(name2) {
            return map2[name2];
          });
        }
        function makeFunctionResolver(resolver) {
          if (resolver && typeof resolver.getFunction === "function") {
            return makeFunctionResolverFromObject(resolver);
          }
          if (typeof resolver === "function") {
            return makeFunctionResolverFromFunction(resolver);
          }
          if (typeof resolver === "object") {
            return makeFunctionResolverFromMap(resolver);
          }
          return defaultFunctionResolver;
        }
        function makeVariableResolverFromFunction(func) {
          return {
            getVariable: function(name2, namespace) {
              var value = func(name2, namespace);
              return convertValue(value);
            }
          };
        }
        function makeVariableResolver(resolver) {
          if (resolver) {
            if (typeof resolver.getVariable === "function") {
              return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
            }
            if (typeof resolver === "function") {
              return makeVariableResolverFromFunction(resolver);
            }
            if (typeof resolver === "object") {
              return makeVariableResolverFromFunction(function(name2) {
                return resolver[name2];
              });
            }
          }
          return defaultVariableResolver;
        }
        function copyIfPresent(prop, dest, source) {
          if (prop in source) {
            dest[prop] = source[prop];
          }
        }
        function makeContext(options) {
          var context = new XPathContext();
          if (options) {
            context.namespaceResolver = makeNSResolver(options.namespaces);
            context.functionResolver = makeFunctionResolver(options.functions);
            context.variableResolver = makeVariableResolver(options.variables);
            context.expressionContextNode = options.node;
            copyIfPresent("allowAnyNamespaceForNoPrefix", context, options);
            copyIfPresent("isHtml", context, options);
          } else {
            context.namespaceResolver = defaultNSResolver;
          }
          return context;
        }
        function evaluate(parsedExpression, options) {
          var context = makeContext(options);
          return parsedExpression.evaluate(context);
        }
        var evaluatorPrototype = {
          evaluate: function(options) {
            return evaluate(this.expression, options);
          },
          evaluateNumber: function(options) {
            return this.evaluate(options).numberValue();
          },
          evaluateString: function(options) {
            return this.evaluate(options).stringValue();
          },
          evaluateBoolean: function(options) {
            return this.evaluate(options).booleanValue();
          },
          evaluateNodeSet: function(options) {
            return this.evaluate(options).nodeset();
          },
          select: function(options) {
            return this.evaluateNodeSet(options).toArray();
          },
          select1: function(options) {
            return this.select(options)[0];
          }
        };
        function parse(xpath2) {
          var parsed = parser.parse(xpath2);
          return Object.create(evaluatorPrototype, {
            expression: {
              value: parsed
            }
          });
        }
        exports2.parse = parse;
      })();
      assign(
        exports2,
        {
          XPath,
          XPathParser,
          XPathResult,
          Step,
          PathExpr,
          NodeTest,
          LocationPath,
          OrOperation,
          AndOperation,
          BarOperation,
          EqualsOperation,
          NotEqualOperation,
          LessThanOperation,
          GreaterThanOperation,
          LessThanOrEqualOperation,
          GreaterThanOrEqualOperation,
          PlusOperation,
          MinusOperation,
          MultiplyOperation,
          DivOperation,
          ModOperation,
          UnaryMinusOperation,
          FunctionCall,
          VariableReference,
          XPathContext,
          XNodeSet,
          XBoolean,
          XString,
          XNumber,
          NamespaceResolver,
          FunctionResolver,
          VariableResolver,
          Utilities
        }
      );
      exports2.select = function(e, doc, single) {
        return exports2.selectWithResolver(e, doc, null, single);
      };
      exports2.useNamespaces = function(mappings) {
        var resolver = {
          mappings: mappings || {},
          lookupNamespaceURI: function(prefix) {
            return this.mappings[prefix];
          }
        };
        return function(e, doc, single) {
          return exports2.selectWithResolver(e, doc, resolver, single);
        };
      };
      exports2.selectWithResolver = function(e, doc, resolver, single) {
        var expression = new XPathExpression(e, resolver, new XPathParser());
        var type = XPathResult.ANY_TYPE;
        var result = expression.evaluate(doc, type, null);
        if (result.resultType == XPathResult.STRING_TYPE) {
          result = result.stringValue;
        } else if (result.resultType == XPathResult.NUMBER_TYPE) {
          result = result.numberValue;
        } else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
          result = result.booleanValue;
        } else {
          result = result.nodes;
          if (single) {
            result = result[0];
          }
        }
        return result;
      };
      exports2.select1 = function(e, doc) {
        return exports2.select(e, doc, true);
      };
    })(xpath);
  }
});

// node_modules/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/xmldom/lib/entities.js"(exports) {
    exports.entityMap = {
      lt: "<",
      gt: ">",
      amp: "&",
      quot: '"',
      apos: "'",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      times: "\xD7",
      divide: "\xF7",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      euro: "\u20AC",
      trade: "\u2122",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    };
  }
});

// node_modules/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/xmldom/lib/sax.js"(exports) {
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          this.errorHandler
        );
        domBuilder.endDocument();
      }
    };
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (k in entityMap) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end);
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (el.uri === "http://www.w3.org/1999/xhtml" && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (qname in el.attributeNames)
          errorHandler.fatalError("Attribute " + qname + " redefined");
        el.addValue(qname, value2, startIndex);
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
              case S_ATTR_SPACE:
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
                } else {
                  if (currentNSMap[""] !== "http://www.w3.org/1999/xhtml" || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (currentNSMap[""] !== "http://www.w3.org/1999/xhtml" || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = "http://www.w3.org/2000/xmlns/";
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = "http://www.w3.org/XML/1998/namespace";
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        target[n] = source[n];
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name2 = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name2, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
    };
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1])
          return buf;
      }
    }
    exports.XMLReader = XMLReader;
    exports.ParseError = ParseError;
  }
});

// node_modules/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/xmldom/lib/dom.js"(exports) {
    function copy(src, dest) {
      for (var p in src) {
        dest[p] = src[p];
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknow Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var htmlns = "http://www.w3.org/1999/xhtml";
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      length: 0,
      item: function(index) {
        return this[index] || null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc != inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i];
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation(features) {
      this._features = {};
      if (features) {
        for (var feature in features) {
          this._features = features[feature];
        }
      }
    }
    DOMImplementation.prototype = {
      hasFeature: function(feature, version) {
        var versions = this._features[feature.toLowerCase()];
        if (versions && (!version || version in versions)) {
          return true;
        } else {
          return false;
        }
      },
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId;
        node.systemId = systemId;
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        this.insertBefore(newChild, oldChild);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (map[n] == namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (prefix in map) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns == "http://www.w3.org/2000/xmlns/") {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns == "http://www.w3.org/2000/xmlns/") {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function _insertBefore(parentNode, newChild, nextChild) {
      var cp = newChild.parentNode;
      if (cp) {
        cp.removeChild(newChild);
      }
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = newChild.firstChild;
        if (newFirst == null) {
          return newChild;
        }
        var newLast = newChild.lastChild;
      } else {
        newFirst = newLast = newChild;
      }
      var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = nextChild;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parentNode.firstChild = newFirst;
      }
      if (nextChild == null) {
        parentNode.lastChild = newLast;
      } else {
        nextChild.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parentNode;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        newChild.firstChild = newChild.lastChild = null;
      }
      return newChild;
    }
    function _appendSingleChild(parentNode, newChild) {
      var cp = newChild.parentNode;
      if (cp) {
        var pre = parentNode.lastChild;
        cp.removeChild(newChild);
        var pre = parentNode.lastChild;
      }
      var pre = parentNode.lastChild;
      newChild.parentNode = parentNode;
      newChild.previousSibling = pre;
      newChild.nextSibling = null;
      if (pre) {
        pre.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      getElementsByClassName: function(className) {
        var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base.documentElement, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE) {
              if (pattern.test(node.getAttribute("class"))) {
                ls.push(node);
              }
            }
          });
          return ls;
        });
      },
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name2) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name2;
        node.nodeName = name2;
        node.localName = name2;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name2) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name2;
        return node;
      },
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name2) {
        return this.getAttributeNode(name2) != null;
      },
      getAttribute: function(name2) {
        var attr = this.getAttributeNode(name2);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name2) {
        return this.attributes.getNamedItem(name2);
      },
      setAttribute: function(name2, value) {
        var attr = this.ownerDocument.createAttribute(name2);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name2) {
        var attr = this.getAttributeNode(name2);
        attr && this.removeAttributeNode(attr);
      },
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!prefix && !uri) {
        return false;
      }
      if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == "http://www.w3.org/2000/xmlns/") {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix == prefix) {
          return ns.namespace != uri;
        }
      }
      return true;
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          if (!visibleNamespaces)
            visibleNamespaces = [];
          var startVisibleNamespaces = visibleNamespaces.length;
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = htmlns === node.namespaceURI || isHTML;
          buf.push("<", nodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              var ns = prefix ? " xmlns:" + prefix : " xmlns";
              buf.push(ns, '="', uri, '"');
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            if (uri) {
              var ns = prefix ? " xmlns:" + prefix : " xmlns";
              buf.push(ns, '="', uri, '"');
              visibleNamespaces.push({ prefix, namespace: uri });
            }
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
                child = child.nextSibling;
              }
            }
            buf.push("</", nodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return buf.push(" ", node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
        case TEXT_NODE:
          return buf.push(
            node.data.replace(/[<&]/g, _xmlEncoder).replace(/]]>/g, "]]&gt;")
          );
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.Node = Node;
    exports.DOMException = DOMException;
    exports.DOMImplementation = DOMImplementation;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/xmldom/lib/dom-parser.js"(exports) {
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? htmlEntity.entityMap : { "lt": "<", "gt": ">", "amp": "&", "quot": '"', "apos": "'" };
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = "http://www.w3.org/1999/xhtml";
      }
      defaultNSMap.xml = defaultNSMap.xml || "http://www.w3.org/XML/1998/namespace";
      if (source && typeof source === "string") {
        sax2.parse(source, defaultNSMap, entityMap);
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn2 = errorImpl[key];
        if (!fn2 && isCallback) {
          fn2 = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn2 && function(msg) {
          fn2("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name2) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name2, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name2, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
        }
      },
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    var htmlEntity = require_entities();
    var sax = require_sax();
    var XMLReader = sax.XMLReader;
    var ParseError = sax.ParseError;
    var DOMImplementation = exports.DOMImplementation = require_dom().DOMImplementation;
    exports.XMLSerializer = require_dom().XMLSerializer;
    exports.DOMParser = DOMParser;
    exports.__DOMHandler = DOMHandler;
  }
});

// src/xmlInfo.js
var require_xmlInfo = __commonJS({
  "src/xmlInfo.js"(exports, module2) {
    var fs = require("fs");
    var xpath = require_xpath();
    var Dom = require_dom_parser().DOMParser;
    function xmlInfo2(xmlFile2, xpathToSearch2, debug2 = false) {
      console.log(`File to read: ${xmlFile2}`);
      console.log(`XPath: ${xpathToSearch2}`);
      const data = fs.readFileSync(xmlFile2, "utf8");
      console.log("File was read successfully. Proceeding to parse DOM.");
      const doc = new Dom().parseFromString(data);
      if (debug2) {
        console.log("Debug output: Document.");
        console.log(doc);
      }
      const nodes = xpath.select(xpathToSearch2, doc);
      if (debug2) {
        console.log("Debug output: Nodes.");
        console.log(nodes);
      }
      console.log(`Found ${nodes.length} nodes.`);
      if (nodes.length) {
        const output = [];
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const firstChild = node.firstChild;
          if (firstChild) {
            output.push(firstChild.data);
          } else {
            output.push(node.value);
          }
        }
        return output;
      } else {
        throw new Error("Your xpath did not return any nodes.");
      }
    }
    module2.exports = xmlInfo2;
  }
});

// node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/minimist/index.js"(exports, module2) {
    module2.exports = function(args, opts) {
      if (!opts)
        opts = {};
      var flags = { bools: {}, strings: {}, unknownFn: null };
      if (typeof opts["unknown"] === "function") {
        flags.unknownFn = opts["unknown"];
      }
      if (typeof opts["boolean"] === "boolean" && opts["boolean"]) {
        flags.allBools = true;
      } else {
        [].concat(opts["boolean"]).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          flags.strings[aliases[key2]] = true;
        }
      });
      var defaults = opts["default"] || {};
      var argv2 = { _: [] };
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false)
            return;
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv2, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x) {
          setKey(argv2, x.split("."), value2);
        });
      }
      function setKey(obj, keys, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2))
            return;
          if (o[key2] === void 0)
            o[key2] = {};
          if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype)
            o[key2] = {};
          if (o[key2] === Array.prototype)
            o[key2] = [];
          o = o[key2];
        }
        var key2 = keys[keys.length - 1];
        if (isConstructorOrProto(o, key2))
          return;
        if (o === Object.prototype || o === Number.prototype || o === String.prototype)
          o = {};
        if (o === Array.prototype)
          o = [];
        if (o[key2] === void 0 || flags.bools[key2] || typeof o[key2] === "boolean") {
          o[key2] = value2;
        } else if (Array.isArray(o[key2])) {
          o[key2].push(value2);
        } else {
          o[key2] = [o[key2], value2];
        }
      }
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          var key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          var key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          var key = arg.match(/^--(.+)/)[1];
          var next = args[i + 1];
          if (next !== void 0 && !/^-/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i++;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i++;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            var next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
              setArg(letters[j], next.split("=")[1], arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          var key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i++;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i++;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv2._.push(
              flags.strings["_"] || !isNumber(arg) ? arg : Number(arg)
            );
          }
          if (opts.stopEarly) {
            argv2._.push.apply(argv2._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function(key2) {
        if (!hasKey(argv2, key2.split("."))) {
          setKey(argv2, key2.split("."), defaults[key2]);
          (aliases[key2] || []).forEach(function(x) {
            setKey(argv2, x.split("."), defaults[key2]);
          });
        }
      });
      if (opts["--"]) {
        argv2["--"] = new Array();
        notFlags.forEach(function(key2) {
          argv2["--"].push(key2);
        });
      } else {
        notFlags.forEach(function(key2) {
          argv2._.push(key2);
        });
      }
      return argv2;
    };
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    function isNumber(x) {
      if (typeof x === "number")
        return true;
      if (/^0x[0-9a-f]+$/i.test(x))
        return true;
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
  }
});

// src/index.js
var core = require_core();
var xmlInfo = require_xmlInfo();
var argv = require_minimist()(process.argv.slice(2));
var xmlFile = typeof argv.f !== "undefined" ? argv.f : process.env.GITHUB_WORKSPACE + "/" + core.getInput("xml-file", { required: true });
var xpathToSearch = typeof argv.p !== "undefined" ? argv.p : core.getInput("xpath", { required: true });
var debug = typeof argv.d !== "undefined";
try {
  console.log("Welcome to Get-XML-Version.");
  const output = xmlInfo(xmlFile, xpathToSearch, debug);
  console.log(`Output: ${output}`);
  core.setOutput("info", output);
} catch (error) {
  core.setFailed(error.message);
}
