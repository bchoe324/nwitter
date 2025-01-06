import styled from "styled-components";

const Form = styled.form`
  padding: 20px;
  border-bottom: 1px solid var(--gray);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 0 none;
  background-color: #000;
  color: #fff;
  resize: none;
  white-space: nowrap;
  overflow-x: hidden;
  &::placeholder {
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AttachPhoto = styled.div`
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

const SubmitButton = styled.input`
  cursor: pointer;
  background-color: var(--primary-color);
  color: #fff;
  padding: 8px 20px;
  border: 0 none;
  border-radius: 25px;
`;

export default function PostTweet() {
  return (
    <Form>
      <Textarea placeholder="What is happening?!"></Textarea>
      <ButtonWrapper>
        <AttachPhoto>
          <label htmlFor="file">
            <svg
              dataSlot="icon"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              alt="add photo"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </label>
          <input type="file" id="file" />
        </AttachPhoto>
        <SubmitButton type="submit" value="Tweet" />
      </ButtonWrapper>
    </Form>
  );
}
