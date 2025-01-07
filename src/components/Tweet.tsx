import styled from "styled-components";
import { ITweet } from "./Timeline";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 15px;
  padding: 20px;
  &:nth-child(n + 2) {
    border-top: 1px solid var(--gray);
  }
`;

const Collumn = styled.div`
  .image_wrapper {
    border: 1px solid gray;
    border-radius: 12px;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

export default function Tweet({ name, imageUrl, text }: ITweet) {
  return (
    <Wrapper>
      <Collumn>{name}</Collumn>
      <Collumn>{text}</Collumn>
      <Collumn>
        <div className="image_wrapper">
          <img src={imageUrl} />
        </div>
      </Collumn>
    </Wrapper>
  );
}
