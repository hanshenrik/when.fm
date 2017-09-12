import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 20px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Header = () => (
  <Wrapper>
    <p>What hours of the day do you listen to music the most?</p>
  </Wrapper>
);

export default Header;