import React from 'react';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 1rem;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const Price = styled.h3`
  color: #9a95a3;
  font-size: 0.9rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.75rem;
  }
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Menu({ menu }) {
  const addCommas = () => {
    let price = String(menu.price);
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return price;
  };

  return (
    <>
      <MenuBox>
        <Content>{menu.menu}</Content>
        <Price>{addCommas()}</Price>
      </MenuBox>
    </>
  );
}

export default Menu;
