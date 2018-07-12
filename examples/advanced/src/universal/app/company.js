import React from 'react';
import styled from 'styled-components';
import aboutMeIcon from '../../../assets/about-me.png';
import customersIcon from '../../../assets/customers.png';
import jobsIcon from '../../../assets/jobs.png';
import environmentIcon from '../../../assets/environment.png';

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
const StyledLink = styled.a`
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }
`;

export default () => {
  return (
    <List>
      <ListItem>
        <StyledLink href="http://reactjunkie.com">
          <img src={aboutMeIcon} width={24} height={24}/>
          <Heading>ABOUT ME</Heading>
        </StyledLink>
      </ListItem>
      <ListItem>
        <img src={customersIcon} width={24} height={24}/>
        <Heading>CUSTOMERS</Heading>
      </ListItem>
      <ListItem>
        <img src={jobsIcon} width={24} height={24}/>
        <Heading>JOBS</Heading>
      </ListItem>
      <ListItem>
        <img src={environmentIcon} width={24} height={24}/>
        <Heading>ENVIRONMENT</Heading>
      </ListItem>
    </List>
  );
};