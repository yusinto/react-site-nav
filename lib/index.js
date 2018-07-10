"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ContentGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lodash = _interopRequireDefault(require("lodash.kebabcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultRootAlign = 'center';
var defaultColor = '#fff';
var defaultColumnWidth = 150;
var defaultRowHeight = 45;
var defaultBackground = '#323232';
var defaultBreakpoint = 768;
var defaultContentBackground = '#fff';
var defaultContentColor = '#323232';
var defaultContentWidth = 320;
var defaultContentHeight = 200;
var arrowHeight = 5;
var perspective = 850;
var fadeOutSeconds = 0.34;
var fadeInSeconds = 0.25;
var moveSeconds = 0.2;
var moveArrowSeconds = 0.25;
var fadeOutContentSeconds = 0.29;
var fadeInContentSeconds = 0.1;

var setFromProps = function setFromProps(camelCaseKey) {
  return (0, _styledComponents.css)(["", ""], function (props) {
    return props[camelCaseKey] ? "".concat((0, _lodash.default)(camelCaseKey), ": ").concat(props[camelCaseKey]) : null;
  });
};

var GridContainer = _styledComponents.default.div.withConfig({
  displayName: "src__GridContainer",
  componentId: "s178mgjs-0"
})(["@media(max-width:", "px){position:absolute;opacity:0;z-index:-1;}@media(min-width:", "px){display:grid;", ";justify-items:stretch;grid-template-columns:repeat(", ",", "px);grid-template-rows:", "px;position:relative;", ";", ";", ";", "px;}"], function (_ref) {
  var breakpoint = _ref.breakpoint;
  return breakpoint - 1;
}, function (_ref2) {
  var breakpoint = _ref2.breakpoint;
  return breakpoint;
}, setFromProps('justifyContent'), function (_ref3) {
  var columns = _ref3.columns;
  return columns;
}, function (_ref4) {
  var columnWidth = _ref4.columnWidth;
  return columnWidth;
}, function (_ref5) {
  var rowHeight = _ref5.rowHeight;
  return rowHeight;
}, setFromProps('background'), setFromProps('color'), setFromProps('fontFamily'), setFromProps('fontSize'));

var GridItem = _styledComponents.default.div.withConfig({
  displayName: "src__GridItem",
  componentId: "s178mgjs-1"
})(["grid-column:", " / span 1;display:flex;justify-content:center;align-items:center;&:hover{opacity:0.5;}"], function (props) {
  return props.index + 1;
});

var ContentRow = _styledComponents.default.div.withConfig({
  displayName: "src__ContentRow",
  componentId: "s178mgjs-2"
})(["grid-column:1 / span ", ";grid-row:2 / span 1;position:relative;height:0;"], function (_ref6) {
  var columns = _ref6.columns;
  return columns;
});

var ArrowUp = _styledComponents.default.div.withConfig({
  displayName: "src__ArrowUp",
  componentId: "s178mgjs-3"
})(["margin-left:", "px;width:0;height:0;border-left:", "px solid transparent;border-right:", "px solid transparent;border-bottom:", "px solid ", ";animation:", " ", "s forwards ease;"], function (_ref7) {
  var toData = _ref7.toData;
  return toData ? toData.width / 2 - arrowHeight : 0;
}, arrowHeight, arrowHeight, arrowHeight, function (_ref8) {
  var background = _ref8.background;
  return background;
}, function (_ref9) {
  var fromData = _ref9.fromData,
      toData = _ref9.toData;
  if (fromData) return MoveArrow(fromData, toData);
  return '';
}, moveArrowSeconds);

var MoveArrow = function MoveArrow(fromData, toData) {
  return (0, _styledComponents.keyframes)(["from{margin-left:", "px;}to{margin-left:", "px;}"], fromData.width / 2 - arrowHeight, toData.width / 2 - arrowHeight);
};

var Move = function Move(fromData, toData) {
  return (0, _styledComponents.keyframes)(["from{left:", "px;width:", "px;height:", "px;}to{left:", "px;width:", "px;height:", "px;}"], fromData.left, fromData.width, fromData.height, toData.left, toData.width, toData.height);
};

var FadeIn = (0, _styledComponents.keyframes)(["from{opacity:0;transform:perspective(", "px) rotateX(-60deg);transform-origin:top center;}to{opacity:1;transform:perspective(", "px) rotateX(0deg);transform-origin:top center;}"], perspective, perspective);
var FadeOut = (0, _styledComponents.keyframes)(["from{opacity:1;transform:perspective(", "px) rotateX(0deg);transform-origin:top center;}to{opacity:0;transform:perspective(", "px) rotateX(-60deg);transform-origin:top center;z-index:-1;}"], perspective, perspective);

var MovingDiv = _styledComponents.default.div.withConfig({
  displayName: "src__MovingDiv",
  componentId: "s178mgjs-4"
})(["", ";position:absolute;top:-10px;left:", "px;width:", "px;height:", "px;display:", ";animation:", " ", " forwards ease;"], setFromProps('color'), function (_ref10) {
  var fromData = _ref10.fromData;
  return fromData ? fromData.left : 0;
}, function (_ref11) {
  var fromData = _ref11.fromData;
  return fromData ? fromData.width : 0;
}, function (_ref12) {
  var fromData = _ref12.fromData;
  return fromData ? fromData.height : 0;
}, function (props) {
  return props.display;
}, function (_ref13) {
  var fadeOut = _ref13.fadeOut,
      display = _ref13.display,
      fromData = _ref13.fromData,
      toData = _ref13.toData;
  if (fadeOut) return FadeOut;

  if (display === 'block') {
    if (fromData.left === toData.left) return FadeIn;
    if (fromData) return Move(fromData, toData);
  }

  return ''; // display: none; don't animate
}, function (_ref14) {
  var fadeOut = _ref14.fadeOut,
      display = _ref14.display,
      fromData = _ref14.fromData,
      toData = _ref14.toData;
  if (fadeOut) return "".concat(fadeOutSeconds, "s");

  if (display === 'block') {
    if (fromData.left === toData.left) return "".concat(fadeInSeconds, "s"); // fade in

    if (fromData) return "".concat(moveSeconds, "s"); // move
  }

  return '0s'; // display: none; don't animate
});

var MovingDivContent = _styledComponents.default.div.withConfig({
  displayName: "src__MovingDivContent",
  componentId: "s178mgjs-5"
})(["", ";border-radius:4px;width:100%;height:100%;box-shadow:0px 8px 28px 1px rgba(138,126,138,0.67);"], setFromProps('background'));

var FadeInContent = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);
var FadeOutContent = (0, _styledComponents.keyframes)(["from{opacity:1;}to{opacity:0;}"]);

var ContentGroupContainer = _styledComponents.default.div.withConfig({
  displayName: "src__ContentGroupContainer",
  componentId: "s178mgjs-6"
})(["position:absolute;top:0;margin-top:0;margin-bottom:0;width:100%;height:100%;padding:5px;opacity:", ";z-index:", ";animation:", "  ", "s forwards;"], function (_ref15) {
  var show = _ref15.show;
  return show ? 1 : 0;
}, function (_ref16) {
  var show = _ref16.show;
  return show ? 1 : 0;
}, function (_ref17) {
  var show = _ref17.show,
      fadeOut = _ref17.fadeOut;
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}, function (_ref18) {
  var show = _ref18.show;
  return show ? "".concat(fadeInContentSeconds) : "".concat(fadeOutContentSeconds);
});

var ContentGroup = function ContentGroup(_ref19) {
  var title = _ref19.title,
      width = _ref19.width,
      height = _ref19.height;
  return _react.default.createElement("div", null, title, ": ", width, "x", height);
};

exports.ContentGroup = ContentGroup;

var SiteNav =
/*#__PURE__*/
function (_Component) {
  _inherits(SiteNav, _Component);

  function SiteNav() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SiteNav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SiteNav)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      display: 'none',
      fadeOut: false,
      fromData: null,
      toData: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeMenuData", (0, _memoizeOne.default)(function (columnWidth, children) {
      return _react.default.Children.map(children, function (child, i) {
        // if width or height is not specified, add defaults
        var width = child.props.width ? child.props.width : defaultContentWidth;
        return _objectSpread({
          height: defaultContentHeight
        }, child.props, {
          // order is important here! spread child.props after height, followed by width.
          width: width,
          index: i,
          left: (i + 1) * columnWidth - columnWidth / 2 - width / 2
        });
      });
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeGridItems", (0, _memoizeOne.default)(function (children) {
      return _react.default.Children.map(children, function (child, i) {
        return _react.default.createElement(GridItem, {
          key: "menu-title-".concat(i),
          index: i,
          onMouseEnter: function onMouseEnter() {
            return _this.onMouseEnter(i);
          }
        }, child.props.title);
      });
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeContent", (0, _memoizeOne.default)(function (children, fromData, toData) {
      return _react.default.Children.map(children, function (child, i) {
        return _react.default.createElement(ContentGroupContainer, {
          key: "content-group-".concat(i),
          show: toData && toData.index === i,
          fadeOut: fromData && fromData.index === i
        }, child.props.children);
      });
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeColumns", (0, _memoizeOne.default)(function (children) {
      return _react.default.Children.count(children);
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeAlign", (0, _memoizeOne.default)(function (align) {
      switch (align) {
        case 'left':
          return 'start';

        case 'right':
          return 'end';

        default:
          return 'center';
      }
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function () {
      return _this.setState(function (prevState) {
        return {
          fadeOut: true,
          fromData: prevState.toData
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseEnter", function (menuDataIndex) {
      _this.setState(function (prevState) {
        var fadeOut = false;
        var display = 'block';

        var toData = _this.memoizeMenuData(_this.props.columnWidth, _this.props.children)[menuDataIndex];

        var fromData;

        if (prevState.fadeOut || !prevState.toData) {
          // on cold start, pop up right from the current item
          fromData = toData;
        } else {
          // on warm start, start animation from the previous item
          fromData = prevState.toData;
        }

        return {
          display: display,
          fadeOut: fadeOut,
          fromData: fromData,
          toData: toData
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeave", function () {
      return _this.close();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickMovingDiv", function () {
      return _this.close();
    });

    return _this;
  }

  _createClass(SiteNav, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          columnWidth = _this$props.columnWidth,
          rowHeight = _this$props.rowHeight,
          background = _this$props.background,
          contentBackground = _this$props.contentBackground,
          contentColor = _this$props.contentColor,
          children = _this$props.children,
          align = _this$props.align,
          fontSize = _this$props.fontSize,
          fontFamily = _this$props.fontFamily,
          color = _this$props.color,
          breakpoint = _this$props.breakpoint;
      var _this$state = this.state,
          fromData = _this$state.fromData,
          toData = _this$state.toData;
      var columns = this.memoizeColumns(children);
      var gridItems = this.memoizeGridItems(children);
      var content = this.memoizeContent(children, fromData, toData);
      var justifyContent = this.memoizeAlign(align);
      return _react.default.createElement("nav", null, _react.default.createElement(GridContainer, {
        background: background,
        columnWidth: columnWidth,
        rowHeight: rowHeight,
        justifyContent: justifyContent,
        fontSize: fontSize,
        fontFamily: fontFamily,
        color: color,
        breakpoint: breakpoint
        /* Below are not configurable */
        ,
        onMouseLeave: this.onMouseLeave,
        columns: columns
      }, gridItems, _react.default.createElement(ContentRow, {
        columns: columns
      }, _react.default.createElement(MovingDiv, {
        display: this.state.display,
        fadeOut: this.state.fadeOut,
        fromData: this.state.fromData,
        toData: this.state.toData,
        color: contentColor
      }, _react.default.createElement(ArrowUp, {
        fromData: this.state.fromData,
        toData: this.state.toData,
        background: contentBackground
      }), _react.default.createElement(MovingDivContent, {
        onClick: this.onClickMovingDiv,
        background: contentBackground
      }, content)))));
    }
  }]);

  return SiteNav;
}(_react.Component);

exports.default = SiteNav;

_defineProperty(SiteNav, "defaultProps", {
  align: defaultRootAlign,
  columnWidth: defaultColumnWidth,
  rowHeight: defaultRowHeight,
  background: defaultBackground,
  contentBackground: defaultContentBackground,
  contentColor: defaultContentColor,
  breakpoint: defaultBreakpoint,
  color: defaultColor
});