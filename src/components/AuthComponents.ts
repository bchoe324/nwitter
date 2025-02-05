import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 60%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 0 none;
  width: 100%;
  &[type="submit"] {
    cursor: pointer;
    background-color: var(--primary-color);
    color: #fff;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Message = styled.div`
  margin-top: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  a {
    color: var(--primary-color);
  }
`;

export const Divider = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--gray);
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 15px;
`;

export const ResetButton = styled.span`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #000;
  border: 1px solid var(--gray);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

export const Switcher = styled.span`
  margin-top: 40px;
  a {
    color: var(--primary-color);
  }
`;
