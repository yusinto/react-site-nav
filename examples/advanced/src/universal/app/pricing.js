import React from 'react';
import styled from 'styled-components';
import smiley from '../../../assets/smiley.png';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 30px;
  color: lightslategray;
`;
const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;
const Heading = styled.div`
  margin: 0;
  color: #6772e5;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: .025em;
`;
const HeadingText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Text = styled.div`
  font-size: 13px;
`;
export default () => {
  return (
    <List>
      <ListItem>
        <img src={smiley} width={24} height={24}/>
        <HeadingText>
          <Heading>STAR IT!</Heading>
          <Text>github.com/yusinto/react-site-nav</Text>
        </HeadingText>
      </ListItem>
    </List>
  );
};