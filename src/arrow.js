import styled, {keyframes, css} from 'styled-components';
import {OffScreenPadding, fadeInSeconds, fadeOutSeconds} from './constants';

const arrowHeight = 8;
const moveArrowSeconds = 0.28;

const FadeInArrow = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutArrow = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;

// export for unit test
export const calculateArrowMarginLeft = (data, leftOffset, rightOffset) => css`
  margin-left: ${
  data ? data.left + (data.width / 2) - leftOffset + rightOffset - arrowHeight
    - (leftOffset > 0 || rightOffset > 0 ? OffScreenPadding : 0)
    : 0
  }px;
`;
const MoveArrow = (fromData, toData, leftOffset, rightOffset) => keyframes`
  from {
    ${calculateArrowMarginLeft(fromData, leftOffset, rightOffset)}
  }
  
  to {
    ${calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
  }
`;
const Arrow = styled.div`
  top: -${arrowHeight}px;
  z-index: 1;
  position: absolute;
  ${({toData, leftOffset, rightOffset}) => calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
  display: ${({display}) => display};
  width: 0; 
  height: 0;
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid ${({background}) => background};
  animation: ${({fadeOut, display, fromData, toData, leftOffset, rightOffset}) => {
  if (fadeOut) return FadeOutArrow;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, leftOffset, rightOffset);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveArrowSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;

export default Arrow;