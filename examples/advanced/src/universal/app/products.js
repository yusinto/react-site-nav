import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ListContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;
const List = styled.ul`
  color: lightslategray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ListItemContent = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    opacity: 0.7;
  }
`;
const LisItemHeadingText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  margin-left: 10px;
`;
const ListItemHeading = styled.div`
  margin: 0;
  color: #6772e5;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: .025em;
`;

export default () => {
  return (
    <ListContainer>
      <List>
        <li>
          <Link to="/contact">
            <ListItemContent>
              <img src="https://www.4cassociates.com/wp-content/uploads/2015/02/money.png"
                   width={48} height={48}/>
              <LisItemHeadingText>
                <ListItemHeading>PAYMENTS</ListItemHeading>
                <div>A complete payments platform engineered.</div>
              </LisItemHeadingText>
            </ListItemContent>
          </Link>
        </li>
        <li>
          <ListItemContent>
            <img src="https://main.yhlsoft.com/main/images/Billing-Icon-darkblue-min.png"
                 width={48} height={48}/>
            <LisItemHeadingText>
              <ListItemHeading>BILLING</ListItemHeading>
              <div>Build and scale your recurring business model.</div>
            </LisItemHeadingText>
          </ListItemContent>
        </li>
        <li>
          <ListItemContent>
            <img src="https://cdn.iconscout.com/public/images/icon/premium/png-512/share-communication-connect-connection-network-3a13801d66131b8b-512x512.png"
                 width={48} height={48}/>
            <LisItemHeadingText>
              <ListItemHeading>CONNECT</ListItemHeading>
              <div>Everything platforms need to get sellers paid.</div>
            </LisItemHeadingText>
          </ListItemContent>
        </li>
      </List>
    </ListContainer>
  );
};