import styled from 'styled-components';

const Loader = styled.div`
  width: ${props => `${props.progress}%` || '0'};
  height: 5px;
  transition: width 0.3s ease-in-out;
  background-color: #e87e77;
  position: fixed;
  top: 0;
`;

export default Loader;
