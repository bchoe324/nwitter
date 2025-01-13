import styled from "styled-components";
import { auth, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Collumn = styled.div`
  position: relative;
  &.avatar {
    flex: 0 0 auto;
    width: fit-content;
  }
`;

const Avatar = styled.div`
  width: 98px;
  height: 98px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  svg {
    border: 2px solid #fff;
    border-radius: 50%;
    height: 98px;
  }
  .icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #999;
    svg {
      width: 20px;
      height: 20px;
      border: 0 none;
    }
  }
`;

const AvatarLabel = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
`;

const AvatarInput = styled.input`
  display: none;
`;

const ChangeName = styled.input`
  padding: 10px 20px;
  border-radius: 4px;
  border: 0 none;
  &:focus {
    outline: 3px solid var(--primary-color);
  }
`;

const Save = styled.input`
  cursor: pointer;
  border: 1px solid var(--gray);
  color: #fff;
  background-color: #000;
  padding: 10px 20px;
  border-radius: 20px;
  &:hover {
    opacity: 0.85;
  }
`;

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName);
  const [avatar, setAvatar] = useState<{
    file: File | null;
    url: undefined | null | string;
  }>({
    file: null,
    url: user?.photoURL,
  });

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        alert("Please add image that is 1MB or less");
      } else {
        setAvatar({
          file: files[0],
          url: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user) return;
      updateProfile(user, { displayName: name });

      if (avatar.file) {
        const locationRef = ref(storage, `avatars/${user?.uid}`);
        const result = await uploadBytes(locationRef, avatar.file);
        const uploadedUrl = await getDownloadURL(result.ref);
        await updateProfile(user, { photoURL: uploadedUrl });
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Collumn className="avatar">
        <Avatar>
          {avatar.url ? (
            <img src={avatar.url} />
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
          <span className="icon">
            <svg
              dataSlot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              />
            </svg>
          </span>
        </Avatar>
        <AvatarLabel htmlFor="avatar">edit</AvatarLabel>
        <AvatarInput
          type="file"
          accept="image/*"
          id="avatar"
          onChange={onChangeFile}
        />
      </Collumn>
      <Collumn>
        <ChangeName type="text" placeholder="Name" onChange={onChangeName} />
      </Collumn>
      <Collumn>
        <Save type="submit" value="Save" />
      </Collumn>
    </Form>
  );
}
