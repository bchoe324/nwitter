import styled from "styled-components";

export const Wapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  max-width: 400px;
  padding: 50px 0;
`;

export const Title = styled.h1`
  font-size: 42px;
  display: flex;
  gap: 15px;
  align-items: center;
  img {
    height: 42px;
    width: auto;
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 0 none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 15px;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: 16px;
  a {
    color: var(--primary-color);
  }
`;
