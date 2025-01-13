import styled from "styled-components";
import { auth, db } from "../firebase";
import UseModal from "../hooks/UseModal";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";
import { useEffect, useState } from "react";
import { ITweet } from "../components/Timeline";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  padding: 40px 20px;
  border-bottom: 1px solid var(--gray);
`;

const Collumn = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  svg {
    border: 2px solid #fff;
    border-radius: 50%;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const DisplayName = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const EditButton = styled.button`
  cursor: pointer;
  background: none;
  border: 0 none;
  padding: 0;
  width: 16px;
  svg {
    fill: #999;
  }
  &:hover {
    svg {
      fill: #fff;
    }
  }
`;

const JoinedDate = styled.div`
  color: #999;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

const TweetsWrapper = styled.div``;

export default function Profile() {
  const { isOpen, openModal, closeModal } = UseModal();
  const user = auth.currentUser;
  const joinedDate = user?.metadata.creationTime;

  const formatDate = (stringDate: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(stringDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const date = dateObj.getDate();

    return `${date} ${months[month]} ${year}`;
  };

  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    fetchTweet();
  }, []);

  const fetchTweet = async () => {
    const myTweets = query(
      collection(db, "tweets"),
      where("uid", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(myTweets);
    const myTweetsArray = snapshot.docs.map((doc) => {
      const { createdAt, imageUrl, name, text, uid } = doc.data();
      return {
        createdAt,
        imageUrl,
        name,
        text,
        uid,
        id: doc.id,
      };
    });
    setTweets(myTweetsArray);
  };

  return (
    <>
      <ProfileWrapper>
        <Collumn>
          <Avatar>
            {user?.photoURL ? (
              <img src={user.photoURL} />
            ) : (
              <svg
                dataSlot="icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                alt="profile"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            )}
          </Avatar>
        </Collumn>
        <Collumn>
          <DisplayName>{user?.displayName ?? "Anonymous"}</DisplayName>
          <EditButton onClick={() => openModal("EditProfile")}>
            <svg
              dataSlot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </EditButton>
        </Collumn>
        <Collumn>
          {joinedDate ? (
            <JoinedDate>
              <svg
                dataSlot="icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                />
              </svg>{" "}
              Joined {formatDate(joinedDate)}
            </JoinedDate>
          ) : null}
        </Collumn>
      </ProfileWrapper>
      <TweetsWrapper>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </TweetsWrapper>
      {/* 프로필 편집 모달 */}
      {isOpen("EditProfile") ? (
        <Modal onClose={() => closeModal("EditProfile")} title="Edit Profile">
          <EditProfile onClose={() => closeModal("EditProfile")} />
        </Modal>
      ) : null}
    </>
  );
}
