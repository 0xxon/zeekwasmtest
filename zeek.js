
var createZeekModule = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName = _scriptName || __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

// Support for growable heap + pthreads, where the buffer may change, so JS views
// must be updated.
function GROWABLE_HEAP_I8() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP8;
}

function GROWABLE_HEAP_U8() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU8;
}

function GROWABLE_HEAP_I16() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP16;
}

function GROWABLE_HEAP_U16() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU16;
}

function GROWABLE_HEAP_I32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAP32;
}

function GROWABLE_HEAP_U32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPU32;
}

function GROWABLE_HEAP_F32() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPF32;
}

function GROWABLE_HEAP_F64() {
  if (wasmMemory.buffer != HEAP8.buffer) {
    updateMemoryViews();
  }
  return HEAPF64;
}

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;

var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});

[ "getExceptionMessage", "incrementExceptionRefcount", "decrementExceptionRefcount", "___indirect_function_table", "__emscripten_proxy_main", "_main", "onRuntimeInitialized" ].forEach(prop => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
      set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).
// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";

var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -sPROXY_TO_WORKER) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)
// The way we signal to a worker that it is hosting a pthread is to construct
// it with a specific name.
var ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && self.name?.startsWith("em-pthread");

if (ENVIRONMENT_IS_PTHREAD) {
  assert(!globalThis.moduleLoaded, "module should only be loaded once on each pthread worker");
  globalThis.moduleLoaded = true;
}

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  var worker_threads = require("worker_threads");
  global.Worker = worker_threads.Worker;
  ENVIRONMENT_IS_WORKER = !worker_threads.isMainThread;
  // Under node we set `workerData` to `em-pthread` to signal that the worker
  // is hosting a pthread.
  ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && worker_threads["workerData"] == "em-pthread";
}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: /tmp/tmpffm1y0dg.js
if (!Module["expectedDataFileDownloads"]) {
  Module["expectedDataFileDownloads"] = 0;
}

Module["expectedDataFileDownloads"]++;

(() => {
  // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
  var isPthread = typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD;
  var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != "undefined" && ENVIRONMENT_IS_WASM_WORKER;
  if (isPthread || isWasmWorker) return;
  function loadPackage(metadata) {
    var PACKAGE_PATH = "";
    if (typeof window === "object") {
      PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
    } else if (typeof process === "undefined" && typeof location !== "undefined") {
      // web worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
    }
    var PACKAGE_NAME = "src/zeek.data";
    var REMOTE_PACKAGE_BASE = "zeek.data";
    if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
      Module["locateFile"] = Module["locateFilePackage"];
      err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
    }
    var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
    var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      if (typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string") {
        require("fs").readFile(packageName, (err, contents) => {
          if (err) {
            errback(err);
          } else {
            callback(contents.buffer);
          }
        });
        return;
      }
      Module["dataFileDownloads"] ??= {};
      fetch(packageName).catch(cause => Promise.reject(new Error(`Network Error: ${packageName}`, {
        cause
      }))).then(// If fetch fails, rewrite the error to include the failing URL & the cause.
      response => {
        if (!response.ok) {
          return Promise.reject(new Error(`${response.status}: ${response.url}`));
        }
        if (!response.body && response.arrayBuffer) {
          // If we're using the polyfill, readers won't be available...
          return response.arrayBuffer().then(callback);
        }
        const reader = response.body.getReader();
        const iterate = () => reader.read().then(handleChunk).catch(cause => Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {
          cause
        })));
        const chunks = [];
        const headers = response.headers;
        const total = Number(headers.get("Content-Length") ?? packageSize);
        let loaded = 0;
        const handleChunk = ({done, value}) => {
          if (!done) {
            chunks.push(value);
            loaded += value.length;
            Module["dataFileDownloads"][packageName] = {
              loaded,
              total
            };
            let totalLoaded = 0;
            let totalSize = 0;
            for (const download of Object.values(Module["dataFileDownloads"])) {
              totalLoaded += download.loaded;
              totalSize += download.total;
            }
            Module["setStatus"]?.(`Downloading data... (${totalLoaded}/${totalSize})`);
            return iterate();
          } else {
            const packageData = new Uint8Array(chunks.map(c => c.length).reduce((a, b) => a + b, 0));
            let offset = 0;
            for (const chunk of chunks) {
              packageData.set(chunk, offset);
              offset += chunk.length;
            }
            callback(packageData.buffer);
          }
        };
        Module["setStatus"]?.("Downloading data...");
        return iterate();
      });
    }
    function handleError(error) {
      console.error("package error:", error);
    }
    var fetchedCallback = null;
    var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
    if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, data => {
      if (fetchedCallback) {
        fetchedCallback(data);
        fetchedCallback = null;
      } else {
        fetched = data;
      }
    }, handleError);
    function runWithFS(Module) {
      function assert(check, msg) {
        if (!check) throw msg + (new Error).stack;
      }
      Module["FS_createPath"]("/", "usr", true, true);
      Module["FS_createPath"]("/usr", "local", true, true);
      Module["FS_createPath"]("/usr/local", "zeek", true, true);
      Module["FS_createPath"]("/usr/local/zeek", "share", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share", "zeek", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "base", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "bif", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/bif", "plugins", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "files", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/files", "extract", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/files", "hash", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/files", "pe", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/files", "x509", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "frameworks", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "analyzer", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "broker", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "cluster", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/cluster", "nodes", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "config", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "control", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "files", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/files", "magic", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "input", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/input", "readers", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "intel", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "logging", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/logging", "postprocessors", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/logging", "writers", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "netcontrol", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/netcontrol", "plugins", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "notice", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/notice", "actions", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "openflow", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/openflow", "plugins", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "packet-filter", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "reporter", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "signatures", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "software", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "spicy", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "storage", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "sumstats", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks/sumstats", "plugins", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "supervisor", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "telemetry", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/frameworks", "tunnels", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "misc", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "packet-protocols", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ayiya", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ethernet", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "fddi", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "geneve", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "gre", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "gtpv1", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "icmp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ieee802_11", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ieee802_11_radio", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ip", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "iptunnel", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "linux_sll", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "linux_sll2", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "llc", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "mpls", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "nflog", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "novell_802_3", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "null", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "pbb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ppp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "ppp_serial", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "pppoe", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "root", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "skip", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "snap", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "tcp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "teredo", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "udp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "vlan", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "vntag", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/packet-protocols", "vxlan", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "protocols", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "conn", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "dce-rpc", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "dhcp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "dnp3", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "dns", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "finger", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ftp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "http", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "imap", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "irc", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "krb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ldap", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "modbus", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "mqtt", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "mysql", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ntlm", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ntp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "pop3", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "postgresql", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "quic", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "radius", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "rdp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "redis", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "rfb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "sip", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "smb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "smtp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "snmp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "socks", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ssh", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "ssl", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "syslog", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "tunnels", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "websocket", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base/protocols", "xmpp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/base", "utils", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "builtin-plugins", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "policy", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "files", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/files", "x509", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "frameworks", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "analyzer", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "cluster", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/cluster", "backend", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend", "broker", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend", "zeromq", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/cluster", "nodes-experimental", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/cluster", "websocket", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "conn_key", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "control", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "files", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "intel", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/intel", "seen", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "management", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/management", "agent", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/management", "controller", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/management", "node", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/management", "supervisor", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "netcontrol", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "notice", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/notice", "actions", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/notice", "extend-email", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "packet-filter", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "signatures", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "software", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "spicy", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "storage", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/storage", "backend", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/storage/backend", "redis", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks/storage/backend", "sqlite", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/frameworks", "telemetry", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "integration", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/integration", "collective-intel", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "misc", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/misc", "detect-traceroute", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "protocols", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "conn", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "dhcp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "dns", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "ftp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "http", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "krb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "modbus", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "mysql", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "rdp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "smb", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "smtp", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "ssh", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy/protocols", "ssl", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek/policy", "tuning", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "site", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "spicy", true, true);
      Module["FS_createPath"]("/usr/local/zeek/share/zeek", "zeekygen", true, true);
      /** @constructor */ function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module["addRunDependency"](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
          Module["removeRunDependency"](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };
      var files = metadata["files"];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"] || 0).open("GET", files[i]["filename"]);
      }
      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, "Loading data file failed.");
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
        var byteArray = new Uint8Array(arrayBuffer);
        // Reuse the bytearray from the XHR as the source for file reads.
        DataRequest.prototype.byteArray = byteArray;
        var files = metadata["files"];
        for (var i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module["removeRunDependency"]("datafile_src/zeek.data");
      }
      Module["addRunDependency"]("datafile_src/zeek.data");
      if (!Module["preloadResults"]) Module["preloadResults"] = {};
      Module["preloadResults"][PACKAGE_NAME] = {
        fromCache: false
      };
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    }
    if (Module["calledRun"]) {
      runWithFS(Module);
    } else {
      if (!Module["preRun"]) Module["preRun"] = [];
      Module["preRun"].push(runWithFS);
    }
  }
  // FS is not initialized yet, wait for it
  loadPackage({
    "files": [ {
      "filename": "/usr/local/zeek/share/zeek/CMakeLists.txt",
      "start": 0,
      "end": 791
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/CPP-load.bif.zeek",
      "start": 791,
      "end": 1226
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/__load__.zeek",
      "start": 1226,
      "end": 2085
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/analyzer.bif.zeek",
      "start": 2085,
      "end": 2976
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/bloom-filter.bif.zeek",
      "start": 2976,
      "end": 10289
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/cardinality-counter.bif.zeek",
      "start": 10289,
      "end": 12700
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/cluster.bif.zeek",
      "start": 12700,
      "end": 15723
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/communityid.bif.zeek",
      "start": 15723,
      "end": 16189
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/const.bif.zeek",
      "start": 16189,
      "end": 16568
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/event.bif.zeek",
      "start": 16568,
      "end": 57134
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/file_analysis.bif.zeek",
      "start": 57134,
      "end": 59334
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/input.bif.zeek",
      "start": 59334,
      "end": 60100
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/logging.bif.zeek",
      "start": 60100,
      "end": 61587
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/mmdb.bif.zeek",
      "start": 61587,
      "end": 63058
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/option.bif.zeek",
      "start": 63058,
      "end": 65897
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/packet_analysis.bif.zeek",
      "start": 65897,
      "end": 67791
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/pcap.bif.zeek",
      "start": 67791,
      "end": 71114
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_ARP.events.bif.zeek",
      "start": 71114,
      "end": 73335
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_AsciiReader.ascii.bif.zeek",
      "start": 73335,
      "end": 73553
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_AsciiWriter.ascii.bif.zeek",
      "start": 73553,
      "end": 73780
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_BenchmarkReader.benchmark.bif.zeek",
      "start": 73780,
      "end": 74009
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_BinaryReader.binary.bif.zeek",
      "start": 74009,
      "end": 74225
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_BitTorrent.events.bif.zeek",
      "start": 74225,
      "end": 85312
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_ConfigReader.config.bif.zeek",
      "start": 85312,
      "end": 85529
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_ConnSize.events.bif.zeek",
      "start": 85529,
      "end": 88828
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_ConnSize.functions.bif.zeek",
      "start": 88828,
      "end": 92839
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DCE_RPC.consts.bif.zeek",
      "start": 92839,
      "end": 93036
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DCE_RPC.events.bif.zeek",
      "start": 93036,
      "end": 100713
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DCE_RPC.types.bif.zeek",
      "start": 100713,
      "end": 101328
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DHCP.events.bif.zeek",
      "start": 101328,
      "end": 102047
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DHCP.types.bif.zeek",
      "start": 102047,
      "end": 102261
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DNP3.events.bif.zeek",
      "start": 102261,
      "end": 116877
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_DNS.events.bif.zeek",
      "start": 116877,
      "end": 157106
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FTP.events.bif.zeek",
      "start": 157106,
      "end": 158862
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FTP.functions.bif.zeek",
      "start": 158862,
      "end": 161215
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_File.events.bif.zeek",
      "start": 161215,
      "end": 161878
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FileEntropy.events.bif.zeek",
      "start": 161878,
      "end": 162306
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FileExtract.events.bif.zeek",
      "start": 162306,
      "end": 163255
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FileExtract.functions.bif.zeek",
      "start": 163255,
      "end": 163693
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_FileHash.events.bif.zeek",
      "start": 163693,
      "end": 164346
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Finger.events.bif.zeek",
      "start": 164346,
      "end": 165918
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_GSSAPI.events.bif.zeek",
      "start": 165918,
      "end": 166304
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_GTPv1.events.bif.zeek",
      "start": 166304,
      "end": 169634
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_GTPv1.functions.bif.zeek",
      "start": 169634,
      "end": 169937
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Geneve.events.bif.zeek",
      "start": 169937,
      "end": 170656
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Geneve.functions.bif.zeek",
      "start": 170656,
      "end": 171204
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Gnutella.events.bif.zeek",
      "start": 171204,
      "end": 175216
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_HTTP.events.bif.zeek",
      "start": 175216,
      "end": 186583
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_HTTP.functions.bif.zeek",
      "start": 186583,
      "end": 187633
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_ICMP.events.bif.zeek",
      "start": 187633,
      "end": 201915
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_IMAP.events.bif.zeek",
      "start": 201915,
      "end": 202600
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_IRC.events.bif.zeek",
      "start": 202600,
      "end": 236962
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Ident.events.bif.zeek",
      "start": 236962,
      "end": 239414
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_KRB.events.bif.zeek",
      "start": 239414,
      "end": 246807
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_KRB.types.bif.zeek",
      "start": 246807,
      "end": 247045
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Login.events.bif.zeek",
      "start": 247045,
      "end": 265971
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Login.functions.bif.zeek",
      "start": 265971,
      "end": 267590
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_MIME.consts.bif.zeek",
      "start": 267590,
      "end": 267784
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_MIME.events.bif.zeek",
      "start": 267784,
      "end": 277660
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_MQTT.events.bif.zeek",
      "start": 277660,
      "end": 281133
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_MQTT.types.bif.zeek",
      "start": 281133,
      "end": 281329
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Modbus.events.bif.zeek",
      "start": 281329,
      "end": 293808
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_MySQL.events.bif.zeek",
      "start": 293808,
      "end": 299772
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NCP.consts.bif.zeek",
      "start": 299772,
      "end": 299965
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NCP.events.bif.zeek",
      "start": 299965,
      "end": 301987
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NTLM.events.bif.zeek",
      "start": 301987,
      "end": 303210
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NTLM.types.bif.zeek",
      "start": 303210,
      "end": 303423
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NTP.events.bif.zeek",
      "start": 303423,
      "end": 304140
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NTP.types.bif.zeek",
      "start": 304140,
      "end": 304349
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NetBIOS.events.bif.zeek",
      "start": 304349,
      "end": 315131
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NetBIOS.functions.bif.zeek",
      "start": 315131,
      "end": 316278
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_NoneWriter.none.bif.zeek",
      "start": 316278,
      "end": 316489
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_PE.events.bif.zeek",
      "start": 316489,
      "end": 318832
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_POP3.consts.bif.zeek",
      "start": 318832,
      "end": 319027
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_POP3.events.bif.zeek",
      "start": 319027,
      "end": 325698
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_PPPoE.functions.bif.zeek",
      "start": 325698,
      "end": 326222
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RADIUS.events.bif.zeek",
      "start": 326222,
      "end": 327122
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RDP.events.bif.zeek",
      "start": 327122,
      "end": 332620
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RDP.types.bif.zeek",
      "start": 332620,
      "end": 332834
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RFB.events.bif.zeek",
      "start": 332834,
      "end": 335159
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RPC.events.bif.zeek",
      "start": 335159,
      "end": 378683
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_RawReader.raw.bif.zeek",
      "start": 378683,
      "end": 378889
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SIP.events.bif.zeek",
      "start": 378889,
      "end": 382850
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.consts.bif.zeek",
      "start": 382850,
      "end": 383045
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.events.bif.zeek",
      "start": 383045,
      "end": 384177
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_check_directory.bif.zeek",
      "start": 384177,
      "end": 385554
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_close.bif.zeek",
      "start": 385554,
      "end": 386319
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_create_directory.bif.zeek",
      "start": 386319,
      "end": 387945
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_echo.bif.zeek",
      "start": 387945,
      "end": 389373
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_logoff_andx.bif.zeek",
      "start": 389373,
      "end": 390240
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_negotiate.bif.zeek",
      "start": 390240,
      "end": 391785
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_nt_cancel.bif.zeek",
      "start": 391785,
      "end": 392486
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_nt_create_andx.bif.zeek",
      "start": 392486,
      "end": 394161
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_query_information.bif.zeek",
      "start": 394161,
      "end": 395085
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_read_andx.bif.zeek",
      "start": 395085,
      "end": 396672
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_session_setup_andx.bif.zeek",
      "start": 396672,
      "end": 398189
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_transaction.bif.zeek",
      "start": 398189,
      "end": 400212
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_transaction2.bif.zeek",
      "start": 400212,
      "end": 403790
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_transaction2_secondary.bif.zeek",
      "start": 403790,
      "end": 404676
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_transaction_secondary.bif.zeek",
      "start": 404676,
      "end": 405629
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_tree_connect_andx.bif.zeek",
      "start": 405629,
      "end": 407264
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_tree_disconnect.bif.zeek",
      "start": 407264,
      "end": 408055
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_com_write_andx.bif.zeek",
      "start": 408055,
      "end": 409638
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb1_events.bif.zeek",
      "start": 409638,
      "end": 411660
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_close.bif.zeek",
      "start": 411660,
      "end": 413132
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_create.bif.zeek",
      "start": 413132,
      "end": 414576
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_negotiate.bif.zeek",
      "start": 414576,
      "end": 416025
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_read.bif.zeek",
      "start": 416025,
      "end": 416934
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_session_setup.bif.zeek",
      "start": 416934,
      "end": 418495
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_set_info.bif.zeek",
      "start": 418495,
      "end": 430510
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_transform_header.bif.zeek",
      "start": 430510,
      "end": 431239
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_tree_connect.bif.zeek",
      "start": 431239,
      "end": 432680
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_tree_disconnect.bif.zeek",
      "start": 432680,
      "end": 433819
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_com_write.bif.zeek",
      "start": 433819,
      "end": 435308
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.smb2_events.bif.zeek",
      "start": 435308,
      "end": 437071
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMB.types.bif.zeek",
      "start": 437071,
      "end": 437278
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMTP.consts.bif.zeek",
      "start": 437278,
      "end": 437473
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMTP.events.bif.zeek",
      "start": 437473,
      "end": 442416
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SMTP.functions.bif.zeek",
      "start": 442416,
      "end": 442800
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SNMP.events.bif.zeek",
      "start": 442800,
      "end": 448655
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SNMP.types.bif.zeek",
      "start": 448655,
      "end": 448893
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SOCKS.events.bif.zeek",
      "start": 448893,
      "end": 450587
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SQLiteReader.sqlite.bif.zeek",
      "start": 450587,
      "end": 450804
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SQLiteWriter.sqlite.bif.zeek",
      "start": 450804,
      "end": 451438
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSH.events.bif.zeek",
      "start": 451438,
      "end": 469552
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSH.types.bif.zeek",
      "start": 469552,
      "end": 469775
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSL.consts.bif.zeek",
      "start": 469775,
      "end": 469970
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSL.events.bif.zeek",
      "start": 469970,
      "end": 508294
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSL.functions.bif.zeek",
      "start": 508294,
      "end": 509652
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_SSL.types.bif.zeek",
      "start": 509652,
      "end": 509876
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_StreamEvent.events.bif.zeek",
      "start": 509876,
      "end": 511323
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Syslog.events.bif.zeek",
      "start": 511323,
      "end": 512116
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_TCP.events.bif.zeek",
      "start": 512116,
      "end": 529738
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_TCP.functions.bif.zeek",
      "start": 529738,
      "end": 533382
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_TCP.types.bif.zeek",
      "start": 533382,
      "end": 533575
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Teredo.events.bif.zeek",
      "start": 533575,
      "end": 536472
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_Teredo.functions.bif.zeek",
      "start": 536472,
      "end": 536778
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_UDP.events.bif.zeek",
      "start": 536778,
      "end": 539181
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_VXLAN.events.bif.zeek",
      "start": 539181,
      "end": 539893
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_WebSocket.consts.bif.zeek",
      "start": 539893,
      "end": 540092
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_WebSocket.events.bif.zeek",
      "start": 540092,
      "end": 542557
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_WebSocket.functions.bif.zeek",
      "start": 542557,
      "end": 543488
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_WebSocket.types.bif.zeek",
      "start": 543488,
      "end": 543707
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_X509.events.bif.zeek",
      "start": 543707,
      "end": 547768
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_X509.functions.bif.zeek",
      "start": 547768,
      "end": 556636
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_X509.ocsp_events.bif.zeek",
      "start": 556636,
      "end": 561912
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_X509.types.bif.zeek",
      "start": 561912,
      "end": 562114
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/Zeek_XMPP.events.bif.zeek",
      "start": 562114,
      "end": 562504
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/plugins/__load__.zeek",
      "start": 562504,
      "end": 567573
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/reporter.bif.zeek",
      "start": 567573,
      "end": 572611
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/stats.bif.zeek",
      "start": 572611,
      "end": 580466
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/storage-async.bif.zeek",
      "start": 580466,
      "end": 581444
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/storage-events.bif.zeek",
      "start": 581444,
      "end": 582835
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/storage-sync.bif.zeek",
      "start": 582835,
      "end": 583805
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/storage.bif.zeek",
      "start": 583805,
      "end": 584731
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/strings.bif.zeek",
      "start": 584731,
      "end": 607826
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/supervisor.bif.zeek",
      "start": 607826,
      "end": 608630
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/telemetry_consts.bif.zeek",
      "start": 608630,
      "end": 608759
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/telemetry_functions.bif.zeek",
      "start": 608759,
      "end": 611027
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/telemetry_types.bif.zeek",
      "start": 611027,
      "end": 611472
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/top-k.bif.zeek",
      "start": 611472,
      "end": 616233
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/types.bif.zeek",
      "start": 616233,
      "end": 619876
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/zeek.bif.zeek",
      "start": 619876,
      "end": 726145
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/bif/zeekygen.bif.zeek",
      "start": 726145,
      "end": 729366
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/extract/README",
      "start": 729366,
      "end": 729429
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/extract/__load__.zeek",
      "start": 729429,
      "end": 729441
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/extract/main.zeek",
      "start": 729441,
      "end": 733007
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/hash/README",
      "start": 733007,
      "end": 733065
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/hash/__load__.zeek",
      "start": 733065,
      "end": 733077
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/hash/main.zeek",
      "start": 733077,
      "end": 733680
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/pe/README",
      "start": 733680,
      "end": 733732
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/pe/__load__.zeek",
      "start": 733732,
      "end": 733759
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/pe/consts.zeek",
      "start": 733759,
      "end": 739709
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/pe/main.zeek",
      "start": 739709,
      "end": 743876
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/x509/README",
      "start": 743876,
      "end": 743991
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/x509/__load__.zeek",
      "start": 743991,
      "end": 744054
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/x509/certificate-event-cache.zeek",
      "start": 744054,
      "end": 748421
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/x509/log-ocsp.zeek",
      "start": 748421,
      "end": 750625
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/files/x509/main.zeek",
      "start": 750625,
      "end": 764139
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/analyzer/README",
      "start": 764139,
      "end": 764343
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/analyzer/__load__.zeek",
      "start": 764343,
      "end": 764384
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/analyzer/dpd.zeek",
      "start": 764384,
      "end": 767724
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/analyzer/logging.zeek",
      "start": 767724,
      "end": 771385
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/analyzer/main.zeek",
      "start": 771385,
      "end": 782195
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/README",
      "start": 782195,
      "end": 782314
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/__load__.zeek",
      "start": 782314,
      "end": 782374
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/backpressure.zeek",
      "start": 782374,
      "end": 783670
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/log.zeek",
      "start": 783670,
      "end": 786888
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/main.zeek",
      "start": 786888,
      "end": 805084
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/broker/store.zeek",
      "start": 805084,
      "end": 840038
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/README",
      "start": 840038,
      "end": 840131
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/__load__.zeek",
      "start": 840131,
      "end": 841805
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/broker-stores.zeek",
      "start": 841805,
      "end": 843711
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/main.zeek",
      "start": 843711,
      "end": 862674
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/nodes/logger.zeek",
      "start": 862674,
      "end": 865587
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/nodes/manager.zeek",
      "start": 865587,
      "end": 866533
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/nodes/proxy.zeek",
      "start": 866533,
      "end": 867151
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/nodes/worker.zeek",
      "start": 867151,
      "end": 868057
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/pools.zeek",
      "start": 868057,
      "end": 880586
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/pubsub.zeek",
      "start": 880586,
      "end": 881884
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/setup-connections.zeek",
      "start": 881884,
      "end": 882e3
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/setup-subscriptions.zeek",
      "start": 882e3,
      "end": 882913
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/supervisor.zeek",
      "start": 882913,
      "end": 884341
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/telemetry.zeek",
      "start": 884341,
      "end": 885527
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/cluster/types.zeek",
      "start": 885527,
      "end": 890340
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/config/README",
      "start": 890340,
      "end": 890448
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/config/__load__.zeek",
      "start": 890448,
      "end": 890489
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/config/input.zeek",
      "start": 890489,
      "end": 892499
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/config/main.zeek",
      "start": 892499,
      "end": 897739
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/config/weird.zeek",
      "start": 897739,
      "end": 899029
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/control/README",
      "start": 899029,
      "end": 899222
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/control/__load__.zeek",
      "start": 899222,
      "end": 899234
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/control/main.zeek",
      "start": 899234,
      "end": 901880
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/README",
      "start": 901880,
      "end": 902042
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/__load__.zeek",
      "start": 902042,
      "end": 902069
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/__load__.zeek",
      "start": 902069,
      "end": 902316
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/archive.sig",
      "start": 902316,
      "end": 906364
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/audio.sig",
      "start": 906364,
      "end": 906604
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/executable.sig",
      "start": 906604,
      "end": 908339
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/font.sig",
      "start": 908339,
      "end": 909393
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/general.sig",
      "start": 909393,
      "end": 918828
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/image.sig",
      "start": 918828,
      "end": 921939
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/java.sig",
      "start": 921939,
      "end": 922681
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/libmagic.sig",
      "start": 922681,
      "end": 988320
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/office.sig",
      "start": 988320,
      "end": 1000614
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/programming.sig",
      "start": 1000614,
      "end": 1003060
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/python.sig",
      "start": 1003060,
      "end": 1005972
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/magic/video.sig",
      "start": 1005972,
      "end": 1008004
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/files/main.zeek",
      "start": 1008004,
      "end": 1026796
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/README",
      "start": 1026796,
      "end": 1026910
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/__load__.zeek",
      "start": 1026910,
      "end": 1027060
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/main.zeek",
      "start": 1027060,
      "end": 1037071
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/ascii.zeek",
      "start": 1037071,
      "end": 1039313
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/benchmark.zeek",
      "start": 1039313,
      "end": 1039836
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/binary.zeek",
      "start": 1039836,
      "end": 1040313
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/config.zeek",
      "start": 1040313,
      "end": 1041976
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/raw.zeek",
      "start": 1041976,
      "end": 1042679
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/input/readers/sqlite.zeek",
      "start": 1042679,
      "end": 1043502
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/README",
      "start": 1043502,
      "end": 1043671
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/__load__.zeek",
      "start": 1043671,
      "end": 1043942
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/cluster.zeek",
      "start": 1043942,
      "end": 1048377
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/files.zeek",
      "start": 1048377,
      "end": 1050483
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/input.zeek",
      "start": 1050483,
      "end": 1053608
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/intel/main.zeek",
      "start": 1053608,
      "end": 1075860
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/README",
      "start": 1075860,
      "end": 1075937
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/__load__.zeek",
      "start": 1075937,
      "end": 1076039
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/main.zeek",
      "start": 1076039,
      "end": 1115589
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/postprocessors/README",
      "start": 1115589,
      "end": 1115642
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/postprocessors/__load__.zeek",
      "start": 1115642,
      "end": 1115667
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/postprocessors/scp.zeek",
      "start": 1115667,
      "end": 1118511
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/postprocessors/sftp.zeek",
      "start": 1118511,
      "end": 1121523
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/writers/ascii.zeek",
      "start": 1121523,
      "end": 1125570
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/writers/none.zeek",
      "start": 1125570,
      "end": 1126012
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/logging/writers/sqlite.zeek",
      "start": 1126012,
      "end": 1128272
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/README",
      "start": 1128272,
      "end": 1128431
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/__load__.zeek",
      "start": 1128431,
      "end": 1128658
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/cluster.zeek",
      "start": 1128658,
      "end": 1132953
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/drop.zeek",
      "start": 1132953,
      "end": 1136324
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/main.zeek",
      "start": 1136324,
      "end": 1167443
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/non-cluster.zeek",
      "start": 1167443,
      "end": 1168691
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugin.zeek",
      "start": 1168691,
      "end": 1172230
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/README",
      "start": 1172230,
      "end": 1172268
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/__load__.zeek",
      "start": 1172268,
      "end": 1172377
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/acld.zeek",
      "start": 1172377,
      "end": 1181082
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/broker.zeek",
      "start": 1181082,
      "end": 1187259
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/debug.zeek",
      "start": 1187259,
      "end": 1190613
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/openflow.zeek",
      "start": 1190613,
      "end": 1203600
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/plugins/packetfilter.zeek",
      "start": 1203600,
      "end": 1205816
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/shunt.zeek",
      "start": 1205816,
      "end": 1207783
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/netcontrol/types.zeek",
      "start": 1207783,
      "end": 1213432
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/README",
      "start": 1213432,
      "end": 1213710
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/__load__.zeek",
      "start": 1213710,
      "end": 1213993
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/actions/add-geodata.zeek",
      "start": 1213993,
      "end": 1215568
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/actions/email_admin.zeek",
      "start": 1215568,
      "end": 1216478
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/actions/page.zeek",
      "start": 1216478,
      "end": 1217011
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/actions/pp-alarms.zeek",
      "start": 1217011,
      "end": 1223199
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/main.zeek",
      "start": 1223199,
      "end": 1249278
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/notice/weird.zeek",
      "start": 1249278,
      "end": 1267957
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/README",
      "start": 1267957,
      "end": 1268075
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/__load__.zeek",
      "start": 1268075,
      "end": 1268290
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/cluster.zeek",
      "start": 1268290,
      "end": 1271518
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/consts.zeek",
      "start": 1271518,
      "end": 1278417
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/main.zeek",
      "start": 1278417,
      "end": 1287547
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/non-cluster.zeek",
      "start": 1287547,
      "end": 1288511
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/plugins/README",
      "start": 1288511,
      "end": 1288547
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/plugins/__load__.zeek",
      "start": 1288547,
      "end": 1288615
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/plugins/broker.zeek",
      "start": 1288615,
      "end": 1291661
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/plugins/log.zeek",
      "start": 1291661,
      "end": 1293830
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/plugins/ryu.zeek",
      "start": 1293830,
      "end": 1298949
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/openflow/types.zeek",
      "start": 1298949,
      "end": 1303298
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/README",
      "start": 1303298,
      "end": 1303373
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/__load__.zeek",
      "start": 1303373,
      "end": 1303501
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/cluster.zeek",
      "start": 1303501,
      "end": 1303901
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/main.zeek",
      "start": 1303901,
      "end": 1314827
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/netstats.zeek",
      "start": 1314827,
      "end": 1316163
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/packet-filter/utils.zeek",
      "start": 1316163,
      "end": 1318147
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/reporter/README",
      "start": 1318147,
      "end": 1318264
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/reporter/__load__.zeek",
      "start": 1318264,
      "end": 1318277
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/reporter/main.zeek",
      "start": 1318277,
      "end": 1320640
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/signatures/README",
      "start": 1320640,
      "end": 1320875
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/signatures/__load__.zeek",
      "start": 1320875,
      "end": 1320887
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/signatures/main.zeek",
      "start": 1320887,
      "end": 1331296
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/software/README",
      "start": 1331296,
      "end": 1331520
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/software/__load__.zeek",
      "start": 1331520,
      "end": 1331532
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/software/main.zeek",
      "start": 1331532,
      "end": 1347720
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/spicy/__load__.zeek",
      "start": 1347720,
      "end": 1347738
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/spicy/init-bare.zeek",
      "start": 1347738,
      "end": 1349174
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/spicy/init-framework.zeek",
      "start": 1349174,
      "end": 1351843
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/spicy/main.zeek",
      "start": 1351843,
      "end": 1352244
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/storage/__load__.zeek",
      "start": 1352244,
      "end": 1352283
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/storage/async.zeek",
      "start": 1352283,
      "end": 1357077
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/storage/main.zeek",
      "start": 1357077,
      "end": 1358600
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/storage/sync.zeek",
      "start": 1358600,
      "end": 1362287
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/README",
      "start": 1362287,
      "end": 1362404
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/__load__.zeek",
      "start": 1362404,
      "end": 1362665
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/cluster.zeek",
      "start": 1362665,
      "end": 1379336
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/main.zeek",
      "start": 1379336,
      "end": 1396613
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/non-cluster.zeek",
      "start": 1396613,
      "end": 1398896
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/README",
      "start": 1398896,
      "end": 1398942
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/__load__.zeek",
      "start": 1398942,
      "end": 1399102
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/average.zeek",
      "start": 1399102,
      "end": 1399954
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/hll_unique.zeek",
      "start": 1399954,
      "end": 1401983
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/last.zeek",
      "start": 1401983,
      "end": 1403921
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/max.zeek",
      "start": 1403921,
      "end": 1404667
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/min.zeek",
      "start": 1404667,
      "end": 1405412
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/sample.zeek",
      "start": 1405412,
      "end": 1408237
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/std-dev.zeek",
      "start": 1408237,
      "end": 1409020
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/sum.zeek",
      "start": 1409020,
      "end": 1410242
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/topk.zeek",
      "start": 1410242,
      "end": 1411654
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/unique.zeek",
      "start": 1411654,
      "end": 1413713
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/sumstats/plugins/variance.zeek",
      "start": 1413713,
      "end": 1415560
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/supervisor/__load__.zeek",
      "start": 1415560,
      "end": 1415601
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/supervisor/api.zeek",
      "start": 1415601,
      "end": 1422648
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/supervisor/control.zeek",
      "start": 1422648,
      "end": 1427139
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/supervisor/main.zeek",
      "start": 1427139,
      "end": 1430033
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/telemetry/__load__.zeek",
      "start": 1430033,
      "end": 1430046
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/telemetry/main.zeek",
      "start": 1430046,
      "end": 1446823
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/telemetry/options.zeek",
      "start": 1446823,
      "end": 1448931
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/tunnels/README",
      "start": 1448931,
      "end": 1449075
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/tunnels/__load__.zeek",
      "start": 1449075,
      "end": 1449088
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/frameworks/tunnels/main.zeek",
      "start": 1449088,
      "end": 1453835
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/init-bare.zeek",
      "start": 1453835,
      "end": 1693089
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/init-default.zeek",
      "start": 1693089,
      "end": 1695788
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/init-frameworks-and-bifs.zeek",
      "start": 1695788,
      "end": 1697095
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/init-supervisor.zeek",
      "start": 1697095,
      "end": 1697314
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/misc/find-checksum-offloading.zeek",
      "start": 1697314,
      "end": 1700103
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/misc/find-filtered-trace.zeek",
      "start": 1700103,
      "end": 1701701
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/misc/installation.zeek",
      "start": 1701701,
      "end": 1702539
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/misc/installation.zeek.in",
      "start": 1702539,
      "end": 1703362
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/misc/version.zeek",
      "start": 1703362,
      "end": 1708018
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/__load__.zeek",
      "start": 1708018,
      "end": 1709114
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ayiya/__load__.zeek",
      "start": 1709114,
      "end": 1709126
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ayiya/main.zeek",
      "start": 1709126,
      "end": 1709896
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ethernet/__load__.zeek",
      "start": 1709896,
      "end": 1709908
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ethernet/main.zeek",
      "start": 1709908,
      "end": 1712091
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/fddi/__load__.zeek",
      "start": 1712091,
      "end": 1712103
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/fddi/main.zeek",
      "start": 1712103,
      "end": 1712248
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/geneve/__load__.zeek",
      "start": 1712248,
      "end": 1712260
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/geneve/main.zeek",
      "start": 1712260,
      "end": 1713951
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/gre/__load__.zeek",
      "start": 1713951,
      "end": 1713963
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/gre/main.zeek",
      "start": 1713963,
      "end": 1714278
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/gtpv1/__load__.zeek",
      "start": 1714278,
      "end": 1714290
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/gtpv1/main.zeek",
      "start": 1714290,
      "end": 1715431
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/icmp/__load__.zeek",
      "start": 1715431,
      "end": 1715443
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/icmp/main.zeek",
      "start": 1715443,
      "end": 1715513
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ieee802_11/__load__.zeek",
      "start": 1715513,
      "end": 1715525
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ieee802_11/main.zeek",
      "start": 1715525,
      "end": 1716067
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ieee802_11_radio/__load__.zeek",
      "start": 1716067,
      "end": 1716079
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ieee802_11_radio/main.zeek",
      "start": 1716079,
      "end": 1716333
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ip/__load__.zeek",
      "start": 1716333,
      "end": 1716345
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ip/main.zeek",
      "start": 1716345,
      "end": 1717944
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/iptunnel/__load__.zeek",
      "start": 1717944,
      "end": 1717956
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/iptunnel/main.zeek",
      "start": 1717956,
      "end": 1721275
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/linux_sll/__load__.zeek",
      "start": 1721275,
      "end": 1721287
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/linux_sll/main.zeek",
      "start": 1721287,
      "end": 1721829
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/linux_sll2/__load__.zeek",
      "start": 1721829,
      "end": 1721841
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/linux_sll2/main.zeek",
      "start": 1721841,
      "end": 1722388
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/llc/__load__.zeek",
      "start": 1722388,
      "end": 1722401
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/llc/main.zeek",
      "start": 1722401,
      "end": 1722429
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/main.zeek",
      "start": 1722429,
      "end": 1725125
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/mpls/__load__.zeek",
      "start": 1725125,
      "end": 1725137
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/mpls/main.zeek",
      "start": 1725137,
      "end": 1725282
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/nflog/__load__.zeek",
      "start": 1725282,
      "end": 1725294
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/nflog/main.zeek",
      "start": 1725294,
      "end": 1725645
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/novell_802_3/__load__.zeek",
      "start": 1725645,
      "end": 1725658
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/novell_802_3/main.zeek",
      "start": 1725658,
      "end": 1725844
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/null/__load__.zeek",
      "start": 1725844,
      "end": 1725856
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/null/main.zeek",
      "start": 1725856,
      "end": 1726860
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/pbb/__load__.zeek",
      "start": 1726860,
      "end": 1726872
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/pbb/main.zeek",
      "start": 1726872,
      "end": 1727022
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ppp/__load__.zeek",
      "start": 1727022,
      "end": 1727035
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ppp/main.zeek",
      "start": 1727035,
      "end": 1727574
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ppp_serial/__load__.zeek",
      "start": 1727574,
      "end": 1727586
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/ppp_serial/main.zeek",
      "start": 1727586,
      "end": 1728172
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/pppoe/__load__.zeek",
      "start": 1728172,
      "end": 1728184
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/pppoe/main.zeek",
      "start": 1728184,
      "end": 1728475
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/root/__load__.zeek",
      "start": 1728475,
      "end": 1728487
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/root/main.zeek",
      "start": 1728487,
      "end": 1729830
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/skip/__load__.zeek",
      "start": 1729830,
      "end": 1729842
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/skip/main.zeek",
      "start": 1729842,
      "end": 1730044
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/snap/__load__.zeek",
      "start": 1730044,
      "end": 1730057
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/snap/main.zeek",
      "start": 1730057,
      "end": 1730570
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/tcp/__load__.zeek",
      "start": 1730570,
      "end": 1730582
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/tcp/main.zeek",
      "start": 1730582,
      "end": 1730651
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/teredo/__load__.zeek",
      "start": 1730651,
      "end": 1730663
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/teredo/main.zeek",
      "start": 1730663,
      "end": 1731902
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/udp/__load__.zeek",
      "start": 1731902,
      "end": 1731914
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/udp/main.zeek",
      "start": 1731914,
      "end": 1731942
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vlan/__load__.zeek",
      "start": 1731942,
      "end": 1731954
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vlan/main.zeek",
      "start": 1731954,
      "end": 1733851
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vntag/__load__.zeek",
      "start": 1733851,
      "end": 1733863
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vntag/main.zeek",
      "start": 1733863,
      "end": 1734273
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vxlan/__load__.zeek",
      "start": 1734273,
      "end": 1734285
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/packet-protocols/vxlan/main.zeek",
      "start": 1734285,
      "end": 1735080
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/README",
      "start": 1735080,
      "end": 1735133
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/__load__.zeek",
      "start": 1735133,
      "end": 1735239
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/contents.zeek",
      "start": 1735239,
      "end": 1736812
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/inactivity.zeek",
      "start": 1736812,
      "end": 1738173
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/main.zeek",
      "start": 1738173,
      "end": 1749616
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/polling.zeek",
      "start": 1749616,
      "end": 1751309
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/removal-hooks.zeek",
      "start": 1751309,
      "end": 1753841
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/conn/thresholds.zeek",
      "start": 1753841,
      "end": 1763889
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dce-rpc/README",
      "start": 1763889,
      "end": 1763987
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dce-rpc/__load__.zeek",
      "start": 1763987,
      "end": 1764036
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dce-rpc/consts.zeek",
      "start": 1764036,
      "end": 1974975
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dce-rpc/dpd.sig",
      "start": 1974975,
      "end": 1975057
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dce-rpc/main.zeek",
      "start": 1975057,
      "end": 1983356
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dhcp/README",
      "start": 1983356,
      "end": 1983421
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dhcp/__load__.zeek",
      "start": 1983421,
      "end": 1983471
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dhcp/consts.zeek",
      "start": 1983471,
      "end": 1989094
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dhcp/dpd.sig",
      "start": 1989094,
      "end": 1989190
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dhcp/main.zeek",
      "start": 1989190,
      "end": 1999909
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dnp3/README",
      "start": 1999909,
      "end": 1999967
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dnp3/__load__.zeek",
      "start": 1999967,
      "end": 2000002
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dnp3/consts.zeek",
      "start": 2000002,
      "end": 2001238
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dnp3/dpd.sig",
      "start": 2001238,
      "end": 2001485
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dnp3/main.zeek",
      "start": 2001485,
      "end": 2003676
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dns/README",
      "start": 2003676,
      "end": 2003732
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dns/__load__.zeek",
      "start": 2003732,
      "end": 2003789
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dns/check-event-handlers.zeek",
      "start": 2003789,
      "end": 2004464
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dns/consts.zeek",
      "start": 2004464,
      "end": 2010875
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/dns/main.zeek",
      "start": 2010875,
      "end": 2032771
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/finger/__load__.zeek",
      "start": 2032771,
      "end": 2032805
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/finger/main.zeek",
      "start": 2032805,
      "end": 2033135
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/finger/spicy-events.zeek",
      "start": 2033135,
      "end": 2034072
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/README",
      "start": 2034072,
      "end": 2034123
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/__load__.zeek",
      "start": 2034123,
      "end": 2034238
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/dpd.sig",
      "start": 2034238,
      "end": 2034627
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/files.zeek",
      "start": 2034627,
      "end": 2036154
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/gridftp.zeek",
      "start": 2036154,
      "end": 2040740
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/info.zeek",
      "start": 2040740,
      "end": 2043423
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/main.zeek",
      "start": 2043423,
      "end": 2058171
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/utils-commands.zeek",
      "start": 2058171,
      "end": 2063124
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ftp/utils.zeek",
      "start": 2063124,
      "end": 2064201
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/README",
      "start": 2064201,
      "end": 2064258
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/__load__.zeek",
      "start": 2064258,
      "end": 2064338
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/dpd.sig",
      "start": 2064338,
      "end": 2065731
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/entities.zeek",
      "start": 2065731,
      "end": 2071228
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/files.zeek",
      "start": 2071228,
      "end": 2072676
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/main.zeek",
      "start": 2072676,
      "end": 2085665
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/http/utils.zeek",
      "start": 2085665,
      "end": 2087750
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/imap/README",
      "start": 2087750,
      "end": 2088009
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/imap/__load__.zeek",
      "start": 2088009,
      "end": 2088023
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/imap/main.zeek",
      "start": 2088023,
      "end": 2088216
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/README",
      "start": 2088216,
      "end": 2088273
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/__load__.zeek",
      "start": 2088273,
      "end": 2088338
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/dcc-send.zeek",
      "start": 2088338,
      "end": 2092450
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/dpd.sig",
      "start": 2092450,
      "end": 2093324
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/files.zeek",
      "start": 2093324,
      "end": 2094471
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/irc/main.zeek",
      "start": 2094471,
      "end": 2097534
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/README",
      "start": 2097534,
      "end": 2097574
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/__load__.zeek",
      "start": 2097574,
      "end": 2097621
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/consts.zeek",
      "start": 2097621,
      "end": 2100837
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/dpd.sig",
      "start": 2100837,
      "end": 2101491
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/files.zeek",
      "start": 2101491,
      "end": 2104765
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/krb/main.zeek",
      "start": 2104765,
      "end": 2110800
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ldap/__load__.zeek",
      "start": 2110800,
      "end": 2110918
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ldap/consts.zeek",
      "start": 2110918,
      "end": 2118263
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ldap/dpd.sig",
      "start": 2118263,
      "end": 2118712
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ldap/main.zeek",
      "start": 2118712,
      "end": 2133340
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ldap/spicy-events.zeek",
      "start": 2133340,
      "end": 2136851
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/modbus/README",
      "start": 2136851,
      "end": 2136889
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/modbus/__load__.zeek",
      "start": 2136889,
      "end": 2136916
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/modbus/consts.zeek",
      "start": 2136916,
      "end": 2138837
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/modbus/main.zeek",
      "start": 2138837,
      "end": 2141639
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mqtt/README",
      "start": 2141639,
      "end": 2141675
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mqtt/__load__.zeek",
      "start": 2141675,
      "end": 2141725
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mqtt/consts.zeek",
      "start": 2141725,
      "end": 2142855
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mqtt/dpd.sig",
      "start": 2142855,
      "end": 2142915
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mqtt/main.zeek",
      "start": 2142915,
      "end": 2153416
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mysql/README",
      "start": 2153416,
      "end": 2153453
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mysql/__load__.zeek",
      "start": 2153453,
      "end": 2153466
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mysql/consts.zeek",
      "start": 2153466,
      "end": 2154333
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/mysql/main.zeek",
      "start": 2154333,
      "end": 2158005
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntlm/README",
      "start": 2158005,
      "end": 2158058
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntlm/__load__.zeek",
      "start": 2158058,
      "end": 2158070
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntlm/main.zeek",
      "start": 2158070,
      "end": 2161158
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntp/__load__.zeek",
      "start": 2161158,
      "end": 2161186
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntp/consts.zeek",
      "start": 2161186,
      "end": 2161585
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ntp/main.zeek",
      "start": 2161585,
      "end": 2165118
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/pop3/README",
      "start": 2165118,
      "end": 2165177
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/pop3/__load__.zeek",
      "start": 2165177,
      "end": 2165199
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/pop3/dpd.sig",
      "start": 2165199,
      "end": 2165564
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/postgresql/__load__.zeek",
      "start": 2165564,
      "end": 2165668
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/postgresql/consts.zeek",
      "start": 2165668,
      "end": 2166637
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/postgresql/dpd.sig",
      "start": 2166637,
      "end": 2167637
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/postgresql/main.zeek",
      "start": 2167637,
      "end": 2173881
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/postgresql/spicy-events.zeek",
      "start": 2173881,
      "end": 2178299
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/quic/__load__.zeek",
      "start": 2178299,
      "end": 2178390
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/quic/consts.zeek",
      "start": 2178390,
      "end": 2179370
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/quic/main.zeek",
      "start": 2179370,
      "end": 2187693
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/quic/spicy-events.zeek",
      "start": 2187693,
      "end": 2191352
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/radius/README",
      "start": 2191352,
      "end": 2191390
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/radius/__load__.zeek",
      "start": 2191390,
      "end": 2191403
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/radius/consts.zeek",
      "start": 2191403,
      "end": 2198357
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/radius/main.zeek",
      "start": 2198357,
      "end": 2202765
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rdp/README",
      "start": 2202765,
      "end": 2202817
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rdp/__load__.zeek",
      "start": 2202817,
      "end": 2202866
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rdp/consts.zeek",
      "start": 2202866,
      "end": 2216066
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rdp/dpd.sig",
      "start": 2216066,
      "end": 2216477
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rdp/main.zeek",
      "start": 2216477,
      "end": 2225335
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/redis/__load__.zeek",
      "start": 2225335,
      "end": 2225429
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/redis/dpd.sig",
      "start": 2225429,
      "end": 2225748
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/redis/main.zeek",
      "start": 2225748,
      "end": 2235636
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/redis/spicy-events.zeek",
      "start": 2235636,
      "end": 2239738
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rfb/README",
      "start": 2239738,
      "end": 2239810
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rfb/__load__.zeek",
      "start": 2239810,
      "end": 2239876
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rfb/dpd.sig",
      "start": 2239876,
      "end": 2240101
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/rfb/main.zeek",
      "start": 2240101,
      "end": 2243861
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/sip/README",
      "start": 2243861,
      "end": 2243917
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/sip/__load__.zeek",
      "start": 2243917,
      "end": 2243951
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/sip/dpd.sig",
      "start": 2243951,
      "end": 2244371
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/sip/main.zeek",
      "start": 2244371,
      "end": 2253379
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/README",
      "start": 2253379,
      "end": 2253414
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/__load__.zeek",
      "start": 2253414,
      "end": 2253563
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/const-dos-error.zeek",
      "start": 2253563,
      "end": 2264254
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/const-nt-status.zeek",
      "start": 2264254,
      "end": 2511328
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/consts.zeek",
      "start": 2511328,
      "end": 2519342
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/dpd.sig",
      "start": 2519342,
      "end": 2519424
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/files.zeek",
      "start": 2519424,
      "end": 2521767
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/main.zeek",
      "start": 2521767,
      "end": 2529555
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/smb1-main.zeek",
      "start": 2529555,
      "end": 2538476
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smb/smb2-main.zeek",
      "start": 2538476,
      "end": 2549555
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/README",
      "start": 2549555,
      "end": 2549614
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/__load__.zeek",
      "start": 2549614,
      "end": 2549679
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/dpd.sig",
      "start": 2549679,
      "end": 2549993
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/entities.zeek",
      "start": 2549993,
      "end": 2551766
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/files.zeek",
      "start": 2551766,
      "end": 2554280
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/smtp/main.zeek",
      "start": 2554280,
      "end": 2567032
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/snmp/README",
      "start": 2567032,
      "end": 2567096
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/snmp/__load__.zeek",
      "start": 2567096,
      "end": 2567109
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/snmp/main.zeek",
      "start": 2567109,
      "end": 2572806
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/socks/README",
      "start": 2572806,
      "end": 2572859
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/socks/__load__.zeek",
      "start": 2572859,
      "end": 2572908
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/socks/consts.zeek",
      "start": 2572908,
      "end": 2574255
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/socks/dpd.sig",
      "start": 2574255,
      "end": 2576036
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/socks/main.zeek",
      "start": 2576036,
      "end": 2580085
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssh/README",
      "start": 2580085,
      "end": 2580120
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssh/__load__.zeek",
      "start": 2580120,
      "end": 2580154
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssh/dpd.sig",
      "start": 2580154,
      "end": 2580418
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssh/main.zeek",
      "start": 2580418,
      "end": 2593041
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/README",
      "start": 2593041,
      "end": 2593129
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/__load__.zeek",
      "start": 2593129,
      "end": 2593233
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/consts.zeek",
      "start": 2593233,
      "end": 2661707
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/ct-list.zeek",
      "start": 2661707,
      "end": 2694170
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/dpd.sig",
      "start": 2694170,
      "end": 2694777
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/files.zeek",
      "start": 2694777,
      "end": 2700895
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/main.zeek",
      "start": 2700895,
      "end": 2718380
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/ssl/mozilla-ca-list.zeek",
      "start": 2718380,
      "end": 3346479
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/syslog/README",
      "start": 3346479,
      "end": 3346517
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/syslog/__load__.zeek",
      "start": 3346517,
      "end": 3346566
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/syslog/consts.zeek",
      "start": 3346566,
      "end": 3347648
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/syslog/main.zeek",
      "start": 3347648,
      "end": 3349330
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/syslog/spicy-events.zeek",
      "start": 3349330,
      "end": 3350009
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/tunnels/README",
      "start": 3350009,
      "end": 3350101
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/tunnels/__load__.zeek",
      "start": 3350101,
      "end": 3350121
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/tunnels/dpd.sig",
      "start": 3350121,
      "end": 3350216
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/websocket/__load__.zeek",
      "start": 3350216,
      "end": 3350254
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/websocket/consts.zeek",
      "start": 3350254,
      "end": 3350934
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/websocket/main.zeek",
      "start": 3350934,
      "end": 3357626
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/xmpp/README",
      "start": 3357626,
      "end": 3357913
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/xmpp/__load__.zeek",
      "start": 3357913,
      "end": 3357948
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/xmpp/dpd.sig",
      "start": 3357948,
      "end": 3358076
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/protocols/xmpp/main.zeek",
      "start": 3358076,
      "end": 3358280
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/active-http.zeek",
      "start": 3358280,
      "end": 3362528
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/addrs.zeek",
      "start": 3362528,
      "end": 3368945
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/backtrace.zeek",
      "start": 3368945,
      "end": 3370640
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/conn-ids.zeek",
      "start": 3370640,
      "end": 3372040
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/dir.zeek",
      "start": 3372040,
      "end": 3373988
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/directions-and-hosts.zeek",
      "start": 3373988,
      "end": 3375846
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/email.zeek",
      "start": 3375846,
      "end": 3378021
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/exec.zeek",
      "start": 3378021,
      "end": 3383711
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/files.zeek",
      "start": 3383711,
      "end": 3385018
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/geoip-distance.zeek",
      "start": 3385018,
      "end": 3385876
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/hash_hrw.zeek",
      "start": 3385876,
      "end": 3387700
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/numbers.zeek",
      "start": 3387700,
      "end": 3388388
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/packages.zeek",
      "start": 3388388,
      "end": 3388867
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/paths.zeek",
      "start": 3388867,
      "end": 3390328
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/patterns.zeek",
      "start": 3390328,
      "end": 3392480
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/queue.zeek",
      "start": 3392480,
      "end": 3395963
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/site.zeek",
      "start": 3395963,
      "end": 3408024
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/strings.zeek",
      "start": 3408024,
      "end": 3409278
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/thresholds.zeek",
      "start": 3409278,
      "end": 3411287
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/time.zeek",
      "start": 3411287,
      "end": 3412325
    }, {
      "filename": "/usr/local/zeek/share/zeek/base/utils/urls.zeek",
      "start": 3412325,
      "end": 3415761
    }, {
      "filename": "/usr/local/zeek/share/zeek/builtin-plugins/__load__.zeek",
      "start": 3415761,
      "end": 3415803
    }, {
      "filename": "/usr/local/zeek/share/zeek/builtin-plugins/__preload__.zeek",
      "start": 3415803,
      "end": 3415845
    }, {
      "filename": "/usr/local/zeek/share/zeek/cmake_install.cmake",
      "start": 3415845,
      "end": 3420002
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/files/x509/disable-certificate-events-known-certs.zeek",
      "start": 3420002,
      "end": 3423031
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/analyzer/debug-logging.zeek",
      "start": 3423031,
      "end": 3429310
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/analyzer/detect-protocols.zeek",
      "start": 3429310,
      "end": 3436570
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/analyzer/packet-segment-logging.zeek",
      "start": 3436570,
      "end": 3438145
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/broker/__load__.zeek",
      "start": 3438145,
      "end": 3438198
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/broker/backpressure.zeek",
      "start": 3438198,
      "end": 3439299
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/broker/main.zeek",
      "start": 3439299,
      "end": 3443528
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/broker/telemetry.zeek",
      "start": 3443528,
      "end": 3447419
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/zeromq/__load__.zeek",
      "start": 3447419,
      "end": 3447437
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/zeromq/connect.zeek",
      "start": 3447437,
      "end": 3447656
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/backend/zeromq/main.zeek",
      "start": 3447656,
      "end": 3470058
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/experimental.zeek",
      "start": 3470058,
      "end": 3476472
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/nodes-experimental/manager.zeek",
      "start": 3476472,
      "end": 3478563
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/cluster/websocket/server.zeek",
      "start": 3478563,
      "end": 3480580
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/conn_key/vlan_fivetuple.zeek",
      "start": 3480580,
      "end": 3481119
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/control/controllee.zeek",
      "start": 3481119,
      "end": 3483854
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/control/controller.zeek",
      "start": 3483854,
      "end": 3487121
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/files/detect-MHR.zeek",
      "start": 3487121,
      "end": 3489818
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/files/entropy-test-all-files.zeek",
      "start": 3489818,
      "end": 3490200
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/files/extract-all-files.zeek",
      "start": 3490200,
      "end": 3490341
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/files/hash-all-files.zeek",
      "start": 3490341,
      "end": 3490596
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/do_expire.zeek",
      "start": 3490596,
      "end": 3490889
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/do_notice.zeek",
      "start": 3490889,
      "end": 3492761
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/removal.zeek",
      "start": 3492761,
      "end": 3493137
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/README",
      "start": 3493137,
      "end": 3493191
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/__load__.zeek",
      "start": 3493191,
      "end": 3493415
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/conn-established.zeek",
      "start": 3493415,
      "end": 3493763
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/dns.zeek",
      "start": 3493763,
      "end": 3494120
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/file-hashes.zeek",
      "start": 3494120,
      "end": 3494466
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/file-names.zeek",
      "start": 3494466,
      "end": 3495482
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/http-headers.zeek",
      "start": 3495482,
      "end": 3497647
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/http-url.zeek",
      "start": 3497647,
      "end": 3498064
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/manage-event-groups.zeek",
      "start": 3498064,
      "end": 3499966
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/pubkey-hashes.zeek",
      "start": 3499966,
      "end": 3500289
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/smb-filenames.zeek",
      "start": 3500289,
      "end": 3501043
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/smtp-url-extraction.zeek",
      "start": 3501043,
      "end": 3501741
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/smtp.zeek",
      "start": 3501741,
      "end": 3504431
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/ssl.zeek",
      "start": 3504431,
      "end": 3505317
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/where-locations.zeek",
      "start": 3505317,
      "end": 3505934
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/seen/x509.zeek",
      "start": 3505934,
      "end": 3507677
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/intel/whitelist.zeek",
      "start": 3507677,
      "end": 3508186
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/__load__.zeek",
      "start": 3508186,
      "end": 3508597
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/agent/__load__.zeek",
      "start": 3508597,
      "end": 3509271
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/agent/api.zeek",
      "start": 3509271,
      "end": 3517964
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/agent/boot.zeek",
      "start": 3517964,
      "end": 3520257
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/agent/config.zeek",
      "start": 3520257,
      "end": 3525615
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/agent/main.zeek",
      "start": 3525615,
      "end": 3562914
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/config.zeek",
      "start": 3562914,
      "end": 3565300
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/controller/__load__.zeek",
      "start": 3565300,
      "end": 3565951
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/controller/api.zeek",
      "start": 3565951,
      "end": 3576465
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/controller/boot.zeek",
      "start": 3576465,
      "end": 3578279
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/controller/config.zeek",
      "start": 3578279,
      "end": 3585512
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/controller/main.zeek",
      "start": 3585512,
      "end": 3641831
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/log.zeek",
      "start": 3641831,
      "end": 3645815
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/node/__load__.zeek",
      "start": 3645815,
      "end": 3645828
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/node/api.zeek",
      "start": 3645828,
      "end": 3647879
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/node/config.zeek",
      "start": 3647879,
      "end": 3648740
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/node/main.zeek",
      "start": 3648740,
      "end": 3652759
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/persistence.zeek",
      "start": 3652759,
      "end": 3654361
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/request.zeek",
      "start": 3654361,
      "end": 3659685
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/supervisor/__load__.zeek",
      "start": 3659685,
      "end": 3659698
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/supervisor/api.zeek",
      "start": 3659698,
      "end": 3660348
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/supervisor/config.zeek",
      "start": 3660348,
      "end": 3661386
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/supervisor/main.zeek",
      "start": 3661386,
      "end": 3664783
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/types.zeek",
      "start": 3664783,
      "end": 3671248
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/management/util.zeek",
      "start": 3671248,
      "end": 3671765
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/netcontrol/catch-and-release.zeek",
      "start": 3671765,
      "end": 3690217
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/notice/__load__.zeek",
      "start": 3690217,
      "end": 3690399
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/notice/actions/drop.zeek",
      "start": 3690399,
      "end": 3691246
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/notice/community-id.zeek",
      "start": 3691246,
      "end": 3692068
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/notice/extend-email/hostnames.zeek",
      "start": 3692068,
      "end": 3693895
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/packet-filter/shunt.zeek",
      "start": 3693895,
      "end": 3698715
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/signatures/detect-windows-shells.sig",
      "start": 3698715,
      "end": 3699191
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/signatures/iso-9660.sig",
      "start": 3699191,
      "end": 3699596
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/signatures/iso-9660.zeek",
      "start": 3699596,
      "end": 3699885
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/software/version-changes.zeek",
      "start": 3699885,
      "end": 3701182
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/software/vulnerable.zeek",
      "start": 3701182,
      "end": 3705589
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/software/windows-version-detection.zeek",
      "start": 3705589,
      "end": 3711177
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/spicy/record-spicy-batch.zeek",
      "start": 3711177,
      "end": 3713240
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/spicy/resource-usage.zeek",
      "start": 3713240,
      "end": 3713744
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/storage/backend/redis/__load__.zeek",
      "start": 3713744,
      "end": 3713761
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/storage/backend/redis/main.zeek",
      "start": 3713761,
      "end": 3715709
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/storage/backend/sqlite/__load__.zeek",
      "start": 3715709,
      "end": 3715726
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/storage/backend/sqlite/main.zeek",
      "start": 3715726,
      "end": 3717968
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/frameworks/telemetry/log.zeek",
      "start": 3717968,
      "end": 3723408
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/integration/collective-intel/README",
      "start": 3723408,
      "end": 3723639
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/integration/collective-intel/__load__.zeek",
      "start": 3723639,
      "end": 3723651
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/integration/collective-intel/main.zeek",
      "start": 3723651,
      "end": 3725545
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/capture-loss.zeek",
      "start": 3725545,
      "end": 3729473
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/detect-traceroute/README",
      "start": 3729473,
      "end": 3729515
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/detect-traceroute/__load__.zeek",
      "start": 3729515,
      "end": 3729527
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/detect-traceroute/detect-low-ttls.sig",
      "start": 3729527,
      "end": 3729675
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/detect-traceroute/main.zeek",
      "start": 3729675,
      "end": 3733630
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/dump-events.zeek",
      "start": 3733630,
      "end": 3735439
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/loaded-scripts.zeek",
      "start": 3735439,
      "end": 3736337
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/profiling.zeek",
      "start": 3736337,
      "end": 3736902
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/stats.zeek",
      "start": 3736902,
      "end": 3745414
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/systemd-generator.zeek",
      "start": 3745414,
      "end": 3746113
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/trim-trace-file.zeek",
      "start": 3746113,
      "end": 3747140
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/unknown-protocols.zeek",
      "start": 3747140,
      "end": 3748909
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/misc/weird-stats.zeek",
      "start": 3748909,
      "end": 3751709
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/community-id-logging.zeek",
      "start": 3751709,
      "end": 3752295
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/disable-unknown-ip-proto-support.zeek",
      "start": 3752295,
      "end": 3752634
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/failed-service-logging.zeek",
      "start": 3752634,
      "end": 3753870
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/ip-proto-name-logging.zeek",
      "start": 3753870,
      "end": 3754438
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/known-hosts.zeek",
      "start": 3754438,
      "end": 3759222
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/known-services.zeek",
      "start": 3759222,
      "end": 3771383
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/mac-logging.zeek",
      "start": 3771383,
      "end": 3772105
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/pppoe-session-id-logging.zeek",
      "start": 3772105,
      "end": 3772683
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/speculative-service.zeek",
      "start": 3772683,
      "end": 3773734
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/vlan-logging.zeek",
      "start": 3773734,
      "end": 3774397
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/conn/weirds.zeek",
      "start": 3774397,
      "end": 3775583
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dhcp/msg-orig.zeek",
      "start": 3775583,
      "end": 3776198
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dhcp/software.zeek",
      "start": 3776198,
      "end": 3778273
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dhcp/sub-opts.zeek",
      "start": 3778273,
      "end": 3779575
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dns/auth-addl.zeek",
      "start": 3779575,
      "end": 3780745
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dns/detect-external-names.zeek",
      "start": 3780745,
      "end": 3782371
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dns/disable-opcode-log-fields.zeek",
      "start": 3782371,
      "end": 3782561
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/dns/log-original-query-case.zeek",
      "start": 3782561,
      "end": 3783066
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ftp/detect-bruteforcing.zeek",
      "start": 3783066,
      "end": 3785063
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ftp/detect.zeek",
      "start": 3785063,
      "end": 3785896
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ftp/software.zeek",
      "start": 3785896,
      "end": 3786531
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/detect-sql-injection.zeek",
      "start": 3786531,
      "end": 3791845
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/detect-webapps.sig",
      "start": 3791845,
      "end": 3794288
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/detect-webapps.zeek",
      "start": 3794288,
      "end": 3796018
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/header-names.zeek",
      "start": 3796018,
      "end": 3797381
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/software-browser-plugins.zeek",
      "start": 3797381,
      "end": 3799911
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/software.zeek",
      "start": 3799911,
      "end": 3801261
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/var-extraction-cookies.zeek",
      "start": 3801261,
      "end": 3801720
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/http/var-extraction-uri.zeek",
      "start": 3801720,
      "end": 3802258
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/krb/md5-ticket-logging.zeek",
      "start": 3802258,
      "end": 3803014
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/krb/ticket-logging.zeek",
      "start": 3803014,
      "end": 3803890
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/modbus/known-masters-slaves.zeek",
      "start": 3803890,
      "end": 3805620
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/modbus/track-memmap.zeek",
      "start": 3805620,
      "end": 3809002
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/mysql/software.zeek",
      "start": 3809002,
      "end": 3809426
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/rdp/indicate_ssl.zeek",
      "start": 3809426,
      "end": 3809822
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/smb/log-cmds.zeek",
      "start": 3809822,
      "end": 3811847
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/smtp/blocklists.zeek",
      "start": 3811847,
      "end": 3813730
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/smtp/detect-suspicious-orig.zeek",
      "start": 3813730,
      "end": 3815205
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/smtp/entities-excerpt.zeek",
      "start": 3815205,
      "end": 3816034
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/smtp/software.zeek",
      "start": 3816034,
      "end": 3818884
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssh/detect-bruteforcing.zeek",
      "start": 3818884,
      "end": 3821838
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssh/geo-data.zeek",
      "start": 3821838,
      "end": 3823434
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssh/interesting-hostnames.zeek",
      "start": 3823434,
      "end": 3825081
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssh/md5-host-key-logging.zeek",
      "start": 3825081,
      "end": 3825407
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssh/software.zeek",
      "start": 3825407,
      "end": 3826442
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/certificate-request-info.zeek",
      "start": 3826442,
      "end": 3827231
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/decryption.zeek",
      "start": 3827231,
      "end": 3830878
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/dpd-v2.sig",
      "start": 3830878,
      "end": 3831428
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/expiring-certs.zeek",
      "start": 3831428,
      "end": 3834334
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/heartbleed.zeek",
      "start": 3834334,
      "end": 3844304
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/known-certs.zeek",
      "start": 3844304,
      "end": 3849925
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/log-certs-base64.zeek",
      "start": 3849925,
      "end": 3850597
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/log-hostcerts-only.zeek",
      "start": 3850597,
      "end": 3850937
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/ssl-log-ext.zeek",
      "start": 3850937,
      "end": 3855993
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/validate-certs.zeek",
      "start": 3855993,
      "end": 3862477
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/validate-ocsp.zeek",
      "start": 3862477,
      "end": 3864728
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/validate-sct.zeek",
      "start": 3864728,
      "end": 3872234
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/protocols/ssl/weak-keys.zeek",
      "start": 3872234,
      "end": 3877898
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/tuning/README",
      "start": 3877898,
      "end": 3877931
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/tuning/json-logs.zeek",
      "start": 3877931,
      "end": 3878046
    }, {
      "filename": "/usr/local/zeek/share/zeek/policy/tuning/track-all-assets.zeek",
      "start": 3878046,
      "end": 3878359
    }, {
      "filename": "/usr/local/zeek/share/zeek/site/local.zeek",
      "start": 3878359,
      "end": 3882491
    }, {
      "filename": "/usr/local/zeek/share/zeek/spicy/zeek.spicy",
      "start": 3882491,
      "end": 3910711
    }, {
      "filename": "/usr/local/zeek/share/zeek/spicy/zeek_file.spicy",
      "start": 3910711,
      "end": 3911794
    }, {
      "filename": "/usr/local/zeek/share/zeek/spicy/zeek_rt.hlt",
      "start": 3911794,
      "end": 3915655
    }, {
      "filename": "/usr/local/zeek/share/zeek/test-all-policy.zeek",
      "start": 3915655,
      "end": 3923360
    }, {
      "filename": "/usr/local/zeek/share/zeek/zeekygen/README",
      "start": 3923360,
      "end": 3923639
    }, {
      "filename": "/usr/local/zeek/share/zeek/zeekygen/__load__.zeek",
      "start": 3923639,
      "end": 3924775
    }, {
      "filename": "/usr/local/zeek/share/zeek/zeekygen/example.zeek",
      "start": 3924775,
      "end": 3932623
    } ],
    "remote_package_size": 3932623
  });
})();

// end include: /tmp/tmpffm1y0dg.js
// include: /tmp/tmpcdfsut_5.js
// All the pre-js content up to here must remain later on, we need to run
// it.
if (Module["$ww"] || (typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD)) Module["preRun"] = [];

var necessaryPreJSTasks = Module["preRun"].slice();

// end include: /tmp/tmpcdfsut_5.js
// include: /tmp/tmp_vvu0p2v.js
if (!Module["preRun"]) throw "Module.preRun should exist because file support used it; did a pre-js delete it?";

necessaryPreJSTasks.forEach(task => {
  if (Module["preRun"].indexOf(task) < 0) throw "All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?";
});

// end include: /tmp/tmp_vvu0p2v.js
// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = "";

function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == "undefined" || !process.release || process.release.name !== "node") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split(".").slice(0, 3);
  numericVersion = (numericVersion[0] * 1e4) + (numericVersion[1] * 100) + (numericVersion[2].split("-")[0] * 1);
  if (numericVersion < 16e4) {
    throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + nodeVersion + ")");
  }
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require("fs");
  var nodePath = require("path");
  scriptDirectory = __dirname + "/";
  // include: node_shell_read.js
  readBinary = filename => {
    // We need to re-wrap `file://` strings to URLs. Normalizing isn't
    // necessary in that case, the path should already be absolute.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    var ret = fs.readFileSync(filename);
    assert(ret.buffer);
    return ret;
  };
  readAsync = (filename, binary = true) => {
    // See the comment in the `readBinary` function.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
        if (err) reject(err); else resolve(binary ? data.buffer : data);
      });
    });
  };
  // end include: node_shell_read.js
  if (!Module["thisProgram"] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, "/");
  }
  arguments_ = process.argv.slice(2);
  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };
} else if (ENVIRONMENT_IS_SHELL) {
  if ((typeof process == "object" && typeof require === "function") || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
} else // Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) {
    // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != "undefined" && document.currentScript) {
    // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith("blob:")) {
    scriptDirectory = "";
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
  }
  if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  if (!ENVIRONMENT_IS_NODE) {
    // include: web_or_worker_shell_read.js
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = url => {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
      };
    }
    readAsync = url => {
      // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
      // See https://github.com/github/fetch/pull/92#issuecomment-140665932
      // Cordova or Electron apps are typically loaded from a file:// url.
      // So use XHR on webview if URL is a file URL.
      if (isFileURI(url)) {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              // file URLs can return 0
              resolve(xhr.response);
              return;
            }
            reject(xhr.status);
          };
          xhr.onerror = reject;
          xhr.send(null);
        });
      }
      return fetch(url, {
        credentials: "same-origin"
      }).then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + " : " + response.url));
      });
    };
  }
} else // end include: web_or_worker_shell_read.js
{
  throw new Error("environment detection error");
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
// Normally just binding console.log/console.error here works fine, but
// under node (with workers) we see missing/out-of-order messages so route
// directly to stdout and stderr.
// See https://github.com/emscripten-core/emscripten/issues/14804
var defaultPrint = console.log.bind(console);

var defaultPrintErr = console.error.bind(console);

if (ENVIRONMENT_IS_NODE) {
  defaultPrint = (...args) => fs.writeSync(1, args.join(" ") + "\n");
  defaultPrintErr = (...args) => fs.writeSync(2, args.join(" ") + "\n");
}

var out = Module["print"] || defaultPrint;

var err = Module["printErr"] || defaultPrintErr;

// Merge back in the overrides
Object.assign(Module, moduleOverrides);

// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;

checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("asm", "wasmExports");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

assert(ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER || ENVIRONMENT_IS_NODE, "Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");

// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===
// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html
var wasmBinary = Module["wasmBinary"];

legacyModuleProp("wasmBinary", "wasmBinary");

if (typeof WebAssembly != "object") {
  err("no native wasm support detected");
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != "undefined" && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }
  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// end include: base64Utils.js
// Wasm globals
var wasmMemory;

// For sending to workers.
var wasmModule;

//========================================
// Runtime essentials
//========================================
// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */ function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed" + (text ? ": " + text : ""));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
// Memory management
var /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /** @type {!Float64Array} */ HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module["HEAP8"] = HEAP8 = new Int8Array(b);
  Module["HEAP16"] = HEAP16 = new Int16Array(b);
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
  Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
  Module["HEAP32"] = HEAP32 = new Int32Array(b);
  Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
  Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
  Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
// include: runtime_pthread.js
// Pthread Web Worker handling code.
// This code runs only on pthread web workers and handles pthread setup
// and communication with the main thread via postMessage.
// Unique ID of the current pthread worker (zero on non-pthread-workers
// including the main thread).
var workerID = 0;

if (ENVIRONMENT_IS_PTHREAD) {
  var wasmPromiseResolve;
  var wasmPromiseReject;
  // Node.js support
  if (ENVIRONMENT_IS_NODE) {
    // Create as web-worker-like an environment as we can.
    var parentPort = worker_threads["parentPort"];
    parentPort.on("message", data => onmessage({
      data
    }));
    Object.assign(globalThis, {
      self: global,
      // Dummy importScripts.  The presence of this global is used
      // to detect that we are running on a Worker.
      // TODO(sbc): Find another way?
      importScripts: () => {
        assert(false, "dummy importScripts called");
      },
      postMessage: msg => parentPort.postMessage(msg)
    });
  }
  // Thread-local guard variable for one-time init of the JS state
  var initializedJS = false;
  function threadPrintErr(...args) {
    var text = args.join(" ");
    // See https://github.com/emscripten-core/emscripten/issues/14804
    if (ENVIRONMENT_IS_NODE) {
      fs.writeSync(2, text + "\n");
      return;
    }
    console.error(text);
  }
  if (!Module["printErr"]) err = threadPrintErr;
  dbg = threadPrintErr;
  function threadAlert(...args) {
    var text = args.join(" ");
    postMessage({
      cmd: "alert",
      text,
      threadId: _pthread_self()
    });
  }
  self.alert = threadAlert;
  Module["instantiateWasm"] = (info, receiveInstance) => new Promise((resolve, reject) => {
    wasmPromiseResolve = module => {
      // Instantiate from the module posted from the main thread.
      // We can just use sync instantiation in the worker.
      var instance = new WebAssembly.Instance(module, getWasmImports());
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193,
      // the above line no longer optimizes out down to the following line.
      // When the regression is fixed, we can remove this if/else.
      receiveInstance(instance);
      resolve();
    };
    wasmPromiseReject = reject;
  });
  // Turn unhandled rejected promises into errors so that the main thread will be
  // notified about them.
  self.onunhandledrejection = e => {
    throw e.reason || e;
  };
  function handleMessage(e) {
    try {
      var msgData = e["data"];
      //dbg('msgData: ' + Object.keys(msgData));
      var cmd = msgData.cmd;
      if (cmd === "load") {
        // Preload command that is called once per worker to parse and load the Emscripten code.
        workerID = msgData.workerID;
        // Until we initialize the runtime, queue up any further incoming messages.
        let messageQueue = [];
        self.onmessage = e => messageQueue.push(e);
        // And add a callback for when the runtime is initialized.
        self.startWorker = instance => {
          // Notify the main thread that this thread has loaded.
          postMessage({
            cmd: "loaded"
          });
          // Process any messages that were queued before the thread was ready.
          for (let msg of messageQueue) {
            handleMessage(msg);
          }
          // Restore the real message handler.
          self.onmessage = handleMessage;
        };
        // Use `const` here to ensure that the variable is scoped only to
        // that iteration, allowing safe reference from a closure.
        for (const handler of msgData.handlers) {
          // The the main module has a handler for a certain even, but no
          // handler exists on the pthread worker, then proxy that handler
          // back to the main thread.
          if (!Module[handler] || Module[handler].proxy) {
            Module[handler] = (...args) => {
              postMessage({
                cmd: "callHandler",
                handler,
                args
              });
            };
            // Rebind the out / err handlers if needed
            if (handler == "print") out = Module[handler];
            if (handler == "printErr") err = Module[handler];
          }
        }
        wasmMemory = msgData.wasmMemory;
        updateMemoryViews();
        wasmPromiseResolve(msgData.wasmModule);
      } else if (cmd === "run") {
        assert(msgData.pthread_ptr);
        // Call inside JS module to set up the stack frame for this pthread in JS module scope.
        // This needs to be the first thing that we do, as we cannot call to any C/C++ functions
        // until the thread stack is initialized.
        establishStackSpace(msgData.pthread_ptr);
        // Pass the thread address to wasm to store it for fast access.
        __emscripten_thread_init(msgData.pthread_ptr, /*is_main=*/ 0, /*is_runtime=*/ 0, /*can_block=*/ 1, 0, 0);
        PThread.receiveObjectTransfer(msgData);
        PThread.threadInitTLS();
        // Await mailbox notifications with `Atomics.waitAsync` so we can start
        // using the fast `Atomics.notify` notification path.
        __emscripten_thread_mailbox_await(msgData.pthread_ptr);
        if (!initializedJS) {
          initializedJS = true;
        }
        try {
          invokeEntryPoint(msgData.start_routine, msgData.arg);
        } catch (ex) {
          if (ex != "unwind") {
            // The pthread "crashed".  Do not call `_emscripten_thread_exit` (which
            // would make this thread joinable).  Instead, re-throw the exception
            // and let the top level handler propagate it back to the main thread.
            throw ex;
          }
        }
      } else if (msgData.target === "setimmediate") {} else // no-op
      if (cmd === "checkMailbox") {
        if (initializedJS) {
          checkMailbox();
        }
      } else if (cmd) {
        // The received message looks like something that should be handled by this message
        // handler, (since there is a cmd field present), but is not one of the
        // recognized commands:
        err(`worker: received unknown command ${cmd}`);
        err(msgData);
      }
    } catch (ex) {
      err(`worker: onmessage() captured an uncaught exception: ${ex}`);
      if (ex?.stack) err(ex.stack);
      __emscripten_thread_crashed();
      throw ex;
    }
  }
  self.onmessage = handleMessage;
}

// ENVIRONMENT_IS_PTHREAD
// end include: runtime_pthread.js
assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

// In non-standalone/normal mode, we create the memory here.
// include: runtime_init_memory.js
// Create the wasm memory. (Note: this only applies if IMPORTED_MEMORY is defined)
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
if (!ENVIRONMENT_IS_PTHREAD) {
  if (Module["wasmMemory"]) {
    wasmMemory = Module["wasmMemory"];
  } else {
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 67108864;
    legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
    assert(INITIAL_MEMORY >= 65536, "INITIAL_MEMORY should be larger than STACK_SIZE, was " + INITIAL_MEMORY + "! (STACK_SIZE=" + 65536 + ")");
    wasmMemory = new WebAssembly.Memory({
      "initial": INITIAL_MEMORY / 65536,
      // In theory we should not need to emit the maximum if we want "unlimited"
      // or 4GB of memory, but VMs error on that atm, see
      // https://github.com/emscripten-core/emscripten/issues/14130
      // And in the pthreads case we definitely need to emit a maximum. So
      // always emit one.
      "maximum": 32768,
      "shared": true
    });
  }
  updateMemoryViews();
}

// end include: runtime_init_memory.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  GROWABLE_HEAP_U32()[((max) >> 2)] = 34821223;
  GROWABLE_HEAP_U32()[(((max) + (4)) >> 2)] = 2310721022;
  // Also test the global address 0 for integrity.
  GROWABLE_HEAP_U32()[((0) >> 2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = GROWABLE_HEAP_U32()[((max) >> 2)];
  var cookie2 = GROWABLE_HEAP_U32()[(((max) + (4)) >> 2)];
  if (cookie1 != 34821223 || cookie2 != 2310721022) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (GROWABLE_HEAP_U32()[((0) >> 2)] != 1668509029) /* 'emsc' */ {
    abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}

// end include: runtime_stack_check.js
var __ATPRERUN__ = [];

// functions called before the runtime is initialized
var __ATINIT__ = [];

// functions called during startup
var __ATMAIN__ = [];

// functions called when main() is to be run
var __ATEXIT__ = [];

// functions called during shutdown
var __ATPOSTRUN__ = [];

// functions called after the main() is called
var runtimeInitialized = false;

var runtimeExited = false;

function preRun() {
  assert(!ENVIRONMENT_IS_PTHREAD);
  // PThreads reuse the runtime from the main thread.
  var preRuns = Module["preRun"];
  if (preRuns) {
    if (typeof preRuns == "function") preRuns = [ preRuns ];
    preRuns.forEach(addOnPreRun);
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  if (ENVIRONMENT_IS_PTHREAD) return;
  checkStackCookie();
  if (!Module["noFSInit"] && !FS.initialized) FS.init();
  FS.ignorePermissions = false;
  TTY.init();
  SOCKFS.root = FS.mount(SOCKFS, {}, null);
  PIPEFS.root = FS.mount(PIPEFS, {}, null);
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  if (ENVIRONMENT_IS_PTHREAD) return;
  // PThreads reuse the runtime from the main thread.
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  assert(!runtimeExited);
  checkStackCookie();
  if (ENVIRONMENT_IS_PTHREAD) return;
  // PThreads reuse the runtime from the main thread.
  try{___funcs_on_exit();}catch(e){console.warn("[zeek] exitRuntime error (ignored):",e);}
  // Native atexit() functions
  callRuntimeCallbacks(__ATEXIT__);
  FS.quit();
  TTY.shutdown();
  PThread.terminateAllThreads();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();
  if (ENVIRONMENT_IS_PTHREAD) return;
  // PThreads reuse the runtime from the main thread.
  var postRuns = Module["postRun"];
  if (postRuns) {
    if (typeof postRuns == "function") postRuns = [ postRuns ];
    postRuns.forEach(addOnPostRun);
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

// overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != "undefined") {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err("still waiting on run dependencies:");
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err("(end of list)");
        }
      }, 1e4);
    }
  } else {
    err("warning: run dependency added without ID");
  }
}

function removeRunDependency(id) {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err("warning: run dependency removed without ID");
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}

/** @param {string|number=} what */ function abort(what) {
  Module["onAbort"]?.(what);
  what = "Aborted(" + what + ")";
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);
  ABORT = true;
  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.
  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  // See above, in the meantime, we resort to wasm code for trapping.
  // In case abort() is called before the module is initialized, wasmExports
  // and its exported '__trap' function is not available, in which case we throw
  // a RuntimeError.
  // We trap instead of throwing RuntimeError to prevent infinite-looping in
  // Wasm EH code (because RuntimeError is considered as a foreign exception and
  // caught by 'catch_all'), but in case throwing RuntimeError is fine because
  // the module has not even been instantiated, even less running.
  if (runtimeInitialized) {
    ___trap();
  }
  /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    assert(!runtimeExited, `native function \`${name}\` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
  var f = "zeek.wasm";
  if (!isDataURI(f)) {
    return locateFile(f);
  }
  return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(response => new Uint8Array(/** @type{!ArrayBuffer} */ (response)), // Fall back to getBinarySync if readAsync fails
    () => getBinarySync(binaryFile));
  }
  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(receiver, reason => {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
  !isFileURI(binaryFile) && // Avoid instantiateStreaming() on Node.js environment for now, as while
  // Node.js v18.1.0 implements it, it does not have a full fetch()
  // implementation yet.
  // Reference:
  //   https://github.com/emscripten-core/emscripten/pull/16917
  !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
    return fetch(binaryFile, {
      credentials: "same-origin"
    }).then(response => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
      return result.then(callback, function(reason) {
        // We expect the most common failure cause to be a bad MIME type for the binary,
        // in which case falling back to ArrayBuffer instantiation should work.
        err(`wasm streaming compile failed: ${reason}`);
        err("falling back to ArrayBuffer instantiation");
        return instantiateArrayBuffer(binaryFile, imports, callback);
      });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  assignWasmImports();
  // prepare imports
  return {
    "env": wasmImports,
    "wasi_snapshot_preview1": wasmImports
  };
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
    wasmExports = instance.exports;
    registerTLSInit(wasmExports["_emscripten_tls_init"]);
    wasmTable = wasmExports["__indirect_function_table"];
    assert(wasmTable, "table not found in wasm exports");
    addOnInit(wasmExports["__wasm_call_ctors"]);
    // We now have the Wasm module loaded up, keep a reference to the compiled module so we can post it to the workers.
    wasmModule = module;
    removeRunDependency("wasm-instantiate");
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency("wasm-instantiate");
  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    trueModule = null;
    receiveInstance(result["instance"], result["module"]);
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module["instantiateWasm"]) {
    try {
      return Module["instantiateWasm"](info, receiveInstance);
    } catch (e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
      // If instantiation fails, reject the module ready promise.
      readyPromiseReject(e);
    }
  }
  wasmBinaryFile ??= findWasmBinary();
  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {};
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;

var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 25459;
  if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

if (Module["ENVIRONMENT"]) {
  throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

function legacyModuleProp(prop, newName, incoming = true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
  name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */ function hookGlobalSymbolAccess(sym, func) {}

// In MODULARIZE mode the generated code runs inside a function scope and not
// the global scope, and JavaScript does not provide access to function scopes
// so we cannot dynamically modify the scrope using `defineProperty` in this
// case.
// In this mode we simply ignore requests for `hookGlobalSymbolAccess`. Since
// this is a debug-only feature, skipping it is not major issue.
function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

missingGlobal("asm", "Please use wasmExports instead");

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
      librarySymbol = "$" + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
  });
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (ENVIRONMENT_IS_PTHREAD) {
    return;
  }
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // Avoid using the console for debugging in multi-threaded node applications
  // See https://github.com/emscripten-core/emscripten/issues/14804
  if (ENVIRONMENT_IS_NODE && fs) {
    fs.writeSync(2, args.join(" ") + "\n");
  } else // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// end include: runtime_debug.js
// === Body ===
// end include: preamble.js
/** @constructor */ function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = `Program terminated with exit(${status})`;
  this.status = status;
}

var terminateWorker = worker => {
  worker.terminate();
  // terminate() can be asynchronous, so in theory the worker can continue
  // to run for some amount of time after termination.  However from our POV
  // the worker now dead and we don't want to hear from it again, so we stub
  // out its message handler here.  This avoids having to check in each of
  // the onmessage handlers if the message was coming from valid worker.
  worker.onmessage = e => {
    var cmd = e["data"].cmd;
    err(`received "${cmd}" command from terminated worker: ${worker.workerID}`);
  };
};

var cleanupThread = pthread_ptr => {
  assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! cleanupThread() can only ever be called from main application thread!");
  assert(pthread_ptr, "Internal Error! Null pthread_ptr in cleanupThread!");
  var worker = PThread.pthreads[pthread_ptr];
  assert(worker);
  PThread.returnWorkerToPool(worker);
};

var spawnThread = threadParams => {
  assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! spawnThread() can only ever be called from main application thread!");
  assert(threadParams.pthread_ptr, "Internal error, no pthread ptr!");
  var worker = PThread.getNewWorker();
  if (!worker) {
    // No available workers in the PThread pool.
    return 6;
  }
  assert(!worker.pthread_ptr, "Internal error!");
  PThread.runningWorkers.push(worker);
  // Add to pthreads map
  PThread.pthreads[threadParams.pthread_ptr] = worker;
  worker.pthread_ptr = threadParams.pthread_ptr;
  var msg = {
    cmd: "run",
    start_routine: threadParams.startRoutine,
    arg: threadParams.arg,
    pthread_ptr: threadParams.pthread_ptr
  };
  if (ENVIRONMENT_IS_NODE) {
    // Mark worker as weakly referenced once we start executing a pthread,
    // so that its existence does not prevent Node.js from exiting.  This
    // has no effect if the worker is already weakly referenced (e.g. if
    // this worker was previously idle/unused).
    worker.unref();
  }
  // Ask the worker to start executing its pthread entry point function.
  worker.postMessage(msg, threadParams.transferList);
  return 0;
};

var runtimeKeepaliveCounter = 0;

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var stackSave = () => _emscripten_stack_get_current();

var stackRestore = val => __emscripten_stack_restore(val);

var stackAlloc = sz => __emscripten_stack_alloc(sz);

var convertI32PairToI53Checked = (lo, hi) => {
  assert(lo == (lo >>> 0) || lo == (lo | 0));
  // lo should either be a i32 or a u32
  assert(hi === (hi | 0));
  // hi should be a i32
  return ((hi + 2097152) >>> 0 < 4194305 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
};

/** @type{function(number, (number|boolean), ...number)} */ var proxyToMainThread = (funcIndex, emAsmAddr, sync, ...callArgs) => {
  // EM_ASM proxying is done by passing a pointer to the address of the EM_ASM
  // content as `emAsmAddr`.  JS library proxying is done by passing an index
  // into `proxiedJSCallArgs` as `funcIndex`. If `emAsmAddr` is non-zero then
  // `funcIndex` will be ignored.
  // Additional arguments are passed after the first three are the actual
  // function arguments.
  // The serialization buffer contains the number of call params, and then
  // all the args here.
  // We also pass 'sync' to C separately, since C needs to look at it.
  // Allocate a buffer, which will be copied by the C code.
  // First passed parameter specifies the number of arguments to the function.
  // When BigInt support is enabled, we must handle types in a more complex
  // way, detecting at runtime if a value is a BigInt or not (as we have no
  // type info here). To do that, add a "prefix" before each value that
  // indicates if it is a BigInt, which effectively doubles the number of
  // values we serialize for proxying. TODO: pack this?
  var serializedNumCallArgs = callArgs.length;
  var sp = stackSave();
  var args = stackAlloc(serializedNumCallArgs * 8);
  var b = ((args) >> 3);
  for (var i = 0; i < callArgs.length; i++) {
    var arg = callArgs[i];
    GROWABLE_HEAP_F64()[b + i] = arg;
  }
  var rtn = __emscripten_run_on_main_thread_js(funcIndex, emAsmAddr, serializedNumCallArgs, args, sync);
  stackRestore(sp);
  return rtn;
};

function _proc_exit(code) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(0, 0, 1, code);
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    PThread.terminateAllThreads();
    Module["onExit"]?.(code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
}

var handleException = e => {
  // Certain exception types we do not treat as errors since they are used for
  // internal control flow.
  // 1. ExitStatus, which is thrown by exit()
  // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
  //    that wish to return to JS event loop.
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS;
  }
  checkStackCookie();
  if (e instanceof WebAssembly.RuntimeError) {
    if (_emscripten_stack_get_current() <= 0) {
      err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)");
    }
  }
  quit_(1, e);
};

var runtimeKeepalivePop = () => {
  assert(runtimeKeepaliveCounter > 0);
  runtimeKeepaliveCounter -= 1;
};

function exitOnMainThread(returnCode) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(1, 0, 0, returnCode);
  runtimeKeepalivePop();
  _exit(returnCode);
}

/** @suppress {duplicate } */ /** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
  EXITSTATUS = status;
  if (ENVIRONMENT_IS_PTHREAD) {
    // implicit exit can never happen on a pthread
    assert(!implicit);
    // When running in a pthread we propagate the exit back to the main thread
    // where it can decide if the whole process should be shut down or not.
    // The pthread may have decided not to exit its own runtime, for example
    // because it runs a main loop, but that doesn't affect the main thread.
    exitOnMainThread(status);
    throw "unwind";
  }
  if (!keepRuntimeAlive()) {
    exitRuntime();
  }
  // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
  if (keepRuntimeAlive() && !implicit) {
    var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
    readyPromiseReject(msg);
    err(msg);
  }
  _proc_exit(status);
};

var _exit = exitJS;

var ptrToString = ptr => {
  assert(typeof ptr === "number");
  // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
  ptr >>>= 0;
  return "0x" + ptr.toString(16).padStart(8, "0");
};

var PThread = {
  unusedWorkers: [],
  runningWorkers: [],
  tlsInitFunctions: [],
  pthreads: {},
  nextWorkerID: 1,
  debugInit() {
    function pthreadLogPrefix() {
      var t = 0;
      if (runtimeInitialized && typeof _pthread_self != "undefined" && !runtimeExited) {
        t = _pthread_self();
      }
      return `w:${workerID},t:${ptrToString(t)}: `;
    }
    // Prefix all err()/dbg() messages with the calling thread ID.
    var origDbg = dbg;
    dbg = (...args) => origDbg(pthreadLogPrefix() + args.join(" "));
  },
  init() {
    PThread.debugInit();
    if ((!(ENVIRONMENT_IS_PTHREAD))) {
      PThread.initMainThread();
    }
  },
  initMainThread() {
    // MINIMAL_RUNTIME takes care of calling loadWasmModuleToAllWorkers
    // in postamble_minimal.js
    addOnPreRun(() => {
      addRunDependency("loading-workers");
      PThread.loadWasmModuleToAllWorkers(() => removeRunDependency("loading-workers"));
    });
  },
  terminateAllThreads: () => {
    assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! terminateAllThreads() can only ever be called from main application thread!");
    // Attempt to kill all workers.  Sadly (at least on the web) there is no
    // way to terminate a worker synchronously, or to be notified when a
    // worker in actually terminated.  This means there is some risk that
    // pthreads will continue to be executing after `worker.terminate` has
    // returned.  For this reason, we don't call `returnWorkerToPool` here or
    // free the underlying pthread data structures.
    for (var worker of PThread.runningWorkers) {
      terminateWorker(worker);
    }
    for (var worker of PThread.unusedWorkers) {
      terminateWorker(worker);
    }
    PThread.unusedWorkers = [];
    PThread.runningWorkers = [];
    PThread.pthreads = [];
  },
  returnWorkerToPool: worker => {
    // We don't want to run main thread queued calls here, since we are doing
    // some operations that leave the worker queue in an invalid state until
    // we are completely done (it would be bad if free() ends up calling a
    // queued pthread_create which looks at the global data structures we are
    // modifying). To achieve that, defer the free() til the very end, when
    // we are all done.
    var pthread_ptr = worker.pthread_ptr;
    delete PThread.pthreads[pthread_ptr];
    // Note: worker is intentionally not terminated so the pool can
    // dynamically grow.
    PThread.unusedWorkers.push(worker);
    PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
    // Not a running Worker anymore
    // Detach the worker from the pthread object, and return it to the
    // worker pool as an unused worker.
    worker.pthread_ptr = 0;
    if (ENVIRONMENT_IS_NODE) {
      // Once the proxied main thread has finished, mark it as weakly
      // referenced so that its existence does not prevent Node.js from
      // exiting.  This has no effect if the worker is already weakly
      // referenced.
      worker.unref();
    }
    // Finally, free the underlying (and now-unused) pthread structure in
    // linear memory.
    __emscripten_thread_free_data(pthread_ptr);
  },
  receiveObjectTransfer(data) {},
  threadInitTLS() {
    // Call thread init functions (these are the _emscripten_tls_init for each
    // module loaded.
    PThread.tlsInitFunctions.forEach(f => f());
  },
  loadWasmModuleToWorker: worker => new Promise(onFinishedLoading => {
    worker.onmessage = e => {
      var d = e["data"];
      var cmd = d.cmd;
      // If this message is intended to a recipient that is not the main
      // thread, forward it to the target thread.
      if (d.targetThread && d.targetThread != _pthread_self()) {
        var targetWorker = PThread.pthreads[d.targetThread];
        if (targetWorker) {
          targetWorker.postMessage(d, d.transferList);
        } else {
          err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d.targetThread}, but that thread no longer exists!`);
        }
        return;
      }
      if (cmd === "checkMailbox") {
        checkMailbox();
      } else if (cmd === "spawnThread") {
        spawnThread(d);
      } else if (cmd === "cleanupThread") {
        cleanupThread(d.thread);
      } else if (cmd === "loaded") {
        worker.loaded = true;
        onFinishedLoading(worker);
      } else if (cmd === "alert") {
        alert(`Thread ${d.threadId}: ${d.text}`);
      } else if (d.target === "setimmediate") {
        // Worker wants to postMessage() to itself to implement setImmediate()
        // emulation.
        worker.postMessage(d);
      } else if (cmd === "callHandler") {
        Module[d.handler](...d.args);
      } else if (cmd) {
        // The received message looks like something that should be handled by this message
        // handler, (since there is a e.data.cmd field present), but is not one of the
        // recognized commands:
        err(`worker sent an unknown command ${cmd}`);
      }
    };
    worker.onerror = e => {
      var message = "worker sent an error!";
      if (worker.pthread_ptr) {
        message = `Pthread ${ptrToString(worker.pthread_ptr)} sent an error!`;
      }
      err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
      throw e;
    };
    if (ENVIRONMENT_IS_NODE) {
      worker.on("message", data => worker.onmessage({
        data
      }));
      worker.on("error", e => worker.onerror(e));
    }
    assert(wasmMemory instanceof WebAssembly.Memory, "WebAssembly memory should have been loaded by now!");
    assert(wasmModule instanceof WebAssembly.Module, "WebAssembly Module should have been loaded by now!");
    // When running on a pthread, none of the incoming parameters on the module
    // object are present. Proxy known handlers back to the main thread if specified.
    var handlers = [];
    var knownHandlers = [ "onExit", "onAbort", "print", "printErr" ];
    for (var handler of knownHandlers) {
      if (Module.propertyIsEnumerable(handler)) {
        handlers.push(handler);
      }
    }
    worker.workerID = PThread.nextWorkerID++;
    // Ask the new worker to load up the Emscripten-compiled page. This is a heavy operation.
    worker.postMessage({
      cmd: "load",
      handlers,
      wasmMemory,
      wasmModule,
      "workerID": worker.workerID
    });
  }),
  loadWasmModuleToAllWorkers(onMaybeReady) {
    onMaybeReady();
  },
  allocateUnusedWorker() {
    var worker;
    var workerOptions = {
      // This is the way that we signal to the node worker that it is hosting
      // a pthread.
      "workerData": "em-pthread",
      // This is the way that we signal to the Web Worker that it is hosting
      // a pthread.
      "name": "em-pthread-" + PThread.nextWorkerID
    };
    var pthreadMainJs = _scriptName;
    // We can't use makeModuleReceiveWithVar here since we want to also
    // call URL.createObjectURL on the mainScriptUrlOrBlob.
    if (Module["mainScriptUrlOrBlob"]) {
      pthreadMainJs = Module["mainScriptUrlOrBlob"];
      if (typeof pthreadMainJs != "string") {
        pthreadMainJs = URL.createObjectURL(pthreadMainJs);
      }
    }
    worker = new Worker(pthreadMainJs, workerOptions);
    PThread.unusedWorkers.push(worker);
  },
  getNewWorker() {
    if (PThread.unusedWorkers.length == 0) {
      // PTHREAD_POOL_SIZE_STRICT should show a warning and, if set to level `2`, return from the function.
      PThread.allocateUnusedWorker();
      PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
    }
    return PThread.unusedWorkers.pop();
  }
};

var callRuntimeCallbacks = callbacks => {
  // Pass the module as the first argument.
  callbacks.forEach(f => f(Module));
};

var establishStackSpace = pthread_ptr => {
  // If memory growth is enabled, the memory views may have gotten out of date,
  // so resync them before accessing the pthread ptr below.
  updateMemoryViews();
  var stackHigh = GROWABLE_HEAP_U32()[(((pthread_ptr) + (52)) >> 2)];
  var stackSize = GROWABLE_HEAP_U32()[(((pthread_ptr) + (56)) >> 2)];
  var stackLow = stackHigh - stackSize;
  assert(stackHigh != 0);
  assert(stackLow != 0);
  assert(stackHigh > stackLow, "stackHigh must be higher then stackLow");
  // Set stack limits used by `emscripten/stack.h` function.  These limits are
  // cached in wasm-side globals to make checks as fast as possible.
  _emscripten_stack_set_limits(stackHigh, stackLow);
  // Call inside wasm module to set up the stack frame for this pthread in wasm module scope
  stackRestore(stackHigh);
  // Write the stack cookie last, after we have set up the proper bounds and
  // current position of the stack.
  writeStackCookie();
};

var wasmTableMirror = [];

/** @type {WebAssembly.Table} */ var wasmTable;

var getWasmTableEntry = funcPtr => {
  var func = wasmTableMirror[funcPtr];
  if (!func) {
    if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
    wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
  }
  assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
  return func;
};

var invokeEntryPoint = (ptr, arg) => {
  // An old thread on this worker may have been canceled without returning the
  // `runtimeKeepaliveCounter` to zero. Reset it now so the new thread won't
  // be affected.
  runtimeKeepaliveCounter = 0;
  // Same for noExitRuntime.  The default for pthreads should always be false
  // otherwise pthreads would never complete and attempts to pthread_join to
  // them would block forever.
  // pthreads can still choose to set `noExitRuntime` explicitly, or
  // call emscripten_unwind_to_js_event_loop to extend their lifetime beyond
  // their main function.  See comment in src/runtime_pthread.js for more.
  noExitRuntime = 0;
  // pthread entry points are always of signature 'void *ThreadMain(void *arg)'
  // Native codebases sometimes spawn threads with other thread entry point
  // signatures, such as void ThreadMain(void *arg), void *ThreadMain(), or
  // void ThreadMain().  That is not acceptable per C/C++ specification, but
  // x86 compiler ABI extensions enable that to work. If you find the
  // following line to crash, either change the signature to "proper" void
  // *ThreadMain(void *arg) form, or try linking with the Emscripten linker
  // flag -sEMULATE_FUNCTION_POINTER_CASTS to add in emulation for this x86
  // ABI extension.
  var result = getWasmTableEntry(ptr)(arg);
  checkStackCookie();
  function finish(result) {
    if (keepRuntimeAlive()) {
      EXITSTATUS = result;
    } else {
      __emscripten_thread_exit(result);
    }
  }
  finish(result);
};

var noExitRuntime = Module["noExitRuntime"] || false;

var registerTLSInit = tlsInitFunc => PThread.tlsInitFunctions.push(tlsInitFunc);

var runtimeKeepalivePush = () => {
  runtimeKeepaliveCounter += 1;
};

var warnOnce = text => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
    err(text);
  }
};

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on
  // null terminator by itself.  Also, use the length info to avoid running tiny
  // strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation,
  // so that undefined/NaN means Infinity)
  while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
    return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer ? heapOrArray.slice(idx, endPtr) : heapOrArray.subarray(idx, endPtr));
  }
  var str = "";
  // If building with TextDecoder, we have already computed the string length
  // above, so test loop end condition against that
  while (idx < endPtr) {
    // For UTF8 byte structure, see:
    // http://en.wikipedia.org/wiki/UTF-8#Description
    // https://www.ietf.org/rfc/rfc2279.txt
    // https://tools.ietf.org/html/rfc3629
    var u0 = heapOrArray[idx++];
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0);
      continue;
    }
    var u1 = heapOrArray[idx++] & 63;
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1);
      continue;
    }
    var u2 = heapOrArray[idx++] & 63;
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    }
  }
  return str;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => {
  assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
  return ptr ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead) : "";
};

var ___assert_fail = (condition, filename, line, func) => {
  abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);

function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(2, 0, 1, pthread_ptr, attr, startRoutine, arg);
  return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg);
}

var _emscripten_has_threading_support = () => typeof SharedArrayBuffer != "undefined";

var ___pthread_create_js = (pthread_ptr, attr, startRoutine, arg) => {
  if (!_emscripten_has_threading_support()) {
    dbg("pthread_create: environment does not support SharedArrayBuffer, pthreads are not available");
    return 6;
  }
  // List of JS objects that will transfer ownership to the Worker hosting the thread
  var transferList = [];
  var error = 0;
  // Synchronously proxy the thread creation to main thread if possible. If we
  // need to transfer ownership of objects, then proxy asynchronously via
  // postMessage.
  if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
    return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg);
  }
  // If on the main thread, and accessing Canvas/OffscreenCanvas failed, abort
  // with the detected error.
  if (error) return error;
  var threadParams = {
    startRoutine,
    pthread_ptr,
    arg,
    transferList
  };
  if (ENVIRONMENT_IS_PTHREAD) {
    // The prepopulated pool of web workers that can host pthreads is stored
    // in the main JS thread. Therefore if a pthread is attempting to spawn a
    // new thread, the thread creation must be deferred to the main JS thread.
    threadParams.cmd = "spawnThread";
    postMessage(threadParams, transferList);
    // When we defer thread creation this way, we have no way to detect thread
    // creation synchronously today, so we have to assume success and return 0.
    return 0;
  }
  // We are the main thread, so we have the pthread warmup pool in this
  // thread and can fire off JS thread creation directly ourselves.
  return spawnThread(threadParams);
};

var PATH = {
  isAbs: path => path.charAt(0) === "/",
  splitPath: filename => {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: (parts, allowAboveRoot) => {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (;up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: path => {
    var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
    // Normalize the path
    path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: path => {
    var result = PATH.splitPath(path), root = result[0], dir = result[1];
    if (!root && !dir) {
      // No dirname whatsoever
      return ".";
    }
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  },
  basename: path => {
    // EMSCRIPTEN return '/'' for '/', not an empty string
    if (path === "/") return "/";
    path = PATH.normalize(path);
    path = path.replace(/\/$/, "");
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  },
  join: (...paths) => PATH.normalize(paths.join("/")),
  join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
  if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
    // for modern web browsers
    // like with most Web APIs, we can't use Web Crypto API directly on shared memory,
    // so we need to create an intermediate buffer and copy it to the destination
    return view => (view.set(crypto.getRandomValues(new Uint8Array(view.byteLength))), 
    // Return the original view to match modern native implementations.
    view);
  } else if (ENVIRONMENT_IS_NODE) {
    // for nodejs with or without crypto support included
    try {
      var crypto_module = require("crypto");
      var randomFillSync = crypto_module["randomFillSync"];
      if (randomFillSync) {
        // nodejs with LTS crypto support
        return view => crypto_module["randomFillSync"](view);
      }
      // very old nodejs with the original crypto API
      var randomBytes = crypto_module["randomBytes"];
      return view => (view.set(randomBytes(view.byteLength)), // Return the original view to match modern native implementations.
      view);
    } catch (e) {}
  }
  // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
  abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
  resolve: (...args) => {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? args[i] : FS.cwd();
      // Skip empty and invalid entries
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      // an invalid portion invalidates the whole thing
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
    return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).substr(1);
    to = PATH_FS.resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (;start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (;end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
    // unit, not a Unicode code point of the character! So decode
    // UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var c = str.charCodeAt(i);
    // possibly a lead surrogate
    if (c <= 127) {
      len++;
    } else if (c <= 2047) {
      len += 2;
    } else if (c >= 55296 && c <= 57343) {
      len += 4;
      ++i;
    } else {
      len += 3;
    }
  }
  return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
  assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
  // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
  // undefined and false each don't write out any bytes.
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
    // unit, not a Unicode code point of the character! So decode
    // UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
    // and https://www.ietf.org/rfc/rfc2279.txt
    // and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i);
    // possibly a lead surrogate
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i);
      u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 192 | (u >> 6);
      heap[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 224 | (u >> 12);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      heap[outIdx++] = 240 | (u >> 18);
      heap[outIdx++] = 128 | ((u >> 12) & 63);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
};

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

var FS_stdin_getChar = () => {
  if (!FS_stdin_getChar_buffer.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
      // we will read data by chunks of BUFSIZE
      var BUFSIZE = 256;
      var buf = Buffer.alloc(BUFSIZE);
      var bytesRead = 0;
      // For some reason we must suppress a closure warning here, even though
      // fd definitely exists on process.stdin, and is even the proper way to
      // get the fd of stdin,
      // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
      // This started to happen after moving this logic out of library_tty.js,
      // so it is related to the surrounding code in some unclear manner.
      /** @suppress {missingProperties} */ var fd = process.stdin.fd;
      try {
        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
      } catch (e) {
        // Cross-platform differences: on Windows, reading EOF throws an
        // exception, but on other OSes, reading EOF returns 0. Uniformize
        // behavior by treating the EOF exception to return 0.
        if (e.toString().includes("EOF")) bytesRead = 0; else throw e;
      }
      if (bytesRead > 0) {
        result = buf.slice(0, bytesRead).toString("utf-8");
      }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
      // Browser.
      result = window.prompt("Input: ");
      // returns null on cancel
      if (result !== null) {
        result += "\n";
      }
    } else {}
    if (!result) {
      return null;
    }
    FS_stdin_getChar_buffer = intArrayFromString(result, true);
  }
  return FS_stdin_getChar_buffer.shift();
};

var TTY = {
  ttys: [],
  init() {},
  // https://github.com/emscripten-core/emscripten/pull/1555
  // if (ENVIRONMENT_IS_NODE) {
  //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
  //   // device, it always assumes it's a TTY device. because of this, we're forcing
  //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
  //   // with text files until FS.init can be refactored.
  //   process.stdin.setEncoding('utf8');
  // }
  shutdown() {},
  // https://github.com/emscripten-core/emscripten/pull/1555
  // if (ENVIRONMENT_IS_NODE) {
  //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
  //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
  //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
  //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
  //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
  //   process.stdin.pause();
  // }
  register(dev, ops) {
    TTY.ttys[dev] = {
      input: [],
      output: [],
      ops
    };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close(stream) {
      // flush any pending line data
      stream.tty.ops.fsync(stream.tty);
    },
    fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    read(stream, buffer, offset, length, pos) {
      /* ignored */ if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    },
    write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    }
  },
  default_tty_ops: {
    get_char(tty) {
      return FS_stdin_getChar();
    },
    put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    // val == 0 would cut text output off in the middle.
    fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
    ioctl_tcgets(tty) {
      // typical setting
      return {
        c_iflag: 25856,
        c_oflag: 5,
        c_cflag: 191,
        c_lflag: 35387,
        c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      };
    },
    ioctl_tcsets(tty, optional_actions, data) {
      // currently just ignore
      return 0;
    },
    ioctl_tiocgwinsz(tty) {
      return [ 24, 80 ];
    }
  },
  default_tty1_ops: {
    put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }
  }
};

var zeroMemory = (address, size) => {
  GROWABLE_HEAP_U8().fill(0, address, address + size);
};

var alignMemory = (size, alignment) => {
  assert(alignment, "alignment argument is required");
  return Math.ceil(size / alignment) * alignment;
};

var mmapAlloc = size => {
  size = alignMemory(size, 65536);
  var ptr = _emscripten_builtin_memalign(65536, size);
  if (ptr) zeroMemory(ptr, size);
  return ptr;
};

var MEMFS = {
  ops_table: null,
  mount(mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
  },
  createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      // no supported
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table ||= {
      dir: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          lookup: MEMFS.node_ops.lookup,
          mknod: MEMFS.node_ops.mknod,
          rename: MEMFS.node_ops.rename,
          unlink: MEMFS.node_ops.unlink,
          rmdir: MEMFS.node_ops.rmdir,
          readdir: MEMFS.node_ops.readdir,
          symlink: MEMFS.node_ops.symlink
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek
        }
      },
      file: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek,
          read: MEMFS.stream_ops.read,
          write: MEMFS.stream_ops.write,
          allocate: MEMFS.stream_ops.allocate,
          mmap: MEMFS.stream_ops.mmap,
          msync: MEMFS.stream_ops.msync
        }
      },
      link: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          readlink: MEMFS.node_ops.readlink
        },
        stream: {}
      },
      chrdev: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: FS.chrdev_stream_ops
      }
    };
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
      // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
      // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
      // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.timestamp = Date.now();
    // add the new node to the parent
    if (parent) {
      parent.contents[name] = node;
      parent.timestamp = node.timestamp;
    }
    return node;
  },
  getFileDataAsTypedArray(node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    // Make sure to not return excess unused bytes.
    return new Uint8Array(node.contents);
  },
  expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    // No need to expand, the storage was already large enough.
    // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
    // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
    // avoid overshooting the allocation cap by a very large margin.
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    // At minimum allocate 256b for each file when expanding.
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    // Allocate new storage.
    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  },
  // Copy old data over to the new storage.
  resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      // Fully decommit when requesting a resize to zero.
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      // Allocate new storage.
      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }
      // Copy old data over to the new storage.
      node.usedBytes = newSize;
    }
  },
  node_ops: {
    getattr(node) {
      var attr = {};
      // device numbers reuse inode numbers.
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
      //       but this is not required by the standard.
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr(node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup(parent, name) {
      throw FS.genericErrors[44];
    },
    mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename(old_node, new_dir, new_name) {
      // if we're overwriting a directory at new_name, make sure it's empty.
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      // do the internal rewiring
      delete old_node.parent.contents[old_node.name];
      old_node.parent.timestamp = Date.now();
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      new_dir.timestamp = old_node.parent.timestamp;
    },
    unlink(parent, name) {
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.timestamp = Date.now();
    },
    readdir(node) {
      var entries = [ ".", ".." ];
      for (var key of Object.keys(node.contents)) {
        entries.push(key);
      }
      return entries;
    },
    symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | /* 0777 */ 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    }
  },
  stream_ops: {
    read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      assert(size >= 0);
      if (size > 8 && contents.subarray) {
        // non-trivial, and typed array
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
      }
      return size;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      // The data buffer should be a typed array view
      assert(!(buffer instanceof ArrayBuffer));
      // If the buffer is located in main memory (HEAP), and if
      // memory can grow, we can't hold on to references of the
      // memory buffer, as they may get invalidated. That means we
      // need to do copy its contents.
      if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        // This write is from a typed array to a typed array?
        if (canOwn) {
          assert(position === 0, "canOwn must imply no weird position inside the file");
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          // Writing to an already allocated and used subrange of the file?
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        // Use typed array write which is available.
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    allocate(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    },
    mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      // Only make a new copy when MAP_PRIVATE is specified.
      if (!(flags & 2) && contents && contents.buffer === GROWABLE_HEAP_I8().buffer) {
        // We can't emulate MAP_SHARED when the file is not backed by the
        // buffer we're mapping to (e.g. the HEAP buffer).
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          // Try to avoid unnecessary slices.
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          GROWABLE_HEAP_I8().set(contents, ptr);
        }
      }
      return {
        ptr,
        allocated
      };
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      // should we check if bytesWritten and length are the same?
      return 0;
    }
  }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
  var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
  readAsync(url).then(arrayBuffer => {
    assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
    onload(new Uint8Array(arrayBuffer));
    if (dep) removeRunDependency(dep);
  }, err => {
    if (onerror) {
      onerror();
    } else {
      throw `Loading data file "${url}" failed.`;
    }
  });
  if (dep) addRunDependency(dep);
};

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
  FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
};

var preloadPlugins = Module["preloadPlugins"] || [];

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
  // Ensure plugins are ready.
  if (typeof Browser != "undefined") Browser.init();
  var handled = false;
  preloadPlugins.forEach(plugin => {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
      plugin["handle"](byteArray, fullname, finish, onerror);
      handled = true;
    }
  });
  return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
  // TODO we should allow people to just pass in a complete filename instead
  // of parent and name being that we just join them anyways
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency(`cp ${fullname}`);
  // might have several active requests for the same fullname
  function processData(byteArray) {
    function finish(byteArray) {
      preFinish?.();
      if (!dontCreateFile) {
        FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
      }
      onload?.();
      removeRunDependency(dep);
    }
    if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
      onerror?.();
      removeRunDependency(dep);
    })) {
      return;
    }
    finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
    asyncLoad(url, processData, onerror);
  } else {
    processData(url);
  }
};

var FS_modeStringToFlags = str => {
  var flagModes = {
    "r": 0,
    "r+": 2,
    "w": 512 | 64 | 1,
    "w+": 512 | 64 | 2,
    "a": 1024 | 64 | 1,
    "a+": 1024 | 64 | 2
  };
  var flags = flagModes[str];
  if (typeof flags == "undefined") {
    throw new Error(`Unknown file open mode: ${str}`);
  }
  return flags;
};

var FS_getMode = (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
};

var strError = errno => UTF8ToString(_strerror(errno));

var ERRNO_CODES = {
  "EPERM": 63,
  "ENOENT": 44,
  "ESRCH": 71,
  "EINTR": 27,
  "EIO": 29,
  "ENXIO": 60,
  "E2BIG": 1,
  "ENOEXEC": 45,
  "EBADF": 8,
  "ECHILD": 12,
  "EAGAIN": 6,
  "EWOULDBLOCK": 6,
  "ENOMEM": 48,
  "EACCES": 2,
  "EFAULT": 21,
  "ENOTBLK": 105,
  "EBUSY": 10,
  "EEXIST": 20,
  "EXDEV": 75,
  "ENODEV": 43,
  "ENOTDIR": 54,
  "EISDIR": 31,
  "EINVAL": 28,
  "ENFILE": 41,
  "EMFILE": 33,
  "ENOTTY": 59,
  "ETXTBSY": 74,
  "EFBIG": 22,
  "ENOSPC": 51,
  "ESPIPE": 70,
  "EROFS": 69,
  "EMLINK": 34,
  "EPIPE": 64,
  "EDOM": 18,
  "ERANGE": 68,
  "ENOMSG": 49,
  "EIDRM": 24,
  "ECHRNG": 106,
  "EL2NSYNC": 156,
  "EL3HLT": 107,
  "EL3RST": 108,
  "ELNRNG": 109,
  "EUNATCH": 110,
  "ENOCSI": 111,
  "EL2HLT": 112,
  "EDEADLK": 16,
  "ENOLCK": 46,
  "EBADE": 113,
  "EBADR": 114,
  "EXFULL": 115,
  "ENOANO": 104,
  "EBADRQC": 103,
  "EBADSLT": 102,
  "EDEADLOCK": 16,
  "EBFONT": 101,
  "ENOSTR": 100,
  "ENODATA": 116,
  "ETIME": 117,
  "ENOSR": 118,
  "ENONET": 119,
  "ENOPKG": 120,
  "EREMOTE": 121,
  "ENOLINK": 47,
  "EADV": 122,
  "ESRMNT": 123,
  "ECOMM": 124,
  "EPROTO": 65,
  "EMULTIHOP": 36,
  "EDOTDOT": 125,
  "EBADMSG": 9,
  "ENOTUNIQ": 126,
  "EBADFD": 127,
  "EREMCHG": 128,
  "ELIBACC": 129,
  "ELIBBAD": 130,
  "ELIBSCN": 131,
  "ELIBMAX": 132,
  "ELIBEXEC": 133,
  "ENOSYS": 52,
  "ENOTEMPTY": 55,
  "ENAMETOOLONG": 37,
  "ELOOP": 32,
  "EOPNOTSUPP": 138,
  "EPFNOSUPPORT": 139,
  "ECONNRESET": 15,
  "ENOBUFS": 42,
  "EAFNOSUPPORT": 5,
  "EPROTOTYPE": 67,
  "ENOTSOCK": 57,
  "ENOPROTOOPT": 50,
  "ESHUTDOWN": 140,
  "ECONNREFUSED": 14,
  "EADDRINUSE": 3,
  "ECONNABORTED": 13,
  "ENETUNREACH": 40,
  "ENETDOWN": 38,
  "ETIMEDOUT": 73,
  "EHOSTDOWN": 142,
  "EHOSTUNREACH": 23,
  "EINPROGRESS": 26,
  "EALREADY": 7,
  "EDESTADDRREQ": 17,
  "EMSGSIZE": 35,
  "EPROTONOSUPPORT": 66,
  "ESOCKTNOSUPPORT": 137,
  "EADDRNOTAVAIL": 4,
  "ENETRESET": 39,
  "EISCONN": 30,
  "ENOTCONN": 53,
  "ETOOMANYREFS": 141,
  "EUSERS": 136,
  "EDQUOT": 19,
  "ESTALE": 72,
  "ENOTSUP": 138,
  "ENOMEDIUM": 148,
  "EILSEQ": 25,
  "EOVERFLOW": 61,
  "ECANCELED": 11,
  "ENOTRECOVERABLE": 56,
  "EOWNERDEAD": 62,
  "ESTRPIPE": 135
};

var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  ErrnoError: class extends Error {
    // We set the `name` property to be able to identify `FS.ErrnoError`
    // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
    // - when using PROXYFS, an error can come from an underlying FS
    // as different FS objects have their own FS.ErrnoError each,
    // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
    // we'll use the reliable test `err.name == "ErrnoError"` instead
    constructor(errno) {
      super(runtimeInitialized ? strError(errno) : "");
      // TODO(sbc): Use the inline member declaration syntax once we
      // support it in acorn and closure.
      this.name = "ErrnoError";
      this.errno = errno;
      for (var key in ERRNO_CODES) {
        if (ERRNO_CODES[key] === errno) {
          this.code = key;
          break;
        }
      }
    }
  },
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  readFiles: {},
  FSStream: class {
    constructor() {
      // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
      // Use inline field declarations.
      this.shared = {};
    }
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return (this.flags & 1024);
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  },
  FSNode: class {
    constructor(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      // root node sets parent to itself
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
      this.readMode = 292 | 73;
      this.writeMode = 146;
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
  },
  lookupPath(path, opts = {}) {
    path = PATH_FS.resolve(path);
    if (!path) return {
      path: "",
      node: null
    };
    var defaults = {
      follow_mount: true,
      recurse_count: 0
    };
    opts = Object.assign(defaults, opts);
    if (opts.recurse_count > 8) {
      // max recursive lookup of 8
      throw new FS.ErrnoError(32);
    }
    // split the absolute path
    var parts = path.split("/").filter(p => !!p);
    // start at the root
    var current = FS.root;
    var current_path = "/";
    for (var i = 0; i < parts.length; i++) {
      var islast = (i === parts.length - 1);
      if (islast && opts.parent) {
        // stop resolving
        break;
      }
      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);
      // jump to the mount's root node if this is a mountpoint
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root;
        }
      }
      // by default, lookupPath will not follow a symlink if it is the final path component.
      // setting opts.follow = true will override this behavior.
      if (!islast || opts.follow) {
        var count = 0;
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count + 1
          });
          current = lookup.node;
          if (count++ > 40) {
            // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
            throw new FS.ErrnoError(32);
          }
        }
      }
    }
    return {
      path: current_path,
      node: current
    };
  },
  getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  },
  hashName(parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    // if we failed to find it in the cache, call into the VFS
    return FS.lookup(parent, name);
  },
  createNode(parent, name, mode, rdev) {
    assert(typeof parent == "object");
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot(node) {
    return node === node.parent;
  },
  isMountpoint(node) {
    return !!node.mounted;
  },
  isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagsToPermissionString(flag) {
    var perms = [ "r", "w", "rw" ][flag & 3];
    if ((flag & 512)) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    // return 0 if any user, group or owner bits are set.
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate(dir, name) {
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  },
  mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || // opening for write
      (flags & 512)) {
        // TODO: check for O_SEARCH? (== search for dir only)
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  MAX_OPEN_FDS: 4096,
  nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  },
  getStream: fd => FS.streams[fd],
  createStream(stream, fd = -1) {
    assert(fd >= -1);
    // clone it, so we can return an instance of FSStream
    stream = Object.assign(new FS.FSStream, stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream(fd) {
    FS.streams[fd] = null;
  },
  dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  },
  chrdev_stream_ops: {
    open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      // override node's stream ops with the device's
      stream.stream_ops = device.stream_ops;
      // forward the open call
      stream.stream_ops.open?.(stream);
    },
    llseek() {
      throw new FS.ErrnoError(70);
    }
  },
  major: dev => ((dev) >> 8),
  minor: dev => ((dev) & 255),
  makedev: (ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
    FS.devices[dev] = {
      stream_ops: ops
    };
  },
  getDevice: dev => FS.devices[dev],
  getMounts(mount) {
    var mounts = [];
    var check = [ mount ];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  },
  syncfs(populate, callback) {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      assert(FS.syncFSRequests > 0);
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    // sync all mounts
    mounts.forEach(mount => {
      if (!mount.type.syncfs) {
        return done(null);
      }
      mount.type.syncfs(mount, populate, done);
    });
  },
  mount(type, opts, mountpoint) {
    if (typeof type == "string") {
      // The filesystem was not included, and instead we have an error
      // message stored in the variable.
      throw type;
    }
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, {
        follow_mount: false
      });
      mountpoint = lookup.path;
      // use the absolute path
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = {
      type,
      opts,
      mountpoint,
      mounts: []
    };
    // create a root node for the fs
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      // set as a mountpoint
      node.mounted = mount;
      // add the new mount to the current mount's children
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, {
      follow_mount: false
    });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    // destroy the nodes for this mount, and all its child mounts
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach(hash => {
      var current = FS.nameTable[hash];
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    });
    // no longer a mountpoint
    node.mounted = null;
    // remove this mount from the child mounts
    var idx = node.mount.mounts.indexOf(mount);
    assert(idx !== -1);
    node.mount.mounts.splice(idx, 1);
  },
  lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  create(path, mode) {
    mode = mode !== undefined ? mode : 438;
    /* 0666 */ mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir(path, mode) {
    mode = mode !== undefined ? mode : 511;
    /* 0777 */ mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue;
      d += "/" + dirs[i];
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev(path, mode, dev) {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    /* 0666 */ mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    // parents must exist
    var lookup, old_dir, new_dir;
    // let the errors from non existent directories percolate up
    lookup = FS.lookupPath(old_path, {
      parent: true
    });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, {
      parent: true
    });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    // need to be part of the same mount
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    // source must exist
    var old_node = FS.lookupNode(old_dir, old_name);
    // old path should not be an ancestor of the new path
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    // new path should not be an ancestor of the old path
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    // see if the new path already exists
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    // early out if nothing needs to change
    if (old_node === new_node) {
      return;
    }
    // we'll need to delete the old entry
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    // need delete permissions if we'll be overwriting.
    // need create permissions if new doesn't already exist.
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    // if we are going to change the parent, check write permissions
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // remove the node from the lookup hash
    FS.hashRemoveNode(old_node);
    // do the underlying fs rename
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      // update old node (we do this here to avoid each backend 
      // needing to)
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      // add the node back to the hash (in case node_ops.rename
      // changed its name)
      FS.hashAddNode(old_node);
    }
  },
  rmdir(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54);
    }
    return node.node_ops.readdir(node);
  },
  unlink(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      // According to POSIX, we should map EISDIR to EPERM, but
      // we instead do what Linux does (and we must, as we use
      // the musl linux libc).
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
  },
  stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, {
      follow: !dontFollow
    });
    var node = lookup.node;
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63);
    }
    return node.node_ops.getattr(node);
  },
  lstat(path) {
    return FS.stat(path, true);
  },
  chmod(path, mode, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now()
    });
  },
  lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.chmod(stream.node, mode);
  },
  chown(path, uid, gid, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      timestamp: Date.now()
    });
  },
  // we ignore the uid / gid for now
  lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.chown(stream.node, uid, gid);
  },
  truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, {
        follow: true
      });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    node.node_ops.setattr(node, {
      size: len,
      timestamp: Date.now()
    });
  },
  ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.truncate(stream.node, len);
  },
  utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    node.node_ops.setattr(node, {
      timestamp: Math.max(atime, mtime)
    });
  },
  open(path, flags, mode) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
    if ((flags & 64)) {
      mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    if (typeof path == "object") {
      node = path;
    } else {
      path = PATH.normalize(path);
      try {
        var lookup = FS.lookupPath(path, {
          follow: !(flags & 131072)
        });
        node = lookup.node;
      } catch (e) {}
    }
    // perhaps we need to create the node
    var created = false;
    if ((flags & 64)) {
      if (node) {
        // if O_CREAT and O_EXCL are set, error out if the node already exists
        if ((flags & 128)) {
          throw new FS.ErrnoError(20);
        }
      } else {
        // node doesn't exist, try to create it
        node = FS.mknod(path, mode, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    // can't truncate a device
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    // if asked only for a directory, then this must be one
    if ((flags & 65536) && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    // check permissions, if this is not a file we just created now (it is ok to
    // create and write to a file with read-only permissions; it is read-only
    // for later use)
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // do truncation if necessary
    if ((flags & 512) && !created) {
      FS.truncate(node, 0);
    }
    // we've already handled these, don't pass down to the underlying vfs
    flags &= ~(128 | 512 | 131072);
    // register the stream with the filesystem
    var stream = FS.createStream({
      node,
      path: FS.getPath(node),
      // we want the absolute path to the node
      flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      // used by the file family libc calls (fopen, fwrite, ferror, etc.)
      ungotten: [],
      error: false
    });
    // call the new stream's open function
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
      }
    }
    return stream;
  },
  close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    // free readdir state
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed(stream) {
    return stream.fd === null;
  },
  llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read(stream, buffer, offset, length, position) {
    assert(offset >= 0);
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write(stream, buffer, offset, length, position, canOwn) {
    assert(offset >= 0);
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      // seek to the end before writing in append mode
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  allocate(stream, offset, length) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138);
    }
    stream.stream_ops.allocate(stream, offset, length);
  },
  mmap(stream, length, position, prot, flags) {
    // User requests writing to file (prot & PROT_WRITE != 0).
    // Checking if we have permissions to write to the file unless
    // MAP_PRIVATE flag is set. According to POSIX spec it is possible
    // to write to file opened in read-only mode with MAP_PRIVATE flag,
    // as all modifications will be visible only in the memory of
    // the current process.
    if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  },
  msync(stream, buffer, offset, length, mmapFlags) {
    assert(offset >= 0);
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile(path, opts = {}) {
    opts.flags = opts.flags || 0;
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error(`Invalid encoding type "${opts.encoding}"`);
    }
    var ret;
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf);
    } else if (opts.encoding === "binary") {
      ret = buf;
    }
    FS.close(stream);
    return ret;
  },
  writeFile(path, data, opts = {}) {
    opts.flags = opts.flags || 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data == "string") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    } else {
      throw new Error("Unsupported data type");
    }
    FS.close(stream);
  },
  cwd: () => FS.currentPath,
  chdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices() {
    // create /dev
    FS.mkdir("/dev");
    // setup /dev/null
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    // setup /dev/tty and /dev/tty1
    // stderr needs to print output using err() rather than out()
    // so we register a second tty just for it.
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    // setup /dev/[u]random
    // use a buffer to avoid overhead of individual crypto calls per byte
    var randomBuffer = new Uint8Array(1024), randomLeft = 0;
    var randomByte = () => {
      if (randomLeft === 0) {
        randomLeft = randomFill(randomBuffer).byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    // we're not going to emulate the actual shm device,
    // just create the tmp dirs that reside in it commonly
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories() {
    // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
    // name of the stream for fd 6 (see test_unistd_ttyname)
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount({
      mount() {
        var node = FS.createNode(proc_self, "fd", 16384 | 511, /* 0777 */ 73);
        node.node_ops = {
          lookup(parent, name) {
            var fd = +name;
            var stream = FS.getStreamChecked(fd);
            var ret = {
              parent: null,
              mount: {
                mountpoint: "fake"
              },
              node_ops: {
                readlink: () => stream.path
              }
            };
            ret.parent = ret;
            // make it look like a simple root node
            return ret;
          }
        };
        return node;
      }
    }, {}, "/proc/self/fd");
  },
  createStandardStreams(input, output, error) {
    // TODO deprecate the old functionality of a single
    // input / output callback and that utilizes FS.createDevice
    // and instead require a unique set of stream ops
    // by default, we symlink the standard streams to the
    // default tty devices. however, if the standard streams
    // have been overwritten we create a unique device for
    // them instead.
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    // open default streams for the stdin, stdout and stderr devices
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
    assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
    assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
    assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
  },
  staticInit() {
    // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
    [ 44 ].forEach(code => {
      FS.genericErrors[code] = new FS.ErrnoError(code);
      FS.genericErrors[code].stack = "<generic error, no stack>";
    });
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = {
      "MEMFS": MEMFS
    };
  },
  init(input, output, error) {
    assert(!FS.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
    FS.initialized = true;
    // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
    input ??= Module["stdin"];
    output ??= Module["stdout"];
    error ??= Module["stderr"];
    FS.createStandardStreams(input, output, error);
  },
  quit() {
    FS.initialized = false;
    // force-flush all streams, so we get musl std streams printed out
    _fflush(0);
    // close all of our streams
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i];
      if (!stream) {
        continue;
      }
      FS.close(stream);
    }
  },
  findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (!ret.exists) {
      return null;
    }
    return ret.object;
  },
  analyzePath(path, dontResolveLastLink) {
    // operate from within the context of the symlink's target
    try {
      var lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };
    try {
      var lookup = FS.lookupPath(path, {
        parent: true
      });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath(parent, path, canRead, canWrite) {
    parent = typeof parent == "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {}
      // ignore EEXIST
      parent = current;
    }
    return current;
  },
  createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name;
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data == "string") {
        var arr = new Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
        data = arr;
      }
      // make sure we can write to the file
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  },
  createDevice(parent, name, input, output) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(!!input, !!output);
    FS.createDevice.major ??= 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    // Create a fake device that a set of stream ops to emulate
    // the old behavior.
    FS.registerDevice(dev, {
      open(stream) {
        stream.seekable = false;
      },
      close(stream) {
        // flush any pending line data
        if (output?.buffer?.length) {
          output(10);
        }
      },
      read(stream, buffer, offset, length, pos) {
        /* ignored */ var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (typeof XMLHttpRequest != "undefined") {
      throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      // Command-line.
      try {
        obj.contents = readBinary(obj.url);
        obj.usedBytes = obj.contents.length;
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  },
  createLazyFile(parent, name, url, canRead, canWrite) {
    // Lazy chunked Uint8Array (implements get and length from Uint8Array).
    // Actual getting is abstracted away for eventual reuse.
    class LazyUint8Array {
      constructor() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      // Loaded chunks. Index is the chunk number
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        // Find length
        var xhr = new XMLHttpRequest;
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        // Chunk size in bytes
        if (!hasByteServing) chunkSize = datalength;
        // Function to get a range from the remote URL.
        var doXHR = (from, to) => {
          if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
          // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, false);
          if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          // Some hints to the browser that we want binary data.
          xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
          }
          return intArrayFromString(xhr.responseText || "", true);
        };
        var lazyArray = this;
        lazyArray.setDataGetter(chunkNum => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          // including this byte
          end = Math.min(end, datalength - 1);
          // if datalength-1 is selected, this is the last block
          if (typeof lazyArray.chunks[chunkNum] == "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
          chunkSize = datalength = 1;
          // this will force getter(0)/doXHR do download the whole file
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (typeof XMLHttpRequest != "undefined") {
      if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
      var lazyArray = new LazyUint8Array;
      var properties = {
        isDevice: false,
        contents: lazyArray
      };
    } else {
      var properties = {
        isDevice: false,
        url
      };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    // This is a total hack, but I want to get this lazy file code out of the
    // core of MEMFS. If we want to keep this lazy file concept I feel it should
    // be its own thin LAZYFS proxying calls to MEMFS.
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    // Add a function that defers querying the file size until it is asked the first time.
    Object.defineProperties(node, {
      usedBytes: {
        get: function() {
          return this.contents.length;
        }
      }
    });
    // override each stream op with one that tries to force load the lazy file first
    var stream_ops = {};
    var keys = Object.keys(node.stream_ops);
    keys.forEach(key => {
      var fn = node.stream_ops[key];
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    });
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      assert(size >= 0);
      if (contents.slice) {
        // normal array
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          // LazyUint8Array from sync binary XHR
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    }
    // use a custom read function
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    // use a custom mmap function
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, GROWABLE_HEAP_I8(), ptr, length, position);
      return {
        ptr,
        allocated: true
      };
    };
    node.stream_ops = stream_ops;
    return node;
  },
  absolutePath() {
    abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
  },
  createFolder() {
    abort("FS.createFolder has been removed; use FS.mkdir instead");
  },
  createLink() {
    abort("FS.createLink has been removed; use FS.symlink instead");
  },
  joinPath() {
    abort("FS.joinPath has been removed; use PATH.join instead");
  },
  mmapAlloc() {
    abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
  },
  standardizePath() {
    abort("FS.standardizePath has been removed; use PATH.normalize instead");
  }
};

var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  calculateAt(dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path;
    }
    // relative path
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return PATH.join2(dir, path);
  },
  doStat(func, path, buf) {
    var stat = func(path);
    GROWABLE_HEAP_I32()[((buf) >> 2)] = stat.dev;
    GROWABLE_HEAP_I32()[(((buf) + (4)) >> 2)] = stat.mode;
    GROWABLE_HEAP_U32()[(((buf) + (8)) >> 2)] = stat.nlink;
    GROWABLE_HEAP_I32()[(((buf) + (12)) >> 2)] = stat.uid;
    GROWABLE_HEAP_I32()[(((buf) + (16)) >> 2)] = stat.gid;
    GROWABLE_HEAP_I32()[(((buf) + (20)) >> 2)] = stat.rdev;
    (tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((buf) + (24)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((buf) + (28)) >> 2)] = tempI64[1]);
    GROWABLE_HEAP_I32()[(((buf) + (32)) >> 2)] = 4096;
    GROWABLE_HEAP_I32()[(((buf) + (36)) >> 2)] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    (tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
    (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((buf) + (40)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((buf) + (44)) >> 2)] = tempI64[1]);
    GROWABLE_HEAP_U32()[(((buf) + (48)) >> 2)] = (atime % 1e3) * 1e3 * 1e3;
    (tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
    (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((buf) + (56)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((buf) + (60)) >> 2)] = tempI64[1]);
    GROWABLE_HEAP_U32()[(((buf) + (64)) >> 2)] = (mtime % 1e3) * 1e3 * 1e3;
    (tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
    (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((buf) + (72)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((buf) + (76)) >> 2)] = tempI64[1]);
    GROWABLE_HEAP_U32()[(((buf) + (80)) >> 2)] = (ctime % 1e3) * 1e3 * 1e3;
    (tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((buf) + (88)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((buf) + (92)) >> 2)] = tempI64[1]);
    return 0;
  },
  doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      // MAP_PRIVATE calls need not to be synced back to underlying fs
      return 0;
    }
    var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  },
  varargs: undefined,
  getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  }
};

function ___syscall__newselect(nfds, readfds, writefds, exceptfds, timeout) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(3, 0, 1, nfds, readfds, writefds, exceptfds, timeout);
  try {
    // readfds are supported,
    // writefds checks socket open status
    // exceptfds are supported, although on web, such exceptional conditions never arise in web sockets
    //                          and so the exceptfds list will always return empty.
    // timeout is supported, although on SOCKFS and PIPEFS these are ignored and always treated as 0 - fully async
    assert(nfds <= 64, "nfds must be less than or equal to 64");
    // fd sets have 64 bits // TODO: this could be 1024 based on current musl headers
    var total = 0;
    var srcReadLow = (readfds ? GROWABLE_HEAP_I32()[((readfds) >> 2)] : 0), srcReadHigh = (readfds ? GROWABLE_HEAP_I32()[(((readfds) + (4)) >> 2)] : 0);
    var srcWriteLow = (writefds ? GROWABLE_HEAP_I32()[((writefds) >> 2)] : 0), srcWriteHigh = (writefds ? GROWABLE_HEAP_I32()[(((writefds) + (4)) >> 2)] : 0);
    var srcExceptLow = (exceptfds ? GROWABLE_HEAP_I32()[((exceptfds) >> 2)] : 0), srcExceptHigh = (exceptfds ? GROWABLE_HEAP_I32()[(((exceptfds) + (4)) >> 2)] : 0);
    var dstReadLow = 0, dstReadHigh = 0;
    var dstWriteLow = 0, dstWriteHigh = 0;
    var dstExceptLow = 0, dstExceptHigh = 0;
    var allLow = (readfds ? GROWABLE_HEAP_I32()[((readfds) >> 2)] : 0) | (writefds ? GROWABLE_HEAP_I32()[((writefds) >> 2)] : 0) | (exceptfds ? GROWABLE_HEAP_I32()[((exceptfds) >> 2)] : 0);
    var allHigh = (readfds ? GROWABLE_HEAP_I32()[(((readfds) + (4)) >> 2)] : 0) | (writefds ? GROWABLE_HEAP_I32()[(((writefds) + (4)) >> 2)] : 0) | (exceptfds ? GROWABLE_HEAP_I32()[(((exceptfds) + (4)) >> 2)] : 0);
    var check = function(fd, low, high, val) {
      return (fd < 32 ? (low & val) : (high & val));
    };
    for (var fd = 0; fd < nfds; fd++) {
      var mask = 1 << (fd % 32);
      if (!(check(fd, allLow, allHigh, mask))) {
        continue;
      }
      // index isn't in the set
      var stream = SYSCALLS.getStreamFromFD(fd);
      var flags = SYSCALLS.DEFAULT_POLLMASK;
      if (stream.stream_ops.poll) {
        var timeoutInMillis = -1;
        if (timeout) {
          // select(2) is declared to accept "struct timeval { time_t tv_sec; suseconds_t tv_usec; }".
          // However, musl passes the two values to the syscall as an array of long values.
          // Note that sizeof(time_t) != sizeof(long) in wasm32. The former is 8, while the latter is 4.
          // This means using "C_STRUCTS.timeval.tv_usec" leads to a wrong offset.
          // So, instead, we use POINTER_SIZE.
          var tv_sec = (readfds ? GROWABLE_HEAP_I32()[((timeout) >> 2)] : 0), tv_usec = (readfds ? GROWABLE_HEAP_I32()[(((timeout) + (4)) >> 2)] : 0);
          timeoutInMillis = (tv_sec + tv_usec / 1e6) * 1e3;
        }
        flags = stream.stream_ops.poll(stream, timeoutInMillis);
      }
      if ((flags & 1) && check(fd, srcReadLow, srcReadHigh, mask)) {
        fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
        total++;
      }
      if ((flags & 4) && check(fd, srcWriteLow, srcWriteHigh, mask)) {
        fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
        total++;
      }
      if ((flags & 2) && check(fd, srcExceptLow, srcExceptHigh, mask)) {
        fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
        total++;
      }
    }
    if (readfds) {
      GROWABLE_HEAP_I32()[((readfds) >> 2)] = dstReadLow;
      GROWABLE_HEAP_I32()[(((readfds) + (4)) >> 2)] = dstReadHigh;
    }
    if (writefds) {
      GROWABLE_HEAP_I32()[((writefds) >> 2)] = dstWriteLow;
      GROWABLE_HEAP_I32()[(((writefds) + (4)) >> 2)] = dstWriteHigh;
    }
    if (exceptfds) {
      GROWABLE_HEAP_I32()[((exceptfds) >> 2)] = dstExceptLow;
      GROWABLE_HEAP_I32()[(((exceptfds) + (4)) >> 2)] = dstExceptHigh;
    }
    return total;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var SOCKFS = {
  mount(mount) {
    // If Module['websocket'] has already been defined (e.g. for configuring
    // the subprotocol/url) use that, if not initialise it to a new object.
    Module["websocket"] = (Module["websocket"] && ("object" === typeof Module["websocket"])) ? Module["websocket"] : {};
    // Add the Event registration mechanism to the exported websocket configuration
    // object so we can register network callbacks from native JavaScript too.
    // For more documentation see system/include/emscripten/emscripten.h
    Module["websocket"]._callbacks = {};
    Module["websocket"]["on"] = /** @this{Object} */ function(event, callback) {
      if ("function" === typeof callback) {
        this._callbacks[event] = callback;
      }
      return this;
    };
    Module["websocket"].emit = /** @this{Object} */ function(event, param) {
      if ("function" === typeof this._callbacks[event]) {
        this._callbacks[event].call(this, param);
      }
    };
    // If debug is enabled register simple default logging callbacks for each Event.
    return FS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
  },
  createSocket(family, type, protocol) {
    type &= ~526336;
    // Some applications may pass it; it makes no sense for a single process.
    var streaming = type == 1;
    if (streaming && protocol && protocol != 6) {
      throw new FS.ErrnoError(66);
    }
    // create our internal socket structure
    var sock = {
      family,
      type,
      protocol,
      server: null,
      error: null,
      // Used in getsockopt for SOL_SOCKET/SO_ERROR test
      peers: {},
      pending: [],
      recv_queue: [],
      sock_ops: SOCKFS.websocket_sock_ops
    };
    // create the filesystem node to store the socket structure
    var name = SOCKFS.nextname();
    var node = FS.createNode(SOCKFS.root, name, 49152, 0);
    node.sock = sock;
    // and the wrapping stream that enables library functions such
    // as read and write to indirectly interact with the socket
    var stream = FS.createStream({
      path: name,
      node,
      flags: 2,
      seekable: false,
      stream_ops: SOCKFS.stream_ops
    });
    // map the new stream to the socket structure (sockets have a 1:1
    // relationship with a stream)
    sock.stream = stream;
    return sock;
  },
  getSocket(fd) {
    var stream = FS.getStream(fd);
    if (!stream || !FS.isSocket(stream.node.mode)) {
      return null;
    }
    return stream.node.sock;
  },
  stream_ops: {
    poll(stream) {
      var sock = stream.node.sock;
      return sock.sock_ops.poll(sock);
    },
    ioctl(stream, request, varargs) {
      var sock = stream.node.sock;
      return sock.sock_ops.ioctl(sock, request, varargs);
    },
    read(stream, buffer, offset, length, position) {
      /* ignored */ var sock = stream.node.sock;
      var msg = sock.sock_ops.recvmsg(sock, length);
      if (!msg) {
        // socket is closed
        return 0;
      }
      buffer.set(msg.buffer, offset);
      return msg.buffer.length;
    },
    write(stream, buffer, offset, length, position) {
      /* ignored */ var sock = stream.node.sock;
      return sock.sock_ops.sendmsg(sock, buffer, offset, length);
    },
    close(stream) {
      var sock = stream.node.sock;
      sock.sock_ops.close(sock);
    }
  },
  nextname() {
    if (!SOCKFS.nextname.current) {
      SOCKFS.nextname.current = 0;
    }
    return "socket[" + (SOCKFS.nextname.current++) + "]";
  },
  websocket_sock_ops: {
    createPeer(sock, addr, port) {
      var ws;
      if (typeof addr == "object") {
        ws = addr;
        addr = null;
        port = null;
      }
      if (ws) {
        // for sockets that've already connected (e.g. we're the server)
        // we can inspect the _socket property for the address
        if (ws._socket) {
          addr = ws._socket.remoteAddress;
          port = ws._socket.remotePort;
        } else // if we're just now initializing a connection to the remote,
        // inspect the url property
        {
          var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
          if (!result) {
            throw new Error("WebSocket URL must be in the format ws(s)://address:port");
          }
          addr = result[1];
          port = parseInt(result[2], 10);
        }
      } else {
        // create the actual websocket object and connect
        try {
          // runtimeConfig gets set to true if WebSocket runtime configuration is available.
          var runtimeConfig = (Module["websocket"] && ("object" === typeof Module["websocket"]));
          // The default value is 'ws://' the replace is needed because the compiler replaces '//' comments with '#'
          // comments without checking context, so we'd end up with ws:#, the replace swaps the '#' for '//' again.
          var url = "ws:#".replace("#", "//");
          if (runtimeConfig) {
            if ("string" === typeof Module["websocket"]["url"]) {
              url = Module["websocket"]["url"];
            }
          }
          if (url === "ws://" || url === "wss://") {
            // Is the supplied URL config just a prefix, if so complete it.
            var parts = addr.split("/");
            url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/");
          }
          // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
          var subProtocols = "binary";
          // The default value is 'binary'
          if (runtimeConfig) {
            if ("string" === typeof Module["websocket"]["subprotocol"]) {
              subProtocols = Module["websocket"]["subprotocol"];
            }
          }
          // The default WebSocket options
          var opts = undefined;
          if (subProtocols !== "null") {
            // The regex trims the string (removes spaces at the beginning and end, then splits the string by
            // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
            subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
            opts = subProtocols;
          }
          // some webservers (azure) does not support subprotocol header
          if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
            subProtocols = "null";
            opts = undefined;
          }
          // If node we use the ws library.
          var WebSocketConstructor;
          if (ENVIRONMENT_IS_NODE) {
            WebSocketConstructor = /** @type{(typeof WebSocket)} */ (require("ws"));
          } else {
            WebSocketConstructor = WebSocket;
          }
          ws = new WebSocketConstructor(url, opts);
          ws.binaryType = "arraybuffer";
        } catch (e) {
          throw new FS.ErrnoError(23);
        }
      }
      var peer = {
        addr,
        port,
        socket: ws,
        msg_send_queue: []
      };
      SOCKFS.websocket_sock_ops.addPeer(sock, peer);
      SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
      // if this is a bound dgram socket, send the port number first to allow
      // us to override the ephemeral port reported to us by remotePort on the
      // remote end.
      if (sock.type === 2 && typeof sock.sport != "undefined") {
        peer.msg_send_queue.push(new Uint8Array([ 255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), ((sock.sport & 65280) >> 8), (sock.sport & 255) ]));
      }
      return peer;
    },
    getPeer(sock, addr, port) {
      return sock.peers[addr + ":" + port];
    },
    addPeer(sock, peer) {
      sock.peers[peer.addr + ":" + peer.port] = peer;
    },
    removePeer(sock, peer) {
      delete sock.peers[peer.addr + ":" + peer.port];
    },
    handlePeerEvents(sock, peer) {
      var first = true;
      var handleOpen = function() {
        Module["websocket"].emit("open", sock.stream.fd);
        try {
          var queued = peer.msg_send_queue.shift();
          while (queued) {
            peer.socket.send(queued);
            queued = peer.msg_send_queue.shift();
          }
        } catch (e) {
          // not much we can do here in the way of proper error handling as we've already
          // lied and said this data was sent. shut it down.
          peer.socket.close();
        }
      };
      function handleMessage(data) {
        if (typeof data == "string") {
          var encoder = new TextEncoder;
          // should be utf-8
          data = encoder.encode(data);
        } else // make a typed array from the string
        {
          assert(data.byteLength !== undefined);
          // must receive an ArrayBuffer
          if (data.byteLength == 0) {
            // An empty ArrayBuffer will emit a pseudo disconnect event
            // as recv/recvmsg will return zero which indicates that a socket
            // has performed a shutdown although the connection has not been disconnected yet.
            return;
          }
          data = new Uint8Array(data);
        }
        // if this is the port message, override the peer's port with it
        var wasfirst = first;
        first = false;
        if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
          // update the peer's port and it's key in the peer map
          var newport = ((data[8] << 8) | data[9]);
          SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          peer.port = newport;
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          return;
        }
        sock.recv_queue.push({
          addr: peer.addr,
          port: peer.port,
          data
        });
        Module["websocket"].emit("message", sock.stream.fd);
      }
      if (ENVIRONMENT_IS_NODE) {
        peer.socket.on("open", handleOpen);
        peer.socket.on("message", function(data, isBinary) {
          if (!isBinary) {
            return;
          }
          handleMessage((new Uint8Array(data)).buffer);
        });
        // copy from node Buffer -> ArrayBuffer
        peer.socket.on("close", function() {
          Module["websocket"].emit("close", sock.stream.fd);
        });
        peer.socket.on("error", function(error) {
          // Although the ws library may pass errors that may be more descriptive than
          // ECONNREFUSED they are not necessarily the expected error code e.g.
          // ENOTFOUND on getaddrinfo seems to be node.js specific, so using ECONNREFUSED
          // is still probably the most useful thing to do.
          sock.error = 14;
          // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
          Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
        });
      } else {
        peer.socket.onopen = handleOpen;
        peer.socket.onclose = function() {
          Module["websocket"].emit("close", sock.stream.fd);
        };
        peer.socket.onmessage = function peer_socket_onmessage(event) {
          handleMessage(event.data);
        };
        peer.socket.onerror = function(error) {
          // The WebSocket spec only allows a 'simple event' to be thrown on error,
          // so we only really know as much as ECONNREFUSED.
          sock.error = 14;
          // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
          Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
        };
      }
    },
    poll(sock) {
      if (sock.type === 1 && sock.server) {
        // listen sockets should only say they're available for reading
        // if there are pending clients.
        return sock.pending.length ? (64 | 1) : 0;
      }
      var mask = 0;
      var dest = sock.type === 1 ? // we only care about the socket state for connection-based sockets
      SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
      if (sock.recv_queue.length || !dest || // connection-less sockets are always ready to read
      (dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
        // let recv return 0 once closed
        mask |= (64 | 1);
      }
      if (!dest || // connection-less sockets are always ready to write
      (dest && dest.socket.readyState === dest.socket.OPEN)) {
        mask |= 4;
      }
      if ((dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
        mask |= 16;
      }
      return mask;
    },
    ioctl(sock, request, arg) {
      switch (request) {
       case 21531:
        var bytes = 0;
        if (sock.recv_queue.length) {
          bytes = sock.recv_queue[0].data.length;
        }
        GROWABLE_HEAP_I32()[((arg) >> 2)] = bytes;
        return 0;

       default:
        return 28;
      }
    },
    close(sock) {
      // if we've spawned a listen server, close it
      if (sock.server) {
        try {
          sock.server.close();
        } catch (e) {}
        sock.server = null;
      }
      // close any peer connections
      var peers = Object.keys(sock.peers);
      for (var i = 0; i < peers.length; i++) {
        var peer = sock.peers[peers[i]];
        try {
          peer.socket.close();
        } catch (e) {}
        SOCKFS.websocket_sock_ops.removePeer(sock, peer);
      }
      return 0;
    },
    bind(sock, addr, port) {
      if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
        throw new FS.ErrnoError(28);
      }
      // already bound
      sock.saddr = addr;
      sock.sport = port;
      // in order to emulate dgram sockets, we need to launch a listen server when
      // binding on a connection-less socket
      // note: this is only required on the server side
      if (sock.type === 2) {
        // close the existing server if it exists
        if (sock.server) {
          sock.server.close();
          sock.server = null;
        }
        // swallow error operation not supported error that occurs when binding in the
        // browser where this isn't supported
        try {
          sock.sock_ops.listen(sock, 0);
        } catch (e) {
          if (!(e.name === "ErrnoError")) throw e;
          if (e.errno !== 138) throw e;
        }
      }
    },
    connect(sock, addr, port) {
      if (sock.server) {
        throw new FS.ErrnoError(138);
      }
      // TODO autobind
      // if (!sock.addr && sock.type == 2) {
      // }
      // early out if we're already connected / in the middle of connecting
      if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
        var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
        if (dest) {
          if (dest.socket.readyState === dest.socket.CONNECTING) {
            throw new FS.ErrnoError(7);
          } else {
            throw new FS.ErrnoError(30);
          }
        }
      }
      // add the socket to our peer list and set our
      // destination address / port to match
      var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
      sock.daddr = peer.addr;
      sock.dport = peer.port;
    },
    // because we cannot synchronously block to wait for the WebSocket
    // connection to complete, we return here pretending that the connection
    // was a success.
    listen(sock, backlog) {
      if (!ENVIRONMENT_IS_NODE) {
        throw new FS.ErrnoError(138);
      }
      if (sock.server) {
        throw new FS.ErrnoError(28);
      }
      // already listening
      var WebSocketServer = require("ws").Server;
      var host = sock.saddr;
      sock.server = new WebSocketServer({
        host,
        port: sock.sport
      });
      // TODO support backlog
      Module["websocket"].emit("listen", sock.stream.fd);
      // Send Event with listen fd.
      sock.server.on("connection", function(ws) {
        if (sock.type === 1) {
          var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
          // create a peer on the new socket
          var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
          newsock.daddr = peer.addr;
          newsock.dport = peer.port;
          // push to queue for accept to pick up
          sock.pending.push(newsock);
          Module["websocket"].emit("connection", newsock.stream.fd);
        } else {
          // create a peer on the listen socket so calling sendto
          // with the listen socket and an address will resolve
          // to the correct client
          SOCKFS.websocket_sock_ops.createPeer(sock, ws);
          Module["websocket"].emit("connection", sock.stream.fd);
        }
      });
      sock.server.on("close", function() {
        Module["websocket"].emit("close", sock.stream.fd);
        sock.server = null;
      });
      sock.server.on("error", function(error) {
        // Although the ws library may pass errors that may be more descriptive than
        // ECONNREFUSED they are not necessarily the expected error code e.g.
        // ENOTFOUND on getaddrinfo seems to be node.js specific, so using EHOSTUNREACH
        // is still probably the most useful thing to do. This error shouldn't
        // occur in a well written app as errors should get trapped in the compiled
        // app's own getaddrinfo call.
        sock.error = 23;
        // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
        Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "EHOSTUNREACH: Host is unreachable" ]);
      });
    },
    // don't throw
    accept(listensock) {
      if (!listensock.server || !listensock.pending.length) {
        throw new FS.ErrnoError(28);
      }
      var newsock = listensock.pending.shift();
      newsock.stream.flags = listensock.stream.flags;
      return newsock;
    },
    getname(sock, peer) {
      var addr, port;
      if (peer) {
        if (sock.daddr === undefined || sock.dport === undefined) {
          throw new FS.ErrnoError(53);
        }
        addr = sock.daddr;
        port = sock.dport;
      } else {
        // TODO saddr and sport will be set for bind()'d UDP sockets, but what
        // should we be returning for TCP sockets that've been connect()'d?
        addr = sock.saddr || 0;
        port = sock.sport || 0;
      }
      return {
        addr,
        port
      };
    },
    sendmsg(sock, buffer, offset, length, addr, port) {
      if (sock.type === 2) {
        // connection-less sockets will honor the message address,
        // and otherwise fall back to the bound destination address
        if (addr === undefined || port === undefined) {
          addr = sock.daddr;
          port = sock.dport;
        }
        // if there was no address to fall back to, error out
        if (addr === undefined || port === undefined) {
          throw new FS.ErrnoError(17);
        }
      } else {
        // connection-based sockets will only use the bound
        addr = sock.daddr;
        port = sock.dport;
      }
      // find the peer for the destination address
      var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
      // early out if not connected with a connection-based socket
      if (sock.type === 1) {
        if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
          throw new FS.ErrnoError(53);
        }
      }
      // create a copy of the incoming data to send, as the WebSocket API
      // doesn't work entirely with an ArrayBufferView, it'll just send
      // the entire underlying buffer
      if (ArrayBuffer.isView(buffer)) {
        offset += buffer.byteOffset;
        buffer = buffer.buffer;
      }
      var data;
      // WebSockets .send() does not allow passing a SharedArrayBuffer, so clone the portion of the SharedArrayBuffer as a regular
      // ArrayBuffer that we want to send.
      if (buffer instanceof SharedArrayBuffer) {
        data = new Uint8Array(new Uint8Array(buffer.slice(offset, offset + length))).buffer;
      } else {
        data = buffer.slice(offset, offset + length);
      }
      // if we don't have a cached connectionless UDP datagram connection, or
      // the TCP socket is still connecting, queue the message to be sent upon
      // connect, and lie, saying the data was sent now.
      if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
        // if we're not connected, open a new connection
        if (sock.type === 2) {
          if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
            dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          }
        }
        dest.msg_send_queue.push(data);
        return length;
      }
      try {
        // send the actual data
        dest.socket.send(data);
        return length;
      } catch (e) {
        throw new FS.ErrnoError(28);
      }
    },
    recvmsg(sock, length) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
      if (sock.type === 1 && sock.server) {
        // tcp servers should not be recv()'ing on the listen socket
        throw new FS.ErrnoError(53);
      }
      var queued = sock.recv_queue.shift();
      if (!queued) {
        if (sock.type === 1) {
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
          if (!dest) {
            // if we have a destination address but are not connected, error out
            throw new FS.ErrnoError(53);
          }
          if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
            // return null if the socket has closed
            return null;
          }
          // else, our socket is in a valid state but truly has nothing available
          throw new FS.ErrnoError(6);
        }
        throw new FS.ErrnoError(6);
      }
      // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
      // requeued TCP data it'll be an ArrayBufferView
      var queuedLength = queued.data.byteLength || queued.data.length;
      var queuedOffset = queued.data.byteOffset || 0;
      var queuedBuffer = queued.data.buffer || queued.data;
      var bytesRead = Math.min(length, queuedLength);
      var res = {
        buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
        addr: queued.addr,
        port: queued.port
      };
      // push back any unread data for TCP connections
      if (sock.type === 1 && bytesRead < queuedLength) {
        var bytesRemaining = queuedLength - bytesRead;
        queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
        sock.recv_queue.unshift(queued);
      }
      return res;
    }
  }
};

var getSocketFromFD = fd => {
  var socket = SOCKFS.getSocket(fd);
  if (!socket) throw new FS.ErrnoError(8);
  return socket;
};

var inetPton4 = str => {
  var b = str.split(".");
  for (var i = 0; i < 4; i++) {
    var tmp = Number(b[i]);
    if (isNaN(tmp)) return null;
    b[i] = tmp;
  }
  return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
};

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

var inetPton6 = str => {
  var words;
  var w, offset, z;
  /* http://home.deds.nl/~aeron/regex/ */ var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
  var parts = [];
  if (!valid6regx.test(str)) {
    return null;
  }
  if (str === "::") {
    return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
  }
  // Z placeholder to keep track of zeros when splitting the string on ":"
  if (str.startsWith("::")) {
    str = str.replace("::", "Z:");
  } else // leading zeros case
  {
    str = str.replace("::", ":Z:");
  }
  if (str.indexOf(".") > 0) {
    // parse IPv4 embedded stress
    str = str.replace(new RegExp("[.]", "g"), ":");
    words = str.split(":");
    words[words.length - 4] = jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256;
    words[words.length - 3] = jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256;
    words = words.slice(0, words.length - 2);
  } else {
    words = str.split(":");
  }
  offset = 0;
  z = 0;
  for (w = 0; w < words.length; w++) {
    if (typeof words[w] == "string") {
      if (words[w] === "Z") {
        // compressed zeros - write appropriate number of zero words
        for (z = 0; z < (8 - words.length + 1); z++) {
          parts[w + z] = 0;
        }
        offset = z - 1;
      } else {
        // parse hex to field to 16-bit value and write it in network byte-order
        parts[w + offset] = _htons(parseInt(words[w], 16));
      }
    } else {
      // parsed IPv4 words
      parts[w + offset] = words[w];
    }
  }
  return [ (parts[1] << 16) | parts[0], (parts[3] << 16) | parts[2], (parts[5] << 16) | parts[4], (parts[7] << 16) | parts[6] ];
};

/** @param {number=} addrlen */ var writeSockaddr = (sa, family, addr, port, addrlen) => {
  switch (family) {
   case 2:
    addr = inetPton4(addr);
    zeroMemory(sa, 16);
    if (addrlen) {
      GROWABLE_HEAP_I32()[((addrlen) >> 2)] = 16;
    }
    GROWABLE_HEAP_I16()[((sa) >> 1)] = family;
    GROWABLE_HEAP_I32()[(((sa) + (4)) >> 2)] = addr;
    GROWABLE_HEAP_I16()[(((sa) + (2)) >> 1)] = _htons(port);
    break;

   case 10:
    addr = inetPton6(addr);
    zeroMemory(sa, 28);
    if (addrlen) {
      GROWABLE_HEAP_I32()[((addrlen) >> 2)] = 28;
    }
    GROWABLE_HEAP_I32()[((sa) >> 2)] = family;
    GROWABLE_HEAP_I32()[(((sa) + (8)) >> 2)] = addr[0];
    GROWABLE_HEAP_I32()[(((sa) + (12)) >> 2)] = addr[1];
    GROWABLE_HEAP_I32()[(((sa) + (16)) >> 2)] = addr[2];
    GROWABLE_HEAP_I32()[(((sa) + (20)) >> 2)] = addr[3];
    GROWABLE_HEAP_I16()[(((sa) + (2)) >> 1)] = _htons(port);
    break;

   default:
    return 5;
  }
  return 0;
};

var DNS = {
  address_map: {
    id: 1,
    addrs: {},
    names: {}
  },
  lookup_name(name) {
    // If the name is already a valid ipv4 / ipv6 address, don't generate a fake one.
    var res = inetPton4(name);
    if (res !== null) {
      return name;
    }
    res = inetPton6(name);
    if (res !== null) {
      return name;
    }
    // See if this name is already mapped.
    var addr;
    if (DNS.address_map.addrs[name]) {
      addr = DNS.address_map.addrs[name];
    } else {
      var id = DNS.address_map.id++;
      assert(id < 65535, "exceeded max address mappings of 65535");
      addr = "172.29." + (id & 255) + "." + (id & 65280);
      DNS.address_map.names[addr] = name;
      DNS.address_map.addrs[name] = addr;
    }
    return addr;
  },
  lookup_addr(addr) {
    if (DNS.address_map.names[addr]) {
      return DNS.address_map.names[addr];
    }
    return null;
  }
};

function ___syscall_accept4(fd, addr, addrlen, flags, d1, d2) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(4, 0, 1, fd, addr, addrlen, flags, d1, d2);
  try {
    var sock = getSocketFromFD(fd);
    var newsock = sock.sock_ops.accept(sock);
    if (addr) {
      var errno = writeSockaddr(addr, newsock.family, DNS.lookup_name(newsock.daddr), newsock.dport, addrlen);
      assert(!errno);
    }
    return newsock.stream.fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var inetNtop4 = addr => (addr & 255) + "." + ((addr >> 8) & 255) + "." + ((addr >> 16) & 255) + "." + ((addr >> 24) & 255);

var inetNtop6 = ints => {
  //  ref:  http://www.ietf.org/rfc/rfc2373.txt - section 2.5.4
  //  Format for IPv4 compatible and mapped  128-bit IPv6 Addresses
  //  128-bits are split into eight 16-bit words
  //  stored in network byte order (big-endian)
  //  |                80 bits               | 16 |      32 bits        |
  //  +-----------------------------------------------------------------+
  //  |               10 bytes               |  2 |      4 bytes        |
  //  +--------------------------------------+--------------------------+
  //  +               5 words                |  1 |      2 words        |
  //  +--------------------------------------+--------------------------+
  //  |0000..............................0000|0000|    IPv4 ADDRESS     | (compatible)
  //  +--------------------------------------+----+---------------------+
  //  |0000..............................0000|FFFF|    IPv4 ADDRESS     | (mapped)
  //  +--------------------------------------+----+---------------------+
  var str = "";
  var word = 0;
  var longest = 0;
  var lastzero = 0;
  var zstart = 0;
  var len = 0;
  var i = 0;
  var parts = [ ints[0] & 65535, (ints[0] >> 16), ints[1] & 65535, (ints[1] >> 16), ints[2] & 65535, (ints[2] >> 16), ints[3] & 65535, (ints[3] >> 16) ];
  // Handle IPv4-compatible, IPv4-mapped, loopback and any/unspecified addresses
  var hasipv4 = true;
  var v4part = "";
  // check if the 10 high-order bytes are all zeros (first 5 words)
  for (i = 0; i < 5; i++) {
    if (parts[i] !== 0) {
      hasipv4 = false;
      break;
    }
  }
  if (hasipv4) {
    // low-order 32-bits store an IPv4 address (bytes 13 to 16) (last 2 words)
    v4part = inetNtop4(parts[6] | (parts[7] << 16));
    // IPv4-mapped IPv6 address if 16-bit value (bytes 11 and 12) == 0xFFFF (6th word)
    if (parts[5] === -1) {
      str = "::ffff:";
      str += v4part;
      return str;
    }
    // IPv4-compatible IPv6 address if 16-bit value (bytes 11 and 12) == 0x0000 (6th word)
    if (parts[5] === 0) {
      str = "::";
      //special case IPv6 addresses
      if (v4part === "0.0.0.0") v4part = "";
      // any/unspecified address
      if (v4part === "0.0.0.1") v4part = "1";
      // loopback address
      str += v4part;
      return str;
    }
  }
  // Handle all other IPv6 addresses
  // first run to find the longest contiguous zero words
  for (word = 0; word < 8; word++) {
    if (parts[word] === 0) {
      if (word - lastzero > 1) {
        len = 0;
      }
      lastzero = word;
      len++;
    }
    if (len > longest) {
      longest = len;
      zstart = word - longest + 1;
    }
  }
  for (word = 0; word < 8; word++) {
    if (longest > 1) {
      // compress contiguous zeros - to produce "::"
      if (parts[word] === 0 && word >= zstart && word < (zstart + longest)) {
        if (word === zstart) {
          str += ":";
          if (zstart === 0) str += ":";
        }
        //leading zeros case
        continue;
      }
    }
    // converts 16-bit words from big-endian to little-endian before converting to hex string
    str += Number(_ntohs(parts[word] & 65535)).toString(16);
    str += word < 7 ? ":" : "";
  }
  return str;
};

var readSockaddr = (sa, salen) => {
  // family / port offsets are common to both sockaddr_in and sockaddr_in6
  var family = GROWABLE_HEAP_I16()[((sa) >> 1)];
  var port = _ntohs(GROWABLE_HEAP_U16()[(((sa) + (2)) >> 1)]);
  var addr;
  switch (family) {
   case 2:
    if (salen !== 16) {
      return {
        errno: 28
      };
    }
    addr = GROWABLE_HEAP_I32()[(((sa) + (4)) >> 2)];
    addr = inetNtop4(addr);
    break;

   case 10:
    if (salen !== 28) {
      return {
        errno: 28
      };
    }
    addr = [ GROWABLE_HEAP_I32()[(((sa) + (8)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (12)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (16)) >> 2)], GROWABLE_HEAP_I32()[(((sa) + (20)) >> 2)] ];
    addr = inetNtop6(addr);
    break;

   default:
    return {
      errno: 5
    };
  }
  return {
    family,
    addr,
    port
  };
};

var getSocketAddress = (addrp, addrlen) => {
  var info = readSockaddr(addrp, addrlen);
  if (info.errno) throw new FS.ErrnoError(info.errno);
  info.addr = DNS.lookup_addr(info.addr) || info.addr;
  return info;
};

function ___syscall_bind(fd, addr, addrlen, d1, d2, d3) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(5, 0, 1, fd, addr, addrlen, d1, d2, d3);
  try {
    var sock = getSocketFromFD(fd);
    var info = getSocketAddress(addr, addrlen);
    sock.sock_ops.bind(sock, info.addr, info.port);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_chdir(path) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(6, 0, 1, path);
  try {
    path = SYSCALLS.getStr(path);
    FS.chdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_chmod(path, mode) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(7, 0, 1, path, mode);
  try {
    path = SYSCALLS.getStr(path);
    FS.chmod(path, mode);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(8, 0, 1, fd, addr, addrlen, d1, d2, d3);
  try {
    var sock = getSocketFromFD(fd);
    var info = getSocketAddress(addr, addrlen);
    sock.sock_ops.connect(sock, info.addr, info.port);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_dup3(fd, newfd, flags) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(9, 0, 1, fd, newfd, flags);
  try {
    var old = SYSCALLS.getStreamFromFD(fd);
    assert(!flags);
    if (old.fd === newfd) return -28;
    // Check newfd is within range of valid open file descriptors.
    if (newfd < 0 || newfd >= FS.MAX_OPEN_FDS) return -8;
    var existing = FS.getStream(newfd);
    if (existing) FS.close(existing);
    return FS.dupStream(old, newfd).fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_faccessat(dirfd, path, amode, flags) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(10, 0, 1, dirfd, path, amode, flags);
  try {
    path = SYSCALLS.getStr(path);
    assert(flags === 0 || flags == 512);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (amode & ~7) {
      // need a valid mode
      return -28;
    }
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    if (!node) {
      return -44;
    }
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";
    if (perms && /* otherwise, they've just passed F_OK */ FS.nodePermissions(node, perms)) {
      return -2;
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fchmod(fd, mode) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(11, 0, 1, fd, mode);
  try {
    FS.fchmod(fd, mode);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fchown32(fd, owner, group) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(12, 0, 1, fd, owner, group);
  try {
    FS.fchown(fd, owner, group);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

/** @suppress {duplicate } */ function syscallGetVarargI() {
  assert(SYSCALLS.varargs != undefined);
  // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
  var ret = GROWABLE_HEAP_I32()[((+SYSCALLS.varargs) >> 2)];
  SYSCALLS.varargs += 4;
  return ret;
}

var syscallGetVarargP = syscallGetVarargI;

function ___syscall_fcntl64(fd, cmd, varargs) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(13, 0, 1, fd, cmd, varargs);
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
     case 0:
      {
        var arg = syscallGetVarargI();
        if (arg < 0) {
          return -28;
        }
        while (FS.streams[arg]) {
          arg++;
        }
        var newStream;
        newStream = FS.dupStream(stream, arg);
        return newStream.fd;
      }

     case 1:
     case 2:
      return 0;

     // FD_CLOEXEC makes no sense for a single process.
      case 3:
      return stream.flags;

     case 4:
      {
        var arg = syscallGetVarargI();
        stream.flags |= arg;
        return 0;
      }

     case 12:
      {
        var arg = syscallGetVarargP();
        var offset = 0;
        // We're always unlocked.
        GROWABLE_HEAP_I16()[(((arg) + (offset)) >> 1)] = 2;
        return 0;
      }

     case 13:
     case 14:
      return 0;
    }
    // Pretend that the locking is successful.
    return -28;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fstat64(fd, buf) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(14, 0, 1, fd, buf);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    return SYSCALLS.doStat(FS.stat, stream.path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_ftruncate64(fd, length_low, length_high) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(15, 0, 1, fd, length_low, length_high);
  var length = convertI32PairToI53Checked(length_low, length_high);
  try {
    if (isNaN(length)) return 61;
    FS.ftruncate(fd, length);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
  assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return stringToUTF8Array(str, GROWABLE_HEAP_U8(), outPtr, maxBytesToWrite);
};

function ___syscall_getcwd(buf, size) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(16, 0, 1, buf, size);
  try {
    if (size === 0) return -28;
    var cwd = FS.cwd();
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
    if (size < cwdLengthInBytes) return -68;
    stringToUTF8(cwd, buf, size);
    return cwdLengthInBytes;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_getdents64(fd, dirp, count) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(17, 0, 1, fd, dirp, count);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    stream.getdents ||= FS.readdir(stream.path);
    var struct_size = 280;
    var pos = 0;
    var off = FS.llseek(stream, 0, 1);
    var idx = Math.floor(off / struct_size);
    while (idx < stream.getdents.length && pos + struct_size <= count) {
      var id;
      var type;
      var name = stream.getdents[idx];
      if (name === ".") {
        id = stream.node.id;
        type = 4;
      } else // DT_DIR
      if (name === "..") {
        var lookup = FS.lookupPath(stream.path, {
          parent: true
        });
        id = lookup.node.id;
        type = 4;
      } else // DT_DIR
      {
        var child = FS.lookupNode(stream.node, name);
        id = child.id;
        type = FS.isChrdev(child.mode) ? 2 : // DT_CHR, character device.
        FS.isDir(child.mode) ? 4 : // DT_DIR, directory.
        FS.isLink(child.mode) ? 10 : // DT_LNK, symbolic link.
        8;
      }
      // DT_REG, regular file.
      assert(id);
      (tempI64 = [ id >>> 0, (tempDouble = id, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
      GROWABLE_HEAP_I32()[((dirp + pos) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((dirp + pos) + (4)) >> 2)] = tempI64[1]);
      (tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
      (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
      GROWABLE_HEAP_I32()[(((dirp + pos) + (8)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((dirp + pos) + (12)) >> 2)] = tempI64[1]);
      GROWABLE_HEAP_I16()[(((dirp + pos) + (16)) >> 1)] = 280;
      GROWABLE_HEAP_I8()[(dirp + pos) + (18)] = type;
      stringToUTF8(name, dirp + pos + 19, 256);
      pos += struct_size;
      idx += 1;
    }
    FS.llseek(stream, idx * struct_size, 0);
    return pos;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_getsockname(fd, addr, addrlen, d1, d2, d3) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(18, 0, 1, fd, addr, addrlen, d1, d2, d3);
  try {
    var sock = getSocketFromFD(fd);
    // TODO: sock.saddr should never be undefined, see TODO in websocket_sock_ops.getname
    var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || "0.0.0.0"), sock.sport, addrlen);
    assert(!errno);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_getsockopt(fd, level, optname, optval, optlen, d1) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(19, 0, 1, fd, level, optname, optval, optlen, d1);
  try {
    var sock = getSocketFromFD(fd);
    // Minimal getsockopt aimed at resolving https://github.com/emscripten-core/emscripten/issues/2211
    // so only supports SOL_SOCKET with SO_ERROR.
    if (level === 1) {
      if (optname === 4) {
        GROWABLE_HEAP_I32()[((optval) >> 2)] = sock.error;
        GROWABLE_HEAP_I32()[((optlen) >> 2)] = 4;
        sock.error = null;
        // Clear the error (The SO_ERROR option obtains and then clears this field).
        return 0;
      }
    }
    return -50;
  } // The option is unknown at the level indicated.
  catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_ioctl(fd, op, varargs) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(20, 0, 1, fd, op, varargs);
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
     case 21509:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     case 21505:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcgets) {
          var termios = stream.tty.ops.ioctl_tcgets(stream);
          var argp = syscallGetVarargP();
          GROWABLE_HEAP_I32()[((argp) >> 2)] = termios.c_iflag || 0;
          GROWABLE_HEAP_I32()[(((argp) + (4)) >> 2)] = termios.c_oflag || 0;
          GROWABLE_HEAP_I32()[(((argp) + (8)) >> 2)] = termios.c_cflag || 0;
          GROWABLE_HEAP_I32()[(((argp) + (12)) >> 2)] = termios.c_lflag || 0;
          for (var i = 0; i < 32; i++) {
            GROWABLE_HEAP_I8()[(argp + i) + (17)] = termios.c_cc[i] || 0;
          }
          return 0;
        }
        return 0;
      }

     case 21510:
     case 21511:
     case 21512:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     // no-op, not actually adjusting terminal settings
      case 21506:
     case 21507:
     case 21508:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcsets) {
          var argp = syscallGetVarargP();
          var c_iflag = GROWABLE_HEAP_I32()[((argp) >> 2)];
          var c_oflag = GROWABLE_HEAP_I32()[(((argp) + (4)) >> 2)];
          var c_cflag = GROWABLE_HEAP_I32()[(((argp) + (8)) >> 2)];
          var c_lflag = GROWABLE_HEAP_I32()[(((argp) + (12)) >> 2)];
          var c_cc = [];
          for (var i = 0; i < 32; i++) {
            c_cc.push(GROWABLE_HEAP_I8()[(argp + i) + (17)]);
          }
          return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
            c_iflag,
            c_oflag,
            c_cflag,
            c_lflag,
            c_cc
          });
        }
        return 0;
      }

     // no-op, not actually adjusting terminal settings
      case 21519:
      {
        if (!stream.tty) return -59;
        var argp = syscallGetVarargP();
        GROWABLE_HEAP_I32()[((argp) >> 2)] = 0;
        return 0;
      }

     case 21520:
      {
        if (!stream.tty) return -59;
        return -28;
      }

     // not supported
      case 21531:
      {
        var argp = syscallGetVarargP();
        return FS.ioctl(stream, op, argp);
      }

     case 21523:
      {
        // TODO: in theory we should write to the winsize struct that gets
        // passed in, but for now musl doesn't read anything on it
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tiocgwinsz) {
          var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
          var argp = syscallGetVarargP();
          GROWABLE_HEAP_I16()[((argp) >> 1)] = winsize[0];
          GROWABLE_HEAP_I16()[(((argp) + (2)) >> 1)] = winsize[1];
        }
        return 0;
      }

     case 21524:
      {
        // TODO: technically, this ioctl call should change the window size.
        // but, since emscripten doesn't have any concept of a terminal window
        // yet, we'll just silently throw it away as we do TIOCGWINSZ
        if (!stream.tty) return -59;
        return 0;
      }

     case 21515:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     default:
      return -28;
    }
  } // not supported
  catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_listen(fd, backlog) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(21, 0, 1, fd, backlog);
  try {
    var sock = getSocketFromFD(fd);
    sock.sock_ops.listen(sock, backlog);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_lstat64(path, buf) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(22, 0, 1, path, buf);
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.lstat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_mkdirat(dirfd, path, mode) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(23, 0, 1, dirfd, path, mode);
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    // remove a trailing slash, if one - /a/b/ has basename of '', but
    // we want to create b in the context of this function
    path = PATH.normalize(path);
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
    FS.mkdir(path, mode, 0);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(24, 0, 1, dirfd, path, buf, flags);
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & (~6400);
    assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(25, 0, 1, dirfd, path, flags, varargs);
  SYSCALLS.varargs = varargs;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    var mode = varargs ? syscallGetVarargI() : 0;
    return FS.open(path, flags, mode).fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var PIPEFS = {
  BUCKET_BUFFER_SIZE: 8192,
  mount(mount) {
    // Do not pollute the real root directory or its child nodes with pipes
    // Looks like it is OK to create another pseudo-root node not linked to the FS.root hierarchy this way
    return FS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
  },
  createPipe() {
    var pipe = {
      buckets: [],
      // refcnt 2 because pipe has a read end and a write end. We need to be
      // able to read from the read end after write end is closed.
      refcnt: 2
    };
    pipe.buckets.push({
      buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
      offset: 0,
      roffset: 0
    });
    var rName = PIPEFS.nextname();
    var wName = PIPEFS.nextname();
    var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
    var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
    rNode.pipe = pipe;
    wNode.pipe = pipe;
    var readableStream = FS.createStream({
      path: rName,
      node: rNode,
      flags: 0,
      seekable: false,
      stream_ops: PIPEFS.stream_ops
    });
    rNode.stream = readableStream;
    var writableStream = FS.createStream({
      path: wName,
      node: wNode,
      flags: 1,
      seekable: false,
      stream_ops: PIPEFS.stream_ops
    });
    wNode.stream = writableStream;
    return {
      readable_fd: readableStream.fd,
      writable_fd: writableStream.fd
    };
  },
  stream_ops: {
    poll(stream) {
      var pipe = stream.node.pipe;
      if ((stream.flags & 2097155) === 1) {
        return (256 | 4);
      }
      if (pipe.buckets.length > 0) {
        for (var i = 0; i < pipe.buckets.length; i++) {
          var bucket = pipe.buckets[i];
          if (bucket.offset - bucket.roffset > 0) {
            return (64 | 1);
          }
        }
      }
      return 0;
    },
    ioctl(stream, request, varargs) {
      return 28;
    },
    fsync(stream) {
      return 28;
    },
    read(stream, buffer, offset, length, position) {
      /* ignored */ var pipe = stream.node.pipe;
      var currentLength = 0;
      for (var i = 0; i < pipe.buckets.length; i++) {
        var bucket = pipe.buckets[i];
        currentLength += bucket.offset - bucket.roffset;
      }
      assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
      var data = buffer.subarray(offset, offset + length);
      if (length <= 0) {
        return 0;
      }
      if (currentLength == 0) {
        // Behave as if the read end is always non-blocking
        throw new FS.ErrnoError(6);
      }
      var toRead = Math.min(currentLength, length);
      var totalRead = toRead;
      var toRemove = 0;
      for (var i = 0; i < pipe.buckets.length; i++) {
        var currBucket = pipe.buckets[i];
        var bucketSize = currBucket.offset - currBucket.roffset;
        if (toRead <= bucketSize) {
          var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
          if (toRead < bucketSize) {
            tmpSlice = tmpSlice.subarray(0, toRead);
            currBucket.roffset += toRead;
          } else {
            toRemove++;
          }
          data.set(tmpSlice);
          break;
        } else {
          var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
          data.set(tmpSlice);
          data = data.subarray(tmpSlice.byteLength);
          toRead -= tmpSlice.byteLength;
          toRemove++;
        }
      }
      if (toRemove && toRemove == pipe.buckets.length) {
        // Do not generate excessive garbage in use cases such as
        // write several bytes, read everything, write several bytes, read everything...
        toRemove--;
        pipe.buckets[toRemove].offset = 0;
        pipe.buckets[toRemove].roffset = 0;
      }
      pipe.buckets.splice(0, toRemove);
      return totalRead;
    },
    write(stream, buffer, offset, length, position) {
      /* ignored */ var pipe = stream.node.pipe;
      assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
      var data = buffer.subarray(offset, offset + length);
      var dataLen = data.byteLength;
      if (dataLen <= 0) {
        return 0;
      }
      var currBucket = null;
      if (pipe.buckets.length == 0) {
        currBucket = {
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: 0,
          roffset: 0
        };
        pipe.buckets.push(currBucket);
      } else {
        currBucket = pipe.buckets[pipe.buckets.length - 1];
      }
      assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
      var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
      if (freeBytesInCurrBuffer >= dataLen) {
        currBucket.buffer.set(data, currBucket.offset);
        currBucket.offset += dataLen;
        return dataLen;
      } else if (freeBytesInCurrBuffer > 0) {
        currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
        currBucket.offset += freeBytesInCurrBuffer;
        data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
      }
      var numBuckets = (data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE) | 0;
      var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
      for (var i = 0; i < numBuckets; i++) {
        var newBucket = {
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: PIPEFS.BUCKET_BUFFER_SIZE,
          roffset: 0
        };
        pipe.buckets.push(newBucket);
        newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
        data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
      }
      if (remElements > 0) {
        var newBucket = {
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: data.byteLength,
          roffset: 0
        };
        pipe.buckets.push(newBucket);
        newBucket.buffer.set(data);
      }
      return dataLen;
    },
    close(stream) {
      var pipe = stream.node.pipe;
      pipe.refcnt--;
      if (pipe.refcnt === 0) {
        pipe.buckets = null;
      }
    }
  },
  nextname() {
    if (!PIPEFS.nextname.current) {
      PIPEFS.nextname.current = 0;
    }
    return "pipe[" + (PIPEFS.nextname.current++) + "]";
  }
};

function ___syscall_pipe(fdPtr) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(26, 0, 1, fdPtr);
  try {
    if (fdPtr == 0) {
      throw new FS.ErrnoError(21);
    }
    var res = PIPEFS.createPipe();
    GROWABLE_HEAP_I32()[((fdPtr) >> 2)] = res.readable_fd;
    GROWABLE_HEAP_I32()[(((fdPtr) + (4)) >> 2)] = res.writable_fd;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_poll(fds, nfds, timeout) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(27, 0, 1, fds, nfds, timeout);
  try {
    var nonzero = 0;
    for (var i = 0; i < nfds; i++) {
      var pollfd = fds + 8 * i;
      var fd = GROWABLE_HEAP_I32()[((pollfd) >> 2)];
      var events = GROWABLE_HEAP_I16()[(((pollfd) + (4)) >> 1)];
      var mask = 32;
      var stream = FS.getStream(fd);
      if (stream) {
        mask = SYSCALLS.DEFAULT_POLLMASK;
        if (stream.stream_ops.poll) {
          mask = stream.stream_ops.poll(stream, -1);
        }
      }
      mask &= events | 8 | 16;
      if (mask) nonzero++;
      GROWABLE_HEAP_I16()[(((pollfd) + (6)) >> 1)] = mask;
    }
    return nonzero;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(28, 0, 1, dirfd, path, buf, bufsize);
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = GROWABLE_HEAP_I8()[buf + len];
    stringToUTF8(ret, buf, bufsize + 1);
    // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
    // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
    GROWABLE_HEAP_I8()[buf + len] = endChar;
    return len;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_recvfrom(fd, buf, len, flags, addr, addrlen) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(29, 0, 1, fd, buf, len, flags, addr, addrlen);
  try {
    var sock = getSocketFromFD(fd);
    var msg = sock.sock_ops.recvmsg(sock, len);
    if (!msg) return 0;
    // socket is closed
    if (addr) {
      var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port, addrlen);
      assert(!errno);
    }
    GROWABLE_HEAP_U8().set(msg.buffer, buf);
    return msg.buffer.byteLength;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(30, 0, 1, olddirfd, oldpath, newdirfd, newpath);
  try {
    oldpath = SYSCALLS.getStr(oldpath);
    newpath = SYSCALLS.getStr(newpath);
    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
    newpath = SYSCALLS.calculateAt(newdirfd, newpath);
    FS.rename(oldpath, newpath);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_rmdir(path) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(31, 0, 1, path);
  try {
    path = SYSCALLS.getStr(path);
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(32, 0, 1, fd, message, length, flags, addr, addr_len);
  try {
    var sock = getSocketFromFD(fd);
    if (!addr) {
      // send, no address provided
      return FS.write(sock.stream, GROWABLE_HEAP_I8(), message, length);
    }
    var dest = getSocketAddress(addr, addr_len);
    // sendto an address
    return sock.sock_ops.sendmsg(sock, GROWABLE_HEAP_I8(), message, length, dest.addr, dest.port);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_socket(domain, type, protocol) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(33, 0, 1, domain, type, protocol);
  try {
    var sock = SOCKFS.createSocket(domain, type, protocol);
    assert(sock.stream.fd < 64);
    // XXX ? select() assumes socket fd values are in 0..63
    return sock.stream.fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_stat64(path, buf) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(34, 0, 1, path, buf);
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.doStat(FS.stat, path, buf);
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_unlinkat(dirfd, path, flags) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(35, 0, 1, dirfd, path, flags);
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (flags === 0) {
      FS.unlink(path);
    } else if (flags === 512) {
      FS.rmdir(path);
    } else {
      abort("Invalid flags passed to unlinkat");
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var readI53FromI64 = ptr => GROWABLE_HEAP_U32()[((ptr) >> 2)] + GROWABLE_HEAP_I32()[(((ptr) + (4)) >> 2)] * 4294967296;

function ___syscall_utimensat(dirfd, path, times, flags) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(36, 0, 1, dirfd, path, times, flags);
  try {
    path = SYSCALLS.getStr(path);
    assert(flags === 0);
    path = SYSCALLS.calculateAt(dirfd, path, true);
    var now = Date.now(), atime, mtime;
    if (!times) {
      atime = now;
      mtime = now;
    } else {
      var seconds = readI53FromI64(times);
      var nanoseconds = GROWABLE_HEAP_I32()[(((times) + (8)) >> 2)];
      if (nanoseconds == 1073741823) {
        atime = now;
      } else if (nanoseconds == 1073741822) {
        atime = -1;
      } else {
        atime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
      }
      times += 16;
      seconds = readI53FromI64(times);
      nanoseconds = GROWABLE_HEAP_I32()[(((times) + (8)) >> 2)];
      if (nanoseconds == 1073741823) {
        mtime = now;
      } else if (nanoseconds == 1073741822) {
        mtime = -1;
      } else {
        mtime = (seconds * 1e3) + (nanoseconds / (1e3 * 1e3));
      }
    }
    // -1 here means UTIME_OMIT was passed.  FS.utime tables the max of these
    // two values and sets the timestamp to that single value.  If both were
    // set to UTIME_OMIT then we can skip the call completely.
    if (mtime != -1 || atime != -1) {
      FS.utime(path, atime, mtime);
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var getCppExceptionTag = () => // In static linking, tags are defined within the wasm module and are
// exported, whereas in dynamic linking, tags are defined in library.js in
// JS code and wasm modules import them.
wasmExports["__cpp_exception"];

var getCppExceptionThrownObjectFromWebAssemblyException = ex => {
  // In Wasm EH, the value extracted from WebAssembly.Exception is a pointer
  // to the unwind header. Convert it to the actual thrown value.
  var unwind_header = ex.getArg(getCppExceptionTag(), 0);
  return ___thrown_object_from_unwind_exception(unwind_header);
};

var getExceptionMessageCommon = ptr => {
  var sp = stackSave();
  var type_addr_addr = stackAlloc(4);
  var message_addr_addr = stackAlloc(4);
  ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
  var type_addr = GROWABLE_HEAP_U32()[((type_addr_addr) >> 2)];
  var message_addr = GROWABLE_HEAP_U32()[((message_addr_addr) >> 2)];
  var type = UTF8ToString(type_addr);
  _free(type_addr);
  var message;
  if (message_addr) {
    message = UTF8ToString(message_addr);
    _free(message_addr);
  }
  stackRestore(sp);
  return [ type, message ];
};

var getExceptionMessage = ex => {
  var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
  return getExceptionMessageCommon(ptr);
};

Module["getExceptionMessage"] = getExceptionMessage;

var ___throw_exception_with_stack_trace = ex => {
  var e = new WebAssembly.Exception(getCppExceptionTag(), [ ex ], {
    traceStack: true
  });
  e.message = getExceptionMessage(e);
  throw e;
};

var __abort_js = () => {
  abort("native code called abort()");
};

var nowIsMonotonic = 1;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var __emscripten_init_main_thread_js = tb => {
  // Pass the thread address to the native code where they stored in wasm
  // globals which act as a form of TLS. Global constructors trying
  // to access this value will read the wrong value, but that is UB anyway.
  __emscripten_thread_init(tb, /*is_main=*/ !ENVIRONMENT_IS_WORKER, /*is_runtime=*/ 1, /*can_block=*/ !ENVIRONMENT_IS_WEB, /*default_stacksize=*/ 65536, /*start_profiling=*/ false);
  PThread.threadInitTLS();
};

var __emscripten_lookup_name = name => {
  // uint32_t _emscripten_lookup_name(const char *name);
  var nameString = UTF8ToString(name);
  return inetPton4(DNS.lookup_name(nameString));
};

var maybeExit = () => {
  if (runtimeExited) {
    return;
  }
  if (!keepRuntimeAlive()) {
    try {
      if (ENVIRONMENT_IS_PTHREAD) __emscripten_thread_exit(EXITSTATUS); else _exit(EXITSTATUS);
    } catch (e) {
      handleException(e);
    }
  }
};

var callUserCallback = func => {
  if (runtimeExited || ABORT) {
    err("user callback triggered after runtime exited or application aborted.  Ignoring.");
    return;
  }
  try {
    func();
    maybeExit();
  } catch (e) {
    handleException(e);
  }
};

var __emscripten_thread_mailbox_await = pthread_ptr => {
  if (typeof Atomics.waitAsync === "function") {
    // Wait on the pthread's initial self-pointer field because it is easy and
    // safe to access from sending threads that need to notify the waiting
    // thread.
    // TODO: How to make this work with wasm64?
    var wait = Atomics.waitAsync(GROWABLE_HEAP_I32(), ((pthread_ptr) >> 2), pthread_ptr);
    assert(wait.async);
    wait.value.then(checkMailbox);
    var waitingAsync = pthread_ptr + 128;
    Atomics.store(GROWABLE_HEAP_I32(), ((waitingAsync) >> 2), 1);
  }
};

// If `Atomics.waitAsync` is not implemented, then we will always fall back
// to postMessage and there is no need to do anything here.
var checkMailbox = () => {
  // Only check the mailbox if we have a live pthread runtime. We implement
  // pthread_self to return 0 if there is no live runtime.
  var pthread_ptr = _pthread_self();
  if (pthread_ptr) {
    // If we are using Atomics.waitAsync as our notification mechanism, wait
    // for a notification before processing the mailbox to avoid missing any
    // work that could otherwise arrive after we've finished processing the
    // mailbox and before we're ready for the next notification.
    __emscripten_thread_mailbox_await(pthread_ptr);
    callUserCallback(__emscripten_check_mailbox);
  }
};

var __emscripten_notify_mailbox_postmessage = (targetThread, currThreadId) => {
  if (targetThread == currThreadId) {
    setTimeout(checkMailbox);
  } else if (ENVIRONMENT_IS_PTHREAD) {
    postMessage({
      targetThread,
      cmd: "checkMailbox"
    });
  } else {
    var worker = PThread.pthreads[targetThread];
    if (!worker) {
      err(`Cannot send message to thread with ID ${targetThread}, unknown thread ID!`);
      return;
    }
    worker.postMessage({
      cmd: "checkMailbox"
    });
  }
};

var proxiedJSCallArgs = [];

var __emscripten_receive_on_main_thread_js = (funcIndex, emAsmAddr, callingThread, numCallArgs, args) => {
  // Sometimes we need to backproxy events to the calling thread (e.g.
  // HTML5 DOM events handlers such as
  // emscripten_set_mousemove_callback()), so keep track in a globally
  // accessible variable about the thread that initiated the proxying.
  proxiedJSCallArgs.length = numCallArgs;
  var b = ((args) >> 3);
  for (var i = 0; i < numCallArgs; i++) {
    proxiedJSCallArgs[i] = GROWABLE_HEAP_F64()[b + i];
  }
  // Proxied JS library funcs use funcIndex and EM_ASM functions use emAsmAddr
  assert(!emAsmAddr);
  var func = proxiedFunctionTable[funcIndex];
  assert(!(funcIndex && emAsmAddr));
  assert(func.length == numCallArgs, "Call args mismatch in _emscripten_receive_on_main_thread_js");
  PThread.currentProxiedOperationCallerThread = callingThread;
  var rtn = func(...proxiedJSCallArgs);
  PThread.currentProxiedOperationCallerThread = 0;
  // Proxied functions can return any type except bigint.  All other types
  // cooerce to f64/double (the return type of this function in C) but not
  // bigint.
  assert(typeof rtn != "bigint");
  return rtn;
};

var __emscripten_runtime_keepalive_clear = () => {
  noExitRuntime = false;
  runtimeKeepaliveCounter = 0;
};

var __emscripten_system = command => {
  if (ENVIRONMENT_IS_NODE) {
    if (!command) return 1;
    // shell is available
    var cmdstr = UTF8ToString(command);
    if (!cmdstr.length) return 0;
    // this is what glibc seems to do (shell works test?)
    var cp = require("child_process");
    var ret = cp.spawnSync(cmdstr, [], {
      shell: true,
      stdio: "inherit"
    });
    var _W_EXITCODE = (ret, sig) => ((ret) << 8 | (sig));
    // this really only can happen if process is killed by signal
    if (ret.status === null) {
      // sadly node doesn't expose such function
      var signalToNumber = sig => {
        // implement only the most common ones, and fallback to SIGINT
        switch (sig) {
         case "SIGHUP":
          return 1;

         case "SIGQUIT":
          return 3;

         case "SIGFPE":
          return 8;

         case "SIGKILL":
          return 9;

         case "SIGALRM":
          return 14;

         case "SIGTERM":
          return 15;

         default:
          return 2;
        }
      };
      return _W_EXITCODE(0, signalToNumber(ret.signal));
    }
    return _W_EXITCODE(ret.status, 0);
  }
  // int system(const char *command);
  // http://pubs.opengroup.org/onlinepubs/000095399/functions/system.html
  // Can't call external programs.
  if (!command) return 0;
  // no shell available
  return -52;
};

var __emscripten_thread_cleanup = thread => {
  // Called when a thread needs to be cleaned up so it can be reused.
  // A thread is considered reusable when it either returns from its
  // entry point, calls pthread_exit, or acts upon a cancellation.
  // Detached threads are responsible for calling this themselves,
  // otherwise pthread_join is responsible for calling this.
  if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread); else postMessage({
    cmd: "cleanupThread",
    thread
  });
};

var __emscripten_thread_set_strongref = thread => {
  // Called when a thread needs to be strongly referenced.
  // Currently only used for:
  // - keeping the "main" thread alive in PROXY_TO_PTHREAD mode;
  // - crashed threads that needs to propagate the uncaught exception
  //   back to the main thread.
  if (ENVIRONMENT_IS_NODE) {
    PThread.pthreads[thread].ref();
  }
};

function __gmtime_js(time_low, time_high, tmPtr) {
  var time = convertI32PairToI53Checked(time_low, time_high);
  var date = new Date(time * 1e3);
  GROWABLE_HEAP_I32()[((tmPtr) >> 2)] = date.getUTCSeconds();
  GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)] = date.getUTCMinutes();
  GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)] = date.getUTCHours();
  GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)] = date.getUTCDate();
  GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)] = date.getUTCMonth();
  GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] = date.getUTCFullYear() - 1900;
  GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getUTCDay();
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
  GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
  var leap = isLeapYear(date.getFullYear());
  var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
  var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
  // -1 since it's days since Jan 1
  return yday;
};

function __localtime_js(time_low, time_high, tmPtr) {
  var time = convertI32PairToI53Checked(time_low, time_high);
  var date = new Date(time * 1e3);
  GROWABLE_HEAP_I32()[((tmPtr) >> 2)] = date.getSeconds();
  GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
  GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)] = date.getHours();
  GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)] = date.getDate();
  GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)] = date.getMonth();
  GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] = date.getFullYear() - 1900;
  GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
  GROWABLE_HEAP_I32()[(((tmPtr) + (36)) >> 2)] = -(date.getTimezoneOffset() * 60);
  // Attention: DST is in December in South, and some regions don't have DST at all.
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  GROWABLE_HEAP_I32()[(((tmPtr) + (32)) >> 2)] = dst;
}

/** @suppress {duplicate } */ var setTempRet0 = val => __emscripten_tempret_set(val);

var __mktime_js = function(tmPtr) {
  var ret = (() => {
    var date = new Date(GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] + 1900, GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)], GROWABLE_HEAP_I32()[((tmPtr) >> 2)], 0);
    // There's an ambiguous hour when the time goes back; the tm_isdst field is
    // used to disambiguate it.  Date() basically guesses, so we fix it up if it
    // guessed wrong, or fill in tm_isdst with the guess if it's -1.
    var dst = GROWABLE_HEAP_I32()[(((tmPtr) + (32)) >> 2)];
    var guessedOffset = date.getTimezoneOffset();
    var start = new Date(date.getFullYear(), 0, 1);
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dstOffset = Math.min(winterOffset, summerOffset);
    // DST is in December in South
    if (dst < 0) {
      // Attention: some regions don't have DST at all.
      GROWABLE_HEAP_I32()[(((tmPtr) + (32)) >> 2)] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
    } else if ((dst > 0) != (dstOffset == guessedOffset)) {
      var nonDstOffset = Math.max(winterOffset, summerOffset);
      var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
      // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
      date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
    }
    GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getDay();
    var yday = ydayFromDate(date) | 0;
    GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
    // To match expected behavior, update fields from date
    GROWABLE_HEAP_I32()[((tmPtr) >> 2)] = date.getSeconds();
    GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
    GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)] = date.getHours();
    GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)] = date.getDate();
    GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)] = date.getMonth();
    GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] = date.getYear();
    var timeMs = date.getTime();
    if (isNaN(timeMs)) {
      return -1;
    }
    // Return time in microseconds
    return timeMs / 1e3;
  })();
  return (setTempRet0((tempDouble = ret, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0)), 
  ret >>> 0);
};

function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(37, 0, 1, len, prot, flags, fd, offset_low, offset_high, allocated, addr);
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  try {
    if (isNaN(offset)) return 61;
    var stream = SYSCALLS.getStreamFromFD(fd);
    var res = FS.mmap(stream, len, offset, prot, flags);
    var ptr = res.ptr;
    GROWABLE_HEAP_I32()[((allocated) >> 2)] = res.allocated;
    GROWABLE_HEAP_U32()[((addr) >> 2)] = ptr;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(38, 0, 1, addr, len, prot, flags, fd, offset_low, offset_high);
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    if (prot & 2) {
      SYSCALLS.doMsync(addr, stream, len, flags, offset);
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var timers = {};

var _emscripten_get_now = () => performance.timeOrigin + performance.now();

function __setitimer_js(which, timeout_ms) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(39, 0, 1, which, timeout_ms);
  // First, clear any existing timer.
  if (timers[which]) {
    clearTimeout(timers[which].id);
    delete timers[which];
  }
  // A timeout of zero simply cancels the current timeout so we have nothing
  // more to do.
  if (!timeout_ms) return 0;
  var id = setTimeout(() => {
    assert(which in timers);
    delete timers[which];
    callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
  }, timeout_ms);
  timers[which] = {
    id,
    timeout_ms
  };
  return 0;
}

var __timegm_js = function(tmPtr) {
  var ret = (() => {
    var time = Date.UTC(GROWABLE_HEAP_I32()[(((tmPtr) + (20)) >> 2)] + 1900, GROWABLE_HEAP_I32()[(((tmPtr) + (16)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (12)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (8)) >> 2)], GROWABLE_HEAP_I32()[(((tmPtr) + (4)) >> 2)], GROWABLE_HEAP_I32()[((tmPtr) >> 2)], 0);
    var date = new Date(time);
    GROWABLE_HEAP_I32()[(((tmPtr) + (24)) >> 2)] = date.getUTCDay();
    var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
    var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
    GROWABLE_HEAP_I32()[(((tmPtr) + (28)) >> 2)] = yday;
    return date.getTime() / 1e3;
  })();
  return (setTempRet0((tempDouble = ret, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0)), 
  ret >>> 0);
};

var __tzset_js = (timezone, daylight, std_name, dst_name) => {
  // TODO: Use (malleable) environment variables instead of system settings.
  var currentYear = (new Date).getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  var winterOffset = winter.getTimezoneOffset();
  var summerOffset = summer.getTimezoneOffset();
  // Local standard timezone offset. Local standard time is not adjusted for
  // daylight savings.  This code uses the fact that getTimezoneOffset returns
  // a greater value during Standard Time versus Daylight Saving Time (DST).
  // Thus it determines the expected output during Standard Time, and it
  // compares whether the output of the given date the same (Standard) or less
  // (DST).
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  // timezone is specified as seconds west of UTC ("The external variable
  // `timezone` shall be set to the difference, in seconds, between
  // Coordinated Universal Time (UTC) and local standard time."), the same
  // as returned by stdTimezoneOffset.
  // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
  GROWABLE_HEAP_U32()[((timezone) >> 2)] = stdTimezoneOffset * 60;
  GROWABLE_HEAP_I32()[((daylight) >> 2)] = Number(winterOffset != summerOffset);
  var extractZone = timezoneOffset => {
    // Why inverse sign?
    // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
    var sign = timezoneOffset >= 0 ? "-" : "+";
    var absOffset = Math.abs(timezoneOffset);
    var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    var minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
  };
  var winterName = extractZone(winterOffset);
  var summerName = extractZone(summerOffset);
  assert(winterName);
  assert(summerName);
  assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
  assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
  if (summerOffset < winterOffset) {
    // Northern hemisphere
    stringToUTF8(winterName, std_name, 17);
    stringToUTF8(summerName, dst_name, 17);
  } else {
    stringToUTF8(winterName, dst_name, 17);
    stringToUTF8(summerName, std_name, 17);
  }
};

var _emscripten_check_blocking_allowed = () => {
  if (ENVIRONMENT_IS_NODE) return;
  if (ENVIRONMENT_IS_WORKER) return;
  // Blocking in a worker/pthread is fine.
  warnOnce("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread");
};

var _emscripten_date_now = () => Date.now();

var _emscripten_err = str => err(UTF8ToString(str));

var _emscripten_exit_with_live_runtime = () => {
  runtimeKeepalivePush();
  throw "unwind";
};

var getHeapMax = () => // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
// full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
// for any code that deals with heap sizes, which would require special
// casing all heap size related code to treat 0 specially.
2147483648;

var _emscripten_get_heap_max = () => getHeapMax();

var _emscripten_num_logical_cores = () => ENVIRONMENT_IS_NODE ? require("os").cpus().length : navigator["hardwareConcurrency"];

var growMemory = size => {
  var b = wasmMemory.buffer;
  var pages = ((size - b.byteLength + 65535) / 65536) | 0;
  try {
    // round size grow request up to wasm page size (fixed 64KB per spec)
    wasmMemory.grow(pages);
    // .grow() takes a delta compared to the previous size
    updateMemoryViews();
    return 1;
  } /*success*/ catch (e) {
    err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
  }
};

// implicit 0 return to save code size (caller will cast "undefined" into 0
// anyhow)
var _emscripten_resize_heap = requestedSize => {
  var oldSize = GROWABLE_HEAP_U8().length;
  // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
  requestedSize >>>= 0;
  // With multithreaded builds, races can happen (another thread might increase the size
  // in between), so return a failure, and let the caller retry.
  if (requestedSize <= oldSize) {
    return false;
  }
  // Memory resize rules:
  // 1.  Always increase heap size to at least the requested size, rounded up
  //     to next page multiple.
  // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
  //     geometrically: increase the heap size according to
  //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
  //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
  // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
  //     linearly: increase the heap size by at least
  //     MEMORY_GROWTH_LINEAR_STEP bytes.
  // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
  //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
  // 4.  If we were unable to allocate as much memory, it may be due to
  //     over-eager decision to excessively reserve due to (3) above.
  //     Hence if an allocation fails, cut down on the amount of excess
  //     growth, in an attempt to succeed to perform a smaller allocation.
  // A limit is set for how much we can grow. We should not exceed that
  // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
  var maxHeapSize = getHeapMax();
  if (requestedSize > maxHeapSize) {
    err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
    return false;
  }
  // Loop through potential heap size increases. If we attempt a too eager
  // reservation that fails, cut down on the attempted size and reserve a
  // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
    // ensure geometric growth
    // but limit overreserving (default to capping at +96MB overgrowth at most)
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
    var replacement = growMemory(newSize);
    if (replacement) {
      return true;
    }
  }
  err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
  return false;
};

var _emscripten_runtime_keepalive_check = keepRuntimeAlive;

var _emscripten_unwind_to_js_event_loop = () => {
  throw "unwind";
};

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
  if (!getEnvStrings.strings) {
    // Default values.
    // Browser language detection #8751
    var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
    var env = {
      "USER": "web_user",
      "LOGNAME": "web_user",
      "PATH": "/",
      "PWD": "/",
      "HOME": "/home/web_user",
      "LANG": lang,
      "_": getExecutableName()
    };
    // Apply the user-provided values, if any.
    for (var x in ENV) {
      // x is a key in ENV; if ENV[x] is undefined, that means it was
      // explicitly set to be so. We allow user code to do that to
      // force variables with default values to remain unset.
      if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(`${x}=${env[x]}`);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
    GROWABLE_HEAP_I8()[buffer++] = str.charCodeAt(i);
  }
  // Null-terminate the string
  GROWABLE_HEAP_I8()[buffer] = 0;
};

var _environ_get = function(__environ, environ_buf) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(40, 0, 1, __environ, environ_buf);
  var bufSize = 0;
  getEnvStrings().forEach((string, i) => {
    var ptr = environ_buf + bufSize;
    GROWABLE_HEAP_U32()[(((__environ) + (i * 4)) >> 2)] = ptr;
    stringToAscii(string, ptr);
    bufSize += string.length + 1;
  });
  return 0;
};

var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(41, 0, 1, penviron_count, penviron_buf_size);
  var strings = getEnvStrings();
  GROWABLE_HEAP_U32()[((penviron_count) >> 2)] = strings.length;
  var bufSize = 0;
  strings.forEach(string => bufSize += string.length + 1);
  GROWABLE_HEAP_U32()[((penviron_buf_size) >> 2)] = bufSize;
  return 0;
};

function _fd_close(fd) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(42, 0, 1, fd);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_fdstat_get(fd, pbuf) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(43, 0, 1, fd, pbuf);
  try {
    var rightsBase = 0;
    var rightsInheriting = 0;
    var flags = 0;
    {
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
    }
    GROWABLE_HEAP_I8()[pbuf] = type;
    GROWABLE_HEAP_I16()[(((pbuf) + (2)) >> 1)] = flags;
    (tempI64 = [ rightsBase >>> 0, (tempDouble = rightsBase, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((pbuf) + (8)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((pbuf) + (12)) >> 2)] = tempI64[1]);
    (tempI64 = [ rightsInheriting >>> 0, (tempDouble = rightsInheriting, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[(((pbuf) + (16)) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((pbuf) + (20)) >> 2)] = tempI64[1]);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doReadv = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = GROWABLE_HEAP_U32()[((iov) >> 2)];
    var len = GROWABLE_HEAP_U32()[(((iov) + (4)) >> 2)];
    iov += 8;
    var curr = FS.read(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) break;
    // nothing more to read
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(44, 0, 1, fd, iov, iovcnt, pnum);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doReadv(stream, iov, iovcnt);
    GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(45, 0, 1, fd, offset_low, offset_high, whence, newOffset);
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  try {
    if (isNaN(offset)) return 61;
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.llseek(stream, offset, whence);
    (tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
    GROWABLE_HEAP_I32()[((newOffset) >> 2)] = tempI64[0], GROWABLE_HEAP_I32()[(((newOffset) + (4)) >> 2)] = tempI64[1]);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    // reset readdir state
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_sync(fd) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(46, 0, 1, fd);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    if (stream.stream_ops?.fsync) {
      return stream.stream_ops.fsync(stream);
    }
    return 0;
  } // we can't do anything synchronously; the in-memory FS is already synced to
  catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = GROWABLE_HEAP_U32()[((iov) >> 2)];
    var len = GROWABLE_HEAP_U32()[(((iov) + (4)) >> 2)];
    iov += 8;
    var curr = FS.write(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) {
      // No more space to write.
      break;
    }
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};

function _fd_write(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(47, 0, 1, fd, iov, iovcnt, pnum);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doWritev(stream, iov, iovcnt);
    GROWABLE_HEAP_U32()[((pnum) >> 2)] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _getaddrinfo(node, service, hint, out) {
  if (ENVIRONMENT_IS_PTHREAD) return proxyToMainThread(48, 0, 1, node, service, hint, out);
  var addr = 0;
  var port = 0;
  var flags = 0;
  var family = 0;
  var type = 0;
  var proto = 0;
  var ai;
  function allocaddrinfo(family, type, proto, canon, addr, port) {
    var sa, salen, ai;
    var errno;
    salen = family === 10 ? 28 : 16;
    addr = family === 10 ? inetNtop6(addr) : inetNtop4(addr);
    sa = _malloc(salen);
    errno = writeSockaddr(sa, family, addr, port);
    assert(!errno);
    ai = _malloc(32);
    GROWABLE_HEAP_I32()[(((ai) + (4)) >> 2)] = family;
    GROWABLE_HEAP_I32()[(((ai) + (8)) >> 2)] = type;
    GROWABLE_HEAP_I32()[(((ai) + (12)) >> 2)] = proto;
    GROWABLE_HEAP_U32()[(((ai) + (24)) >> 2)] = canon;
    GROWABLE_HEAP_U32()[(((ai) + (20)) >> 2)] = sa;
    if (family === 10) {
      GROWABLE_HEAP_I32()[(((ai) + (16)) >> 2)] = 28;
    } else {
      GROWABLE_HEAP_I32()[(((ai) + (16)) >> 2)] = 16;
    }
    GROWABLE_HEAP_I32()[(((ai) + (28)) >> 2)] = 0;
    return ai;
  }
  if (hint) {
    flags = GROWABLE_HEAP_I32()[((hint) >> 2)];
    family = GROWABLE_HEAP_I32()[(((hint) + (4)) >> 2)];
    type = GROWABLE_HEAP_I32()[(((hint) + (8)) >> 2)];
    proto = GROWABLE_HEAP_I32()[(((hint) + (12)) >> 2)];
  }
  if (type && !proto) {
    proto = type === 2 ? 17 : 6;
  }
  if (!type && proto) {
    type = proto === 17 ? 2 : 1;
  }
  // If type or proto are set to zero in hints we should really be returning multiple addrinfo values, but for
  // now default to a TCP STREAM socket so we can at least return a sensible addrinfo given NULL hints.
  if (proto === 0) {
    proto = 6;
  }
  if (type === 0) {
    type = 1;
  }
  if (!node && !service) {
    return -2;
  }
  if (flags & ~(1 | 2 | 4 | 1024 | 8 | 16 | 32)) {
    return -1;
  }
  if (hint !== 0 && (GROWABLE_HEAP_I32()[((hint) >> 2)] & 2) && !node) {
    return -1;
  }
  if (flags & 32) {
    // TODO
    return -2;
  }
  if (type !== 0 && type !== 1 && type !== 2) {
    return -7;
  }
  if (family !== 0 && family !== 2 && family !== 10) {
    return -6;
  }
  if (service) {
    service = UTF8ToString(service);
    port = parseInt(service, 10);
    if (isNaN(port)) {
      if (flags & 1024) {
        return -2;
      }
      // TODO support resolving well-known service names from:
      // http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt
      return -8;
    }
  }
  if (!node) {
    if (family === 0) {
      family = 2;
    }
    if ((flags & 1) === 0) {
      if (family === 2) {
        addr = _htonl(2130706433);
      } else {
        addr = [ 0, 0, 0, _htonl(1) ];
      }
    }
    ai = allocaddrinfo(family, type, proto, null, addr, port);
    GROWABLE_HEAP_U32()[((out) >> 2)] = ai;
    return 0;
  }
  // try as a numeric address
  node = UTF8ToString(node);
  addr = inetPton4(node);
  if (addr !== null) {
    // incoming node is a valid ipv4 address
    if (family === 0 || family === 2) {
      family = 2;
    } else if (family === 10 && (flags & 8)) {
      addr = [ 0, 0, _htonl(65535), addr ];
      family = 10;
    } else {
      return -2;
    }
  } else {
    addr = inetPton6(node);
    if (addr !== null) {
      // incoming node is a valid ipv6 address
      if (family === 0 || family === 10) {
        family = 10;
      } else {
        return -2;
      }
    }
  }
  if (addr != null) {
    ai = allocaddrinfo(family, type, proto, node, addr, port);
    GROWABLE_HEAP_U32()[((out) >> 2)] = ai;
    return 0;
  }
  if (flags & 4) {
    return -2;
  }
  // try as a hostname
  // resolve the hostname to a temporary fake address
  node = DNS.lookup_name(node);
  addr = inetPton4(node);
  if (family === 0) {
    family = 2;
  } else if (family === 10) {
    addr = [ 0, 0, _htonl(65535), addr ];
  }
  ai = allocaddrinfo(family, type, proto, null, addr, port);
  GROWABLE_HEAP_U32()[((out) >> 2)] = ai;
  return 0;
}

var _getnameinfo = (sa, salen, node, nodelen, serv, servlen, flags) => {
  var info = readSockaddr(sa, salen);
  if (info.errno) {
    return -6;
  }
  var port = info.port;
  var addr = info.addr;
  var overflowed = false;
  if (node && nodelen) {
    var lookup;
    if ((flags & 1) || !(lookup = DNS.lookup_addr(addr))) {
      if (flags & 8) {
        return -2;
      }
    } else {
      addr = lookup;
    }
    var numBytesWrittenExclNull = stringToUTF8(addr, node, nodelen);
    if (numBytesWrittenExclNull + 1 >= nodelen) {
      overflowed = true;
    }
  }
  if (serv && servlen) {
    port = "" + port;
    var numBytesWrittenExclNull = stringToUTF8(port, serv, servlen);
    if (numBytesWrittenExclNull + 1 >= servlen) {
      overflowed = true;
    }
  }
  if (overflowed) {
    // Note: even when we overflow, getnameinfo() is specced to write out the truncated results.
    return -12;
  }
  return 0;
};

var Protocols = {
  list: [],
  map: {}
};

var _setprotoent = stayopen => {
  // void setprotoent(int stayopen);
  // Allocate and populate a protoent structure given a name, protocol number and array of aliases
  function allocprotoent(name, proto, aliases) {
    // write name into buffer
    var nameBuf = _malloc(name.length + 1);
    stringToAscii(name, nameBuf);
    // write aliases into buffer
    var j = 0;
    var length = aliases.length;
    var aliasListBuf = _malloc((length + 1) * 4);
    // Use length + 1 so we have space for the terminating NULL ptr.
    for (var i = 0; i < length; i++, j += 4) {
      var alias = aliases[i];
      var aliasBuf = _malloc(alias.length + 1);
      stringToAscii(alias, aliasBuf);
      GROWABLE_HEAP_U32()[(((aliasListBuf) + (j)) >> 2)] = aliasBuf;
    }
    GROWABLE_HEAP_U32()[(((aliasListBuf) + (j)) >> 2)] = 0;
    // Terminating NULL pointer.
    // generate protoent
    var pe = _malloc(12);
    GROWABLE_HEAP_U32()[((pe) >> 2)] = nameBuf;
    GROWABLE_HEAP_U32()[(((pe) + (4)) >> 2)] = aliasListBuf;
    GROWABLE_HEAP_I32()[(((pe) + (8)) >> 2)] = proto;
    return pe;
  }
  // Populate the protocol 'database'. The entries are limited to tcp and udp, though it is fairly trivial
  // to add extra entries from /etc/protocols if desired - though not sure if that'd actually be useful.
  var list = Protocols.list;
  var map = Protocols.map;
  if (list.length === 0) {
    var entry = allocprotoent("tcp", 6, [ "TCP" ]);
    list.push(entry);
    map["tcp"] = map["6"] = entry;
    entry = allocprotoent("udp", 17, [ "UDP" ]);
    list.push(entry);
    map["udp"] = map["17"] = entry;
  }
  _setprotoent.index = 0;
};

var _getprotobyname = name => {
  // struct protoent *getprotobyname(const char *);
  name = UTF8ToString(name);
  _setprotoent(true);
  var result = Protocols.map[name];
  return result;
};

var arraySum = (array, index) => {
  var sum = 0;
  for (var i = 0; i <= index; sum += array[i++]) {}
  // no-op
  return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
  var newDate = new Date(date.getTime());
  while (days > 0) {
    var leap = isLeapYear(newDate.getFullYear());
    var currentMonth = newDate.getMonth();
    var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
    if (days > daysInCurrentMonth - newDate.getDate()) {
      // we spill over to next month
      days -= (daysInCurrentMonth - newDate.getDate() + 1);
      newDate.setDate(1);
      if (currentMonth < 11) {
        newDate.setMonth(currentMonth + 1);
      } else {
        newDate.setMonth(0);
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
    } else {
      // we stay in current month
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    }
  }
  return newDate;
};

var _strptime = (buf, format, tm) => {
  // char *strptime(const char *restrict buf, const char *restrict format, struct tm *restrict tm);
  // http://pubs.opengroup.org/onlinepubs/009695399/functions/strptime.html
  var pattern = UTF8ToString(format);
  // escape special characters
  // TODO: not sure we really need to escape all of these in JS regexps
  var SPECIAL_CHARS = "\\!@#$^&*()+=-[]/{}|:<>?,.";
  for (var i = 0, ii = SPECIAL_CHARS.length; i < ii; ++i) {
    pattern = pattern.replace(new RegExp("\\" + SPECIAL_CHARS[i], "g"), "\\" + SPECIAL_CHARS[i]);
  }
  // reduce number of matchers
  var EQUIVALENT_MATCHERS = {
    "A": "%a",
    "B": "%b",
    "c": "%a %b %d %H:%M:%S %Y",
    "D": "%m\\/%d\\/%y",
    "e": "%d",
    "F": "%Y-%m-%d",
    "h": "%b",
    "R": "%H\\:%M",
    "r": "%I\\:%M\\:%S\\s%p",
    "T": "%H\\:%M\\:%S",
    "x": "%m\\/%d\\/(?:%y|%Y)",
    "X": "%H\\:%M\\:%S"
  };
  // TODO: take care of locale
  var DATE_PATTERNS = {
    /* weekday name */ "a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
    /* month name */ "b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
    /* century */ "C": "\\d\\d",
    /* day of month */ "d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
    /* hour (24hr) */ "H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
    /* hour (12hr) */ "I": "\\d(?!\\d)|0\\d|10|11|12",
    /* day of year */ "j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
    /* month */ "m": "0[1-9]|[1-9](?!\\d)|10|11|12",
    /* minutes */ "M": "0\\d|\\d(?!\\d)|[1-5]\\d",
    /* whitespace */ "n": " ",
    /* AM/PM */ "p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
    /* seconds */ "S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
    /* week number */ "U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
    /* week number */ "W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
    /* weekday number */ "w": "[0-6]",
    /* 2-digit year */ "y": "\\d\\d",
    /* 4-digit year */ "Y": "\\d\\d\\d\\d",
    /* whitespace */ "t": " ",
    /* time zone */ "z": "Z|(?:[\\+\\-]\\d\\d:?(?:\\d\\d)?)"
  };
  var MONTH_NUMBERS = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11
  };
  var DAY_NUMBERS_SUN_FIRST = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
  };
  var DAY_NUMBERS_MON_FIRST = {
    MON: 0,
    TUE: 1,
    WED: 2,
    THU: 3,
    FRI: 4,
    SAT: 5,
    SUN: 6
  };
  var capture = [];
  var pattern_out = pattern.replace(/%(.)/g, (m, c) => EQUIVALENT_MATCHERS[c] || m).replace(/%(.)/g, (_, c) => {
    let pat = DATE_PATTERNS[c];
    if (pat) {
      capture.push(c);
      return `(${pat})`;
    } else {
      return c;
    }
  }).replace(// any number of space or tab characters match zero or more spaces
  /\s+/g, "\\s*");
  var matches = new RegExp("^" + pattern_out, "i").exec(UTF8ToString(buf));
  function initDate() {
    function fixup(value, min, max) {
      return (typeof value != "number" || isNaN(value)) ? min : (value >= min ? (value <= max ? value : max) : min);
    }
    return {
      year: fixup(GROWABLE_HEAP_I32()[(((tm) + (20)) >> 2)] + 1900, 1970, 9999),
      month: fixup(GROWABLE_HEAP_I32()[(((tm) + (16)) >> 2)], 0, 11),
      day: fixup(GROWABLE_HEAP_I32()[(((tm) + (12)) >> 2)], 1, 31),
      hour: fixup(GROWABLE_HEAP_I32()[(((tm) + (8)) >> 2)], 0, 23),
      min: fixup(GROWABLE_HEAP_I32()[(((tm) + (4)) >> 2)], 0, 59),
      sec: fixup(GROWABLE_HEAP_I32()[((tm) >> 2)], 0, 59),
      gmtoff: 0
    };
  }
  if (matches) {
    var date = initDate();
    var value;
    var getMatch = symbol => {
      var pos = capture.indexOf(symbol);
      // check if symbol appears in regexp
      if (pos >= 0) {
        // return matched value or null (falsy!) for non-matches
        return matches[pos + 1];
      }
      return;
    };
    // seconds
    if ((value = getMatch("S"))) {
      date.sec = jstoi_q(value);
    }
    // minutes
    if ((value = getMatch("M"))) {
      date.min = jstoi_q(value);
    }
    // hours
    if ((value = getMatch("H"))) {
      // 24h clock
      date.hour = jstoi_q(value);
    } else if ((value = getMatch("I"))) {
      // AM/PM clock
      var hour = jstoi_q(value);
      if ((value = getMatch("p"))) {
        hour += value.toUpperCase()[0] === "P" ? 12 : 0;
      }
      date.hour = hour;
    }
    // year
    if ((value = getMatch("Y"))) {
      // parse from four-digit year
      date.year = jstoi_q(value);
    } else if ((value = getMatch("y"))) {
      // parse from two-digit year...
      var year = jstoi_q(value);
      if ((value = getMatch("C"))) {
        // ...and century
        year += jstoi_q(value) * 100;
      } else {
        // ...and rule-of-thumb
        year += year < 69 ? 2e3 : 1900;
      }
      date.year = year;
    }
    // month
    if ((value = getMatch("m"))) {
      // parse from month number
      date.month = jstoi_q(value) - 1;
    } else if ((value = getMatch("b"))) {
      // parse from month name
      date.month = MONTH_NUMBERS[value.substring(0, 3).toUpperCase()] || 0;
    }
    // day
    if ((value = getMatch("d"))) {
      // get day of month directly
      date.day = jstoi_q(value);
    } else if ((value = getMatch("j"))) {
      // get day of month from day of year ...
      var day = jstoi_q(value);
      var leapYear = isLeapYear(date.year);
      for (var month = 0; month < 12; ++month) {
        var daysUntilMonth = arraySum(leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, month - 1);
        if (day <= daysUntilMonth + (leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[month]) {
          date.day = day - daysUntilMonth;
        }
      }
    } else if ((value = getMatch("a"))) {
      // get day of month from weekday ...
      var weekDay = value.substring(0, 3).toUpperCase();
      if ((value = getMatch("U"))) {
        // ... and week number (Sunday being first day of week)
        // Week number of the year (Sunday as the first day of the week) as a decimal number [00,53].
        // All days in a new year preceding the first Sunday are considered to be in week 0.
        var weekDayNumber = DAY_NUMBERS_SUN_FIRST[weekDay];
        var weekNumber = jstoi_q(value);
        // January 1st
        var janFirst = new Date(date.year, 0, 1);
        var endDate;
        if (janFirst.getDay() === 0) {
          // Jan 1st is a Sunday, and, hence in the 1st CW
          endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
        } else {
          // Jan 1st is not a Sunday, and, hence still in the 0th CW
          endDate = addDays(janFirst, 7 - janFirst.getDay() + weekDayNumber + 7 * (weekNumber - 1));
        }
        date.day = endDate.getDate();
        date.month = endDate.getMonth();
      } else if ((value = getMatch("W"))) {
        // ... and week number (Monday being first day of week)
        // Week number of the year (Monday as the first day of the week) as a decimal number [00,53].
        // All days in a new year preceding the first Monday are considered to be in week 0.
        var weekDayNumber = DAY_NUMBERS_MON_FIRST[weekDay];
        var weekNumber = jstoi_q(value);
        // January 1st
        var janFirst = new Date(date.year, 0, 1);
        var endDate;
        if (janFirst.getDay() === 1) {
          // Jan 1st is a Monday, and, hence in the 1st CW
          endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
        } else {
          // Jan 1st is not a Monday, and, hence still in the 0th CW
          endDate = addDays(janFirst, 7 - janFirst.getDay() + 1 + weekDayNumber + 7 * (weekNumber - 1));
        }
        date.day = endDate.getDate();
        date.month = endDate.getMonth();
      }
    }
    // time zone
    if ((value = getMatch("z"))) {
      // GMT offset as either 'Z' or +-HH:MM or +-HH or +-HHMM
      if (value.toLowerCase() === "z") {
        date.gmtoff = 0;
      } else {
        var match = value.match(/^((?:\-|\+)\d\d):?(\d\d)?/);
        date.gmtoff = match[1] * 3600;
        if (match[2]) {
          date.gmtoff += date.gmtoff > 0 ? match[2] * 60 : -match[2] * 60;
        }
      }
    }
    /*
        tm_sec  int seconds after the minute  0-61*
        tm_min  int minutes after the hour  0-59
        tm_hour int hours since midnight  0-23
        tm_mday int day of the month  1-31
        tm_mon  int months since January  0-11
        tm_year int years since 1900
        tm_wday int days since Sunday 0-6
        tm_yday int days since January 1  0-365
        tm_isdst  int Daylight Saving Time flag
        tm_gmtoff long offset from GMT (seconds)
        */ var fullDate = new Date(date.year, date.month, date.day, date.hour, date.min, date.sec, 0);
    GROWABLE_HEAP_I32()[((tm) >> 2)] = fullDate.getSeconds();
    GROWABLE_HEAP_I32()[(((tm) + (4)) >> 2)] = fullDate.getMinutes();
    GROWABLE_HEAP_I32()[(((tm) + (8)) >> 2)] = fullDate.getHours();
    GROWABLE_HEAP_I32()[(((tm) + (12)) >> 2)] = fullDate.getDate();
    GROWABLE_HEAP_I32()[(((tm) + (16)) >> 2)] = fullDate.getMonth();
    GROWABLE_HEAP_I32()[(((tm) + (20)) >> 2)] = fullDate.getFullYear() - 1900;
    GROWABLE_HEAP_I32()[(((tm) + (24)) >> 2)] = fullDate.getDay();
    GROWABLE_HEAP_I32()[(((tm) + (28)) >> 2)] = arraySum(isLeapYear(fullDate.getFullYear()) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, fullDate.getMonth() - 1) + fullDate.getDate() - 1;
    GROWABLE_HEAP_I32()[(((tm) + (32)) >> 2)] = 0;
    GROWABLE_HEAP_I32()[(((tm) + (36)) >> 2)] = date.gmtoff;
    // we need to convert the matched sequence into an integer array to take care of UTF-8 characters > 0x7F
    // TODO: not sure that intArrayFromString handles all unicode characters correctly
    return buf + intArrayFromString(matches[0]).length - 1;
  }
  return 0;
};

var stringToUTF8OnStack = str => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8(str, ret, size);
  return ret;
};

var FS_createPath = FS.createPath;

var FS_unlink = path => FS.unlink(path);

var FS_createLazyFile = FS.createLazyFile;

var FS_createDevice = FS.createDevice;

var incrementExceptionRefcount = ex => {
  var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
  ___cxa_increment_exception_refcount(ptr);
};

Module["incrementExceptionRefcount"] = incrementExceptionRefcount;

var decrementExceptionRefcount = ex => {
  var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
  ___cxa_decrement_exception_refcount(ptr);
};

Module["decrementExceptionRefcount"] = decrementExceptionRefcount;

PThread.init();

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

// Set module methods based on EXPORTED_RUNTIME_METHODS
Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

// proxiedFunctionTable specifies the list of functions that can be called
// either synchronously or asynchronously from other threads in postMessage()d
// or internally queued events. This way a pthread in a Worker can synchronously
// access e.g. the DOM on the main thread.
var proxiedFunctionTable = [ _proc_exit, exitOnMainThread, pthreadCreateProxied, ___syscall__newselect, ___syscall_accept4, ___syscall_bind, ___syscall_chdir, ___syscall_chmod, ___syscall_connect, ___syscall_dup3, ___syscall_faccessat, ___syscall_fchmod, ___syscall_fchown32, ___syscall_fcntl64, ___syscall_fstat64, ___syscall_ftruncate64, ___syscall_getcwd, ___syscall_getdents64, ___syscall_getsockname, ___syscall_getsockopt, ___syscall_ioctl, ___syscall_listen, ___syscall_lstat64, ___syscall_mkdirat, ___syscall_newfstatat, ___syscall_openat, ___syscall_pipe, ___syscall_poll, ___syscall_readlinkat, ___syscall_recvfrom, ___syscall_renameat, ___syscall_rmdir, ___syscall_sendto, ___syscall_socket, ___syscall_stat64, ___syscall_unlinkat, ___syscall_utimensat, __mmap_js, __munmap_js, __setitimer_js, _environ_get, _environ_sizes_get, _fd_close, _fd_fdstat_get, _fd_read, _fd_seek, _fd_sync, _fd_write, _getaddrinfo ];

function checkIncomingModuleAPI() {
  ignoredModuleProp("fetchSettings");
}

var wasmImports;

function assignWasmImports() {
  wasmImports = {
    /** @export */ __assert_fail: ___assert_fail,
    /** @export */ __call_sighandler: ___call_sighandler,
    /** @export */ __pthread_create_js: ___pthread_create_js,
    /** @export */ __syscall__newselect: ___syscall__newselect,
    /** @export */ __syscall_accept4: ___syscall_accept4,
    /** @export */ __syscall_bind: ___syscall_bind,
    /** @export */ __syscall_chdir: ___syscall_chdir,
    /** @export */ __syscall_chmod: ___syscall_chmod,
    /** @export */ __syscall_connect: ___syscall_connect,
    /** @export */ __syscall_dup3: ___syscall_dup3,
    /** @export */ __syscall_faccessat: ___syscall_faccessat,
    /** @export */ __syscall_fchmod: ___syscall_fchmod,
    /** @export */ __syscall_fchown32: ___syscall_fchown32,
    /** @export */ __syscall_fcntl64: ___syscall_fcntl64,
    /** @export */ __syscall_fstat64: ___syscall_fstat64,
    /** @export */ __syscall_ftruncate64: ___syscall_ftruncate64,
    /** @export */ __syscall_getcwd: ___syscall_getcwd,
    /** @export */ __syscall_getdents64: ___syscall_getdents64,
    /** @export */ __syscall_getsockname: ___syscall_getsockname,
    /** @export */ __syscall_getsockopt: ___syscall_getsockopt,
    /** @export */ __syscall_ioctl: ___syscall_ioctl,
    /** @export */ __syscall_listen: ___syscall_listen,
    /** @export */ __syscall_lstat64: ___syscall_lstat64,
    /** @export */ __syscall_mkdirat: ___syscall_mkdirat,
    /** @export */ __syscall_newfstatat: ___syscall_newfstatat,
    /** @export */ __syscall_openat: ___syscall_openat,
    /** @export */ __syscall_pipe: ___syscall_pipe,
    /** @export */ __syscall_poll: ___syscall_poll,
    /** @export */ __syscall_readlinkat: ___syscall_readlinkat,
    /** @export */ __syscall_recvfrom: ___syscall_recvfrom,
    /** @export */ __syscall_renameat: ___syscall_renameat,
    /** @export */ __syscall_rmdir: ___syscall_rmdir,
    /** @export */ __syscall_sendto: ___syscall_sendto,
    /** @export */ __syscall_socket: ___syscall_socket,
    /** @export */ __syscall_stat64: ___syscall_stat64,
    /** @export */ __syscall_unlinkat: ___syscall_unlinkat,
    /** @export */ __syscall_utimensat: ___syscall_utimensat,
    /** @export */ __throw_exception_with_stack_trace: ___throw_exception_with_stack_trace,
    /** @export */ _abort_js: __abort_js,
    /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
    /** @export */ _emscripten_init_main_thread_js: __emscripten_init_main_thread_js,
    /** @export */ _emscripten_lookup_name: __emscripten_lookup_name,
    /** @export */ _emscripten_notify_mailbox_postmessage: __emscripten_notify_mailbox_postmessage,
    /** @export */ _emscripten_receive_on_main_thread_js: __emscripten_receive_on_main_thread_js,
    /** @export */ _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
    /** @export */ _emscripten_system: __emscripten_system,
    /** @export */ _emscripten_thread_cleanup: __emscripten_thread_cleanup,
    /** @export */ _emscripten_thread_mailbox_await: __emscripten_thread_mailbox_await,
    /** @export */ _emscripten_thread_set_strongref: __emscripten_thread_set_strongref,
    /** @export */ _gmtime_js: __gmtime_js,
    /** @export */ _localtime_js: __localtime_js,
    /** @export */ _mktime_js: __mktime_js,
    /** @export */ _mmap_js: __mmap_js,
    /** @export */ _munmap_js: __munmap_js,
    /** @export */ _setitimer_js: __setitimer_js,
    /** @export */ _timegm_js: __timegm_js,
    /** @export */ _tzset_js: __tzset_js,
    /** @export */ emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
    /** @export */ emscripten_date_now: _emscripten_date_now,
    /** @export */ emscripten_err: _emscripten_err,
    /** @export */ emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime,
    /** @export */ emscripten_get_heap_max: _emscripten_get_heap_max,
    /** @export */ emscripten_get_now: _emscripten_get_now,
    /** @export */ emscripten_num_logical_cores: _emscripten_num_logical_cores,
    /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
    /** @export */ emscripten_runtime_keepalive_check: _emscripten_runtime_keepalive_check,
    /** @export */ emscripten_unwind_to_js_event_loop: _emscripten_unwind_to_js_event_loop,
    /** @export */ environ_get: _environ_get,
    /** @export */ environ_sizes_get: _environ_sizes_get,
    /** @export */ exit: _exit,
    /** @export */ fd_close: _fd_close,
    /** @export */ fd_fdstat_get: _fd_fdstat_get,
    /** @export */ fd_read: _fd_read,
    /** @export */ fd_seek: _fd_seek,
    /** @export */ fd_sync: _fd_sync,
    /** @export */ fd_write: _fd_write,
    /** @export */ getaddrinfo: _getaddrinfo,
    /** @export */ getnameinfo: _getnameinfo,
    /** @export */ getprotobyname: _getprotobyname,
    /** @export */ memory: wasmMemory,
    /** @export */ proc_exit: _proc_exit,
    /** @export */ strptime: _strptime
  };
}

var wasmExports = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors", 0);

var _free = createExportWrapper("free", 1);

var _malloc = createExportWrapper("malloc", 1);

var _ntohs = createExportWrapper("ntohs", 1);

var _htonl = createExportWrapper("htonl", 1);

var _htons = createExportWrapper("htons", 1);

var _pthread_self = () => (_pthread_self = wasmExports["pthread_self"])();

var _strerror = createExportWrapper("strerror", 1);

var _fflush = createExportWrapper("fflush", 1);

var _main = Module["_main"] = createExportWrapper("__main_argc_argv", 2);

var __emscripten_tls_init = createExportWrapper("_emscripten_tls_init", 0);

var _emscripten_builtin_memalign = createExportWrapper("emscripten_builtin_memalign", 2);

var __emscripten_proxy_main = Module["__emscripten_proxy_main"] = createExportWrapper("_emscripten_proxy_main", 2);

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var ___funcs_on_exit = createExportWrapper("__funcs_on_exit", 0);

var __emscripten_thread_init = createExportWrapper("_emscripten_thread_init", 6);

var __emscripten_thread_crashed = createExportWrapper("_emscripten_thread_crashed", 0);

var _emscripten_main_thread_process_queued_calls = createExportWrapper("emscripten_main_thread_process_queued_calls", 0);

var _emscripten_main_runtime_thread_id = createExportWrapper("emscripten_main_runtime_thread_id", 0);

var __emscripten_run_on_main_thread_js = createExportWrapper("_emscripten_run_on_main_thread_js", 5);

var __emscripten_thread_free_data = createExportWrapper("_emscripten_thread_free_data", 1);

var __emscripten_thread_exit = createExportWrapper("_emscripten_thread_exit", 1);

var __emscripten_timeout = createExportWrapper("_emscripten_timeout", 2);

var __emscripten_check_mailbox = createExportWrapper("_emscripten_check_mailbox", 0);

var ___trap = () => (___trap = wasmExports["__trap"])();

var __emscripten_tempret_set = createExportWrapper("_emscripten_tempret_set", 1);

var __emscripten_tempret_get = createExportWrapper("_emscripten_tempret_get", 0);

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_set_limits = (a0, a1) => (_emscripten_stack_set_limits = wasmExports["emscripten_stack_set_limits"])(a0, a1);

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var __emscripten_stack_restore = a0 => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);

var __emscripten_stack_alloc = a0 => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

var ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount", 1);

var ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount", 1);

var ___thrown_object_from_unwind_exception = createExportWrapper("__thrown_object_from_unwind_exception", 1);

var ___get_exception_message = createExportWrapper("__get_exception_message", 3);

var dynCall_viiiijii = Module["dynCall_viiiijii"] = createExportWrapper("dynCall_viiiijii", 9);

var dynCall_vijii = Module["dynCall_vijii"] = createExportWrapper("dynCall_vijii", 6);

var dynCall_vij = Module["dynCall_vij"] = createExportWrapper("dynCall_vij", 4);

var dynCall_viiij = Module["dynCall_viiij"] = createExportWrapper("dynCall_viiij", 6);

var dynCall_ji = Module["dynCall_ji"] = createExportWrapper("dynCall_ji", 2);

var dynCall_iiijj = Module["dynCall_iiijj"] = createExportWrapper("dynCall_iiijj", 7);

var dynCall_iiij = Module["dynCall_iiij"] = createExportWrapper("dynCall_iiij", 5);

var dynCall_iijj = Module["dynCall_iijj"] = createExportWrapper("dynCall_iijj", 6);

var dynCall_iiiij = Module["dynCall_iiiij"] = createExportWrapper("dynCall_iiiij", 6);

var dynCall_iij = Module["dynCall_iij"] = createExportWrapper("dynCall_iij", 4);

var dynCall_iijii = Module["dynCall_iijii"] = createExportWrapper("dynCall_iijii", 6);

var dynCall_iiji = Module["dynCall_iiji"] = createExportWrapper("dynCall_iiji", 5);

var dynCall_iiiiiij = Module["dynCall_iiiiiij"] = createExportWrapper("dynCall_iiiiiij", 8);

var dynCall_jii = Module["dynCall_jii"] = createExportWrapper("dynCall_jii", 3);

var dynCall_iiiiijii = Module["dynCall_iiiiijii"] = createExportWrapper("dynCall_iiiiijii", 9);

var dynCall_j = Module["dynCall_j"] = createExportWrapper("dynCall_j", 1);

var dynCall_jj = Module["dynCall_jj"] = createExportWrapper("dynCall_jj", 3);

var dynCall_jiij = Module["dynCall_jiij"] = createExportWrapper("dynCall_jiij", 5);

var dynCall_iiiiji = Module["dynCall_iiiiji"] = createExportWrapper("dynCall_iiiiji", 7);

var dynCall_iiiijii = Module["dynCall_iiiijii"] = createExportWrapper("dynCall_iiiijii", 8);

var dynCall_ij = Module["dynCall_ij"] = createExportWrapper("dynCall_ij", 3);

var dynCall_viiji = Module["dynCall_viiji"] = createExportWrapper("dynCall_viiji", 6);

var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii", 7);

var dynCall_iiiijji = Module["dynCall_iiiijji"] = createExportWrapper("dynCall_iiiijji", 9);

var dynCall_vjii = Module["dynCall_vjii"] = createExportWrapper("dynCall_vjii", 5);

var dynCall_vji = Module["dynCall_vji"] = createExportWrapper("dynCall_vji", 4);

var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji", 5);

var dynCall_iiiiij = Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij", 7);

var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj", 9);

var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj", 10);

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===
Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["callMain"] = callMain;

Module["FS_createPreloadedFile"] = FS_createPreloadedFile;

Module["FS_unlink"] = FS_unlink;

Module["FS_createPath"] = FS_createPath;

Module["FS_createDevice"] = FS_createDevice;

Module["FS"] = FS;

Module["FS_createDataFile"] = FS_createDataFile;

Module["FS_createLazyFile"] = FS_createLazyFile;

var missingLibrarySymbols = [ "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromU64", "convertI32PairToI53", "convertU32PairToI53", "getTempRet0", "emscriptenLog", "readEmAsmArgs", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "asmjsMangle", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayToString", "AsciiToString", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "stringToNewUTF8", "writeArrayToMemory", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSizeCallingThread", "setCanvasElementSizeMainThread", "setCanvasElementSize", "getCanvasSizeCallingThread", "getCanvasSizeMainThread", "getCanvasElementSize", "jsStackTrace", "getCallstack", "convertPCtoSourceLocation", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "safeSetTimeout", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "registerPostMainLoop", "registerPreMainLoop", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "Browser_asyncPrepareDataCounter", "safeRequestAnimationFrame", "FS_mkdirTree", "_setNetworkCallback", "heapObjectForWebGLType", "toTypedArrayIndex", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "webgl_enable_EXT_polygon_offset_clamp", "webgl_enable_EXT_clip_control", "webgl_enable_WEBGL_polygon_mode", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "emscripten_webgl_destroy_context_before_on_calling_thread", "registerWebGlEventCallback", "runAndAbortIfError", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory", "setErrNo", "demangle", "stackTrace" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "out", "err", "abort", "wasmMemory", "wasmExports", "GROWABLE_HEAP_I8", "GROWABLE_HEAP_U8", "GROWABLE_HEAP_I16", "GROWABLE_HEAP_U16", "GROWABLE_HEAP_I32", "GROWABLE_HEAP_U32", "GROWABLE_HEAP_F32", "GROWABLE_HEAP_F64", "writeStackCookie", "checkStackCookie", "readI53FromI64", "convertI32PairToI53Checked", "stackSave", "stackRestore", "stackAlloc", "setTempRet0", "ptrToString", "zeroMemory", "exitJS", "getHeapMax", "growMemory", "ENV", "ERRNO_CODES", "strError", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "DNS", "Protocols", "Sockets", "initRandomFill", "randomFill", "timers", "warnOnce", "readEmAsmArgsArray", "jstoi_q", "jstoi_s", "getExecutableName", "handleException", "keepRuntimeAlive", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "asyncLoad", "alignMemory", "mmapAlloc", "wasmTable", "noExitRuntime", "freeTableIndexes", "functionsInTableMap", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "intArrayFromString", "stringToAscii", "UTF16Decoder", "stringToUTF8OnStack", "JSEvents", "specialHTMLTargets", "findCanvasEventTarget", "currentFullscreenStrategy", "restoreOldWindowedStyle", "UNWIND_CACHE", "ExitStatus", "getEnvStrings", "doReadv", "doWritev", "promiseMap", "getExceptionMessageCommon", "getCppExceptionTag", "getCppExceptionThrownObjectFromWebAssemblyException", "incrementExceptionRefcount", "decrementExceptionRefcount", "getExceptionMessage", "Browser", "getPreloadedImageData__data", "wget", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "SYSCALLS", "getSocketFromFD", "getSocketAddress", "preloadPlugins", "FS_modeStringToFlags", "FS_getMode", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "FS_readFile", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "allocateUTF8", "allocateUTF8OnStack", "print", "printErr", "PThread", "terminateWorker", "cleanupThread", "registerTLSInit", "spawnThread", "exitOnMainThread", "proxyToMainThread", "proxiedJSCallArgs", "invokeEntryPoint", "checkMailbox" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

var calledPrerun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller;
};

// try this again later, after new deps are fulfilled
function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(calledPrerun, "cannot call main without calling preRun first");
  var entryFunction = __emscripten_proxy_main;
  // With PROXY_TO_PTHREAD make sure we keep the runtime alive until the
  // proxied main calls exit (see exitOnMainThread() for where Pop is called).
  runtimeKeepalivePush();
  args.unshift(thisProgram);
  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach(arg => {
    GROWABLE_HEAP_U32()[((argv_ptr) >> 2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  GROWABLE_HEAP_U32()[((argv_ptr) >> 2)] = 0;
  try {
    var ret = entryFunction(argc, argv);
    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  // See $establishStackSpace for the equivalent code that runs on a thread
  assert(!ENVIRONMENT_IS_PTHREAD);
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {
  if (runDependencies > 0) {
    return;
  }
  if (!ENVIRONMENT_IS_PTHREAD) stackCheckInit();
  if (ENVIRONMENT_IS_PTHREAD) {
    // The promise resolve function typically gets called as part of the execution
    // of `doRun` below. The workers/pthreads don't execute `doRun` so the
    // creation promise can be resolved, marking the pthread-Module as initialized.
    readyPromiseResolve(Module);
    initRuntime();
    startWorker(Module);
    return;
  }
  if (!calledPrerun) {
    calledPrerun = 1;
    preRun();
    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
  }
  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = 1;
    Module["calledRun"] = 1;
    if (ABORT) return;
    initRuntime();
    preMain();
    readyPromiseResolve(Module);
    Module["onRuntimeInitialized"]?.();
    if (shouldRunNow) callMain(args);
    postRun();
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(() => {
      setTimeout(() => Module["setStatus"](""), 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}

if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = false;

if (Module["noInitialRun"]) shouldRunNow = false;

run();

// end include: postamble.js
// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.
moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
      }
    });
  }
}


  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = createZeekModule;
else if (typeof define === 'function' && define['amd'])
  define([], () => createZeekModule);
var isPthread = globalThis.self?.name?.startsWith('em-pthread');
var isNode = typeof globalThis.process?.versions?.node == 'string';
if (isNode) isPthread = require('worker_threads').workerData === 'em-pthread'

// When running as a pthread, construct a new instance on startup
isPthread && createZeekModule();
