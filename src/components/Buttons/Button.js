import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 10px;
  margin: 10px;
  font-family: inherit;
  font-size: 1em;
  background-color: #222;
  display: flex;
  align-items: center;

  animation: ${fadeIn} 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e87e77;
    cursor: pointer;
  }
`;

export default Button;
