"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ContentGroupContainer = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fadeOutContentSeconds = 0.29;
var fadeInContentSeconds = 0.1;
var FadeInContent = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);
var FadeOutContent = (0, _styledComponents.keyframes)(["from{opacity:1;}to{opacity:0;}"]);

var ContentGroupContainer = _styledComponents.default.div.withConfig({
  displayName: "contentGroup__ContentGroupContainer",
  componentId: "xeybz5-0"
})(["position:absolute;margin-top:0;margin-bottom:0;width:100%;height:100%;opacity:", ";z-index:", ";animation:", "  ", "s forwards;"], function (_ref) {
  var show = _ref.show;
  return show ? 1 : 0;
}, function (_ref2) {
  var show = _ref2.show;
  return show ? 1 : 0;
}, function (_ref3) {
  var show = _ref3.show,
      fadeOut = _ref3.fadeOut;
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}, function (_ref4) {
  var show = _ref4.show;
  return show ? "".concat(fadeInContentSeconds) : "".concat(fadeOutContentSeconds);
});

exports.ContentGroupContainer = ContentGroupContainer;

var ContentGroup = function ContentGroup(_ref5) {
  var _ref5$title = _ref5.title,
      title = _ref5$title === void 0 ? 'title' : _ref5$title,
      _ref5$width = _ref5.width,
      width = _ref5$width === void 0 ? 100 : _ref5$width,
      _ref5$height = _ref5.height,
      height = _ref5$height === void 0 ? 100 : _ref5$height;
  return '';
}; // eslint-disable-line


ContentGroup.propTypes = {
  title: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
var _default = ContentGroup;
exports.default = _default;