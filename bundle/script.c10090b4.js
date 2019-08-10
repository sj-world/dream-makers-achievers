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
})({"assets/js/script.js":[function(require,module,exports) {
// REVIEW: preloader when loading page
// jQuery(document).ready(function ($) {
//     $(window).load(function () {
//         $('#preloader').fadeOut('slow', function () { $(this).remove(); });
//     });
// });
// REVIEW: top sticky header nav-bar open-close setup
var mobileScreenSize = window.matchMedia("(max-width: 972px)");
var pcScreenSize = window.matchMedia("(min-width: 973px)");
var openBar = document.querySelector('.fa-align-right');
var closeBar = document.querySelector('.fa-times-rectangle');
var navContainer = document.querySelector('.top-sticky-header > nav');

function openSideNav() {
  navContainer.style.left = "0";
}

function closeSideNav() {
  navContainer.style.left = "-150px";
}

function toggleOpenBarIcon() {
  openBar.style.opacity = "0";
  openBar.style.transition = "0.6s";
  setTimeout(function () {
    openBar.style.display = "none";
    closeBar.style.display = "block";
    closeBar.style.opacity = "1";
    closeBar.style.transition = "0.5s";
  }, 400);
}

function toggleCloseBarIcon() {
  closeBar.style.opacity = "0";
  closeBar.style.transition = "0.5s";
  setTimeout(function () {
    closeBar.style.display = "none";
    openBar.style.display = "block";
    openBar.style.opacity = "1";
    openBar.style.transition = "0.5s";
  }, 400);
}

function toggleNavBar() {
  openBar.style.display = "block";
  openBar.addEventListener('click', function () {
    openSideNav();
    document.body.style.overflowY = "hidden";
    toggleOpenBarIcon();
  });
  closeBar.addEventListener('click', function () {
    closeSideNav();
    document.body.style.overflowY = "scroll";
    toggleCloseBarIcon();
  });
} // REVIEW: Close nav, When Clicked Outside Of It.


$(document.body).mousedown(function (event) {
  var target = $(event.target);

  if (target.parents().andSelf().is(openBar) || target.parents().andSelf().is(navContainer)) {
    navContainer.style.left = "0px";
  } else {
    navContainer.style.left = "-150px";
    toggleCloseBarIcon();
    document.body.style.overflowY = "scroll";
  }
});

function checkMobileSize(size) {
  if (size.matches) {
    toggleNavBar();
  } else {
    closeBar.style.display = "none";
    openBar.style.display = "none";
  }
} // REVIEW: close navbar when clicking on links


$('a[href*="#"]').on('click', function () {
  document.body.style.overflowY = "scroll";
  document.querySelector('nav').style.left = "-150px";

  function checkMobileSize(size) {
    if (size.matches) {
      toggleNavBar();
      toggleCloseBarIcon();
    } else {
      closeBar.style.display = "none";
      openBar.style.display = "none";
    }
  }

  checkMobileSize(mobileScreenSize);
  mobileScreenSize.addListener(checkMobileSize);
}); // REVIEW: open facebook page when clicking on fb icon

if (pcScreenSize.matches) {
  document.querySelector('.facebook').addEventListener('click', function () {
    var a = document.createElement('a');
    a.href = "https://www.facebook.com/Dream-Makers-Achievers-1382266625246369/";
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
} // REVIEW: Form submission using ajax


function postToDataBase() {
  var field1 = $("#firstName").val();
  var field2 = $("#lastName").val();
  var field3 = $("#mobile").val();
  var field4 = $("#subject").val();
  var field5 = $("#message").val();
  var field6 = $("#email").val();
  var field7 = $("#address").val();
  $.ajax({
    url: "https://docs.google.com/forms/d/e/1FAIpQLSd60r5wh_-4DRSxgp4g9_kMyitffQmkmXAhyKbKLVFjKIS6nQ/formResponse",
    data: {
      "entry.1062285405": field1,
      "entry.1115814915": field2,
      "entry.305354010": field3,
      "entry.2137892250": field4,
      "entry.334434444": field5,
      "emailAddress": field6,
      "entry.220273468": field7
    },
    type: "POST",
    dataType: "xml",
    success: function success() {
      console.log('your message has been sent ..!');
    },
    error: function error() {
      console.log('problem with server ..!');
    }
  });
  return false;
}

var form = document.querySelector('#form');
form.addEventListener("submit", function (e) {
  e.preventDefault(); //stop form from submitting default

  e.target.firstName.value = '';
  e.target.lastName.value = '';
  e.target.phone.value = '';
  e.target.subject.value = '';
  e.target.message.value = '';
  e.target.email.value = '';
  e.target.address.value = ''; // alert box after form submission

  document.querySelector('.submit-box-alert').style.display = "block";
  setTimeout(function () {
    document.querySelector('.submit-box-alert').style.display = "none";
  }, 7000);
  postToDataBase();
}); // REVIEW: back to top icon

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var goTop = document.querySelector('.go-top');

  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    goTop.style.opacity = 1;
    goTop.style.display = "block";
  } else {
    goTop.style.opacity = "0";
    goTop.style.display = "none";
  }
} // REVIEW: smooth scrolling setup using jquery, when clicking on links


$('a[href*="#"]').on('click', function (e) {
  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top - 80
  }, 500);
  e.preventDefault();
}); // /*------- Swiper Slider -------*/
// var swiper = new Swiper('.swiper-container', {
// 	pagination: '.swiper-pagination',
// 	nextButton: '.swiper-button-next',
// 	prevButton: '.swiper-button-prev',
// 	paginationClickable: true,
// 	centeredSlides: true,
// 	autoplay: 3500,
// 	   speed: 1500,
// 	   loop: true,
// 	autoplayDisableOnInteraction: false
// });
// <!--REVIEW:  Initialize Swiper -->

var swiper = new Swiper('.swiper-container', {
  spaceBetween: 0,
  centeredSlides: true,
  loop: false,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}); // TODO: Working on Program Section

var programLinks = document.querySelectorAll('.program-link');
programLinks.forEach(function (button) {
  button.onclick = function () {
    switch (button.innerHTML) {
      case programLinks[0].innerHTML:
        console.log('link1');
        alert('link1');
        break;

      case programLinks[1].innerHTML:
        console.log('link2');
        alert('link2');
        break;

      case programLinks[2].innerHTML:
        console.log('link3');
        alert('link3');
        break;

      case programLinks[3].innerHTML:
        console.log('link4');
        alert('link4');
        break;

      default:
        break;
    }
  };
});
checkMobileSize(mobileScreenSize);
mobileScreenSize.addListener(checkMobileSize);
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
},{}]},{},["../../../../../../.nvm/versions/node/v10.16.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/script.js"], null)
//# sourceMappingURL=/script.c10090b4.js.map