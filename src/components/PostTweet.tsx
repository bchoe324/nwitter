import styled from "styled-components";

const Form = styled.form`
  padding: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  ::placeholder {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
`;

const AttachPhotoButton = styled.label``;

const AttachPhotoInput = styled.input``;

const SubmitButton = styled.input``;

export default function PostTweet() {
  return (
    <Form>
      <Textarea placeholder="What is happening?!"></Textarea>
      <AttachPhotoButton htmlFor="file" />
      <AttachPhotoInput type="file" id="file" />
      <SubmitButton type="submit" value="Tweet" />
    </Form>
  );
}
