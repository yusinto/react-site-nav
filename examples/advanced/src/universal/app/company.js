import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 30px;
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
  margin-left: 10px;
`;
export default () => {
  return (
    <List>
      <ListItem>
        <img src="https://buddypress.org/media/disc.png"
             width={24} height={24}/>
        <Heading>ABOUT ME</Heading>
      </ListItem>
      <ListItem>
        <img src="https://boonyah.com/wp-content/themes/BoonYah/images/acquisition-icons.png"
             width={24} height={24}/>
        <Heading>CUSTOMERS</Heading>
      </ListItem>
      <ListItem>
        <img src="https://cdn2.iconfinder.com/data/icons/computer-roundline/512/share-512.png"
             width={24} height={24}/>
        <Heading>JOBS</Heading>
      </ListItem>
      <ListItem>
        <img src="http://www.nkwedrill.com/wp-content/uploads/2015/12/environment.png"
             width={24} height={24}/>
        <Heading>ENVIRONMENT</Heading>
      </ListItem>
    </List>
  );
};