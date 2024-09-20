function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
        };
    }
    return _get.apply(this, arguments);
}

function warn(msg) {
    console.error("[Glide warn]: ".concat(msg));
}

function toInt(value) {
    return parseInt(value);
}

function toFloat(value) {
    return parseFloat(value);
}

function isString(value) {
    return typeof value === 'string';
}

function isObject(value) {
    var type = _typeof(value);
    return type === 'function' || type === 'object' && !!value;
}

function isFunction(value) {
    return typeof value === 'function';
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isArray(value) {
    return value.constructor === Array;
}

function mount(glide, extensions, events) {
    var components = {};
    for (var name in extensions) {
        if (isFunction(extensions[name])) {
            components[name] = extensions[name](glide, components, events);
        } else {
            warn('Extension must be a function');
        }
    }
    for (var _name in components) {
        if (isFunction(components[_name].mount)) {
            components[_name].mount();
        }
    }
    return components;
}

function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function(r, k) {
        r[k] = obj[k];
        return r[k], r;
    }, {});
}

function mergeOptions(defaults, settings) {
    var options = Object.assign({}, defaults, settings);
    if (settings.hasOwnProperty('classes')) {
        options.classes = Object.assign({}, defaults.classes, settings.classes);
        var properties = ['direction', 'type', 'slide', 'arrow', 'nav'];
        properties.forEach(function(property) {
            if (settings.classes.hasOwnProperty(property)) {
                options.classes[property] = _objectSpread2(_objectSpread2({}, defaults.classes[property]), settings.classes[property]);
            }
        });
    }
    if (settings.hasOwnProperty('breakpoints')) {
        options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
    }
    return options;
}
var EventsBus = function() {
    function EventsBus() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, EventsBus);
        this.events = events;
        this.hop = events.hasOwnProperty;
    }
    _createClass(EventsBus, [{
        key: "on",
        value: function on(event, handler) {
            if (isArray(event)) {
                for (var i = 0; i < event.length; i++) {
                    this.on(event[i], handler);
                }
                return;
            }
            if (!this.hop.call(this.events, event)) {
                this.events[event] = [];
            }
            var index = this.events[event].push(handler) - 1;
            return {
                remove: function remove() {
                    delete this.events[event][index];
                }
            };
        }
    }, {
        key: "emit",
        value: function emit(event, context) {
            if (isArray(event)) {
                for (var i = 0; i < event.length; i++) {
                    this.emit(event[i], context);
                }
                return;
            }
            if (!this.hop.call(this.events, event)) {
                return;
            }
            this.events[event].forEach(function(item) {
                item(context || {});
            });
        }
    }]);
    return EventsBus;
}();
var Glide$1 = function() {
    function Glide(selector) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _classCallCheck(this, Glide);
        this._c = {};
        this._t = [];
        this._e = new EventsBus();
        this.disabled = false;
        this.selector = selector;
        this.settings = mergeOptions(defaults, options);
        this.index = this.settings.startAt;
    }
    _createClass(Glide, [{
        key: "mount",
        value: function mount$1() {
            var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this._e.emit('mount.before');
            if (isObject(extensions)) {
                this._c = mount(this, extensions, this._e);
            } else {
                warn('You need to provide a object on `mount()`');
            }
            this._e.emit('mount.after');
            return this;
        }
    }, {
        key: "mutate",
        value: function mutate() {
            var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            if (isArray(transformers)) {
                this._t = transformers;
            } else {
                warn('You need to provide a array on `mutate()`');
            }
            return this;
        }
    }, {
        key: "update",
        value: function update() {
            var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.settings = mergeOptions(this.settings, settings);
            if (settings.hasOwnProperty('startAt')) {
                this.index = settings.startAt;
            }
            this._e.emit('update');
            return this;
        }
    }, {
        key: "go",
        value: function go(pattern) {
            this._c.Run.make(pattern);
            return this;
        }
    }, {
        key: "move",
        value: function move(distance) {
            this._c.Transition.disable();
            this._c.Move.make(distance);
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._e.emit('destroy');
            return this;
        }
    }, {
        key: "play",
        value: function play() {
            var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            if (interval) {
                this.settings.autoplay = interval;
            }
            this._e.emit('play');
            return this;
        }
    }, {
        key: "pause",
        value: function pause() {
            this._e.emit('pause');
            return this;
        }
    }, {
        key: "disable",
        value: function disable() {
            this.disabled = true;
            return this;
        }
    }, {
        key: "enable",
        value: function enable() {
            this.disabled = false;
            return this;
        }
    }, {
        key: "on",
        value: function on(event, handler) {
            this._e.on(event, handler);
            return this;
        }
    }, {
        key: "isType",
        value: function isType(name) {
            return this.settings.type === name;
        }
    }, {
        key: "settings",
        get: function get() {
            return this._o;
        },
        set: function set(o) {
            if (isObject(o)) {
                this._o = o;
            } else {
                warn('Options must be an `object` instance.');
            }
        }
    }, {
        key: "index",
        get: function get() {
            return this._i;
        },
        set: function set(i) {
            this._i = toInt(i);
        }
    }, {
        key: "type",
        get: function get() {
            return this.settings.type;
        }
    }, {
        key: "disabled",
        get: function get() {
            return this._d;
        },
        set: function set(status) {
            this._d = !!status;
        }
    }]);
    return Glide;
}();

function Run(Glide, Components, Events) {
    var Run = {
        mount: function mount() {
            this._o = false;
        },
        make: function make(move) {
            var _this = this;
            if (!Glide.disabled) {
                !Glide.settings.waitForTransition || Glide.disable();
                this.move = move;
                Events.emit('run.before', this.move);
                this.calculate();
                Events.emit('run', this.move);
                Components.Transition.after(function() {
                    if (_this.isStart()) {
                        Events.emit('run.start', _this.move);
                    }
                    if (_this.isEnd()) {
                        Events.emit('run.end', _this.move);
                    }
                    if (_this.isOffset()) {
                        _this._o = false;
                        Events.emit('run.offset', _this.move);
                    }
                    Events.emit('run.after', _this.move);
                    Glide.enable();
                });
            }
        },
        calculate: function calculate() {
            var move = this.move,
                length = this.length;
            var steps = move.steps,
                direction = move.direction;
            var viewSize = 1;
            if (direction === '=') {
                if (Glide.settings.bound && toInt(steps) > length) {
                    Glide.index = length;
                    return;
                }
                Glide.index = steps;
                return;
            }
            if (direction === '>' && steps === '>') {
                Glide.index = length;
                return;
            }
            if (direction === '<' && steps === '<') {
                Glide.index = 0;
                return;
            }
            if (direction === '|') {
                viewSize = Glide.settings.perView || 1;
            }
            if (direction === '>' || direction === '|' && steps === '>') {
                var index = calculateForwardIndex(viewSize);
                if (index > length) {
                    this._o = true;
                }
                Glide.index = normalizeForwardIndex(index, viewSize);
                return;
            }
            if (direction === '<' || direction === '|' && steps === '<') {
                var _index = calculateBackwardIndex(viewSize);
                if (_index < 0) {
                    this._o = true;
                }
                Glide.index = normalizeBackwardIndex(_index, viewSize);
                return;
            }
            warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
        },
        isStart: function isStart() {
            return Glide.index <= 0;
        },
        isEnd: function isEnd() {
            return Glide.index >= this.length;
        },
        isOffset: function isOffset() {
            var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
            if (!direction) {
                return this._o;
            }
            if (!this._o) {
                return false;
            }
            if (direction === '|>') {
                return this.move.direction === '|' && this.move.steps === '>';
            }
            if (direction === '|<') {
                return this.move.direction === '|' && this.move.steps === '<';
            }
            return this.move.direction === direction;
        },
        isBound: function isBound() {
            return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
        }
    };

    function calculateForwardIndex(viewSize) {
        var index = Glide.index;
        if (Glide.isType('carousel')) {
            return index + viewSize;
        }
        return index + (viewSize - index % viewSize);
    }

    function normalizeForwardIndex(index, viewSize) {
        var length = Run.length;
        if (index <= length) {
            return index;
        }
        if (Glide.isType('carousel')) {
            return index - (length + 1);
        }
        if (Glide.settings.rewind) {
            if (Run.isBound() && !Run.isEnd()) {
                return length;
            }
            return 0;
        }
        if (Run.isBound()) {
            return length;
        }
        return Math.floor(length / viewSize) * viewSize;
    }

    function calculateBackwardIndex(viewSize) {
        var index = Glide.index;
        if (Glide.isType('carousel')) {
            return index - viewSize;
        }
        var view = Math.ceil(index / viewSize);
        return (view - 1) * viewSize;
    }

    function normalizeBackwardIndex(index, viewSize) {
        var length = Run.length;
        if (index >= 0) {
            return index;
        }
        if (Glide.isType('carousel')) {
            return index + (length + 1);
        }
        if (Glide.settings.rewind) {
            if (Run.isBound() && Run.isStart()) {
                return length;
            }
            return Math.floor(length / viewSize) * viewSize;
        }
        return 0;
    }
    define(Run, 'move', {
        get: function get() {
            return this._m;
        },
        set: function set(value) {
            var step = value.substr(1);
            this._m = {
                direction: value.substr(0, 1),
                steps: step ? toInt(step) ? toInt(step) : step : 0
            };
        }
    });
    define(Run, 'length', {
        get: function get() {
            var settings = Glide.settings;
            var length = Components.Html.slides.length;
            if (this.isBound()) {
                return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
            }
            return length - 1;
        }
    });
    define(Run, 'offset', {
        get: function get() {
            return this._o;
        }
    });
    return Run;
}

function now() {
    return new Date().getTime();
}

function throttle(func, wait) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var timeout, context, args, result;
    var previous = 0;
    var later = function later() {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    var throttled = function throttled() {
        var at = now();
        if (!previous && options.leading === false) previous = at;
        var remaining = wait - (at - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = at;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    return throttled;
}
var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
};

function Gaps(Glide, Components, Events) {
    var Gaps = {
        apply: function apply(slides) {
            for (var i = 0, len = slides.length; i < len; i++) {
                var style = slides[i].style;
                var direction = Components.Direction.value;
                if (i !== 0) {
                    style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
                } else {
                    style[MARGIN_TYPE[direction][0]] = '';
                }
                if (i !== slides.length - 1) {
                    style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
                } else {
                    style[MARGIN_TYPE[direction][1]] = '';
                }
            }
        },
        remove: function remove(slides) {
            for (var i = 0, len = slides.length; i < len; i++) {
                var style = slides[i].style;
                style.marginLeft = '';
                style.marginRight = '';
            }
        }
    };
    define(Gaps, 'value', {
        get: function get() {
            return toInt(Glide.settings.gap);
        }
    });
    define(Gaps, 'grow', {
        get: function get() {
            return Gaps.value * Components.Sizes.length;
        }
    });
    define(Gaps, 'reductor', {
        get: function get() {
            var perView = Glide.settings.perView;
            return Gaps.value * (perView - 1) / perView;
        }
    });
    Events.on(['build.after', 'update'], throttle(function() {
        Gaps.apply(Components.Html.wrapper.children);
    }, 30));
    Events.on('destroy', function() {
        Gaps.remove(Components.Html.wrapper.children);
    });
    return Gaps;
}

function siblings(node) {
    if (node && node.parentNode) {
        var n = node.parentNode.firstChild;
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== node) {
                matched.push(n);
            }
        }
        return matched;
    }
    return [];
}

function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}
var TRACK_SELECTOR = '[data-glide-el="track"]';

function Html(Glide, Components, Events) {
    var Html = {
        mount: function mount() {
            this.root = Glide.selector;
            this.track = this.root.querySelector(TRACK_SELECTOR);
            this.collectSlides();
        },
        collectSlides: function collectSlides() {
            this.slides = toArray(this.wrapper.children).filter(function(slide) {
                return !slide.classList.contains(Glide.settings.classes.slide.clone);
            });
        }
    };
    define(Html, 'root', {
        get: function get() {
            return Html._r;
        },
        set: function set(r) {
            if (isString(r)) {
                r = document.querySelector(r);
            }
            if (r !== null) {
                Html._r = r;
            } else {
                warn('Root element must be a existing Html node');
            }
        }
    });
    define(Html, 'track', {
        get: function get() {
            return Html._t;
        },
        set: function set(t) {
            Html._t = t;
        }
    });
    define(Html, 'wrapper', {
        get: function get() {
            return Html.track.children[0];
        }
    });
    Events.on('update', function() {
        Html.collectSlides();
    });
    return Html;
}

function Peek(Glide, Components, Events) {
    var Peek = {
        mount: function mount() {
            this.value = Glide.settings.peek;
        }
    };
    define(Peek, 'value', {
        get: function get() {
            return Peek._v;
        },
        set: function set(value) {
            if (isObject(value)) {
                value.before = toInt(value.before);
                value.after = toInt(value.after);
            } else {
                value = toInt(value);
            }
            Peek._v = value;
        }
    });
    define(Peek, 'reductor', {
        get: function get() {
            var value = Peek.value;
            var perView = Glide.settings.perView;
            if (isObject(value)) {
                return value.before / perView + value.after / perView;
            }
            return value * 2 / perView;
        }
    });
    Events.on(['resize', 'update'], function() {
        Peek.mount();
    });
    return Peek;
}

function Move(Glide, Components, Events) {
    var Move = {
        mount: function mount() {
            this._o = 0;
        },
        make: function make() {
            var _this = this;
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this.offset = offset;
            Events.emit('move', {
                movement: this.value
            });
            Components.Transition.after(function() {
                Events.emit('move.after', {
                    movement: _this.value
                });
            });
        }
    };
    define(Move, 'offset', {
        get: function get() {
            return Move._o;
        },
        set: function set(value) {
            Move._o = !isUndefined(value) ? toInt(value) : 0;
        }
    });
    define(Move, 'translate', {
        get: function get() {
            return Components.Sizes.slideWidth * Glide.index;
        }
    });
    define(Move, 'value', {
        get: function get() {
            var offset = this.offset;
            var translate = this.translate;
            if (Components.Direction.is('rtl')) {
                return translate + offset;
            }
            return translate - offset;
        }
    });
    Events.on(['build.before', 'run'], function() {
        Move.make();
    });
    return Move;
}

function Sizes(Glide, Components, Events) {
    var Sizes = {
        setupSlides: function setupSlides() {
            var width = "".concat(this.slideWidth, "px");
            var slides = Components.Html.slides;
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.width = width;
            }
        },
        setupWrapper: function setupWrapper() {
            Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
        },
        remove: function remove() {
            var slides = Components.Html.slides;
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.width = '';
            }
            Components.Html.wrapper.style.width = '';
        }
    };
    define(Sizes, 'length', {
        get: function get() {
            return Components.Html.slides.length;
        }
    });
    define(Sizes, 'width', {
        get: function get() {
            return Components.Html.track.offsetWidth;
        }
    });
    define(Sizes, 'wrapperSize', {
        get: function get() {
            return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
        }
    });
    define(Sizes, 'slideWidth', {
        get: function get() {
            return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
        }
    });
    Events.on(['build.before', 'resize', 'update'], function() {
        Sizes.setupSlides();
        Sizes.setupWrapper();
    });
    Events.on('destroy', function() {
        Sizes.remove();
    });
    return Sizes;
}

function Build(Glide, Components, Events) {
    var Build = {
        mount: function mount() {
            Events.emit('build.before');
            this.typeClass();
            this.activeClass();
            Events.emit('build.after');
        },
        typeClass: function typeClass() {
            Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type]);
        },
        activeClass: function activeClass() {
            var classes = Glide.settings.classes;
            var slide = Components.Html.slides[Glide.index];
            if (slide) {
                slide.classList.add(classes.slide.active);
                siblings(slide).forEach(function(sibling) {
                    sibling.classList.remove(classes.slide.active);
                });
            }
        },
        removeClasses: function removeClasses() {
            var _Glide$settings$class = Glide.settings.classes,
                type = _Glide$settings$class.type,
                slide = _Glide$settings$class.slide;
            Components.Html.root.classList.remove(type[Glide.settings.type]);
            Components.Html.slides.forEach(function(sibling) {
                sibling.classList.remove(slide.active);
            });
        }
    };
    Events.on(['destroy', 'update'], function() {
        Build.removeClasses();
    });
    Events.on(['resize', 'update'], function() {
        Build.mount();
    });
    Events.on('move.after', function() {
        Build.activeClass();
    });
    return Build;
}

function Clones(Glide, Components, Events) {
    var Clones = {
        mount: function mount() {
            this.items = [];
            if (Glide.isType('carousel')) {
                this.items = this.collect();
            }
        },
        collect: function collect() {
            var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var slides = Components.Html.slides;
            var _Glide$settings = Glide.settings,
                perView = _Glide$settings.perView,
                classes = _Glide$settings.classes,
                cloningRatio = _Glide$settings.cloningRatio;
            if (slides.length > 0) {
                var peekIncrementer = +!!Glide.settings.peek;
                var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
                var append = slides.slice(0, cloneCount).reverse();
                var prepend = slides.slice(cloneCount * -1);
                for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
                    for (var i = 0; i < append.length; i++) {
                        var clone = append[i].cloneNode(true);
                        clone.classList.add(classes.slide.clone);
                        items.push(clone);
                    }
                    for (var _i = 0; _i < prepend.length; _i++) {
                        var _clone = prepend[_i].cloneNode(true);
                        _clone.classList.add(classes.slide.clone);
                        items.unshift(_clone);
                    }
                }
            }
            return items;
        },
        append: function append() {
            var items = this.items;
            var _Components$Html = Components.Html,
                wrapper = _Components$Html.wrapper,
                slides = _Components$Html.slides;
            var half = Math.floor(items.length / 2);
            var prepend = items.slice(0, half).reverse();
            var append = items.slice(half * -1).reverse();
            var width = "".concat(Components.Sizes.slideWidth, "px");
            for (var i = 0; i < append.length; i++) {
                wrapper.appendChild(append[i]);
            }
            for (var _i2 = 0; _i2 < prepend.length; _i2++) {
                wrapper.insertBefore(prepend[_i2], slides[0]);
            }
            for (var _i3 = 0; _i3 < items.length; _i3++) {
                items[_i3].style.width = width;
            }
        },
        remove: function remove() {
            var items = this.items;
            for (var i = 0; i < items.length; i++) {
                Components.Html.wrapper.removeChild(items[i]);
            }
        }
    };
    define(Clones, 'grow', {
        get: function get() {
            return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
        }
    });
    Events.on('update', function() {
        Clones.remove();
        Clones.mount();
        Clones.append();
    });
    Events.on('build.before', function() {
        if (Glide.isType('carousel')) {
            Clones.append();
        }
    });
    Events.on('destroy', function() {
        Clones.remove();
    });
    return Clones;
}
var EventsBinder = function() {
    function EventsBinder() {
        var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, EventsBinder);
        this.listeners = listeners;
    }
    _createClass(EventsBinder, [{
        key: "on",
        value: function on(events, el, closure) {
            var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            if (isString(events)) {
                events = [events];
            }
            for (var i = 0; i < events.length; i++) {
                this.listeners[events[i]] = closure;
                el.addEventListener(events[i], this.listeners[events[i]], capture);
            }
        }
    }, {
        key: "off",
        value: function off(events, el) {
            var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            if (isString(events)) {
                events = [events];
            }
            for (var i = 0; i < events.length; i++) {
                el.removeEventListener(events[i], this.listeners[events[i]], capture);
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {
            delete this.listeners;
        }
    }]);
    return EventsBinder;
}();

function Resize(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Resize = {
        mount: function mount() {
            this.bind();
        },
        bind: function bind() {
            Binder.on('resize', window, throttle(function() {
                Events.emit('resize');
            }, Glide.settings.throttle));
        },
        unbind: function unbind() {
            Binder.off('resize', window);
        }
    };
    Events.on('destroy', function() {
        Resize.unbind();
        Binder.destroy();
    });
    return Resize;
}
var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
};

function Direction(Glide, Components, Events) {
    var Direction = {
        mount: function mount() {
            this.value = Glide.settings.direction;
        },
        resolve: function resolve(pattern) {
            var token = pattern.slice(0, 1);
            if (this.is('rtl')) {
                return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
            }
            return pattern;
        },
        is: function is(direction) {
            return this.value === direction;
        },
        addClass: function addClass() {
            Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
        },
        removeClass: function removeClass() {
            Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
        }
    };
    define(Direction, 'value', {
        get: function get() {
            return Direction._v;
        },
        set: function set(value) {
            if (VALID_DIRECTIONS.indexOf(value) > -1) {
                Direction._v = value;
            } else {
                warn('Direction value must be `ltr` or `rtl`');
            }
        }
    });
    Events.on(['destroy', 'update'], function() {
        Direction.removeClass();
    });
    Events.on('update', function() {
        Direction.mount();
    });
    Events.on(['build.before', 'update'], function() {
        Direction.addClass();
    });
    return Direction;
}

function Rtl(Glide, Components) {
    return {
        modify: function modify(translate) {
            if (Components.Direction.is('rtl')) {
                return -translate;
            }
            return translate;
        }
    };
}

function Gap(Glide, Components) {
    return {
        modify: function modify(translate) {
            var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
            return translate + Components.Gaps.value * multiplier;
        }
    };
}

function Grow(Glide, Components) {
    return {
        modify: function modify(translate) {
            return translate + Components.Clones.grow / 2;
        }
    };
}

function Peeking(Glide, Components) {
    return {
        modify: function modify(translate) {
            if (Glide.settings.focusAt >= 0) {
                var peek = Components.Peek.value;
                if (isObject(peek)) {
                    return translate - peek.before;
                }
                return translate - peek;
            }
            return translate;
        }
    };
}

function Focusing(Glide, Components) {
    return {
        modify: function modify(translate) {
            var gap = Components.Gaps.value;
            var width = Components.Sizes.width;
            var focusAt = Glide.settings.focusAt;
            var slideWidth = Components.Sizes.slideWidth;
            if (focusAt === 'center') {
                return translate - (width / 2 - slideWidth / 2);
            }
            return translate - slideWidth * focusAt - gap * focusAt;
        }
    };
}

function mutator(Glide, Components, Events) {
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
    return {
        mutate: function mutate(translate) {
            for (var i = 0; i < TRANSFORMERS.length; i++) {
                var transformer = TRANSFORMERS[i];
                if (isFunction(transformer) && isFunction(transformer().modify)) {
                    translate = transformer(Glide, Components, Events).modify(translate);
                } else {
                    warn('Transformer should be a function that returns an object with `modify()` method');
                }
            }
            return translate;
        }
    };
}

function Translate(Glide, Components, Events) {
    var Translate = {
        set: function set(value) {
            var transform = mutator(Glide, Components).mutate(value);
            var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
            Components.Html.wrapper.style.mozTransform = translate3d;
            Components.Html.wrapper.style.webkitTransform = translate3d;
            Components.Html.wrapper.style.transform = translate3d;
        },
        remove: function remove() {
            Components.Html.wrapper.style.transform = '';
        },
        getStartIndex: function getStartIndex() {
            var length = Components.Sizes.length;
            var index = Glide.index;
            var perView = Glide.settings.perView;
            if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
                return length + (index - perView);
            }
            return (index + perView) % length;
        },
        getTravelDistance: function getTravelDistance() {
            var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;
            if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
                return travelDistance * -1;
            }
            return travelDistance;
        }
    };
    Events.on('move', function(context) {
        if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
            return Translate.set(context.movement);
        }
        Components.Transition.after(function() {
            Events.emit('translate.jump');
            Translate.set(Components.Sizes.slideWidth * Glide.index);
        });
        var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
        return Translate.set(startWidth - Components.Translate.getTravelDistance());
    });
    Events.on('destroy', function() {
        Translate.remove();
    });
    return Translate;
}

function Transition(Glide, Components, Events) {
    var disabled = false;
    var Transition = {
        compose: function compose(property) {
            var settings = Glide.settings;
            if (disabled) {
                return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
            }
            return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
        },
        set: function set() {
            var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
            Components.Html.wrapper.style.transition = this.compose(property);
        },
        remove: function remove() {
            Components.Html.wrapper.style.transition = '';
        },
        after: function after(callback) {
            setTimeout(function() {
                callback();
            }, this.duration);
        },
        enable: function enable() {
            disabled = false;
            this.set();
        },
        disable: function disable() {
            disabled = true;
            this.set();
        }
    };
    define(Transition, 'duration', {
        get: function get() {
            var settings = Glide.settings;
            if (Glide.isType('slider') && Components.Run.offset) {
                return settings.rewindDuration;
            }
            return settings.animationDuration;
        }
    });
    Events.on('move', function() {
        Transition.set();
    });
    Events.on(['build.before', 'resize', 'translate.jump'], function() {
        Transition.disable();
    });
    Events.on('run', function() {
        Transition.enable();
    });
    Events.on('destroy', function() {
        Transition.remove();
    });
    return Transition;
}
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
            supportsPassive = true;
        }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
} catch (e) {}
var supportsPassive$1 = supportsPassive;
var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

function swipe(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
        passive: true
    } : false;
    var Swipe = {
        mount: function mount() {
            this.bindSwipeStart();
        },
        start: function start(event) {
            if (!disabled && !Glide.disabled) {
                this.disable();
                var swipe = this.touches(event);
                swipeSin = null;
                swipeStartX = toInt(swipe.pageX);
                swipeStartY = toInt(swipe.pageY);
                this.bindSwipeMove();
                this.bindSwipeEnd();
                Events.emit('swipe.start');
            }
        },
        move: function move(event) {
            if (!Glide.disabled) {
                var _Glide$settings = Glide.settings,
                    touchAngle = _Glide$settings.touchAngle,
                    touchRatio = _Glide$settings.touchRatio,
                    classes = _Glide$settings.classes;
                var swipe = this.touches(event);
                var subExSx = toInt(swipe.pageX) - swipeStartX;
                var subEySy = toInt(swipe.pageY) - swipeStartY;
                var powEX = Math.abs(subExSx << 2);
                var powEY = Math.abs(subEySy << 2);
                var swipeHypotenuse = Math.sqrt(powEX + powEY);
                var swipeCathetus = Math.sqrt(powEY);
                swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
                if (swipeSin * 180 / Math.PI < touchAngle) {
                    event.stopPropagation();
                    Components.Move.make(subExSx * toFloat(touchRatio));
                    Components.Html.root.classList.add(classes.dragging);
                    Events.emit('swipe.move');
                } else {
                    return false;
                }
            }
        },
        end: function end(event) {
            if (!Glide.disabled) {
                var _Glide$settings2 = Glide.settings,
                    perSwipe = _Glide$settings2.perSwipe,
                    touchAngle = _Glide$settings2.touchAngle,
                    classes = _Glide$settings2.classes;
                var swipe = this.touches(event);
                var threshold = this.threshold(event);
                var swipeDistance = swipe.pageX - swipeStartX;
                var swipeDeg = swipeSin * 180 / Math.PI;
                this.enable();
                if (swipeDistance > threshold && swipeDeg < touchAngle) {
                    Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
                } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
                    Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
                } else {
                    Components.Move.make();
                }
                Components.Html.root.classList.remove(classes.dragging);
                this.unbindSwipeMove();
                this.unbindSwipeEnd();
                Events.emit('swipe.end');
            }
        },
        bindSwipeStart: function bindSwipeStart() {
            var _this = this;
            var _Glide$settings3 = Glide.settings,
                swipeThreshold = _Glide$settings3.swipeThreshold,
                dragThreshold = _Glide$settings3.dragThreshold;
            if (swipeThreshold) {
                Binder.on(START_EVENTS[0], Components.Html.wrapper, function(event) {
                    _this.start(event);
                }, capture);
            }
            if (dragThreshold) {
                Binder.on(START_EVENTS[1], Components.Html.wrapper, function(event) {
                    _this.start(event);
                }, capture);
            }
        },
        unbindSwipeStart: function unbindSwipeStart() {
            Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
            Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
        },
        bindSwipeMove: function bindSwipeMove() {
            var _this2 = this;
            Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function(event) {
                _this2.move(event);
            }, Glide.settings.throttle), capture);
        },
        unbindSwipeMove: function unbindSwipeMove() {
            Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
        },
        bindSwipeEnd: function bindSwipeEnd() {
            var _this3 = this;
            Binder.on(END_EVENTS, Components.Html.wrapper, function(event) {
                _this3.end(event);
            });
        },
        unbindSwipeEnd: function unbindSwipeEnd() {
            Binder.off(END_EVENTS, Components.Html.wrapper);
        },
        touches: function touches(event) {
            if (MOUSE_EVENTS.indexOf(event.type) > -1) {
                return event;
            }
            return event.touches[0] || event.changedTouches[0];
        },
        threshold: function threshold(event) {
            var settings = Glide.settings;
            if (MOUSE_EVENTS.indexOf(event.type) > -1) {
                return settings.dragThreshold;
            }
            return settings.swipeThreshold;
        },
        enable: function enable() {
            disabled = false;
            Components.Transition.enable();
            return this;
        },
        disable: function disable() {
            disabled = true;
            Components.Transition.disable();
            return this;
        }
    };
    Events.on('build.after', function() {
        Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    Events.on('destroy', function() {
        Swipe.unbindSwipeStart();
        Swipe.unbindSwipeMove();
        Swipe.unbindSwipeEnd();
        Binder.destroy();
    });
    return Swipe;
}

function images(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Images = {
        mount: function mount() {
            this.bind();
        },
        bind: function bind() {
            Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
        },
        unbind: function unbind() {
            Binder.off('dragstart', Components.Html.wrapper);
        },
        dragstart: function dragstart(event) {
            event.preventDefault();
        }
    };
    Events.on('destroy', function() {
        Images.unbind();
        Binder.destroy();
    });
    return Images;
}

function anchors(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var detached = false;
    var prevented = false;
    var Anchors = {
        mount: function mount() {
            this._a = Components.Html.wrapper.querySelectorAll('a');
            this.bind();
        },
        bind: function bind() {
            Binder.on('click', Components.Html.wrapper, this.click);
        },
        unbind: function unbind() {
            Binder.off('click', Components.Html.wrapper);
        },
        click: function click(event) {
            if (prevented) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        detach: function detach() {
            prevented = true;
            if (!detached) {
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].draggable = false;
                }
                detached = true;
            }
            return this;
        },
        attach: function attach() {
            prevented = false;
            if (detached) {
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].draggable = true;
                }
                detached = false;
            }
            return this;
        }
    };
    define(Anchors, 'items', {
        get: function get() {
            return Anchors._a;
        }
    });
    Events.on('swipe.move', function() {
        Anchors.detach();
    });
    Events.on('swipe.end', function() {
        Components.Transition.after(function() {
            Anchors.attach();
        });
    });
    Events.on('destroy', function() {
        Anchors.attach();
        Anchors.unbind();
        Binder.destroy();
    });
    return Anchors;
}
var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");

function controls(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
        passive: true
    } : false;
    var Controls = {
        mount: function mount() {
            this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
            this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
            this._arrowControls = {
                previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
                next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
            };
            this.addBindings();
        },
        setActive: function setActive() {
            for (var i = 0; i < this._n.length; i++) {
                this.addClass(this._n[i].children);
            }
        },
        removeActive: function removeActive() {
            for (var i = 0; i < this._n.length; i++) {
                this.removeClass(this._n[i].children);
            }
        },
        addClass: function addClass(controls) {
            var settings = Glide.settings;
            var item = controls[Glide.index];
            if (!item) {
                return;
            }
            item.classList.add(settings.classes.nav.active);
            siblings(item).forEach(function(sibling) {
                sibling.classList.remove(settings.classes.nav.active);
            });
        },
        removeClass: function removeClass(controls) {
            var item = controls[Glide.index];
            item === null || item === void 0 ? void 0 : item.classList.remove(Glide.settings.classes.nav.active);
        },
        setArrowState: function setArrowState() {
            if (Glide.settings.rewind) {
                return;
            }
            var next = Controls._arrowControls.next;
            var previous = Controls._arrowControls.previous;
            this.resetArrowState(next, previous);
            if (Glide.index === 0) {
                this.disableArrow(previous);
            }
            if (Glide.index === Components.Run.length) {
                this.disableArrow(next);
            }
        },
        resetArrowState: function resetArrowState() {
            var settings = Glide.settings;
            for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
                lists[_key] = arguments[_key];
            }
            lists.forEach(function(list) {
                toArray(list).forEach(function(element) {
                    element.classList.remove(settings.classes.arrow.disabled);
                });
            });
        },
        disableArrow: function disableArrow() {
            var settings = Glide.settings;
            for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                lists[_key2] = arguments[_key2];
            }
            lists.forEach(function(list) {
                toArray(list).forEach(function(element) {
                    element.classList.add(settings.classes.arrow.disabled);
                });
            });
        },
        addBindings: function addBindings() {
            for (var i = 0; i < this._c.length; i++) {
                this.bind(this._c[i].children);
            }
        },
        removeBindings: function removeBindings() {
            for (var i = 0; i < this._c.length; i++) {
                this.unbind(this._c[i].children);
            }
        },
        bind: function bind(elements) {
            for (var i = 0; i < elements.length; i++) {
                Binder.on('click', elements[i], this.click);
                Binder.on('touchstart', elements[i], this.click, capture);
            }
        },
        unbind: function unbind(elements) {
            for (var i = 0; i < elements.length; i++) {
                Binder.off(['click', 'touchstart'], elements[i]);
            }
        },
        click: function click(event) {
            if (!supportsPassive$1 && event.type === 'touchstart') {
                event.preventDefault();
            }
            var direction = event.currentTarget.getAttribute('data-glide-dir');
            Components.Run.make(Components.Direction.resolve(direction));
        }
    };
    define(Controls, 'items', {
        get: function get() {
            return Controls._c;
        }
    });
    Events.on(['mount.after', 'move.after'], function() {
        Controls.setActive();
    });
    Events.on(['mount.after', 'run'], function() {
        Controls.setArrowState();
    });
    Events.on('destroy', function() {
        Controls.removeBindings();
        Controls.removeActive();
        Binder.destroy();
    });
    return Controls;
}

function keyboard(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Keyboard = {
        mount: function mount() {
            if (Glide.settings.keyboard) {
                this.bind();
            }
        },
        bind: function bind() {
            Binder.on('keyup', document, this.press);
        },
        unbind: function unbind() {
            Binder.off('keyup', document);
        },
        press: function press(event) {
            var perSwipe = Glide.settings.perSwipe;
            var arrowSymbols = {
                ArrowRight: '>',
                ArrowLeft: '<'
            };
            if (['ArrowRight', 'ArrowLeft'].includes(event.code)) {
                Components.Run.make(Components.Direction.resolve("".concat(perSwipe).concat(arrowSymbols[event.code])));
            }
        }
    };
    Events.on(['destroy', 'update'], function() {
        Keyboard.unbind();
    });
    Events.on('update', function() {
        Keyboard.mount();
    });
    Events.on('destroy', function() {
        Binder.destroy();
    });
    return Keyboard;
}

function autoplay(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Autoplay = {
        mount: function mount() {
            this.enable();
            this.start();
            if (Glide.settings.hoverpause) {
                this.bind();
            }
        },
        enable: function enable() {
            this._e = true;
        },
        disable: function disable() {
            this._e = false;
        },
        start: function start() {
            var _this = this;
            if (!this._e) {
                return;
            }
            this.enable();
            if (Glide.settings.autoplay) {
                if (isUndefined(this._i)) {
                    this._i = setInterval(function() {
                        _this.stop();
                        Components.Run.make('>');
                        _this.start();
                        Events.emit('autoplay');
                    }, this.time);
                }
            }
        },
        stop: function stop() {
            this._i = clearInterval(this._i);
        },
        bind: function bind() {
            var _this2 = this;
            Binder.on('mouseover', Components.Html.root, function() {
                if (_this2._e) {
                    _this2.stop();
                }
            });
            Binder.on('mouseout', Components.Html.root, function() {
                if (_this2._e) {
                    _this2.start();
                }
            });
        },
        unbind: function unbind() {
            Binder.off(['mouseover', 'mouseout'], Components.Html.root);
        }
    };
    define(Autoplay, 'time', {
        get: function get() {
            var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');
            if (autoplay) {
                return toInt(autoplay);
            }
            return toInt(Glide.settings.autoplay);
        }
    });
    Events.on(['destroy', 'update'], function() {
        Autoplay.unbind();
    });
    Events.on(['run.before', 'swipe.start', 'update'], function() {
        Autoplay.stop();
    });
    Events.on(['pause', 'destroy'], function() {
        Autoplay.disable();
        Autoplay.stop();
    });
    Events.on(['run.after', 'swipe.end'], function() {
        Autoplay.start();
    });
    Events.on(['play'], function() {
        Autoplay.enable();
        Autoplay.start();
    });
    Events.on('update', function() {
        Autoplay.mount();
    });
    Events.on('destroy', function() {
        Binder.destroy();
    });
    return Autoplay;
}

function sortBreakpoints(points) {
    if (isObject(points)) {
        return sortKeys(points);
    } else {
        warn("Breakpoints option must be an object");
    }
    return {};
}

function breakpoints(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var settings = Glide.settings;
    var points = sortBreakpoints(settings.breakpoints);
    var defaults = Object.assign({}, settings);
    var Breakpoints = {
        match: function match(points) {
            if (typeof window.matchMedia !== 'undefined') {
                for (var point in points) {
                    if (points.hasOwnProperty(point)) {
                        if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
                            return points[point];
                        }
                    }
                }
            }
            return defaults;
        }
    };
    Object.assign(settings, Breakpoints.match(points));
    Binder.on('resize', window, throttle(function() {
        Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));
    Events.on('update', function() {
        points = sortBreakpoints(points);
        defaults = Object.assign({}, settings);
    });
    Events.on('destroy', function() {
        Binder.off('resize', window);
    });
    return Breakpoints;
}
var COMPONENTS = {
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run
};
var Glide = function(_Core) {
    _inherits(Glide, _Core);
    var _super = _createSuper(Glide);

    function Glide() {
        _classCallCheck(this, Glide);
        return _super.apply(this, arguments);
    }
    _createClass(Glide, [{
        key: "mount",
        value: function mount() {
            var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
        }
    }]);
    return Glide;
}(Glide$1);
//export { anchors as Anchors, autoplay as Autoplay, breakpoints as Breakpoints, controls as Controls, images as Images, keyboard as Keyboard, swipe as Swipe, Glide as default };


var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A number of slides moved on single swipe.
     *
     * Available types:
     * `` - Moves slider by one slide per swipe
     * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
     *
     * @type {String}
     */
    perSwipe: '',

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Wait for the animation to finish until the next user input can be processed
     *
     * @type {boolean}
     */
    waitForTransition: true,

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Defines how many clones of current viewport will be generated.
     *
     * @type {Number}
     */
    cloningRatio: 1,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
        swipeable: 'glide--swipeable',
        dragging: 'glide--dragging',
        direction: {
            ltr: 'glide--ltr',
            rtl: 'glide--rtl'
        },
        type: {
            slider: 'glide--slider',
            carousel: 'glide--carousel'
        },
        slide: {
            clone: 'glide__slide--clone',
            active: 'glide__slide--active'
        },
        arrow: {
            disabled: 'glide__arrow--disabled'
        },
        nav: {
            active: 'glide__bullet--active'
        }
    }
};

console.log(Object.keys(defaults))