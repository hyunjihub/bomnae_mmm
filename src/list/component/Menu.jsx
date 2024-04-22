import React from 'react';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 1rem;
`;

const Price = styled.h3`
  color: #9a95a3;
  font-size: 0.9rem;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Menu({ menu }) {
  return (
    <>
      <MenuBox>
        <Content>{menu.menu}</Content>
        <Price>{menu.price}</Price>
      </MenuBox>
    </>
  );
}

export default Menu;
