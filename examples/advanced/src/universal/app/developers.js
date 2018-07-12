import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const RootGrid = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: [top-space] 30px [doco-row] 60px [row-space] 20px [list-row] 60px;
  font-size: 15px;
  color: lightslategray;
`;
const DocoLogo = styled.div`
  grid-row: doco-row / span 1;
  grid-column: 1 / span 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;
const HeadingText = styled.div`
  grid-row: doco-row / span 1;
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 15px;
`;
const DocumentationHeading = styled.div`
  margin: 0;
  padding-bottom: 10px;
  color: #6772e5;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: .025em;
`;
const ListGroupGrid = styled.div`
  grid-row: list-row / span 1;
  grid-column: 2 / span 1;
  display: grid;
  grid-template-columns: [get-started] auto [popular-topics] auto;
  grid-template-rows: 120px;
`;
const GetStartedGridItem = styled.div`
  grid-row: 1 / span 1;
  grid-column: get-started / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const PopularGridItem = styled.div`
  grid-row: 1 / span 1;
  grid-column: popular-topics / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const ColumnHeading = styled.div`
  color: #8898aa; 
  font-size: 14px;
`;
const List = styled.ul`
  color: #6772e5;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px
`;
const ListItem = styled.li`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export default () => {
  return (
    <RootGrid>
      <DocoLogo>
        <img src="https://www.dscsag.com/sites/default/files/loesung/ThemenLogos_Dokumentenmanagement%20invertiert_1.png"
             width={24} height={24}/>
      </DocoLogo>
      <HeadingText>
        <DocumentationHeading>DOCUMENTATION</DocumentationHeading>
        <span>Start integrating Stripe's products and tools.</span>
      </HeadingText>
      <ListGroupGrid>
        <GetStartedGridItem>
          <ColumnHeading>GET STARTED</ColumnHeading>
          <List>
            <ListItem>Elements</ListItem>
            <ListItem>Checkout</ListItem>
            <ListItem>Mobile apps</ListItem>
            <ListItem>Libraries</ListItem>
          </List>
        </GetStartedGridItem>
        <PopularGridItem>
          <ColumnHeading>POPULAR TOPICS</ColumnHeading>
          <List>
            <ListItem>Apple Pay</ListItem>
            <ListItem>Testing</ListItem>
            <ListItem>Launch checklist</ListItem>
            <ListItem>Plug-ins</ListItem>
          </List>
        </PopularGridItem>
      </ListGroupGrid>
    </RootGrid>
  );
};