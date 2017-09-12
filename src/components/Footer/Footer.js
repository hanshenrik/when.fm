import React from 'react';
import styled from 'styled-components';

import lastFmLogo from './lastfm-logo.png';

const Wrapper = styled.footer`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Footer = () => (
  <Wrapper>
    <a href="https://last.fm/">
      <img src={lastFmLogo} alt="last.fm" />
    </a>
  </Wrapper>
);

export default Footer;
