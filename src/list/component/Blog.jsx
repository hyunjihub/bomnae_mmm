import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.a`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: #00a8dd;

  &:hover {
    text-decoration: underline;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Description = styled.h3`
  font-size: 0.9rem;
  height: 3rem;
  line-height: 1.5;
  margin-bottom: 1.3rem;
  overflow-y: hidden;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    height: 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    height: 1.5rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 0.85rem;
    height: 1.3rem;
  }
`;

const Blog = ({ blog }) => {
  const removeHtmlTags = (input) => {
    return input.replace(/<[^>]+>/g, '');
  };

  return (
    <Wrapper>
      <Title href={blog.link} target="_blank">
        {removeHtmlTags(blog.title)}
      </Title>
      <Description>{removeHtmlTags(blog.description)}</Description>
    </Wrapper>
  );
};

export default Blog;
