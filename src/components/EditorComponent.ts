import styled from "styled-components";

export const Form = styled.form`
  padding: 20px;
  border-bottom: 1px solid var(--gray);
`;

export const EditForm = styled.form`
  width: 100%;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 0 none;
  background-color: #000;
  color: #fff;
  resize: none;

  overflow-x: hidden;
  &::placeholder {
    white-space: nowrap;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: #999;
    font-size: 16px;
  }
  &:focus {
    outline: 0;
  }
`;

export const ImagePreview = styled.div`
  margin-bottom: 20px;
  img {
    width: 80px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AttachPhoto = styled.div`
  input {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      width: 24px;
      stroke: var(--primary-color);
    }
  }
`;

export const SubmitButton = styled.input`
  cursor: pointer;
  background-color: var(--primary-color);
  color: #fff;
  padding: 8px 20px;
  border: 0 none;
  border-radius: 25px;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
