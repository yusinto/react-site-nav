"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var arrowHeight = 8;
var moveArrowSeconds = 0.28;
var FadeInArrow = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);
var FadeOutArrow = (0, _styledComponents.keyframes)(["from{opacity:1;}to{opacity:0;}"]);

var calculateArrowMarginLeft = function calculateArrowMarginLeft(data, leftOffset, rightOffset) {
  return (0, _styledComponents.css)(["margin-left:", "px;"], data ? data.left + data.width / 2 - leftOffset + rightOffset - arrowHeight - (leftOffset > 0 || rightOffset > 0 ? _constants.OffScreenPadding : 0) : 0);
};

var MoveArrow = function MoveArrow(fromData, toData, leftOffset, rightOffset) {
  return (0, _styledComponents.keyframes)(["from{", "}to{", "}"], calculateArrowMarginLeft(fromData, leftOffset, rightOffset), calculateArrowMarginLeft(toData, leftOffset, rightOffset));
};

var Arrow = _styledComponents.default.div.withConfig({
  displayName: "arrow__Arrow",
  componentId: "s41kmwz-0"
})(["top:-", "px;z-index:1;position:absolute;", " display:", ";width:0;height:0;border-left:", "px solid transparent;border-right:", "px solid transparent;border-bottom:", "px solid ", ";animation:", " ", " forwards ease;"], arrowHeight, function (_ref) {
  var toData = _ref.toData,
      leftOffset = _ref.leftOffset,
      rightOffset = _ref.rightOffset;
  return calculateArrowMarginLeft(toData, leftOffset, rightOffset);
}, function (_ref2) {
  var display = _ref2.display;
  return display;
}, arrowHeight, arrowHeight, arrowHeight, function (_ref3) {
  var background = _ref3.background;
  return background;
}, function (_ref4) {
  var fadeOut = _ref4.fadeOut,
      display = _ref4.display,
      fromData = _ref4.fromData,
      toData = _ref4.toData,
      leftOffset = _ref4.leftOffset,
      rightOffset = _ref4.rightOffset;
  if (fadeOut) return FadeOutArrow;

  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, leftOffset, rightOffset);
  }

  return ''; // display: none; don't animate
}, function (_ref5) {
  var fadeOut = _ref5.fadeOut,
      display = _ref5.display,
      fromData = _ref5.fromData,
      toData = _ref5.toData;
  if (fadeOut) return "".concat(_constants.fadeOutSeconds, "s");

  if (display === 'block') {
    if (fromData.left === toData.left) return "".concat(_constants.fadeInSeconds, "s"); // fade in

    if (fromData) return "".concat(moveArrowSeconds, "s"); // move
  }

  return '0s'; // display: none; don't animate
});

var _default = Arrow;
exports.default = _default;