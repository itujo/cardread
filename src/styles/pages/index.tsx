import styled from 'styled-components';

interface cProps {
  width?: string;
  transparent?: string;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 20%;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  color: #343a40;
`;

export const Button = styled.button`
  width: ${(props: cProps) => (props.width ? props.width : '10%')};
  background: #fba920;
  margin: 20px 0;
  border-radius: 5px;
  padding: 10px;
`;

export const Logo = styled.img`
  margin-bottom: 50px;
`;

export default Container;
// #bdbdbd
// #343a40
