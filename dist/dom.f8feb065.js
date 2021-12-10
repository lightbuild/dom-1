// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"fRxd":[function(require,module,exports) {
window.dom = {
    create: function create(string) {
        var container = document.createElement("template");
        container.innerHTML = string.trim(); //消除string的空格
        return container.content.firstChild;
    },
    after: function after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before: function before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append: function append(parent, node) {
        parent.appendChild(node);
    },
    wrap: function wrap(node, parent) {
        dom.before(node, parent); //先让node与parent成为兄弟，再让node成为parent的子元素
        dom.append(parent, node);
    },
    remove: function remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty: function empty(node) {
        var childNodes = node.childNodes;

        var array = [];
        var x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild)); //使用forin循环 x会一直变化
            x = node.firstChild;
        }
        return array;
    },
    attr: function attr(node, name, value) {
        //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text: function text(node, string) {
        //适配，兼容ie浏览器
        if (arguments.length === 2) {
            if ('interText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('interText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html: function html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style: function style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div,"color","red")
            node.style[name] = value;
        } else if (typeof name === 'string') {
            // dom.style(div,"color")
            return node.style[name];
        } else if (name instanceof Object) {
            //dom.style(div, {"color":"red"})
            var object = name;
            for (var key in object) {
                node.style[key] = object[key]; //变量作为属性，要用中括号
            }
        }
    },

    class: {
        add: function add(node, className) {
            node.classList.add(className);
        },
        remove: function remove(node, className) {
            node.classList.remove(className);
        },
        has: function has(node, className) {
            return node.classList.contains(className);
        }
    },
    on: function on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off: function off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    find: function find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent: function parent(node) {
        return node.parentNode;
    },
    children: function children(node) {
        return node.children;
    },
    siblings: function siblings(node) {
        return Array.from(node.parentNode.children).filter(function (n) {
            return n !== node;
        });
    },
    //parentNode.children是伪数组，使用filter函数前需要转换一次
    next: function next(node) {
        var x = node.nextSibling;
        while (x && x.nodeType === 3) {
            //如果x存在且x的为文本节点
            x = x.nextSibling;
        }
        return x;
    },
    previous: function previous(node) {
        var x = node.previousSibling;
        while (x && x.nodeType === 3) {
            x = x.previousSibling;
        }
        return x;
    },
    each: function each(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index: function index(node) {
        var list = dom.children(node.parentNode);
        var i = void 0;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i;
    }
};
},{}]},{},["fRxd"], null)
//# sourceMappingURL=dom.f8feb065.map