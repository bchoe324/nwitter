import styled from "styled-components";
import { ITweet } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    line-height: 1.5;
  }
  .image_wrapper {
    border-radius: 12px;
    overflow: hidden;
    font-size: 0;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const DeleteButton = styled.button`
  display: block;
  cursor: pointer;
  border: 0 none;
  background: none;
  height: 22px;
  width: auto;
  svg {
    stroke: #fff;
    height: 100%;
    width: auto;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export default function Tweet({ name, imageUrl, text, uid, id }: ITweet) {
  const user = auth.currentUser;

  const onDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this tweet?");

    if (!isConfirmed || user?.uid !== uid) return;
    try {
      await deleteDoc(doc(db, "tweets", id));

      if (imageUrl) {
        const locationRef = ref(storage, `tweets/${uid}-${name}/${id}`);
        await deleteObject(locationRef);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Collumn>
        <div>{name}</div>
        {user?.uid === uid ? (
          <div>
            <DeleteButton onClick={onDelete}>
              <svg
                alt="delete"
                dataSlot="icon"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </DeleteButton>
          </div>
        ) : null}
      </Collumn>
      <Collumn>
        <p>{text}</p>
      </Collumn>
      <Collumn>
        <div className="image_wrapper">
          <img src={imageUrl} />
        </div>
      </Collumn>
    </Wrapper>
  );
}
