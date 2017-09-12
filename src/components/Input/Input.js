import React from 'react';
import Spinner from 'react-spinkit';
import styled from 'styled-components';

const InputField = styled.input.attrs({
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: "false"
})`
  font: inherit;
  font-size: 3em;
  text-align: center;
  border: none;
  background: transparent;
  border-bottom: 1px solid #222;
  outline: none;
  width: 100%;

  transition:
    border-bottom 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:focus {
    border-bottom: 1px solid #dd453c;
  }

  &:disabled {
    border-bottom: 1px solid #222;
    color: darkgrey;
  }
`;

const SpinnerInsideInputField = styled(Spinner)`
  position: absolute;
`

const Input = ({ isLoading, ...props }) => (
  <div>
    {isLoading && <SpinnerInsideInputField name="line-scale" color="#222" fadeIn="none" />}
    <InputField {...props} />
  </div>
)

export default Input;
