// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"video_framework/js/ckin.min.js":[function(require,module,exports) {
/*! ckin v0.0.1 | (c) 2017  | MIT License | git+https://github.com/hunzaboy/ckin.git */
function browserSniff() {
  var e,
      n,
      t,
      o = (navigator.appVersion, navigator.userAgent),
      r = navigator.appName,
      i = "" + parseFloat(navigator.appVersion),
      s = parseInt(navigator.appVersion, 10);
  return navigator.appVersion.indexOf("Windows NT") !== -1 && navigator.appVersion.indexOf("rv:11") !== -1 ? (r = "IE", i = "11;") : (n = o.indexOf("MSIE")) !== -1 ? (r = "IE", i = o.substring(n + 5)) : (n = o.indexOf("Chrome")) !== -1 ? (r = "Chrome", i = o.substring(n + 7)) : (n = o.indexOf("Safari")) !== -1 ? (r = "Safari", i = o.substring(n + 7), (n = o.indexOf("Version")) !== -1 && (i = o.substring(n + 8))) : (n = o.indexOf("Firefox")) !== -1 ? (r = "Firefox", i = o.substring(n + 8)) : (e = o.lastIndexOf(" ") + 1) < (n = o.lastIndexOf("/")) && (r = o.substring(e, n), i = o.substring(n + 1), r.toLowerCase() == r.toUpperCase() && (r = navigator.appName)), (t = i.indexOf(";")) !== -1 && (i = i.substring(0, t)), (t = i.indexOf(" ")) !== -1 && (i = i.substring(0, t)), s = parseInt("" + i, 10), isNaN(s) && (i = "" + parseFloat(navigator.appVersion), s = parseInt(navigator.appVersion, 10)), [r, s];
}

function showControls(e) {
  e.setAttribute("controls", "controls");
}

function togglePlay(e, n) {
  e[e.paused ? "play" : "pause"](), e.paused ? n.classList.remove("is-playing") : n.classList.add("is-playing");
}

function updateButton(e, n) {
  var t = e.paused ? iconPlay : iconPause;
  n.forEach(function (e) {
    return e.innerHTML = t;
  });
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function toggleVolume(e, n) {
  var t = e.volume,
      o = iconVolumeMedium;
  1 == t ? (t = 0, o = iconVolumeMute) : .5 == t ? (t = 1, o = iconVolumeMedium) : (t = .5, o = iconVolumeLow), e.volume = t, n.innerHTML = o;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress(e, n) {
  var t = e.currentTime / e.duration * 100;
  n.style.flexBasis = t + "%";
}

function scrub(e, n, t) {
  var o = e.offsetX / t.offsetWidth * n.duration;
  n.currentTime = o;
}

function wrapPlayers() {
  document.querySelectorAll("video").forEach(function (e) {
    var n = document.createElement("div");
    n.classList.add("ckin__player"), e.parentNode.insertBefore(n, e), n.appendChild(e);
  });
}

function buildControls(e) {
  var n = [];
  return n.push('<button class="' + e + '__button--big toggle" title="Toggle Play">' + iconPlay + "</button>"), n.push('<div class="' + e + '__controls ckin__controls">'), n.push('<button class="' + e + '__button toggle" title="Toggle Video">' + iconPlay + "</button>", '<div class="progress">', '<div class="progress__filled"></div>', "</div>", '<button class="' + e + '__button volume" title="Volume">' + iconVolumeMedium + "</button>", '<button class="' + e + '__button fullscreen" title="Full Screen">' + iconExpand + "</button>"), n.push("</div>"), n.join("");
}

function attachSkin(e) {
  return void 0 !== e && "" != e ? e : "default";
}

function showTitle(e, n) {
  return void 0 !== n && "" != n && '<div class="' + e + '__title">' + n + "</div>";
}

function addOverlay(e, n) {
  if (1 == n) e.classList.add("ckin__overlay");else {
    if (2 != n) return;
    e.classList.add("ckin__overlay--2");
  }
}

function addColor(e, n) {
  if (void 0 !== n && "" != n) {
    var t = e.querySelectorAll("button");
    e.querySelector(".progress__filled").style.background = n, t.forEach(function (e) {
      return e.style.color = n;
    });
  }
}

function toggleFullScreen(e, n) {
  document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? (e.classList.remove("ckin__fullscreen"), document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), isFullscreen = !1, n.innerHTML = iconExpand) : (e.classList.add("ckin__fullscreen"), e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen(), isFullscreen = !0, n.innerHTML = iconCompress);
}

function onFullScreen(e, n) {
  null !== document.webkitFullscreenElement || (n.classList.remove("ckin__fullscreen"), n.querySelector(".fullscreen").innerHTML = iconExpand);
}

function addListenerMulti(e, n, t) {
  for (var o = n.split(" "), r = 0, i = o.length; r < i; r++) {
    e.addEventListener(o[r], t, !1);
  }
}

!function () {
  function e(e) {
    this.element = e;
  }

  var n = function n(e) {
    return new RegExp("(^| )" + e + "( |$)");
  },
      t = function t(e, n, _t) {
    for (var o = 0; o < e.length; o++) {
      n.call(_t, e[o]);
    }
  };

  e.prototype = {
    add: function add() {
      t(arguments, function (e) {
        this.contains(e) || (this.element.className += " " + e);
      }, this);
    },
    remove: function remove() {
      t(arguments, function (e) {
        this.element.className = this.element.className.replace(n(e), "");
      }, this);
    },
    toggle: function toggle(e) {
      return this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0);
    },
    contains: function contains(e) {
      return n(e).test(this.element.className);
    },
    replace: function replace(e, n) {
      this.remove(e), this.add(n);
    }
  }, "classList" in Element.prototype || Object.defineProperty(Element.prototype, "classList", {
    get: function get() {
      return new e(this);
    }
  }), window.DOMTokenList && null == DOMTokenList.prototype.replace && (DOMTokenList.prototype.replace = e.prototype.replace);
}(), function () {
  if ("function" == typeof NodeList.prototype.forEach) return !1;
  NodeList.prototype.forEach = Array.prototype.forEach;
}();
var obj = {};
obj.browserInfo = browserSniff(), obj.browserName = obj.browserInfo[0], obj.browserVersion = obj.browserInfo[1], wrapPlayers();
var players = document.querySelectorAll(".ckin__player"),
    iconPlay = '<i class="ckin-play"></i>',
    iconPause = '<i class="ckin-pause"></i>',
    iconVolumeMute = '<i class="ckin-volume-mute"></i>',
    iconVolumeMedium = '<i class="ckin-volume-medium"></i>',
    iconVolumeLow = '<i class="ckin-volume-low"></i>',
    iconExpand = '<i class="ckin-expand"></i>',
    iconCompress = '<i class="ckin-compress"></i>';
players.forEach(function (e) {
  var n = e.querySelector("video"),
      t = attachSkin(n.dataset.ckin);
  e.classList.add(t), addOverlay(e, n.dataset.overlay);
  var o = showTitle(t, n.dataset.title);
  o && e.insertAdjacentHTML("beforeend", o);
  var r = buildControls(t);
  e.insertAdjacentHTML("beforeend", r), addColor(e, n.dataset.color);
  var i = e.querySelector("." + t + "__controls"),
      s = e.querySelector(".progress"),
      l = e.querySelector(".progress__filled"),
      c = e.querySelectorAll(".toggle"),
      a = (e.querySelectorAll("[data-skip]"), e.querySelectorAll("." + t + "__slider"), e.querySelector(".volume")),
      u = e.querySelector(".fullscreen");
  "IE" !== obj.browserName || 8 !== obj.browserVersion && 9 !== obj.browserVersion || (showControls(n), i.style.display = "none"), n.addEventListener("click", function () {
    togglePlay(this, e);
  }), n.addEventListener("play", function () {
    updateButton(this, c);
  }), n.addEventListener("pause", function () {
    updateButton(this, c);
  }), n.addEventListener("timeupdate", function () {
    handleProgress(this, l);
  }), c.forEach(function (t) {
    return t.addEventListener("click", function () {
      togglePlay(n, e);
    });
  }), a.addEventListener("click", function () {
    toggleVolume(n, a);
  });
  var d = !1;
  s.addEventListener("click", function (e) {
    scrub(e, n, s);
  }), s.addEventListener("mousemove", function (e) {
    return d && scrub(e, n, s);
  }), s.addEventListener("mousedown", function () {
    return d = !0;
  }), s.addEventListener("mouseup", function () {
    return d = !1;
  }), u.addEventListener("click", function (n) {
    return toggleFullScreen(e, u);
  }), addListenerMulti(e, "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function (n) {
    return onFullScreen(n, e);
  });
});
},{}],"../../../../../../.nvm/versions/node/v10.16.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43571" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../.nvm/versions/node/v10.16.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","video_framework/js/ckin.min.js"], null)
//# sourceMappingURL=/ckin.min.3a373adb.js.map