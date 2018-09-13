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
var defaultContentTop = 0;
var arrowHeight = 8;
var perspective = 850;
var fadeOutSeconds = 0.34;
var fadeInSeconds = 0.25;
var moveSeconds = 0.25;
var moveArrowSeconds = 0.28;
var fadeOutContentSeconds = 0.29;
var fadeInContentSeconds = 0.1;
var OffScreenPadding = 10;

var setFromProps = function setFromProps(camelCaseKey) {
  return (0, _styledComponents.css)(["", ""], function (props) {
    return props[camelCaseKey] ? "".concat((0, _lodash.default)(camelCaseKey), ": ").concat(props[camelCaseKey]) : null;
  });
};

var GridContainer = _styledComponents.default.div.withConfig({
  displayName: "src__GridContainer",
  componentId: "sc-178mgjs-0"
})(["@media(max-width:", "px){position:absolute;visibility:hidden;}@media(min-width:", "px){display:grid;", ";justify-items:stretch;grid-template-columns:repeat(", ",", "px);grid-template-rows:", "px;position:relative;", ";", ";", ";", "px;}"], function (_ref) {
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

var GridItemLink = _styledComponents.default.a.withConfig({
  displayName: "src__GridItemLink",
  componentId: "sc-178mgjs-1"
})(["grid-column:", " / span 1;display:flex;justify-content:center;align-items:center;&:hover{opacity:0.5;}", ";&:visited{", ";}"], function (_ref6) {
  var index = _ref6.index;
  return index + 1;
}, setFromProps('color'), setFromProps('color'));

var GridItem = _styledComponents.default.div.withConfig({
  displayName: "src__GridItem",
  componentId: "sc-178mgjs-2"
})(["grid-column:", " / span 1;display:flex;justify-content:center;align-items:center;&:hover{opacity:0.5;cursor:default;}"], function (_ref7) {
  var index = _ref7.index;
  return index + 1;
});

var ContentRow = _styledComponents.default.div.withConfig({
  displayName: "src__ContentRow",
  componentId: "sc-178mgjs-3"
})(["grid-column:1 / span ", ";grid-row:2 / span 1;position:relative;height:0;"], function (_ref8) {
  var columns = _ref8.columns;
  return columns;
});

var Move = function Move(fromData, toData) {
  return (0, _styledComponents.keyframes)(["from{left:", "px;width:", "px;height:", "px;}to{left:", "px;width:", "px;height:", "px;}"], fromData.left, fromData.width, fromData.height, toData.left, toData.width, toData.height);
};

var FadeIn = (0, _styledComponents.keyframes)(["from{opacity:0;transform:perspective(", "px) rotateX(-60deg);transform-origin:top center;}to{opacity:1;transform:perspective(", "px) rotateX(0deg);transform-origin:top center;}"], perspective, perspective);
var FadeOut = (0, _styledComponents.keyframes)(["from{opacity:1;transform:perspective(", "px) rotateX(0deg);transform-origin:top center;}to{opacity:0;transform:perspective(", "px) rotateX(-60deg);transform-origin:top center;visibility:hidden;}"], perspective, perspective);

var MovingDiv = _styledComponents.default.div.withConfig({
  displayName: "src__MovingDiv",
  componentId: "sc-178mgjs-4"
})(["opacity:1;", ";", ";position:absolute;top:", "px;left:", "px;width:", "px;height:", "px;display:", ";border-radius:4px;box-shadow:0 8px 28px 1px rgba(138,126,138,0.67);animation:", " ", " forwards ease;"], setFromProps('color'), setFromProps('background'), function (_ref9) {
  var top = _ref9.top;
  return top;
}, function (_ref10) {
  var fromData = _ref10.fromData;
  return fromData ? fromData.left : 0;
}, function (_ref11) {
  var fromData = _ref11.fromData;
  return fromData ? fromData.width : 0;
}, function (_ref12) {
  var fromData = _ref12.fromData;
  return fromData ? fromData.height : 0;
}, function (_ref13) {
  var display = _ref13.display;
  return display;
}, function (_ref14) {
  var fadeOut = _ref14.fadeOut,
      display = _ref14.display,
      fromData = _ref14.fromData,
      toData = _ref14.toData;
  if (fadeOut) return FadeOut;

  if (display === 'block') {
    if (fromData.left === toData.left) return FadeIn;
    if (fromData) return Move(fromData, toData);
  }

  return ''; // display: none; don't animate
}, function (_ref15) {
  var fadeOut = _ref15.fadeOut,
      display = _ref15.display,
      fromData = _ref15.fromData,
      toData = _ref15.toData;
  if (fadeOut) return "".concat(fadeOutSeconds, "s");

  if (display === 'block') {
    if (fromData.left === toData.left) return "".concat(fadeInSeconds, "s"); // fade in

    if (fromData) return "".concat(moveSeconds, "s"); // move
  }

  return '0s'; // display: none; don't animate
});

var FadeInArrow = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);
var FadeOutArrow = (0, _styledComponents.keyframes)(["from{opacity:1;}to{opacity:0;}"]);

var calculateArrowMarginLeft = function calculateArrowMarginLeft(data, leftOffset, rightOffset) {
  return (0, _styledComponents.css)(["margin-left:", "px;"], data ? data.left + data.width / 2 - leftOffset + rightOffset - arrowHeight - (leftOffset > 0 || rightOffset > 0 ? OffScreenPadding : 0) : 0);
};

var MoveArrow = function MoveArrow(fromData, toData, leftOffset, rightOffset) {
  return (0, _styledComponents.keyframes)(["from{", "}to{", "}"], calculateArrowMarginLeft(fromData, leftOffset, rightOffset), calculateArrowMarginLeft(toData, leftOffset, rightOffset));
};

var Arrow = _styledComponents.default.div.withConfig({
  displayName: "src__Arrow",
  componentId: "sc-178mgjs-5"
})(["top:-", "px;z-index:1;position:absolute;", " display:", ";width:0;height:0;border-left:", "px solid transparent;border-right:", "px solid transparent;border-bottom:", "px solid ", ";animation:", " ", " forwards ease;"], function (_ref16) {
  var top = _ref16.top;
  return arrowHeight - top;
}, function (_ref17) {
  var toData = _ref17.toData,
      leftOffset = _ref17.leftOffset,
      rightOffset = _ref17.rightOffset;
  return calculateArrowMarginLeft(toData, leftOffset, rightOffset);
}, function (_ref18) {
  var display = _ref18.display,
      toData = _ref18.toData;

  if (toData && toData.width === 0 && toData.height === 0) {
    return 'none';
  }

  return display;
}, arrowHeight, arrowHeight, arrowHeight, function (_ref19) {
  var background = _ref19.background;
  return background;
}, function (_ref20) {
  var fadeOut = _ref20.fadeOut,
      display = _ref20.display,
      fromData = _ref20.fromData,
      toData = _ref20.toData,
      leftOffset = _ref20.leftOffset,
      rightOffset = _ref20.rightOffset;
  if (fadeOut) return FadeOutArrow;

  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, leftOffset, rightOffset);
  }

  return ''; // display: none; don't animate
}, function (_ref21) {
  var fadeOut = _ref21.fadeOut,
      display = _ref21.display,
      fromData = _ref21.fromData,
      toData = _ref21.toData;
  if (fadeOut) return "".concat(fadeOutSeconds, "s");

  if (display === 'block') {
    if (fromData.left === toData.left) return "".concat(fadeInSeconds, "s"); // fade in

    if (fromData) return "".concat(moveArrowSeconds, "s"); // move
  }

  return '0s'; // display: none; don't animate
});

var FadeInContent = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);
var FadeOutContent = (0, _styledComponents.keyframes)(["from{opacity:1;}to{opacity:0;visibility:hidden;}"]);

var ContentGroupContainer = _styledComponents.default.div.withConfig({
  displayName: "src__ContentGroupContainer",
  componentId: "sc-178mgjs-6"
})(["position:absolute;margin-top:0;margin-bottom:0;width:100%;height:100%;opacity:", ";z-index:", ";pointer-events:", ";animation:", "  ", "s forwards;"], function (_ref22) {
  var show = _ref22.show;
  return show ? 1 : 0;
}, function (_ref23) {
  var show = _ref23.show;
  return show ? 1 : 0;
}, function (_ref24) {
  var show = _ref24.show;
  return show ? 'auto' : 'none';
}, function (_ref25) {
  var show = _ref25.show,
      fadeOut = _ref25.fadeOut;
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}, function (_ref26) {
  var show = _ref26.show;
  return show ? "".concat(fadeInContentSeconds) : "".concat(fadeOutContentSeconds);
});

var ContentGroup = function ContentGroup(_ref27) {
  var title = _ref27.title,
      width = _ref27.width,
      height = _ref27.height,
      background = _ref27.background;
  return _react.default.createElement(_react.default.Fragment, null, title, width, "x", height, background);
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
      toData: null,
      leftOffset: 0,
      rightOffset: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeMenuData", (0, _memoizeOne.default)(function (columnWidth, children) {
      return _react.default.Children.map(children, function (child, i) {
        // if width and height are not specified, that means we don't want to render the content group i.e. we only
        // want to render root item
        var _child$props = child.props,
            width = _child$props.width,
            height = _child$props.height;
        var sanitisedWidth, sanitisedHeight;

        if (!width && !height) {
          sanitisedWidth = 0;
          sanitisedHeight = 0;
        } else {
          // if width or height is not specified, add defaults
          sanitisedWidth = width || defaultContentWidth;
          sanitisedHeight = height || defaultContentHeight;
        }

        return _objectSpread({}, child.props, {
          // order is important here! spread child.props after height, followed by width.
          height: sanitisedHeight,
          width: sanitisedWidth,
          index: i,
          left: (i + 1) * columnWidth - columnWidth / 2 - sanitisedWidth / 2
        });
      });
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "memoizeGridItems", (0, _memoizeOne.default)(function (children, color) {
      return _react.default.Children.map(children, function (child, i) {
        var _child$props2 = child.props,
            title = _child$props2.title,
            rootUrl = _child$props2.rootUrl;

        if (rootUrl) {
          return _react.default.createElement(GridItemLink, {
            href: rootUrl,
            key: "menu-title-".concat(i),
            index: i,
            onMouseEnter: function onMouseEnter(e) {
              return _this.onMouseEnter(e.target, i);
            },
            color: color
          }, title);
        }

        return _react.default.createElement(GridItem, {
          key: "menu-title-".concat(i),
          index: i,
          onMouseEnter: function onMouseEnter(e) {
            return _this.onMouseEnter(e.target, i);
          },
          color: color
        }, title);
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
      if (_this.props.debug) return;

      _this.setState(function (prevState) {
        return {
          fadeOut: true,
          fromData: prevState.toData
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseEnter", function (target, menuDataIndex) {
      _this.setState(function (prevState) {
        var fadeOut = false;
        var display = 'block';

        var toDataOriginal = _this.memoizeMenuData(_this.props.columnWidth, _this.props.children)[menuDataIndex];

        var toData = _objectSpread({}, toDataOriginal);

        var leftOffset = 0;
        var rightOffset = 0;

        if (target) {
          // off screen detection
          // target is rootGridItem
          var _target$getBoundingCl = target.getBoundingClientRect(),
              left = _target$getBoundingCl.left,
              width = _target$getBoundingCl.width;

          var siteNavWidth = target.parentNode.clientWidth;
          leftOffset = toData.width / 2 - (left + width / 2);
          rightOffset = toData.width / 2 - (siteNavWidth - (left + width / 2));

          if (leftOffset > 0) {
            // if off screen, toData.left needs to be moved to be on-screen!
            toData.left += leftOffset + OffScreenPadding;
          } else {
            leftOffset = 0;
          }

          if (rightOffset > 0) {
            toData.left -= rightOffset - OffScreenPadding;
          } else {
            rightOffset = 0;
          }

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
            toData: toData,
            leftOffset: leftOffset,
            rightOffset: rightOffset
          };
        }
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
          contentTop = _this$props.contentTop,
          children = _this$props.children,
          align = _this$props.align,
          fontSize = _this$props.fontSize,
          fontFamily = _this$props.fontFamily,
          color = _this$props.color,
          breakpoint = _this$props.breakpoint;
      var _this$state = this.state,
          fromData = _this$state.fromData,
          toData = _this$state.toData,
          display = _this$state.display,
          fadeOut = _this$state.fadeOut,
          leftOffset = _this$state.leftOffset,
          rightOffset = _this$state.rightOffset;
      var columns = this.memoizeColumns(children);
      var rootGridItems = this.memoizeGridItems(children, color);
      var content = this.memoizeContent(children, fromData, toData);
      var justifyContent = this.memoizeAlign(align);
      var contentBackgroundSanitised = toData && toData.background || contentBackground;
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
      }, rootGridItems, _react.default.createElement(ContentRow, {
        columns: columns
      }, _react.default.createElement(Arrow, {
        display: display,
        fadeOut: fadeOut,
        fromData: fromData,
        toData: toData,
        top: contentTop,
        onClick: this.onClickMovingDiv,
        background: contentBackgroundSanitised,
        leftOffset: leftOffset,
        rightOffset: rightOffset
      }), _react.default.createElement(MovingDiv, {
        display: display,
        fadeOut: fadeOut,
        fromData: fromData,
        toData: toData,
        color: contentColor,
        top: contentTop,
        onClick: this.onClickMovingDiv,
        background: contentBackgroundSanitised
      }, content))));
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
  contentTop: defaultContentTop,
  breakpoint: defaultBreakpoint,
  color: defaultColor,
  debug: false
});