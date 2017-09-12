import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  animation: ${fadeIn} 0.3s ease-in-out;

  > * {
    padding: 4px;
  }
`;

const Message = ({ icon, children }) => (
  <Wrapper>
    {icon}
    <div>{children}</div>
  </Wrapper>
);

export default Message;
