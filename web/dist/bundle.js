/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = d3;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(5);
var App_1 = __webpack_require__(6);
__webpack_require__(12);
var demo1_1 = __webpack_require__(14);
var geoChina_1 = __webpack_require__(15);
var city_1 = __webpack_require__(16);
ReactDOM.render(React.createElement(App_1.default, { width: window.screen.availWidth, height: window.screen.availHeight, dataGeoChina: geoChina_1.default, cityList: city_1.default.nodes, graph: demo1_1.default }), document.getElementById('root'));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var d3 = __webpack_require__(1);
var map_1 = __webpack_require__(7);
var cities_1 = __webpack_require__(8);
__webpack_require__(9);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(_this.props.width / 2, _this.props.height / 2))
            .nodes(_this.props.graph.nodes);
        _this.simulation.force("link").links(_this.props.graph.links);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var node = d3.selectAll(".node");
        var link = d3.selectAll(".link");
        var label = d3.selectAll(".label");
        var map = d3.selectAll(".map");
        //this.simulation.nodes(this.props.graph.nodes).on("tick", ticked);
        function ticked() {
            link
                .attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                return d.source.y;
            })
                .attr("x2", function (d) {
                return d.target.x;
            })
                .attr("y2", function (d) {
                return d.target.y;
            });
            node
                .attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                return d.y;
            });
            label
                .attr("x", function (d) {
                return d.x + 5;
            })
                .attr("y", function (d) {
                return d.y + 5;
            });
        }
    };
    App.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, graph = _a.graph, dataGeoChina = _a.dataGeoChina, cityList = _a.cityList;
        return (React.createElement("svg", { className: "container", width: width, height: height },
            React.createElement(map_1.default, { dataGeo: dataGeoChina }),
            React.createElement(cities_1.default, { cityList: cityList })));
    };
    return App;
}(React.Component));
exports.default = App;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var d3 = __webpack_require__(1);
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Map.prototype.componentDidMount = function () {
        var projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([1400 / 2, 1000 / 2]);
        var path = d3.geoPath()
            .projection(projection);
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        d3.select(this.ref)
            .selectAll("path")
            .data(this.props.dataGeo.features)
            .enter()
            .append("path")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", function (d, i) {
            //return color(i.toString());
            return "#ffffff";
        })
            .attr("d", path) //使用地理路径生成器
            .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("fill", "yellow");
        })
            .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", "#ffffff");
        });
    };
    Map.prototype.render = function () {
        var _this = this;
        return (React.createElement("g", { className: "map", ref: function (ref) { return _this.ref = ref; } }));
    };
    return Map;
}(React.Component));
exports.default = Map;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var d3 = __webpack_require__(1);
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.prototype.componentDidMount = function () {
        var projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([1400 / 2, 1000 / 2]);
        d3
            .select(this.ref)
            .data([this.props.city])
            .attr("transform", function (d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        });
    };
    Node.prototype.render = function () {
        var _this = this;
        return (React.createElement("circle", { className: "node", r: this.props.city.value, ref: function (ref) { return _this.ref = ref; } },
            React.createElement("title", null, this.props.city.name)));
    };
    return Node;
}(React.Component));
var Cities = /** @class */ (function (_super) {
    __extends(Cities, _super);
    function Cities() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cities.prototype.componentDidMount = function () {
    };
    Cities.prototype.render = function () {
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        var nodes = this.props.cityList.map(function (city, index) {
            return React.createElement(Node, { key: index, city: city });
        });
        return (React.createElement("g", { className: "cities" }, nodes));
    };
    return Cities;
}(React.Component));
exports.default = Cities;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./App.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./App.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".container {\r\n    background-color: #ffffff;\r\n}\r\n\r\n.node {\r\n    stroke: #fff;\r\n    stroke-width: 1.5px;\r\n}\r\n\r\n.link {\r\n    stroke: #999;\r\n    stroke-opacity: 1;\r\n}\r\n\r\n.label {\r\n    font-size: 10px;\r\n    fill: #fff;\r\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "body {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: sans-serif;\r\n}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "nodes": [
        { "id": "Myriel", "group": 1 },
        { "id": "Napoleon", "group": 1 },
        { "id": "Mlle.Baptistine", "group": 1 },
        { "id": "Mme.Magloire", "group": 1 },
        { "id": "CountessdeLo", "group": 1 },
        { "id": "Geborand", "group": 1 },
        { "id": "Champtercier", "group": 1 },
        { "id": "Cravatte", "group": 1 },
        { "id": "Count", "group": 1 },
        { "id": "OldMan", "group": 1 },
        { "id": "Labarre", "group": 2 },
        { "id": "Valjean", "group": 2 },
        { "id": "Marguerite", "group": 3 },
        { "id": "Mme.deR", "group": 2 },
        { "id": "Isabeau", "group": 2 },
        { "id": "Gervais", "group": 2 },
        { "id": "Tholomyes", "group": 3 },
        { "id": "Listolier", "group": 3 },
        { "id": "Fameuil", "group": 3 },
        { "id": "Blacheville", "group": 3 },
        { "id": "Favourite", "group": 3 },
        { "id": "Dahlia", "group": 3 },
        { "id": "Zephine", "group": 3 },
        { "id": "Fantine", "group": 3 },
        { "id": "Mme.Thenardier", "group": 4 },
        { "id": "Thenardier", "group": 4 },
        { "id": "Cosette", "group": 5 },
        { "id": "Javert", "group": 4 },
        { "id": "Fauchelevent", "group": 0 },
        { "id": "Bamatabois", "group": 2 },
        { "id": "Perpetue", "group": 3 },
        { "id": "Simplice", "group": 2 },
        { "id": "Scaufflaire", "group": 2 },
        { "id": "Woman1", "group": 2 },
        { "id": "Judge", "group": 2 },
        { "id": "Champmathieu", "group": 2 },
        { "id": "Brevet", "group": 2 },
        { "id": "Chenildieu", "group": 2 },
        { "id": "Cochepaille", "group": 2 },
        { "id": "Pontmercy", "group": 4 },
        { "id": "Boulatruelle", "group": 6 },
        { "id": "Eponine", "group": 4 },
        { "id": "Anzelma", "group": 4 },
        { "id": "Woman2", "group": 5 },
        { "id": "MotherInnocent", "group": 0 },
        { "id": "Gribier", "group": 0 },
        { "id": "Jondrette", "group": 7 },
        { "id": "Mme.Burgon", "group": 7 },
        { "id": "Gavroche", "group": 8 },
        { "id": "Gillenormand", "group": 5 },
        { "id": "Magnon", "group": 5 },
        { "id": "Mlle.Gillenormand", "group": 5 },
        { "id": "Mme.Pontmercy", "group": 5 },
        { "id": "Mlle.Vaubois", "group": 5 },
        { "id": "Lt.Gillenormand", "group": 5 },
        { "id": "Marius", "group": 8 },
        { "id": "BaronessT", "group": 5 },
        { "id": "Mabeuf", "group": 8 },
        { "id": "Enjolras", "group": 8 },
        { "id": "Combeferre", "group": 8 },
        { "id": "Prouvaire", "group": 8 },
        { "id": "Feuilly", "group": 8 },
        { "id": "Courfeyrac", "group": 8 },
        { "id": "Bahorel", "group": 8 },
        { "id": "Bossuet", "group": 8 },
        { "id": "Joly", "group": 8 },
        { "id": "Grantaire", "group": 8 },
        { "id": "MotherPlutarch", "group": 9 },
        { "id": "Gueulemer", "group": 4 },
        { "id": "Babet", "group": 4 },
        { "id": "Claquesous", "group": 4 },
        { "id": "Montparnasse", "group": 4 },
        { "id": "Toussaint", "group": 5 },
        { "id": "Child1", "group": 10 },
        { "id": "Child2", "group": 10 },
        { "id": "Brujon", "group": 4 },
        { "id": "Mme.Hucheloup", "group": 8 }
    ],
    "links": [
        { "source": "Napoleon", "target": "Myriel", "value": 1 },
        { "source": "Mlle.Baptistine", "target": "Myriel", "value": 8 },
        { "source": "Mme.Magloire", "target": "Myriel", "value": 10 },
        { "source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6 },
        { "source": "CountessdeLo", "target": "Myriel", "value": 1 },
        { "source": "Geborand", "target": "Myriel", "value": 1 },
        { "source": "Champtercier", "target": "Myriel", "value": 1 },
        { "source": "Cravatte", "target": "Myriel", "value": 1 },
        { "source": "Count", "target": "Myriel", "value": 2 },
        { "source": "OldMan", "target": "Myriel", "value": 1 },
        { "source": "Valjean", "target": "Labarre", "value": 1 },
        { "source": "Valjean", "target": "Mme.Magloire", "value": 3 },
        { "source": "Valjean", "target": "Mlle.Baptistine", "value": 3 },
        { "source": "Valjean", "target": "Myriel", "value": 5 },
        { "source": "Marguerite", "target": "Valjean", "value": 1 },
        { "source": "Mme.deR", "target": "Valjean", "value": 1 },
        { "source": "Isabeau", "target": "Valjean", "value": 1 },
        { "source": "Gervais", "target": "Valjean", "value": 1 },
        { "source": "Listolier", "target": "Tholomyes", "value": 4 },
        { "source": "Fameuil", "target": "Tholomyes", "value": 4 },
        { "source": "Fameuil", "target": "Listolier", "value": 4 },
        { "source": "Blacheville", "target": "Tholomyes", "value": 4 },
        { "source": "Blacheville", "target": "Listolier", "value": 4 },
        { "source": "Blacheville", "target": "Fameuil", "value": 4 },
        { "source": "Favourite", "target": "Tholomyes", "value": 3 },
        { "source": "Favourite", "target": "Listolier", "value": 3 },
        { "source": "Favourite", "target": "Fameuil", "value": 3 },
        { "source": "Favourite", "target": "Blacheville", "value": 4 },
        { "source": "Dahlia", "target": "Tholomyes", "value": 3 },
        { "source": "Dahlia", "target": "Listolier", "value": 3 },
        { "source": "Dahlia", "target": "Fameuil", "value": 3 },
        { "source": "Dahlia", "target": "Blacheville", "value": 3 },
        { "source": "Dahlia", "target": "Favourite", "value": 5 },
        { "source": "Zephine", "target": "Tholomyes", "value": 3 },
        { "source": "Zephine", "target": "Listolier", "value": 3 },
        { "source": "Zephine", "target": "Fameuil", "value": 3 },
        { "source": "Zephine", "target": "Blacheville", "value": 3 },
        { "source": "Zephine", "target": "Favourite", "value": 4 },
        { "source": "Zephine", "target": "Dahlia", "value": 4 },
        { "source": "Fantine", "target": "Tholomyes", "value": 3 },
        { "source": "Fantine", "target": "Listolier", "value": 3 },
        { "source": "Fantine", "target": "Fameuil", "value": 3 },
        { "source": "Fantine", "target": "Blacheville", "value": 3 },
        { "source": "Fantine", "target": "Favourite", "value": 4 },
        { "source": "Fantine", "target": "Dahlia", "value": 4 },
        { "source": "Fantine", "target": "Zephine", "value": 4 },
        { "source": "Fantine", "target": "Marguerite", "value": 2 },
        { "source": "Fantine", "target": "Valjean", "value": 9 },
        { "source": "Mme.Thenardier", "target": "Fantine", "value": 2 },
        { "source": "Mme.Thenardier", "target": "Valjean", "value": 7 },
        { "source": "Thenardier", "target": "Mme.Thenardier", "value": 13 },
        { "source": "Thenardier", "target": "Fantine", "value": 1 },
        { "source": "Thenardier", "target": "Valjean", "value": 12 },
        { "source": "Cosette", "target": "Mme.Thenardier", "value": 4 },
        { "source": "Cosette", "target": "Valjean", "value": 31 },
        { "source": "Cosette", "target": "Tholomyes", "value": 1 },
        { "source": "Cosette", "target": "Thenardier", "value": 1 },
        { "source": "Javert", "target": "Valjean", "value": 17 },
        { "source": "Javert", "target": "Fantine", "value": 5 },
        { "source": "Javert", "target": "Thenardier", "value": 5 },
        { "source": "Javert", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Javert", "target": "Cosette", "value": 1 },
        { "source": "Fauchelevent", "target": "Valjean", "value": 8 },
        { "source": "Fauchelevent", "target": "Javert", "value": 1 },
        { "source": "Bamatabois", "target": "Fantine", "value": 1 },
        { "source": "Bamatabois", "target": "Javert", "value": 1 },
        { "source": "Bamatabois", "target": "Valjean", "value": 2 },
        { "source": "Perpetue", "target": "Fantine", "value": 1 },
        { "source": "Simplice", "target": "Perpetue", "value": 2 },
        { "source": "Simplice", "target": "Valjean", "value": 3 },
        { "source": "Simplice", "target": "Fantine", "value": 2 },
        { "source": "Simplice", "target": "Javert", "value": 1 },
        { "source": "Scaufflaire", "target": "Valjean", "value": 1 },
        { "source": "Woman1", "target": "Valjean", "value": 2 },
        { "source": "Woman1", "target": "Javert", "value": 1 },
        { "source": "Judge", "target": "Valjean", "value": 3 },
        { "source": "Judge", "target": "Bamatabois", "value": 2 },
        { "source": "Champmathieu", "target": "Valjean", "value": 3 },
        { "source": "Champmathieu", "target": "Judge", "value": 3 },
        { "source": "Champmathieu", "target": "Bamatabois", "value": 2 },
        { "source": "Brevet", "target": "Judge", "value": 2 },
        { "source": "Brevet", "target": "Champmathieu", "value": 2 },
        { "source": "Brevet", "target": "Valjean", "value": 2 },
        { "source": "Brevet", "target": "Bamatabois", "value": 1 },
        { "source": "Chenildieu", "target": "Judge", "value": 2 },
        { "source": "Chenildieu", "target": "Champmathieu", "value": 2 },
        { "source": "Chenildieu", "target": "Brevet", "value": 2 },
        { "source": "Chenildieu", "target": "Valjean", "value": 2 },
        { "source": "Chenildieu", "target": "Bamatabois", "value": 1 },
        { "source": "Cochepaille", "target": "Judge", "value": 2 },
        { "source": "Cochepaille", "target": "Champmathieu", "value": 2 },
        { "source": "Cochepaille", "target": "Brevet", "value": 2 },
        { "source": "Cochepaille", "target": "Chenildieu", "value": 2 },
        { "source": "Cochepaille", "target": "Valjean", "value": 2 },
        { "source": "Cochepaille", "target": "Bamatabois", "value": 1 },
        { "source": "Pontmercy", "target": "Thenardier", "value": 1 },
        { "source": "Boulatruelle", "target": "Thenardier", "value": 1 },
        { "source": "Eponine", "target": "Mme.Thenardier", "value": 2 },
        { "source": "Eponine", "target": "Thenardier", "value": 3 },
        { "source": "Anzelma", "target": "Eponine", "value": 2 },
        { "source": "Anzelma", "target": "Thenardier", "value": 2 },
        { "source": "Anzelma", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Woman2", "target": "Valjean", "value": 3 },
        { "source": "Woman2", "target": "Cosette", "value": 1 },
        { "source": "Woman2", "target": "Javert", "value": 1 },
        { "source": "MotherInnocent", "target": "Fauchelevent", "value": 3 },
        { "source": "MotherInnocent", "target": "Valjean", "value": 1 },
        { "source": "Gribier", "target": "Fauchelevent", "value": 2 },
        { "source": "Mme.Burgon", "target": "Jondrette", "value": 1 },
        { "source": "Gavroche", "target": "Mme.Burgon", "value": 2 },
        { "source": "Gavroche", "target": "Thenardier", "value": 1 },
        { "source": "Gavroche", "target": "Javert", "value": 1 },
        { "source": "Gavroche", "target": "Valjean", "value": 1 },
        { "source": "Gillenormand", "target": "Cosette", "value": 3 },
        { "source": "Gillenormand", "target": "Valjean", "value": 2 },
        { "source": "Magnon", "target": "Gillenormand", "value": 1 },
        { "source": "Magnon", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Mlle.Gillenormand", "target": "Gillenormand", "value": 9 },
        { "source": "Mlle.Gillenormand", "target": "Cosette", "value": 2 },
        { "source": "Mlle.Gillenormand", "target": "Valjean", "value": 2 },
        { "source": "Mme.Pontmercy", "target": "Mlle.Gillenormand", "value": 1 },
        { "source": "Mme.Pontmercy", "target": "Pontmercy", "value": 1 },
        { "source": "Mlle.Vaubois", "target": "Mlle.Gillenormand", "value": 1 },
        { "source": "Lt.Gillenormand", "target": "Mlle.Gillenormand", "value": 2 },
        { "source": "Lt.Gillenormand", "target": "Gillenormand", "value": 1 },
        { "source": "Lt.Gillenormand", "target": "Cosette", "value": 1 },
        { "source": "Marius", "target": "Mlle.Gillenormand", "value": 6 },
        { "source": "Marius", "target": "Gillenormand", "value": 12 },
        { "source": "Marius", "target": "Pontmercy", "value": 1 },
        { "source": "Marius", "target": "Lt.Gillenormand", "value": 1 },
        { "source": "Marius", "target": "Cosette", "value": 21 },
        { "source": "Marius", "target": "Valjean", "value": 19 },
        { "source": "Marius", "target": "Tholomyes", "value": 1 },
        { "source": "Marius", "target": "Thenardier", "value": 2 },
        { "source": "Marius", "target": "Eponine", "value": 5 },
        { "source": "Marius", "target": "Gavroche", "value": 4 },
        { "source": "BaronessT", "target": "Gillenormand", "value": 1 },
        { "source": "BaronessT", "target": "Marius", "value": 1 },
        { "source": "Mabeuf", "target": "Marius", "value": 1 },
        { "source": "Mabeuf", "target": "Eponine", "value": 1 },
        { "source": "Mabeuf", "target": "Gavroche", "value": 1 },
        { "source": "Enjolras", "target": "Marius", "value": 7 },
        { "source": "Enjolras", "target": "Gavroche", "value": 7 },
        { "source": "Enjolras", "target": "Javert", "value": 6 },
        { "source": "Enjolras", "target": "Mabeuf", "value": 1 },
        { "source": "Enjolras", "target": "Valjean", "value": 4 },
        { "source": "Combeferre", "target": "Enjolras", "value": 15 },
        { "source": "Combeferre", "target": "Marius", "value": 5 },
        { "source": "Combeferre", "target": "Gavroche", "value": 6 },
        { "source": "Combeferre", "target": "Mabeuf", "value": 2 },
        { "source": "Prouvaire", "target": "Gavroche", "value": 1 },
        { "source": "Prouvaire", "target": "Enjolras", "value": 4 },
        { "source": "Prouvaire", "target": "Combeferre", "value": 2 },
        { "source": "Feuilly", "target": "Gavroche", "value": 2 },
        { "source": "Feuilly", "target": "Enjolras", "value": 6 },
        { "source": "Feuilly", "target": "Prouvaire", "value": 2 },
        { "source": "Feuilly", "target": "Combeferre", "value": 5 },
        { "source": "Feuilly", "target": "Mabeuf", "value": 1 },
        { "source": "Feuilly", "target": "Marius", "value": 1 },
        { "source": "Courfeyrac", "target": "Marius", "value": 9 },
        { "source": "Courfeyrac", "target": "Enjolras", "value": 17 },
        { "source": "Courfeyrac", "target": "Combeferre", "value": 13 },
        { "source": "Courfeyrac", "target": "Gavroche", "value": 7 },
        { "source": "Courfeyrac", "target": "Mabeuf", "value": 2 },
        { "source": "Courfeyrac", "target": "Eponine", "value": 1 },
        { "source": "Courfeyrac", "target": "Feuilly", "value": 6 },
        { "source": "Courfeyrac", "target": "Prouvaire", "value": 3 },
        { "source": "Bahorel", "target": "Combeferre", "value": 5 },
        { "source": "Bahorel", "target": "Gavroche", "value": 5 },
        { "source": "Bahorel", "target": "Courfeyrac", "value": 6 },
        { "source": "Bahorel", "target": "Mabeuf", "value": 2 },
        { "source": "Bahorel", "target": "Enjolras", "value": 4 },
        { "source": "Bahorel", "target": "Feuilly", "value": 3 },
        { "source": "Bahorel", "target": "Prouvaire", "value": 2 },
        { "source": "Bahorel", "target": "Marius", "value": 1 },
        { "source": "Bossuet", "target": "Marius", "value": 5 },
        { "source": "Bossuet", "target": "Courfeyrac", "value": 12 },
        { "source": "Bossuet", "target": "Gavroche", "value": 5 },
        { "source": "Bossuet", "target": "Bahorel", "value": 4 },
        { "source": "Bossuet", "target": "Enjolras", "value": 10 },
        { "source": "Bossuet", "target": "Feuilly", "value": 6 },
        { "source": "Bossuet", "target": "Prouvaire", "value": 2 },
        { "source": "Bossuet", "target": "Combeferre", "value": 9 },
        { "source": "Bossuet", "target": "Mabeuf", "value": 1 },
        { "source": "Bossuet", "target": "Valjean", "value": 1 },
        { "source": "Joly", "target": "Bahorel", "value": 5 },
        { "source": "Joly", "target": "Bossuet", "value": 7 },
        { "source": "Joly", "target": "Gavroche", "value": 3 },
        { "source": "Joly", "target": "Courfeyrac", "value": 5 },
        { "source": "Joly", "target": "Enjolras", "value": 5 },
        { "source": "Joly", "target": "Feuilly", "value": 5 },
        { "source": "Joly", "target": "Prouvaire", "value": 2 },
        { "source": "Joly", "target": "Combeferre", "value": 5 },
        { "source": "Joly", "target": "Mabeuf", "value": 1 },
        { "source": "Joly", "target": "Marius", "value": 2 },
        { "source": "Grantaire", "target": "Bossuet", "value": 3 },
        { "source": "Grantaire", "target": "Enjolras", "value": 3 },
        { "source": "Grantaire", "target": "Combeferre", "value": 1 },
        { "source": "Grantaire", "target": "Courfeyrac", "value": 2 },
        { "source": "Grantaire", "target": "Joly", "value": 2 },
        { "source": "Grantaire", "target": "Gavroche", "value": 1 },
        { "source": "Grantaire", "target": "Bahorel", "value": 1 },
        { "source": "Grantaire", "target": "Feuilly", "value": 1 },
        { "source": "Grantaire", "target": "Prouvaire", "value": 1 },
        { "source": "MotherPlutarch", "target": "Mabeuf", "value": 3 },
        { "source": "Gueulemer", "target": "Thenardier", "value": 5 },
        { "source": "Gueulemer", "target": "Valjean", "value": 1 },
        { "source": "Gueulemer", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Gueulemer", "target": "Javert", "value": 1 },
        { "source": "Gueulemer", "target": "Gavroche", "value": 1 },
        { "source": "Gueulemer", "target": "Eponine", "value": 1 },
        { "source": "Babet", "target": "Thenardier", "value": 6 },
        { "source": "Babet", "target": "Gueulemer", "value": 6 },
        { "source": "Babet", "target": "Valjean", "value": 1 },
        { "source": "Babet", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Babet", "target": "Javert", "value": 2 },
        { "source": "Babet", "target": "Gavroche", "value": 1 },
        { "source": "Babet", "target": "Eponine", "value": 1 },
        { "source": "Claquesous", "target": "Thenardier", "value": 4 },
        { "source": "Claquesous", "target": "Babet", "value": 4 },
        { "source": "Claquesous", "target": "Gueulemer", "value": 4 },
        { "source": "Claquesous", "target": "Valjean", "value": 1 },
        { "source": "Claquesous", "target": "Mme.Thenardier", "value": 1 },
        { "source": "Claquesous", "target": "Javert", "value": 1 },
        { "source": "Claquesous", "target": "Eponine", "value": 1 },
        { "source": "Claquesous", "target": "Enjolras", "value": 1 },
        { "source": "Montparnasse", "target": "Javert", "value": 1 },
        { "source": "Montparnasse", "target": "Babet", "value": 2 },
        { "source": "Montparnasse", "target": "Gueulemer", "value": 2 },
        { "source": "Montparnasse", "target": "Claquesous", "value": 2 },
        { "source": "Montparnasse", "target": "Valjean", "value": 1 },
        { "source": "Montparnasse", "target": "Gavroche", "value": 1 },
        { "source": "Montparnasse", "target": "Eponine", "value": 1 },
        { "source": "Montparnasse", "target": "Thenardier", "value": 1 },
        { "source": "Toussaint", "target": "Cosette", "value": 2 },
        { "source": "Toussaint", "target": "Javert", "value": 1 },
        { "source": "Toussaint", "target": "Valjean", "value": 1 },
        { "source": "Child1", "target": "Gavroche", "value": 2 },
        { "source": "Child2", "target": "Gavroche", "value": 2 },
        { "source": "Child2", "target": "Child1", "value": 3 },
        { "source": "Brujon", "target": "Babet", "value": 3 },
        { "source": "Brujon", "target": "Gueulemer", "value": 3 },
        { "source": "Brujon", "target": "Thenardier", "value": 3 },
        { "source": "Brujon", "target": "Gavroche", "value": 1 },
        { "source": "Brujon", "target": "Eponine", "value": 1 },
        { "source": "Brujon", "target": "Claquesous", "value": 1 },
        { "source": "Brujon", "target": "Montparnasse", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Bossuet", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Joly", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Grantaire", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Bahorel", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Courfeyrac", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Gavroche", "value": 1 },
        { "source": "Mme.Hucheloup", "target": "Enjolras", "value": 1 }
    ]
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { "id": "65", "name": "新疆", "cp": [84.9023, 41.748], "childNum": 18 }, "geometry": { "type": "Polygon", "coordinates": [[[96.416, 42.7588], [96.416, 42.7148], [95.9766, 42.4951], [96.0645, 42.3193], [96.2402, 42.2314], [95.9766, 41.9238], [95.2734, 41.6162], [95.1855, 41.792], [94.5703, 41.4844], [94.043, 41.0889], [93.8672, 40.6934], [93.0762, 40.6494], [92.6367, 39.6387], [92.373, 39.3311], [92.373, 39.1113], [92.373, 39.0234], [90.1758, 38.4961], [90.3516, 38.2324], [90.6152, 38.3203], [90.5273, 37.8369], [91.0547, 37.4414], [91.3184, 37.0898], [90.7031, 36.7822], [90.791, 36.6064], [91.0547, 36.5186], [91.0547, 36.0791], [90.8789, 36.0352], [90, 36.2549], [89.9121, 36.0791], [89.7363, 36.0791], [89.209, 36.2988], [88.7695, 36.3428], [88.5938, 36.4746], [87.3633, 36.4307], [86.2207, 36.167], [86.1328, 35.8594], [85.6055, 35.6836], [85.0781, 35.7275], [84.1992, 35.376], [83.1445, 35.4199], [82.8809, 35.6836], [82.4414, 35.7275], [82.002, 35.332], [81.6504, 35.2441], [80.4199, 35.4199], [80.2441, 35.2881], [80.332, 35.1563], [80.2441, 35.2002], [79.8926, 34.8047], [79.8047, 34.4971], [79.1016, 34.4531], [79.0137, 34.3213], [78.2227, 34.7168], [78.0469, 35.2441], [78.0469, 35.5078], [77.4316, 35.4639], [76.8164, 35.6396], [76.5527, 35.8594], [76.2012, 35.8154], [75.9375, 36.0352], [76.0254, 36.4746], [75.8496, 36.6943], [75.498, 36.7383], [75.4102, 36.958], [75.0586, 37.002], [74.8828, 36.9141], [74.7949, 37.0459], [74.5313, 37.0898], [74.5313, 37.2217], [74.8828, 37.2217], [75.1465, 37.4414], [74.8828, 37.5732], [74.9707, 37.749], [74.8828, 38.4521], [74.3555, 38.6719], [74.1797, 38.6719], [74.0918, 38.54], [73.8281, 38.584], [73.7402, 38.8477], [73.8281, 38.9795], [73.4766, 39.375], [73.916, 39.5068], [73.916, 39.6826], [73.8281, 39.7705], [74.0039, 40.0342], [74.8828, 40.3418], [74.7949, 40.5176], [75.2344, 40.4297], [75.5859, 40.6494], [75.7617, 40.2979], [76.377, 40.3857], [76.9043, 41.001], [77.6074, 41.001], [78.1348, 41.2207], [78.1348, 41.3965], [80.1563, 42.0557], [80.2441, 42.2754], [80.1563, 42.627], [80.2441, 42.8467], [80.5078, 42.8906], [80.4199, 43.0664], [80.7715, 43.1982], [80.4199, 44.165], [80.4199, 44.6045], [79.9805, 44.8242], [79.9805, 44.9561], [81.7383, 45.3955], [82.0898, 45.2197], [82.5293, 45.2197], [82.2656, 45.6592], [83.0566, 47.2412], [83.6719, 47.0215], [84.7266, 47.0215], [84.9023, 46.8896], [85.5176, 47.0654], [85.6934, 47.2852], [85.5176, 48.1201], [85.7813, 48.4277], [86.5723, 48.5596], [86.8359, 48.8232], [86.748, 48.9551], [86.8359, 49.1309], [87.8027, 49.1748], [87.8906, 48.999], [87.7148, 48.9111], [88.0664, 48.7354], [87.9785, 48.6035], [88.5059, 48.3838], [88.6816, 48.1641], [89.1211, 47.9883], [89.5605, 48.0322], [89.7363, 47.8564], [90.0879, 47.8564], [90.3516, 47.6807], [90.5273, 47.2412], [90.8789, 46.9775], [91.0547, 46.582], [90.8789, 46.3184], [91.0547, 46.0107], [90.7031, 45.7471], [90.7031, 45.5273], [90.8789, 45.2197], [91.582, 45.0879], [93.5156, 44.9561], [94.7461, 44.3408], [95.3613, 44.2969], [95.3613, 44.0332], [95.5371, 43.9014], [95.8887, 43.2422], [96.3281, 42.9346], [96.416, 42.7588]]] } },
        { "type": "Feature", "properties": { "id": "54", "name": "西藏", "cp": [88.7695, 31.6846], "childNum": 7 }, "geometry": { "type": "Polygon", "coordinates": [[[79.0137, 34.3213], [79.1016, 34.4531], [79.8047, 34.4971], [79.8926, 34.8047], [80.2441, 35.2002], [80.332, 35.1563], [80.2441, 35.2881], [80.4199, 35.4199], [81.6504, 35.2441], [82.002, 35.332], [82.4414, 35.7275], [82.8809, 35.6836], [83.1445, 35.4199], [84.1992, 35.376], [85.0781, 35.7275], [85.6055, 35.6836], [86.1328, 35.8594], [86.2207, 36.167], [87.3633, 36.4307], [88.5938, 36.4746], [88.7695, 36.3428], [89.209, 36.2988], [89.7363, 36.0791], [89.3848, 36.0352], [89.4727, 35.9033], [89.7363, 35.7715], [89.7363, 35.4199], [89.4727, 35.376], [89.4727, 35.2441], [89.5605, 34.8926], [89.8242, 34.8486], [89.7363, 34.6729], [89.8242, 34.3652], [89.6484, 34.0137], [90.0879, 33.4863], [90.7031, 33.1348], [91.4063, 33.1348], [91.9336, 32.8271], [92.1973, 32.8271], [92.2852, 32.7393], [92.9883, 32.7393], [93.5156, 32.4756], [93.7793, 32.5635], [94.1309, 32.4316], [94.6582, 32.6074], [95.1855, 32.4316], [95.0098, 32.2998], [95.1855, 32.3438], [95.2734, 32.2119], [95.3613, 32.168], [95.3613, 31.9922], [95.4492, 31.8164], [95.8008, 31.6846], [95.9766, 31.8164], [96.1523, 31.5967], [96.2402, 31.9482], [96.5039, 31.7285], [96.8555, 31.6846], [96.7676, 31.9922], [97.2949, 32.0801], [97.3828, 32.5635], [97.7344, 32.5195], [98.1738, 32.3438], [98.4375, 31.8604], [98.877, 31.4209], [98.6133, 31.2012], [98.9648, 30.7617], [99.1406, 29.2676], [98.9648, 29.1357], [98.9648, 28.8281], [98.7891, 28.8721], [98.7891, 29.0039], [98.7012, 28.916], [98.6133, 28.5205], [98.7891, 28.3447], [98.7012, 28.2129], [98.3496, 28.125], [98.2617, 28.3887], [98.1738, 28.125], [97.5586, 28.5205], [97.2949, 28.0811], [97.3828, 27.9053], [97.0313, 27.7295], [96.5039, 28.125], [95.7129, 28.2568], [95.3613, 28.125], [95.2734, 27.9492], [94.2188, 27.5537], [93.8672, 27.0264], [93.6035, 26.9385], [92.1094, 26.8506], [92.0215, 27.4658], [91.582, 27.5537], [91.582, 27.9053], [91.4063, 28.0371], [91.0547, 27.8613], [90.7031, 28.0811], [89.8242, 28.2129], [89.6484, 28.1689], [89.1211, 27.5977], [89.1211, 27.334], [89.0332, 27.2021], [88.7695, 27.4219], [88.8574, 27.9932], [88.6816, 28.125], [88.1543, 27.9053], [87.8906, 27.9492], [87.7148, 27.8174], [87.0996, 27.8174], [86.748, 28.125], [86.5723, 28.125], [86.4844, 27.9053], [86.1328, 28.125], [86.0449, 27.9053], [85.6934, 28.3447], [85.6055, 28.2568], [85.166, 28.3447], [85.166, 28.6523], [84.9023, 28.5645], [84.4629, 28.7402], [84.2871, 28.8721], [84.1992, 29.2236], [84.1113, 29.2676], [83.584, 29.1797], [83.2324, 29.5752], [82.1777, 30.0586], [82.0898, 30.3223], [81.3867, 30.3662], [81.2109, 30.0146], [81.0352, 30.2344], [80.0684, 30.5859], [79.7168, 30.9375], [79.0137, 31.0693], [78.75, 31.333], [78.8379, 31.5967], [78.6621, 31.8164], [78.75, 31.9043], [78.4863, 32.124], [78.3984, 32.5195], [78.75, 32.6953], [78.9258, 32.3438], [79.2773, 32.5635], [79.1016, 33.1787], [78.6621, 33.6621], [78.6621, 34.1016], [78.9258, 34.1455], [79.0137, 34.3213]]] } },
        { "type": "Feature", "properties": { "id": "15", "name": "内蒙古", "cp": [117.5977, 44.3408], "childNum": 12 }, "geometry": { "type": "Polygon", "coordinates": [[[97.207, 42.8027], [99.4922, 42.583], [100.8105, 42.6709], [101.7773, 42.4951], [102.041, 42.2314], [102.7441, 42.1436], [103.3594, 41.8799], [103.8867, 41.792], [104.502, 41.8799], [104.502, 41.6602], [105.0293, 41.5723], [105.7324, 41.9238], [107.4023, 42.4512], [109.4238, 42.4512], [110.3906, 42.7588], [111.0059, 43.3301], [111.9727, 43.6816], [111.9727, 43.8135], [111.4453, 44.3848], [111.7969, 45], [111.9727, 45.0879], [113.6426, 44.7363], [114.1699, 44.9561], [114.5215, 45.3955], [115.6641, 45.4395], [116.1914, 45.7031], [116.2793, 45.9668], [116.543, 46.2744], [117.334, 46.3623], [117.4219, 46.582], [117.7734, 46.5381], [118.3008, 46.7578], [118.7402, 46.7139], [118.916, 46.7578], [119.0918, 46.6699], [119.707, 46.626], [119.9707, 46.7139], [119.707, 47.1973], [118.4766, 47.9883], [117.8613, 48.0322], [117.334, 47.6807], [116.8066, 47.9004], [116.1914, 47.8564], [115.9277, 47.6807], [115.5762, 47.9004], [115.4883, 48.1641], [115.8398, 48.252], [115.8398, 48.5596], [116.7188, 49.834], [117.7734, 49.5264], [118.5645, 49.9219], [119.2676, 50.0977], [119.3555, 50.3174], [119.1797, 50.3613], [119.5313, 50.7568], [119.5313, 50.8887], [119.707, 51.0645], [120.1465, 51.6797], [120.6738, 51.9434], [120.7617, 52.1191], [120.7617, 52.251], [120.5859, 52.3389], [120.6738, 52.5146], [120.4102, 52.6465], [120.0586, 52.6025], [120.0586, 52.7344], [120.8496, 53.2617], [121.4648, 53.3496], [121.8164, 53.042], [121.2012, 52.5586], [121.6406, 52.4268], [121.7285, 52.2949], [121.9922, 52.2949], [122.168, 52.5146], [122.6953, 52.251], [122.6074, 52.0752], [122.959, 51.3281], [123.3105, 51.2402], [123.6621, 51.3721], [124.3652, 51.2842], [124.541, 51.3721], [124.8926, 51.3721], [125.0684, 51.6357], [125.332, 51.6357], [126.0352, 51.0205], [125.7715, 50.7568], [125.7715, 50.5371], [125.332, 50.1416], [125.1563, 49.834], [125.2441, 49.1748], [124.8047, 49.1309], [124.4531, 48.1201], [124.2773, 48.5156], [122.4316, 47.373], [123.0469, 46.7139], [123.3984, 46.8896], [123.3984, 46.9775], [123.4863, 46.9775], [123.5742, 46.8457], [123.5742, 46.8896], [123.5742, 46.6699], [123.0469, 46.582], [123.2227, 46.2305], [122.7832, 46.0107], [122.6953, 45.7031], [122.4316, 45.8789], [122.2559, 45.791], [121.8164, 46.0107], [121.7285, 45.7471], [121.9043, 45.7031], [122.2559, 45.2637], [122.0801, 44.8682], [122.3438, 44.2529], [123.1348, 44.4727], [123.4863, 43.7256], [123.3105, 43.5059], [123.6621, 43.374], [123.5742, 43.0225], [123.3105, 42.9785], [123.1348, 42.8027], [122.7832, 42.7148], [122.3438, 42.8467], [122.3438, 42.6709], [121.9922, 42.7148], [121.7285, 42.4512], [121.4648, 42.4951], [120.498, 42.0996], [120.1465, 41.7041], [119.8828, 42.1875], [119.5313, 42.3633], [119.3555, 42.2754], [119.2676, 41.7041], [119.4434, 41.6162], [119.2676, 41.3086], [118.3887, 41.3086], [118.125, 41.748], [118.3008, 41.792], [118.3008, 42.0996], [118.125, 42.0557], [117.9492, 42.2314], [118.0371, 42.4072], [117.7734, 42.627], [117.5098, 42.583], [117.334, 42.4512], [116.8945, 42.4072], [116.8066, 42.0117], [116.2793, 42.0117], [116.0156, 41.792], [115.9277, 41.9238], [115.2246, 41.5723], [114.9609, 41.6162], [114.873, 42.0996], [114.5215, 42.1436], [114.1699, 41.792], [114.2578, 41.5723], [113.9063, 41.4404], [113.9941, 41.2207], [113.9063, 41.1328], [114.082, 40.7373], [114.082, 40.5176], [113.8184, 40.5176], [113.5547, 40.3418], [113.2031, 40.3857], [112.7637, 40.166], [112.3242, 40.2539], [111.9727, 39.5947], [111.4453, 39.6387], [111.3574, 39.4189], [111.0938, 39.375], [111.0938, 39.5947], [110.6543, 39.2871], [110.127, 39.4629], [110.2148, 39.2871], [109.8633, 39.2432], [109.9512, 39.1553], [108.9844, 38.3203], [109.0723, 38.0127], [108.8965, 37.9688], [108.8086, 38.0127], [108.7207, 37.7051], [108.1934, 37.6172], [107.666, 37.8809], [107.3145, 38.1006], [106.7871, 38.1885], [106.5234, 38.3203], [106.9629, 38.9795], [106.7871, 39.375], [106.3477, 39.2871], [105.9082, 38.7158], [105.8203, 37.793], [104.3262, 37.4414], [103.4473, 37.8369], [103.3594, 38.0127], [103.5352, 38.1445], [103.4473, 38.3643], [104.2383, 38.9795], [104.0625, 39.4189], [103.3594, 39.3311], [103.0078, 39.1113], [102.4805, 39.2432], [101.8652, 39.1113], [102.041, 38.8916], [101.7773, 38.6719], [101.3379, 38.7598], [101.25, 39.0234], [100.9863, 38.9355], [100.8105, 39.4189], [100.5469, 39.4189], [100.0195, 39.7705], [99.4922, 39.8584], [100.1074, 40.2539], [100.1953, 40.6494], [99.9316, 41.001], [99.2285, 40.8691], [99.0527, 40.6934], [98.9648, 40.7813], [98.7891, 40.6055], [98.5254, 40.7373], [98.6133, 40.6494], [98.3496, 40.5615], [98.3496, 40.9131], [97.4707, 41.4844], [97.8223, 41.6162], [97.8223, 41.748], [97.207, 42.8027]]] } },
        { "type": "Feature", "properties": { "id": "63", "name": "青海", "cp": [96.2402, 35.4199], "childNum": 8 }, "geometry": { "type": "Polygon", "coordinates": [[[89.7363, 36.0791], [89.9121, 36.0791], [90, 36.2549], [90.8789, 36.0352], [91.0547, 36.0791], [91.0547, 36.5186], [90.791, 36.6064], [90.7031, 36.7822], [91.3184, 37.0898], [91.0547, 37.4414], [90.5273, 37.8369], [90.6152, 38.3203], [90.3516, 38.2324], [90.1758, 38.4961], [92.373, 39.0234], [92.373, 39.1113], [93.1641, 39.1992], [93.1641, 38.9795], [93.6914, 38.9355], [93.8672, 38.7158], [94.3066, 38.7598], [94.5703, 38.3643], [95.0098, 38.4082], [95.4492, 38.2764], [95.7129, 38.3643], [96.2402, 38.1006], [96.416, 38.2324], [96.6797, 38.1885], [96.6797, 38.4521], [97.1191, 38.584], [97.0313, 39.1992], [98.1738, 38.8037], [98.3496, 39.0234], [98.6133, 38.9355], [98.7891, 39.0674], [99.1406, 38.9355], [99.8438, 38.3643], [100.1953, 38.2764], [100.0195, 38.4521], [100.1074, 38.4961], [100.459, 38.2764], [100.7227, 38.2324], [101.1621, 37.8369], [101.5137, 37.8809], [101.7773, 37.6172], [101.9531, 37.7051], [102.1289, 37.4414], [102.5684, 37.1777], [102.4805, 36.958], [102.6563, 36.8262], [102.5684, 36.7383], [102.832, 36.3428], [103.0078, 36.2549], [102.9199, 36.0791], [102.9199, 35.9033], [102.6563, 35.7715], [102.832, 35.5957], [102.4805, 35.5957], [102.3047, 35.4199], [102.3926, 35.2002], [101.9531, 34.8486], [101.9531, 34.6289], [102.2168, 34.4092], [102.1289, 34.2773], [101.6895, 34.1016], [100.9863, 34.3652], [100.8105, 34.2773], [101.25, 33.6621], [101.5137, 33.7061], [101.6016, 33.5303], [101.7773, 33.5303], [101.6895, 33.3105], [101.7773, 33.2227], [101.6016, 33.1348], [101.1621, 33.2227], [101.25, 32.6953], [100.7227, 32.6514], [100.7227, 32.5195], [100.3711, 32.7393], [100.1074, 32.6514], [100.1074, 32.8711], [99.8438, 33.0029], [99.7559, 32.7393], [99.2285, 32.915], [99.2285, 33.0469], [98.877, 33.1787], [98.4375, 34.0576], [97.8223, 34.1895], [97.6465, 34.1016], [97.7344, 33.9258], [97.3828, 33.8818], [97.4707, 33.5742], [97.7344, 33.3984], [97.3828, 32.8711], [97.4707, 32.6953], [97.7344, 32.5195], [97.3828, 32.5635], [97.2949, 32.0801], [96.7676, 31.9922], [96.8555, 31.6846], [96.5039, 31.7285], [96.2402, 31.9482], [96.1523, 31.5967], [95.9766, 31.8164], [95.8008, 31.6846], [95.4492, 31.8164], [95.3613, 31.9922], [95.3613, 32.168], [95.2734, 32.2119], [95.1855, 32.3438], [95.0098, 32.2998], [95.1855, 32.4316], [94.6582, 32.6074], [94.1309, 32.4316], [93.7793, 32.5635], [93.5156, 32.4756], [92.9883, 32.7393], [92.2852, 32.7393], [92.1973, 32.8271], [91.9336, 32.8271], [91.4063, 33.1348], [90.7031, 33.1348], [90.0879, 33.4863], [89.6484, 34.0137], [89.8242, 34.3652], [89.7363, 34.6729], [89.8242, 34.8486], [89.5605, 34.8926], [89.4727, 35.2441], [89.4727, 35.376], [89.7363, 35.4199], [89.7363, 35.7715], [89.4727, 35.9033], [89.3848, 36.0352], [89.7363, 36.0791]]] } },
        { "type": "Feature", "properties": { "id": "51", "name": "四川", "cp": [102.9199, 30.1904], "childNum": 21 }, "geometry": { "type": "Polygon", "coordinates": [[[101.7773, 33.5303], [101.8652, 33.5742], [101.9531, 33.4424], [101.8652, 33.0908], [102.4805, 33.4424], [102.2168, 33.9258], [102.9199, 34.3213], [103.0957, 34.1895], [103.1836, 33.7939], [104.1504, 33.6182], [104.2383, 33.3984], [104.4141, 33.3105], [104.3262, 33.2227], [104.4141, 33.0469], [104.3262, 32.8711], [104.4141, 32.7393], [105.2051, 32.6074], [105.3809, 32.7393], [105.3809, 32.8711], [105.4688, 32.915], [105.5566, 32.7393], [106.084, 32.8711], [106.084, 32.7393], [106.3477, 32.6514], [107.0508, 32.6953], [107.1387, 32.4756], [107.2266, 32.4316], [107.4023, 32.5195], [108.0176, 32.168], [108.2813, 32.2559], [108.5449, 32.2119], [108.3691, 32.168], [108.2813, 31.9043], [108.5449, 31.6846], [108.1934, 31.5088], [107.9297, 30.8496], [107.4902, 30.8496], [107.4023, 30.7617], [107.4902, 30.6299], [107.0508, 30.0146], [106.7871, 30.0146], [106.6113, 30.3223], [106.2598, 30.1904], [105.8203, 30.4541], [105.6445, 30.2783], [105.5566, 30.1025], [105.7324, 29.8828], [105.293, 29.5313], [105.4688, 29.3115], [105.7324, 29.2676], [105.8203, 28.96], [106.2598, 28.8721], [106.3477, 28.5205], [105.9961, 28.7402], [105.6445, 28.4326], [105.9082, 28.125], [106.1719, 28.125], [106.3477, 27.8174], [105.6445, 27.6416], [105.5566, 27.7734], [105.293, 27.7295], [105.2051, 27.9932], [105.0293, 28.0811], [104.8535, 27.9053], [104.4141, 27.9492], [104.3262, 28.0371], [104.4141, 28.125], [104.4141, 28.2568], [104.2383, 28.4326], [104.4141, 28.6084], [103.8867, 28.6523], [103.7988, 28.3008], [103.4473, 28.125], [103.4473, 27.7734], [102.9199, 27.29], [103.0078, 26.3672], [102.6563, 26.1914], [102.5684, 26.3672], [102.1289, 26.1035], [101.8652, 26.0596], [101.6016, 26.2354], [101.6895, 26.3672], [101.4258, 26.5869], [101.4258, 26.8066], [101.4258, 26.7188], [101.1621, 27.0264], [101.1621, 27.1582], [100.7227, 27.8613], [100.3711, 27.8174], [100.2832, 27.7295], [100.0195, 28.125], [100.1953, 28.3447], [99.668, 28.8281], [99.4043, 28.5205], [99.4043, 28.1689], [99.2285, 28.3008], [99.1406, 29.2676], [98.9648, 30.7617], [98.6133, 31.2012], [98.877, 31.4209], [98.4375, 31.8604], [98.1738, 32.3438], [97.7344, 32.5195], [97.4707, 32.6953], [97.3828, 32.8711], [97.7344, 33.3984], [97.4707, 33.5742], [97.3828, 33.8818], [97.7344, 33.9258], [97.6465, 34.1016], [97.8223, 34.1895], [98.4375, 34.0576], [98.877, 33.1787], [99.2285, 33.0469], [99.2285, 32.915], [99.7559, 32.7393], [99.8438, 33.0029], [100.1074, 32.8711], [100.1074, 32.6514], [100.3711, 32.7393], [100.7227, 32.5195], [100.7227, 32.6514], [101.25, 32.6953], [101.1621, 33.2227], [101.6016, 33.1348], [101.7773, 33.2227], [101.6895, 33.3105], [101.7773, 33.5303]]] } },
        { "type": "Feature", "properties": { "id": "23", "name": "黑龙江", "cp": [128.1445, 48.5156], "childNum": 13 }, "geometry": { "type": "Polygon", "coordinates": [[[121.4648, 53.3496], [123.6621, 53.5693], [124.8926, 53.0859], [125.0684, 53.2178], [125.5957, 53.0859], [125.6836, 52.9102], [126.123, 52.7783], [126.0352, 52.6025], [126.2109, 52.5146], [126.3867, 52.2949], [126.3867, 52.207], [126.5625, 52.1631], [126.4746, 51.9434], [126.9141, 51.3721], [126.8262, 51.2842], [127.002, 51.3281], [126.9141, 51.1084], [127.2656, 50.7568], [127.3535, 50.2734], [127.6172, 50.2295], [127.5293, 49.8779], [127.793, 49.6143], [128.7598, 49.5703], [129.1113, 49.3506], [129.4629, 49.4385], [130.2539, 48.8672], [130.6934, 48.8672], [130.5176, 48.6475], [130.8691, 48.2959], [130.6934, 48.1201], [131.0449, 47.6807], [132.5391, 47.7246], [132.627, 47.9443], [133.0664, 48.1201], [133.5059, 48.1201], [134.209, 48.3838], [135.0879, 48.4277], [134.7363, 48.252], [134.5605, 47.9883], [134.7363, 47.6807], [134.5605, 47.4609], [134.3848, 47.4609], [134.209, 47.2852], [134.209, 47.1533], [133.8574, 46.5381], [133.9453, 46.2744], [133.5059, 45.835], [133.418, 45.5713], [133.2422, 45.5273], [133.0664, 45.1318], [132.8906, 45.0439], [131.9238, 45.3516], [131.5723, 45.0439], [131.0449, 44.8682], [131.3086, 44.0771], [131.2207, 43.7256], [131.3086, 43.4619], [130.8691, 43.418], [130.5176, 43.6377], [130.3418, 43.9893], [129.9902, 43.8574], [129.9023, 44.0332], [129.8145, 43.9014], [129.2871, 43.8135], [129.1992, 43.5938], [128.8477, 43.5498], [128.4961, 44.165], [128.4082, 44.4727], [128.0566, 44.3408], [128.0566, 44.1211], [127.7051, 44.1211], [127.5293, 44.6045], [127.0898, 44.6045], [127.002, 44.7803], [127.0898, 45], [126.9141, 45.1318], [126.5625, 45.2637], [126.0352, 45.1758], [125.7715, 45.3076], [125.6836, 45.5273], [125.0684, 45.3955], [124.8926, 45.5273], [124.3652, 45.4395], [124.0137, 45.7471], [123.9258, 46.2305], [123.2227, 46.2305], [123.0469, 46.582], [123.5742, 46.6699], [123.5742, 46.8896], [123.5742, 46.8457], [123.4863, 46.9775], [123.3984, 46.9775], [123.3984, 46.8896], [123.0469, 46.7139], [122.4316, 47.373], [124.2773, 48.5156], [124.4531, 48.1201], [124.8047, 49.1309], [125.2441, 49.1748], [125.1563, 49.834], [125.332, 50.1416], [125.7715, 50.5371], [125.7715, 50.7568], [126.0352, 51.0205], [125.332, 51.6357], [125.0684, 51.6357], [124.8926, 51.3721], [124.541, 51.3721], [124.3652, 51.2842], [123.6621, 51.3721], [123.3105, 51.2402], [122.959, 51.3281], [122.6074, 52.0752], [122.6953, 52.251], [122.168, 52.5146], [121.9922, 52.2949], [121.7285, 52.2949], [121.6406, 52.4268], [121.2012, 52.5586], [121.8164, 53.042], [121.4648, 53.3496]]] } },
        { "type": "Feature", "properties": { "id": "62", "name": "甘肃", "cp": [95.7129, 40.166], "childNum": 14 }, "geometry": { "type": "Polygon", "coordinates": [[[96.416, 42.7148], [97.207, 42.8027], [97.8223, 41.748], [97.8223, 41.6162], [97.4707, 41.4844], [98.3496, 40.9131], [98.3496, 40.5615], [98.6133, 40.6494], [98.5254, 40.7373], [98.7891, 40.6055], [98.9648, 40.7813], [99.0527, 40.6934], [99.2285, 40.8691], [99.9316, 41.001], [100.1953, 40.6494], [100.1074, 40.2539], [99.4922, 39.8584], [100.0195, 39.7705], [100.5469, 39.4189], [100.8105, 39.4189], [100.9863, 38.9355], [101.25, 39.0234], [101.3379, 38.7598], [101.7773, 38.6719], [102.041, 38.8916], [101.8652, 39.1113], [102.4805, 39.2432], [103.0078, 39.1113], [103.3594, 39.3311], [104.0625, 39.4189], [104.2383, 38.9795], [103.4473, 38.3643], [103.5352, 38.1445], [103.3594, 38.0127], [103.4473, 37.8369], [104.3262, 37.4414], [104.5898, 37.4414], [104.5898, 37.2217], [104.8535, 37.2217], [105.293, 36.8262], [105.2051, 36.6943], [105.4688, 36.123], [105.293, 35.9912], [105.3809, 35.7715], [105.7324, 35.7275], [105.8203, 35.5518], [105.9961, 35.4639], [105.9082, 35.4199], [105.9961, 35.4199], [106.084, 35.376], [106.2598, 35.4199], [106.3477, 35.2441], [106.5234, 35.332], [106.4355, 35.6836], [106.6992, 35.6836], [106.9629, 35.8154], [106.875, 36.123], [106.5234, 36.2549], [106.5234, 36.4746], [106.4355, 36.5625], [106.6113, 36.7822], [106.6113, 37.0898], [107.3145, 37.0898], [107.3145, 36.9141], [108.7207, 36.3428], [108.6328, 35.9912], [108.5449, 35.8594], [108.6328, 35.5518], [108.5449, 35.2881], [107.7539, 35.2881], [107.7539, 35.1123], [107.8418, 35.0244], [107.666, 34.9365], [107.2266, 34.8926], [106.9629, 35.0684], [106.6113, 35.0684], [106.5234, 34.7607], [106.3477, 34.585], [106.6992, 34.3213], [106.5234, 34.2773], [106.6113, 34.1455], [106.4355, 33.9258], [106.5234, 33.5303], [105.9961, 33.6182], [105.7324, 33.3984], [105.9961, 33.1787], [105.9082, 33.0029], [105.4688, 32.915], [105.3809, 32.8711], [105.3809, 32.7393], [105.2051, 32.6074], [104.4141, 32.7393], [104.3262, 32.8711], [104.4141, 33.0469], [104.3262, 33.2227], [104.4141, 33.3105], [104.2383, 33.3984], [104.1504, 33.6182], [103.1836, 33.7939], [103.0957, 34.1895], [102.9199, 34.3213], [102.2168, 33.9258], [102.4805, 33.4424], [101.8652, 33.0908], [101.9531, 33.4424], [101.8652, 33.5742], [101.7773, 33.5303], [101.6016, 33.5303], [101.5137, 33.7061], [101.25, 33.6621], [100.8105, 34.2773], [100.9863, 34.3652], [101.6895, 34.1016], [102.1289, 34.2773], [102.2168, 34.4092], [101.9531, 34.6289], [101.9531, 34.8486], [102.3926, 35.2002], [102.3047, 35.4199], [102.4805, 35.5957], [102.832, 35.5957], [102.6563, 35.7715], [102.9199, 35.9033], [102.9199, 36.0791], [103.0078, 36.2549], [102.832, 36.3428], [102.5684, 36.7383], [102.6563, 36.8262], [102.4805, 36.958], [102.5684, 37.1777], [102.1289, 37.4414], [101.9531, 37.7051], [101.7773, 37.6172], [101.5137, 37.8809], [101.1621, 37.8369], [100.7227, 38.2324], [100.459, 38.2764], [100.1074, 38.4961], [100.0195, 38.4521], [100.1953, 38.2764], [99.8438, 38.3643], [99.1406, 38.9355], [98.7891, 39.0674], [98.6133, 38.9355], [98.3496, 39.0234], [98.1738, 38.8037], [97.0313, 39.1992], [97.1191, 38.584], [96.6797, 38.4521], [96.6797, 38.1885], [96.416, 38.2324], [96.2402, 38.1006], [95.7129, 38.3643], [95.4492, 38.2764], [95.0098, 38.4082], [94.5703, 38.3643], [94.3066, 38.7598], [93.8672, 38.7158], [93.6914, 38.9355], [93.1641, 38.9795], [93.1641, 39.1992], [92.373, 39.1113], [92.373, 39.3311], [92.6367, 39.6387], [93.0762, 40.6494], [93.8672, 40.6934], [94.043, 41.0889], [94.5703, 41.4844], [95.1855, 41.792], [95.2734, 41.6162], [95.9766, 41.9238], [96.2402, 42.2314], [96.0645, 42.3193], [95.9766, 42.4951], [96.416, 42.7148]]] } },
        { "type": "Feature", "properties": { "id": "53", "name": "云南", "cp": [101.8652, 25.1807], "childNum": 16 }, "geometry": { "type": "Polygon", "coordinates": [[[98.1738, 28.125], [98.2617, 28.3887], [98.3496, 28.125], [98.7012, 28.2129], [98.7891, 28.3447], [98.6133, 28.5205], [98.7012, 28.916], [98.7891, 29.0039], [98.7891, 28.8721], [98.9648, 28.8281], [98.9648, 29.1357], [99.1406, 29.2676], [99.2285, 28.3008], [99.4043, 28.1689], [99.4043, 28.5205], [99.668, 28.8281], [100.1953, 28.3447], [100.0195, 28.125], [100.2832, 27.7295], [100.3711, 27.8174], [100.7227, 27.8613], [101.1621, 27.1582], [101.1621, 27.0264], [101.4258, 26.7188], [101.4258, 26.8066], [101.4258, 26.5869], [101.6895, 26.3672], [101.6016, 26.2354], [101.8652, 26.0596], [102.1289, 26.1035], [102.5684, 26.3672], [102.6563, 26.1914], [103.0078, 26.3672], [102.9199, 27.29], [103.4473, 27.7734], [103.4473, 28.125], [103.7988, 28.3008], [103.8867, 28.6523], [104.4141, 28.6084], [104.2383, 28.4326], [104.4141, 28.2568], [104.4141, 28.125], [104.3262, 28.0371], [104.4141, 27.9492], [104.8535, 27.9053], [105.0293, 28.0811], [105.2051, 27.9932], [105.293, 27.7295], [105.2051, 27.3779], [104.5898, 27.334], [104.4141, 27.4658], [104.1504, 27.2461], [103.8867, 27.4219], [103.623, 27.0264], [103.7109, 26.9824], [103.7109, 26.7627], [103.8867, 26.543], [104.4141, 26.6748], [104.6777, 26.4111], [104.3262, 25.708], [104.8535, 25.2246], [104.5898, 25.0488], [104.6777, 24.9609], [104.502, 24.7412], [104.6777, 24.3457], [104.7656, 24.4775], [105.0293, 24.4336], [105.2051, 24.082], [105.4688, 24.0381], [105.5566, 24.126], [105.9961, 24.126], [106.1719, 23.8184], [106.1719, 23.5547], [105.6445, 23.4229], [105.5566, 23.2031], [105.293, 23.3789], [104.8535, 23.1592], [104.7656, 22.8516], [104.3262, 22.6758], [104.1504, 22.8076], [103.9746, 22.5439], [103.623, 22.7637], [103.5352, 22.5879], [103.3594, 22.8076], [103.0957, 22.4561], [102.4805, 22.7637], [102.3047, 22.4121], [101.8652, 22.3682], [101.7773, 22.5], [101.6016, 22.1924], [101.8652, 21.6211], [101.7773, 21.1377], [101.6016, 21.2256], [101.25, 21.1816], [101.1621, 21.7529], [100.6348, 21.4453], [100.1074, 21.4893], [99.9316, 22.0605], [99.2285, 22.1484], [99.4043, 22.5879], [99.3164, 22.7197], [99.4922, 23.0713], [98.877, 23.2031], [98.7012, 23.9502], [98.877, 24.126], [98.1738, 24.082], [97.7344, 23.8623], [97.5586, 23.9063], [97.7344, 24.126], [97.6465, 24.4336], [97.5586, 24.4336], [97.5586, 24.7412], [97.7344, 24.8291], [97.8223, 25.2686], [98.1738, 25.4004], [98.1738, 25.6201], [98.3496, 25.5762], [98.5254, 25.8398], [98.7012, 25.8838], [98.6133, 26.0596], [98.7012, 26.1475], [98.7891, 26.5869], [98.7012, 27.5098], [98.5254, 27.6416], [98.3496, 27.5098], [98.1738, 28.125]]] } },
        { "type": "Feature", "properties": { "id": "45", "name": "广西", "cp": [108.2813, 23.6426], "childNum": 14 }, "geometry": { "type": "Polygon", "coordinates": [[[104.502, 24.7412], [104.6777, 24.6094], [105.2051, 24.9609], [105.9961, 24.6533], [106.1719, 24.7852], [106.1719, 24.9609], [106.875, 25.1807], [107.0508, 25.2686], [106.9629, 25.4883], [107.2266, 25.6201], [107.4902, 25.2246], [107.7539, 25.2246], [107.8418, 25.1367], [108.1055, 25.2246], [108.1934, 25.4443], [108.3691, 25.5322], [108.6328, 25.3125], [108.6328, 25.5762], [109.0723, 25.5322], [108.9844, 25.752], [109.3359, 25.708], [109.5117, 26.0156], [109.7754, 25.8838], [109.9512, 26.1914], [110.2148, 25.9717], [110.5664, 26.3232], [111.1816, 26.3232], [111.2695, 26.2354], [111.2695, 25.8838], [111.4453, 25.8398], [111.0059, 25.0049], [111.0938, 24.9609], [111.3574, 25.1367], [111.5332, 24.6533], [111.709, 24.7852], [112.0605, 24.7412], [111.8848, 24.6533], [112.0605, 24.3457], [111.8848, 24.2139], [111.8848, 23.9941], [111.7969, 23.8184], [111.6211, 23.8184], [111.6211, 23.6865], [111.3574, 23.4668], [111.4453, 23.0273], [111.2695, 22.8076], [110.7422, 22.5439], [110.7422, 22.2803], [110.6543, 22.1484], [110.3027, 22.1484], [110.3027, 21.8848], [109.9512, 21.8408], [109.8633, 21.665], [109.7754, 21.6211], [109.7754, 21.4014], [109.5996, 21.4453], [109.1602, 21.3574], [109.248, 20.874], [109.0723, 20.9619], [109.0723, 21.5332], [108.7207, 21.5332], [108.6328, 21.665], [108.2813, 21.4893], [107.8418, 21.6211], [107.4023, 21.6211], [107.0508, 21.7969], [107.0508, 21.9287], [106.6992, 22.0166], [106.6113, 22.4121], [106.7871, 22.7637], [106.6992, 22.8955], [105.9082, 22.9395], [105.5566, 23.0713], [105.5566, 23.2031], [105.6445, 23.4229], [106.1719, 23.5547], [106.1719, 23.8184], [105.9961, 24.126], [105.5566, 24.126], [105.4688, 24.0381], [105.2051, 24.082], [105.0293, 24.4336], [104.7656, 24.4775], [104.6777, 24.3457], [104.502, 24.7412]]] } },
        { "type": "Feature", "properties": { "id": "43", "name": "湖南", "cp": [111.5332, 27.3779], "childNum": 14 }, "geometry": { "type": "Polygon", "coordinates": [[[109.248, 28.4766], [109.248, 29.1357], [109.5117, 29.6191], [109.6875, 29.6191], [109.7754, 29.751], [110.4785, 29.6631], [110.6543, 29.751], [110.4785, 30.0146], [110.8301, 30.1465], [111.7969, 29.9268], [112.2363, 29.5313], [112.5, 29.6191], [112.6758, 29.5752], [112.9395, 29.7949], [113.0273, 29.751], [112.9395, 29.4873], [113.0273, 29.4434], [113.5547, 29.8389], [113.5547, 29.707], [113.7305, 29.5752], [113.6426, 29.3115], [113.7305, 29.0918], [113.9063, 29.0479], [114.1699, 28.8281], [114.082, 28.5645], [114.2578, 28.3447], [113.7305, 27.9492], [113.6426, 27.5977], [113.6426, 27.3779], [113.8184, 27.29], [113.7305, 27.1143], [113.9063, 26.9385], [113.9063, 26.6309], [114.082, 26.5869], [113.9941, 26.1914], [114.2578, 26.1475], [113.9941, 26.0596], [113.9063, 25.4443], [113.6426, 25.3125], [113.2031, 25.5322], [112.8516, 25.3564], [113.0273, 25.2246], [113.0273, 24.9609], [112.8516, 24.917], [112.5879, 25.1367], [112.2363, 25.1807], [112.1484, 24.873], [112.0605, 24.7412], [111.709, 24.7852], [111.5332, 24.6533], [111.3574, 25.1367], [111.0938, 24.9609], [111.0059, 25.0049], [111.4453, 25.8398], [111.2695, 25.8838], [111.2695, 26.2354], [111.1816, 26.3232], [110.5664, 26.3232], [110.2148, 25.9717], [109.9512, 26.1914], [109.7754, 25.8838], [109.5117, 26.0156], [109.4238, 26.2793], [109.248, 26.3232], [109.4238, 26.5869], [109.3359, 26.7188], [109.5117, 26.8066], [109.5117, 27.0264], [109.3359, 27.1582], [108.8965, 27.0264], [108.8086, 27.1143], [109.4238, 27.5977], [109.3359, 27.9053], [109.3359, 28.2568], [109.248, 28.4766]]] } },
        { "type": "Feature", "properties": { "id": "61", "name": "陕西", "cp": [109.5996, 35.6396], "childNum": 10 }, "geometry": { "type": "Polygon", "coordinates": [[[105.4688, 32.915], [105.9082, 33.0029], [105.9961, 33.1787], [105.7324, 33.3984], [105.9961, 33.6182], [106.5234, 33.5303], [106.4355, 33.9258], [106.6113, 34.1455], [106.5234, 34.2773], [106.6992, 34.3213], [106.3477, 34.585], [106.5234, 34.7607], [106.6113, 35.0684], [106.9629, 35.0684], [107.2266, 34.8926], [107.666, 34.9365], [107.8418, 35.0244], [107.7539, 35.1123], [107.7539, 35.2881], [108.5449, 35.2881], [108.6328, 35.5518], [108.5449, 35.8594], [108.6328, 35.9912], [108.7207, 36.3428], [107.3145, 36.9141], [107.3145, 37.0898], [107.3145, 37.6172], [107.666, 37.8809], [108.1934, 37.6172], [108.7207, 37.7051], [108.8086, 38.0127], [108.8965, 37.9688], [109.0723, 38.0127], [108.9844, 38.3203], [109.9512, 39.1553], [109.8633, 39.2432], [110.2148, 39.2871], [110.127, 39.4629], [110.6543, 39.2871], [111.0938, 39.5947], [111.0938, 39.375], [111.1816, 39.2432], [110.918, 38.7158], [110.8301, 38.4961], [110.4785, 38.1885], [110.4785, 37.9688], [110.8301, 37.6611], [110.3906, 37.002], [110.4785, 36.123], [110.5664, 35.6396], [110.2148, 34.8926], [110.2148, 34.6729], [110.3906, 34.585], [110.4785, 34.2334], [110.6543, 34.1455], [110.6543, 33.8379], [111.0059, 33.5303], [111.0059, 33.2666], [110.7422, 33.1348], [110.5664, 33.2666], [110.3027, 33.1787], [109.5996, 33.2666], [109.4238, 33.1348], [109.7754, 33.0469], [109.7754, 32.915], [110.127, 32.7393], [110.127, 32.6074], [109.6875, 32.6074], [109.5117, 32.4316], [109.5996, 31.7285], [109.248, 31.7285], [109.0723, 31.9482], [108.5449, 32.2119], [108.2813, 32.2559], [108.0176, 32.168], [107.4023, 32.5195], [107.2266, 32.4316], [107.1387, 32.4756], [107.0508, 32.6953], [106.3477, 32.6514], [106.084, 32.7393], [106.084, 32.8711], [105.5566, 32.7393], [105.4688, 32.915]]] } },
        { "type": "Feature", "properties": { "id": "44", "name": "广东", "cp": [113.4668, 22.8076], "childNum": 21 }, "geometry": { "type": "Polygon", "coordinates": [[[109.7754, 21.4014], [109.7754, 21.6211], [109.8633, 21.665], [109.9512, 21.8408], [110.3027, 21.8848], [110.3027, 22.1484], [110.6543, 22.1484], [110.7422, 22.2803], [110.7422, 22.5439], [111.2695, 22.8076], [111.4453, 23.0273], [111.3574, 23.4668], [111.6211, 23.6865], [111.6211, 23.8184], [111.7969, 23.8184], [111.8848, 23.9941], [111.8848, 24.2139], [112.0605, 24.3457], [111.8848, 24.6533], [112.0605, 24.7412], [112.1484, 24.873], [112.2363, 25.1807], [112.5879, 25.1367], [112.8516, 24.917], [113.0273, 24.9609], [113.0273, 25.2246], [112.8516, 25.3564], [113.2031, 25.5322], [113.6426, 25.3125], [113.9063, 25.4443], [113.9941, 25.2686], [114.6094, 25.4004], [114.7852, 25.2686], [114.6973, 25.1367], [114.4336, 24.9609], [114.1699, 24.6973], [114.4336, 24.5215], [115.4004, 24.7852], [115.8398, 24.5654], [115.752, 24.7852], [115.9277, 24.917], [116.2793, 24.7852], [116.3672, 24.873], [116.543, 24.6094], [116.7188, 24.6533], [116.9824, 24.1699], [116.9824, 23.9063], [117.1582, 23.5547], [117.334, 23.2471], [116.8945, 23.3789], [116.6309, 23.1152], [116.543, 22.8516], [115.9277, 22.7197], [115.6641, 22.7637], [115.5762, 22.6318], [115.0488, 22.6758], [114.6094, 22.3682], [114.3457, 22.5439], [113.9941, 22.5], [113.8184, 22.1924], [114.3457, 22.1484], [114.4336, 22.0166], [114.082, 21.9287], [113.9941, 21.7969], [113.5547, 22.0166], [113.1152, 21.8408], [112.9395, 21.5771], [112.4121, 21.4453], [112.2363, 21.5332], [111.5332, 21.4893], [111.2695, 21.3574], [110.7422, 21.3574], [110.6543, 21.2256], [110.7422, 20.918], [110.4785, 20.874], [110.6543, 20.2588], [110.5664, 20.2588], [110.3906, 20.127], [110.0391, 20.127], [109.8633, 20.127], [109.8633, 20.3027], [109.5996, 20.918], [109.7754, 21.4014], [109.7754, 21.4014]], [[113.5986, 22.1649], [113.6096, 22.1265], [113.5547, 22.11], [113.5437, 22.2034], [113.5767, 22.2034], [113.5986, 22.1649]]] } },
        { "type": "Feature", "properties": { "id": "22", "name": "吉林", "cp": [126.4746, 43.5938], "childNum": 9 }, "geometry": { "type": "Polygon", "coordinates": [[[123.2227, 46.2305], [123.9258, 46.2305], [124.0137, 45.7471], [124.3652, 45.4395], [124.8926, 45.5273], [125.0684, 45.3955], [125.6836, 45.5273], [125.7715, 45.3076], [126.0352, 45.1758], [126.5625, 45.2637], [126.9141, 45.1318], [127.0898, 45], [127.002, 44.7803], [127.0898, 44.6045], [127.5293, 44.6045], [127.7051, 44.1211], [128.0566, 44.1211], [128.0566, 44.3408], [128.4082, 44.4727], [128.4961, 44.165], [128.8477, 43.5498], [129.1992, 43.5938], [129.2871, 43.8135], [129.8145, 43.9014], [129.9023, 44.0332], [129.9902, 43.8574], [130.3418, 43.9893], [130.5176, 43.6377], [130.8691, 43.418], [131.3086, 43.4619], [131.3086, 43.3301], [131.1328, 42.9346], [130.4297, 42.7148], [130.6055, 42.6709], [130.6055, 42.4512], [130.2539, 42.7588], [130.2539, 42.8906], [130.166, 42.9785], [129.9023, 43.0225], [129.7266, 42.4951], [129.375, 42.4512], [128.9355, 42.0117], [128.0566, 42.0117], [128.3203, 41.5723], [128.1445, 41.3525], [127.0898, 41.5283], [127.1777, 41.5723], [126.9141, 41.792], [126.6504, 41.6602], [126.4746, 41.3965], [126.123, 40.957], [125.6836, 40.8691], [125.5957, 40.9131], [125.7715, 41.2207], [125.332, 41.6602], [125.332, 41.9678], [125.4199, 42.0996], [125.332, 42.1436], [124.8926, 42.8027], [124.8926, 43.0664], [124.7168, 43.0664], [124.4531, 42.8467], [124.2773, 43.2422], [123.8379, 43.4619], [123.6621, 43.374], [123.3105, 43.5059], [123.4863, 43.7256], [123.1348, 44.4727], [122.3438, 44.2529], [122.0801, 44.8682], [122.2559, 45.2637], [121.9043, 45.7031], [121.7285, 45.7471], [121.8164, 46.0107], [122.2559, 45.791], [122.4316, 45.8789], [122.6953, 45.7031], [122.7832, 46.0107], [123.2227, 46.2305]]] } },
        { "type": "Feature", "properties": { "id": "13", "name": "河北", "cp": [115.4004, 37.9688], "childNum": 11 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[114.5215, 39.5068], [114.3457, 39.8584], [113.9941, 39.9902], [114.5215, 40.3418], [114.3457, 40.3857], [114.2578, 40.6055], [114.082, 40.7373], [113.9063, 41.1328], [113.9941, 41.2207], [113.9063, 41.4404], [114.2578, 41.5723], [114.1699, 41.792], [114.5215, 42.1436], [114.873, 42.0996], [114.9609, 41.6162], [115.2246, 41.5723], [115.9277, 41.9238], [116.0156, 41.792], [116.2793, 42.0117], [116.8066, 42.0117], [116.8945, 42.4072], [117.334, 42.4512], [117.5098, 42.583], [117.7734, 42.627], [118.0371, 42.4072], [117.9492, 42.2314], [118.125, 42.0557], [118.3008, 42.0996], [118.3008, 41.792], [118.125, 41.748], [118.3887, 41.3086], [119.2676, 41.3086], [118.8281, 40.8252], [119.2676, 40.5176], [119.5313, 40.5615], [119.707, 40.1221], [119.8828, 39.9463], [119.5313, 39.6826], [119.4434, 39.4189], [118.916, 39.0674], [118.4766, 38.9355], [118.125, 39.0234], [118.0371, 39.1992], [118.0371, 39.2432], [117.8613, 39.4189], [117.9492, 39.5947], [117.6855, 39.5947], [117.5098, 39.7705], [117.5098, 39.9902], [117.6855, 39.9902], [117.6855, 40.0781], [117.4219, 40.21], [117.2461, 40.5176], [117.4219, 40.6494], [116.9824, 40.6934], [116.6309, 41.0449], [116.3672, 40.9131], [116.4551, 40.7813], [116.1914, 40.7813], [116.1035, 40.6055], [115.752, 40.5615], [115.9277, 40.2539], [115.4004, 39.9463], [115.4883, 39.6387], [115.752, 39.5068], [116.1914, 39.5947], [116.3672, 39.4629], [116.543, 39.5947], [116.8066, 39.5947], [116.8945, 39.1113], [116.7188, 38.9355], [116.7188, 38.8037], [117.2461, 38.54], [117.5977, 38.6279], [117.9492, 38.3203], [117.4219, 37.8369], [116.8066, 37.8369], [116.4551, 37.4854], [116.2793, 37.5732], [116.2793, 37.3535], [116.0156, 37.3535], [115.752, 36.9141], [115.3125, 36.5186], [115.4883, 36.167], [115.3125, 36.0791], [115.1367, 36.2109], [114.9609, 36.0791], [114.873, 36.123], [113.7305, 36.3428], [113.4668, 36.6504], [113.7305, 36.8701], [113.7305, 37.1338], [114.1699, 37.6611], [113.9941, 37.7051], [113.8184, 38.1445], [113.5547, 38.2764], [113.5547, 38.54], [113.8184, 38.8037], [113.8184, 38.9355], [113.9063, 39.0234], [114.3457, 39.0674], [114.5215, 39.5068]]], [[[117.2461, 40.0781], [117.1582, 39.8145], [117.1582, 39.6387], [116.8945, 39.6826], [116.8945, 39.8145], [116.8066, 39.9902], [117.2461, 40.0781]]]] } },
        { "type": "Feature", "properties": { "id": "42", "name": "湖北", "cp": [112.2363, 31.1572], "childNum": 17 }, "geometry": { "type": "Polygon", "coordinates": [[[110.2148, 31.1572], [110.127, 31.377], [109.6875, 31.5527], [109.7754, 31.6846], [109.5996, 31.7285], [109.5117, 32.4316], [109.6875, 32.6074], [110.127, 32.6074], [110.127, 32.7393], [109.7754, 32.915], [109.7754, 33.0469], [109.4238, 33.1348], [109.5996, 33.2666], [110.3027, 33.1787], [110.5664, 33.2666], [110.7422, 33.1348], [111.0059, 33.2666], [111.5332, 32.6074], [112.3242, 32.3438], [113.2031, 32.4316], [113.4668, 32.2998], [113.7305, 32.4316], [113.8184, 31.8604], [113.9941, 31.7725], [114.1699, 31.8604], [114.5215, 31.7725], [114.6094, 31.5527], [114.7852, 31.4648], [115.1367, 31.5967], [115.2246, 31.4209], [115.4004, 31.4209], [115.5762, 31.2012], [116.0156, 31.0254], [115.752, 30.6738], [116.1035, 30.1904], [116.1035, 29.8389], [115.9277, 29.707], [115.4883, 29.7949], [114.873, 29.3994], [114.2578, 29.3555], [113.9063, 29.0479], [113.7305, 29.0918], [113.6426, 29.3115], [113.7305, 29.5752], [113.5547, 29.707], [113.5547, 29.8389], [113.0273, 29.4434], [112.9395, 29.4873], [113.0273, 29.751], [112.9395, 29.7949], [112.6758, 29.5752], [112.5, 29.6191], [112.2363, 29.5313], [111.7969, 29.9268], [110.8301, 30.1465], [110.4785, 30.0146], [110.6543, 29.751], [110.4785, 29.6631], [109.7754, 29.751], [109.6875, 29.6191], [109.5117, 29.6191], [109.248, 29.1357], [109.0723, 29.3555], [108.9844, 29.3115], [108.6328, 29.8389], [108.457, 29.7949], [108.5449, 30.2344], [108.457, 30.4102], [108.6328, 30.5859], [108.8086, 30.498], [109.0723, 30.6299], [109.1602, 30.542], [109.248, 30.6299], [109.4238, 30.542], [109.8633, 30.8936], [110.0391, 30.8057], [110.2148, 31.1572]]] } },
        { "type": "Feature", "properties": { "id": "52", "name": "贵州", "cp": [106.6113, 26.9385], "childNum": 9 }, "geometry": { "type": "Polygon", "coordinates": [[[104.1504, 27.2461], [104.4141, 27.4658], [104.5898, 27.334], [105.2051, 27.3779], [105.293, 27.7295], [105.5566, 27.7734], [105.6445, 27.6416], [106.3477, 27.8174], [106.1719, 28.125], [105.9082, 28.125], [105.6445, 28.4326], [105.9961, 28.7402], [106.3477, 28.5205], [106.5234, 28.5645], [106.4355, 28.7842], [106.5234, 28.7842], [106.6113, 28.6523], [106.6113, 28.5205], [106.6992, 28.4766], [106.875, 28.7842], [107.4023, 28.8721], [107.4023, 29.1797], [107.5781, 29.2236], [107.8418, 29.1357], [107.8418, 29.0039], [108.2813, 29.0918], [108.3691, 28.6523], [108.5449, 28.6523], [108.5449, 28.3887], [108.7207, 28.4766], [108.7207, 28.2129], [109.0723, 28.2129], [109.248, 28.4766], [109.3359, 28.2568], [109.3359, 27.9053], [109.4238, 27.5977], [108.8086, 27.1143], [108.8965, 27.0264], [109.3359, 27.1582], [109.5117, 27.0264], [109.5117, 26.8066], [109.3359, 26.7188], [109.4238, 26.5869], [109.248, 26.3232], [109.4238, 26.2793], [109.5117, 26.0156], [109.3359, 25.708], [108.9844, 25.752], [109.0723, 25.5322], [108.6328, 25.5762], [108.6328, 25.3125], [108.3691, 25.5322], [108.1934, 25.4443], [108.1055, 25.2246], [107.8418, 25.1367], [107.7539, 25.2246], [107.4902, 25.2246], [107.2266, 25.6201], [106.9629, 25.4883], [107.0508, 25.2686], [106.875, 25.1807], [106.1719, 24.9609], [106.1719, 24.7852], [105.9961, 24.6533], [105.2051, 24.9609], [104.6777, 24.6094], [104.502, 24.7412], [104.6777, 24.9609], [104.5898, 25.0488], [104.8535, 25.2246], [104.3262, 25.708], [104.6777, 26.4111], [104.4141, 26.6748], [103.8867, 26.543], [103.7109, 26.7627], [103.7109, 26.9824], [103.623, 27.0264], [103.8867, 27.4219], [104.1504, 27.2461]]] } },
        { "type": "Feature", "properties": { "id": "37", "name": "山东", "cp": [118.7402, 36.4307], "childNum": 17 }, "geometry": { "type": "Polygon", "coordinates": [[[115.4883, 36.167], [115.3125, 36.5186], [115.752, 36.9141], [116.0156, 37.3535], [116.2793, 37.3535], [116.2793, 37.5732], [116.4551, 37.4854], [116.8066, 37.8369], [117.4219, 37.8369], [117.9492, 38.3203], [118.125, 38.1445], [118.916, 38.1445], [119.3555, 37.6611], [119.0039, 37.5293], [119.0039, 37.3535], [119.3555, 37.1338], [119.707, 37.1338], [119.8828, 37.3975], [120.498, 37.8369], [120.5859, 38.1445], [120.9375, 38.4521], [121.0254, 37.8369], [121.2012, 37.6611], [121.9043, 37.4854], [122.168, 37.6172], [122.2559, 37.4854], [122.6074, 37.4854], [122.6953, 37.3535], [122.6074, 36.9141], [122.4316, 36.7822], [121.8164, 36.8701], [121.7285, 36.6943], [121.1133, 36.6064], [121.1133, 36.4307], [121.377, 36.2549], [120.7617, 36.167], [120.9375, 35.8594], [120.6738, 36.0352], [119.707, 35.4639], [119.9707, 34.9805], [119.3555, 35.0244], [119.2676, 35.1123], [118.916, 35.0244], [118.7402, 34.7168], [118.4766, 34.6729], [118.3887, 34.4092], [118.2129, 34.4092], [118.125, 34.6289], [117.9492, 34.6729], [117.5977, 34.4531], [117.334, 34.585], [117.2461, 34.4531], [116.8066, 34.9365], [116.4551, 34.8926], [116.3672, 34.6289], [116.1914, 34.585], [115.5762, 34.585], [115.4004, 34.8486], [114.7852, 35.0684], [115.0488, 35.376], [115.2246, 35.4199], [115.4883, 35.7275], [116.1035, 36.0791], [115.3125, 35.8154], [115.4883, 36.167]]] } },
        { "type": "Feature", "properties": { "id": "36", "name": "江西", "cp": [116.0156, 27.29], "childNum": 11 }, "geometry": { "type": "Polygon", "coordinates": [[[114.2578, 28.3447], [114.082, 28.5645], [114.1699, 28.8281], [113.9063, 29.0479], [114.2578, 29.3555], [114.873, 29.3994], [115.4883, 29.7949], [115.9277, 29.707], [116.1035, 29.8389], [116.2793, 29.7949], [116.7188, 30.0586], [116.8945, 29.9268], [116.7188, 29.751], [116.7188, 29.6191], [117.1582, 29.707], [117.0703, 29.8389], [117.1582, 29.9268], [117.5098, 29.6191], [118.0371, 29.5752], [118.2129, 29.3994], [118.0371, 29.1797], [118.0371, 29.0479], [118.3887, 28.7842], [118.4766, 28.3447], [118.4766, 28.3008], [118.3008, 28.0811], [117.7734, 27.8174], [117.5098, 27.9932], [116.9824, 27.6416], [117.1582, 27.29], [117.0703, 27.1143], [116.543, 26.8066], [116.6309, 26.4551], [116.3672, 26.2354], [116.4551, 26.1035], [116.1914, 25.8838], [116.0156, 25.2686], [115.8398, 25.2246], [115.9277, 24.917], [115.752, 24.7852], [115.8398, 24.5654], [115.4004, 24.7852], [114.4336, 24.5215], [114.1699, 24.6973], [114.4336, 24.9609], [114.6973, 25.1367], [114.7852, 25.2686], [114.6094, 25.4004], [113.9941, 25.2686], [113.9063, 25.4443], [113.9941, 26.0596], [114.2578, 26.1475], [113.9941, 26.1914], [114.082, 26.5869], [113.9063, 26.6309], [113.9063, 26.9385], [113.7305, 27.1143], [113.8184, 27.29], [113.6426, 27.3779], [113.6426, 27.5977], [113.7305, 27.9492], [114.2578, 28.3447]]] } },
        { "type": "Feature", "properties": { "id": "41", "name": "河南", "cp": [113.4668, 33.8818], "childNum": 17 }, "geometry": { "type": "Polygon", "coordinates": [[[110.3906, 34.585], [110.8301, 34.6289], [111.1816, 34.8047], [111.5332, 34.8486], [111.7969, 35.0684], [112.0605, 35.0684], [112.0605, 35.2881], [112.7637, 35.2002], [113.1152, 35.332], [113.6426, 35.6836], [113.7305, 36.3428], [114.873, 36.123], [114.9609, 36.0791], [115.1367, 36.2109], [115.3125, 36.0791], [115.4883, 36.167], [115.3125, 35.8154], [116.1035, 36.0791], [115.4883, 35.7275], [115.2246, 35.4199], [115.0488, 35.376], [114.7852, 35.0684], [115.4004, 34.8486], [115.5762, 34.585], [116.1914, 34.585], [116.1914, 34.4092], [116.543, 34.2773], [116.6309, 33.9258], [116.1914, 33.7061], [116.0156, 33.9697], [115.6641, 34.0576], [115.5762, 33.9258], [115.5762, 33.6621], [115.4004, 33.5303], [115.3125, 33.1787], [114.873, 33.1348], [114.873, 33.0029], [115.1367, 32.8711], [115.2246, 32.6074], [115.5762, 32.4316], [115.8398, 32.5195], [115.9277, 31.7725], [115.4883, 31.6846], [115.4004, 31.4209], [115.2246, 31.4209], [115.1367, 31.5967], [114.7852, 31.4648], [114.6094, 31.5527], [114.5215, 31.7725], [114.1699, 31.8604], [113.9941, 31.7725], [113.8184, 31.8604], [113.7305, 32.4316], [113.4668, 32.2998], [113.2031, 32.4316], [112.3242, 32.3438], [111.5332, 32.6074], [111.0059, 33.2666], [111.0059, 33.5303], [110.6543, 33.8379], [110.6543, 34.1455], [110.4785, 34.2334], [110.3906, 34.585]]] } },
        { "type": "Feature", "properties": { "id": "21", "name": "辽宁", "cp": [122.3438, 41.0889], "childNum": 14 }, "geometry": { "type": "Polygon", "coordinates": [[[119.2676, 41.3086], [119.4434, 41.6162], [119.2676, 41.7041], [119.3555, 42.2754], [119.5313, 42.3633], [119.8828, 42.1875], [120.1465, 41.7041], [120.498, 42.0996], [121.4648, 42.4951], [121.7285, 42.4512], [121.9922, 42.7148], [122.3438, 42.6709], [122.3438, 42.8467], [122.7832, 42.7148], [123.1348, 42.8027], [123.3105, 42.9785], [123.5742, 43.0225], [123.6621, 43.374], [123.8379, 43.4619], [124.2773, 43.2422], [124.4531, 42.8467], [124.7168, 43.0664], [124.8926, 43.0664], [124.8926, 42.8027], [125.332, 42.1436], [125.4199, 42.0996], [125.332, 41.9678], [125.332, 41.6602], [125.7715, 41.2207], [125.5957, 40.9131], [125.6836, 40.8691], [124.541, 40.21], [124.1016, 39.6826], [123.3984, 39.6826], [123.1348, 39.4189], [123.1348, 39.0234], [122.0801, 39.0234], [121.5527, 38.7158], [121.1133, 38.6719], [120.9375, 38.9795], [121.377, 39.1992], [121.2012, 39.5508], [122.0801, 40.3857], [121.9922, 40.6934], [121.7285, 40.8252], [121.2012, 40.8252], [120.5859, 40.21], [119.8828, 39.9463], [119.707, 40.1221], [119.5313, 40.5615], [119.2676, 40.5176], [118.8281, 40.8252], [119.2676, 41.3086]]] } },
        { "type": "Feature", "properties": { "id": "14", "name": "山西", "cp": [112.4121, 37.6611], "childNum": 11 }, "geometry": { "type": "Polygon", "coordinates": [[[110.918, 38.7158], [111.1816, 39.2432], [111.0938, 39.375], [111.3574, 39.4189], [111.4453, 39.6387], [111.9727, 39.5947], [112.3242, 40.2539], [112.7637, 40.166], [113.2031, 40.3857], [113.5547, 40.3418], [113.8184, 40.5176], [114.082, 40.5176], [114.082, 40.7373], [114.2578, 40.6055], [114.3457, 40.3857], [114.5215, 40.3418], [113.9941, 39.9902], [114.3457, 39.8584], [114.5215, 39.5068], [114.3457, 39.0674], [113.9063, 39.0234], [113.8184, 38.9355], [113.8184, 38.8037], [113.5547, 38.54], [113.5547, 38.2764], [113.8184, 38.1445], [113.9941, 37.7051], [114.1699, 37.6611], [113.7305, 37.1338], [113.7305, 36.8701], [113.4668, 36.6504], [113.7305, 36.3428], [113.6426, 35.6836], [113.1152, 35.332], [112.7637, 35.2002], [112.0605, 35.2881], [112.0605, 35.0684], [111.7969, 35.0684], [111.5332, 34.8486], [111.1816, 34.8047], [110.8301, 34.6289], [110.3906, 34.585], [110.2148, 34.6729], [110.2148, 34.8926], [110.5664, 35.6396], [110.4785, 36.123], [110.3906, 37.002], [110.8301, 37.6611], [110.4785, 37.9688], [110.4785, 38.1885], [110.8301, 38.4961], [110.918, 38.7158]]] } },
        { "type": "Feature", "properties": { "id": "34", "name": "安徽", "cp": [117.2461, 32.0361], "childNum": 17 }, "geometry": { "type": "Polygon", "coordinates": [[[116.6309, 33.9258], [116.543, 34.2773], [116.1914, 34.4092], [116.1914, 34.585], [116.3672, 34.6289], [116.8945, 34.4092], [117.1582, 34.0576], [117.5977, 34.0137], [117.7734, 33.7061], [118.125, 33.75], [117.9492, 33.2227], [118.0371, 33.1348], [118.2129, 33.2227], [118.3008, 32.7832], [118.7402, 32.7393], [118.916, 32.959], [119.1797, 32.8271], [119.1797, 32.4756], [118.5645, 32.5635], [118.6523, 32.2119], [118.4766, 32.168], [118.3887, 31.9482], [118.916, 31.5527], [118.7402, 31.377], [118.8281, 31.2451], [119.3555, 31.2891], [119.4434, 31.1572], [119.6191, 31.1133], [119.6191, 31.0693], [119.4434, 30.6738], [119.2676, 30.6299], [119.3555, 30.4102], [118.916, 30.3223], [118.916, 29.9707], [118.7402, 29.707], [118.2129, 29.3994], [118.0371, 29.5752], [117.5098, 29.6191], [117.1582, 29.9268], [117.0703, 29.8389], [117.1582, 29.707], [116.7188, 29.6191], [116.7188, 29.751], [116.8945, 29.9268], [116.7188, 30.0586], [116.2793, 29.7949], [116.1035, 29.8389], [116.1035, 30.1904], [115.752, 30.6738], [116.0156, 31.0254], [115.5762, 31.2012], [115.4004, 31.4209], [115.4883, 31.6846], [115.9277, 31.7725], [115.8398, 32.5195], [115.5762, 32.4316], [115.2246, 32.6074], [115.1367, 32.8711], [114.873, 33.0029], [114.873, 33.1348], [115.3125, 33.1787], [115.4004, 33.5303], [115.5762, 33.6621], [115.5762, 33.9258], [115.6641, 34.0576], [116.0156, 33.9697], [116.1914, 33.7061], [116.6309, 33.9258]]] } },
        { "type": "Feature", "properties": { "id": "35", "name": "福建", "cp": [118.3008, 25.9277], "childNum": 9 }, "geometry": { "type": "Polygon", "coordinates": [[[118.4766, 28.3008], [118.8281, 28.2568], [118.7402, 28.0371], [118.916, 27.4658], [119.2676, 27.4219], [119.6191, 27.6855], [119.7949, 27.29], [120.2344, 27.4219], [120.4102, 27.1582], [120.7617, 27.0264], [120.6738, 26.8945], [120.2344, 26.8506], [120.2344, 26.7188], [120.4102, 26.6748], [120.498, 26.3672], [120.2344, 26.2793], [120.4102, 26.1475], [120.0586, 26.1914], [119.9707, 25.9277], [119.7949, 25.9277], [119.9707, 25.4004], [119.7949, 25.2686], [119.5313, 25.1367], [119.4434, 25.0049], [119.2676, 25.0928], [118.916, 24.8291], [118.6523, 24.5215], [118.4766, 24.5215], [118.4766, 24.4336], [118.2129, 24.3457], [118.2129, 24.1699], [117.8613, 23.9941], [117.7734, 23.7744], [117.5098, 23.5986], [117.1582, 23.5547], [116.9824, 23.9063], [116.9824, 24.1699], [116.7188, 24.6533], [116.543, 24.6094], [116.3672, 24.873], [116.2793, 24.7852], [115.9277, 24.917], [115.8398, 25.2246], [116.0156, 25.2686], [116.1914, 25.8838], [116.4551, 26.1035], [116.3672, 26.2354], [116.6309, 26.4551], [116.543, 26.8066], [117.0703, 27.1143], [117.1582, 27.29], [116.9824, 27.6416], [117.5098, 27.9932], [117.7734, 27.8174], [118.3008, 28.0811], [118.4766, 28.3008]]] } },
        { "type": "Feature", "properties": { "id": "33", "name": "浙江", "cp": [120.498, 29.0918], "childNum": 11 }, "geometry": { "type": "Polygon", "coordinates": [[[118.2129, 29.3994], [118.7402, 29.707], [118.916, 29.9707], [118.916, 30.3223], [119.3555, 30.4102], [119.2676, 30.6299], [119.4434, 30.6738], [119.6191, 31.0693], [119.6191, 31.1133], [119.9707, 31.1572], [120.498, 30.8057], [120.9375, 31.0254], [121.2891, 30.6738], [121.9922, 30.8057], [122.6953, 30.8936], [122.8711, 30.7178], [122.959, 30.1465], [122.6074, 30.1025], [122.6074, 29.9268], [122.168, 29.5313], [122.3438, 28.8721], [121.9922, 28.8721], [121.9922, 28.4326], [121.7285, 28.3447], [121.7285, 28.2129], [121.4648, 28.2129], [121.5527, 28.0371], [121.2891, 27.9492], [121.1133, 27.4219], [120.6738, 27.334], [120.6738, 27.1582], [120.9375, 27.0264], [120.7617, 27.0264], [120.4102, 27.1582], [120.2344, 27.4219], [119.7949, 27.29], [119.6191, 27.6855], [119.2676, 27.4219], [118.916, 27.4658], [118.7402, 28.0371], [118.8281, 28.2568], [118.4766, 28.3008], [118.4766, 28.3447], [118.3887, 28.7842], [118.0371, 29.0479], [118.0371, 29.1797], [118.2129, 29.3994]]] } },
        { "type": "Feature", "properties": { "id": "32", "name": "江苏", "cp": [120.0586, 32.915], "childNum": 13 }, "geometry": { "type": "Polygon", "coordinates": [[[116.3672, 34.6289], [116.4551, 34.8926], [116.8066, 34.9365], [117.2461, 34.4531], [117.334, 34.585], [117.5977, 34.4531], [117.9492, 34.6729], [118.125, 34.6289], [118.2129, 34.4092], [118.3887, 34.4092], [118.4766, 34.6729], [118.7402, 34.7168], [118.916, 35.0244], [119.2676, 35.1123], [119.3555, 35.0244], [119.3555, 34.8486], [119.707, 34.585], [120.3223, 34.3652], [120.9375, 33.0469], [121.0254, 32.6514], [121.377, 32.4756], [121.4648, 32.168], [121.9043, 31.9922], [121.9922, 31.6846], [121.9922, 31.5967], [121.2012, 31.8604], [121.1133, 31.7285], [121.377, 31.5088], [121.2012, 31.4648], [120.9375, 31.0254], [120.498, 30.8057], [119.9707, 31.1572], [119.6191, 31.1133], [119.4434, 31.1572], [119.3555, 31.2891], [118.8281, 31.2451], [118.7402, 31.377], [118.916, 31.5527], [118.3887, 31.9482], [118.4766, 32.168], [118.6523, 32.2119], [118.5645, 32.5635], [119.1797, 32.4756], [119.1797, 32.8271], [118.916, 32.959], [118.7402, 32.7393], [118.3008, 32.7832], [118.2129, 33.2227], [118.0371, 33.1348], [117.9492, 33.2227], [118.125, 33.75], [117.7734, 33.7061], [117.5977, 34.0137], [117.1582, 34.0576], [116.8945, 34.4092], [116.3672, 34.6289]]] } },
        { "type": "Feature", "properties": { "id": "50", "name": "重庆", "cp": [107.7539, 30.1904], "childNum": 40 }, "geometry": { "type": "Polygon", "coordinates": [[[108.5449, 31.6846], [108.2813, 31.9043], [108.3691, 32.168], [108.5449, 32.2119], [109.0723, 31.9482], [109.248, 31.7285], [109.5996, 31.7285], [109.7754, 31.6846], [109.6875, 31.5527], [110.127, 31.377], [110.2148, 31.1572], [110.0391, 30.8057], [109.8633, 30.8936], [109.4238, 30.542], [109.248, 30.6299], [109.1602, 30.542], [109.0723, 30.6299], [108.8086, 30.498], [108.6328, 30.5859], [108.457, 30.4102], [108.5449, 30.2344], [108.457, 29.7949], [108.6328, 29.8389], [108.9844, 29.3115], [109.0723, 29.3555], [109.248, 29.1357], [109.248, 28.4766], [109.0723, 28.2129], [108.7207, 28.2129], [108.7207, 28.4766], [108.5449, 28.3887], [108.5449, 28.6523], [108.3691, 28.6523], [108.2813, 29.0918], [107.8418, 29.0039], [107.8418, 29.1357], [107.5781, 29.2236], [107.4023, 29.1797], [107.4023, 28.8721], [106.875, 28.7842], [106.6992, 28.4766], [106.6113, 28.5205], [106.6113, 28.6523], [106.5234, 28.7842], [106.4355, 28.7842], [106.5234, 28.5645], [106.3477, 28.5205], [106.2598, 28.8721], [105.8203, 28.96], [105.7324, 29.2676], [105.4688, 29.3115], [105.293, 29.5313], [105.7324, 29.8828], [105.5566, 30.1025], [105.6445, 30.2783], [105.8203, 30.4541], [106.2598, 30.1904], [106.6113, 30.3223], [106.7871, 30.0146], [107.0508, 30.0146], [107.4902, 30.6299], [107.4023, 30.7617], [107.4902, 30.8496], [107.9297, 30.8496], [108.1934, 31.5088], [108.5449, 31.6846]]] } },
        { "type": "Feature", "properties": { "id": "64", "name": "宁夏", "cp": [105.9961, 37.3096], "childNum": 5 }, "geometry": { "type": "Polygon", "coordinates": [[[104.3262, 37.4414], [105.8203, 37.793], [105.9082, 38.7158], [106.3477, 39.2871], [106.7871, 39.375], [106.9629, 38.9795], [106.5234, 38.3203], [106.7871, 38.1885], [107.3145, 38.1006], [107.666, 37.8809], [107.3145, 37.6172], [107.3145, 37.0898], [106.6113, 37.0898], [106.6113, 36.7822], [106.4355, 36.5625], [106.5234, 36.4746], [106.5234, 36.2549], [106.875, 36.123], [106.9629, 35.8154], [106.6992, 35.6836], [106.4355, 35.6836], [106.5234, 35.332], [106.3477, 35.2441], [106.2598, 35.4199], [106.084, 35.376], [105.9961, 35.4199], [106.084, 35.4639], [105.9961, 35.4639], [105.8203, 35.5518], [105.7324, 35.7275], [105.3809, 35.7715], [105.293, 35.9912], [105.4688, 36.123], [105.2051, 36.6943], [105.293, 36.8262], [104.8535, 37.2217], [104.5898, 37.2217], [104.5898, 37.4414], [104.3262, 37.4414]]] } },
        { "type": "Feature", "properties": { "id": "46", "name": "海南", "cp": [109.9512, 19.2041], "childNum": 18 }, "geometry": { "type": "Polygon", "coordinates": [[[108.6328, 19.3799], [109.0723, 19.6436], [109.248, 19.9512], [109.5996, 20.0391], [110.0391, 20.127], [110.3906, 20.127], [110.5664, 20.2588], [110.6543, 20.2588], [111.0938, 19.9512], [111.2695, 19.9951], [110.6543, 19.1602], [110.5664, 18.6768], [110.2148, 18.5889], [110.0391, 18.3691], [109.8633, 18.3691], [109.6875, 18.1055], [108.9844, 18.2813], [108.6328, 18.457], [108.6328, 19.3799]]] } },
        { "type": "Feature", "properties": { "id": "71", "name": "台湾", "cp": [121.0254, 23.5986], "childNum": 1 }, "geometry": { "type": "Polygon", "coordinates": [[[121.9043, 25.0488], [121.9922, 25.0049], [121.8164, 24.7412], [121.9043, 24.5654], [121.6406, 24.0381], [121.377, 23.1152], [121.0254, 22.6758], [120.8496, 22.0605], [120.7617, 21.9287], [120.6738, 22.3242], [120.2344, 22.5879], [120.0586, 23.0713], [120.1465, 23.6865], [121.0254, 25.0488], [121.5527, 25.3125], [121.9043, 25.0488]]] } },
        { "type": "Feature", "properties": { "id": "11", "name": "北京", "cp": [116.4551, 40.2539], "childNum": 19 }, "geometry": { "type": "Polygon", "coordinates": [[[117.4219, 40.21], [117.334, 40.1221], [117.2461, 40.0781], [116.8066, 39.9902], [116.8945, 39.8145], [116.8945, 39.6826], [116.8066, 39.5947], [116.543, 39.5947], [116.3672, 39.4629], [116.1914, 39.5947], [115.752, 39.5068], [115.4883, 39.6387], [115.4004, 39.9463], [115.9277, 40.2539], [115.752, 40.5615], [116.1035, 40.6055], [116.1914, 40.7813], [116.4551, 40.7813], [116.3672, 40.9131], [116.6309, 41.0449], [116.9824, 40.6934], [117.4219, 40.6494], [117.2461, 40.5176], [117.4219, 40.21]]] } },
        { "type": "Feature", "properties": { "id": "12", "name": "天津", "cp": [117.4219, 39.4189], "childNum": 18 }, "geometry": { "type": "Polygon", "coordinates": [[[116.8066, 39.5947], [116.8945, 39.6826], [117.1582, 39.6387], [117.1582, 39.8145], [117.2461, 40.0781], [117.334, 40.1221], [117.4219, 40.21], [117.6855, 40.0781], [117.6855, 39.9902], [117.5098, 39.9902], [117.5098, 39.7705], [117.6855, 39.5947], [117.9492, 39.5947], [117.8613, 39.4189], [118.0371, 39.2432], [118.0371, 39.1992], [117.8613, 39.1113], [117.5977, 38.6279], [117.2461, 38.54], [116.7188, 38.8037], [116.7188, 38.9355], [116.8945, 39.1113], [116.8066, 39.5947]]] } },
        { "type": "Feature", "properties": { "id": "31", "name": "上海", "cp": [121.4648, 31.2891], "childNum": 19 }, "geometry": { "type": "Polygon", "coordinates": [[[120.9375, 31.0254], [121.2012, 31.4648], [121.377, 31.5088], [121.1133, 31.7285], [121.2012, 31.8604], [121.9922, 31.5967], [121.9043, 31.1572], [121.9922, 30.8057], [121.2891, 30.6738], [120.9375, 31.0254]]] } },
        { "type": "Feature", "properties": { "id": "81", "name": "香港", "cp": [114.2578, 22.3242], "childNum": 1 }, "geometry": { "type": "Polygon", "coordinates": [[[114.6094, 22.4121], [114.5215, 22.1484], [114.3457, 22.1484], [113.9063, 22.1484], [113.8184, 22.1924], [113.9063, 22.4121], [114.1699, 22.5439], [114.3457, 22.5439], [114.4336, 22.5439], [114.4336, 22.4121], [114.6094, 22.4121]]] } },
        { "type": "Feature", "properties": { "id": "82", "name": "澳门", "cp": [113.5547, 22.1484], "childNum": 1 }, "geometry": { "type": "Polygon", "coordinates": [[[113.5986, 22.1649], [113.6096, 22.1265], [113.5547, 22.11], [113.5437, 22.2034], [113.5767, 22.2034], [113.5986, 22.1649]]] } }
    ]
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    nodes: [
        { "id": "1", "value": "10", "name": "北京市", "longitude": "116.46", "latitude": "39.92" },
        { "id": "2", "value": "12", "name": "上海市", "longitude": "121.48", "latitude": "31.22" },
        { "id": "3", "value": "7", "name": "石家庄", "longitude": "114.48", "latitude": "38.03" },
        { "id": "4", "value": "8", "name": "杭州", "longitude": "120.19", "latitude": "30.26" }
    ]
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map