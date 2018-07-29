"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoizeAlign = exports.memoizeColumns = exports.memoizeContent = exports.memoizeGridItems = exports.memoizeMenuData = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _contentGroup = require("./contentGroup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultContentWidth = 320;
var defaultContentHeight = 200;

var GridItem = _styledComponents.default.div.withConfig({
  displayName: "memoized__GridItem",
  componentId: "s11tta0x-0"
})(["grid-column:", " / span 1;display:flex;justify-content:center;align-items:center;&:hover{opacity:0.5;cursor:default;}"], function (_ref) {
  var index = _ref.index;
  return index + 1;
});
/**
 * Injects index and left properties into MenuData
 */


var memoizeMenuData = (0, _memoizeOne.default)(function (columnWidth, children) {
  return _react.Children.map(children, function (child, i) {
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
});
exports.memoizeMenuData = memoizeMenuData;
var memoizeGridItems = (0, _memoizeOne.default)(function (children, _onMouseEnter) {
  return _react.Children.map(children, function (child, i) {
    return _react.default.createElement(GridItem, {
      key: "menu-title-".concat(i),
      index: i,
      onMouseEnter: function onMouseEnter(e) {
        return _onMouseEnter(e.target, i);
      }
    }, child.props.title);
  });
});
exports.memoizeGridItems = memoizeGridItems;
var memoizeContent = (0, _memoizeOne.default)(function (children, fromData, toData) {
  return _react.Children.map(children, function (child, i) {
    return _react.default.createElement(_contentGroup.ContentGroupContainer, {
      key: "content-group-".concat(i),
      show: toData && toData.index === i,
      fadeOut: fromData && fromData.index === i
    }, child.props.children);
  });
});
exports.memoizeContent = memoizeContent;
var memoizeColumns = (0, _memoizeOne.default)(function (children) {
  return _react.Children.count(children);
});
exports.memoizeColumns = memoizeColumns;
var memoizeAlign = (0, _memoizeOne.default)(function (align) {
  switch (align) {
    case 'left':
      return 'start';

    case 'right':
      return 'end';

    default:
      return 'center';
  }
});
exports.memoizeAlign = memoizeAlign;