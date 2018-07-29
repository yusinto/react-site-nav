import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';

const fadeOutContentSeconds = 0.29;
const fadeInContentSeconds = 0.1;

const FadeInContent = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutContent = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;

export const ContentGroupContainer = styled.div`
  position: absolute;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  opacity: ${({show}) => show ? 1 : 0};
  z-index: ${({show}) => show ? 1 : 0};
  animation: ${({show, fadeOut}) => {
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}} 
  ${({show}) => show ? `${fadeInContentSeconds}` : `${fadeOutContentSeconds}`}s
  forwards;
`;

const ContentGroup = ({title = 'title', width = 100, height = 100}) => ''; // eslint-disable-line
ContentGroup.propTypes = {
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default ContentGroup;