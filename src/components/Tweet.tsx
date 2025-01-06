import { ITweet } from "./Timeline";

export default function Tweet({ name, imageUrl, text }: ITweet) {
  return (
    <>
      <div>{name}</div>
      <div>
        <img src={imageUrl} />
      </div>
      <div>{text}</div>
    </>
  );
}
