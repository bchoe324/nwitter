import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ITweet } from "./Timeline";
import {
  EditForm,
  Textarea,
  ImagePreview,
  ButtonWrapper,
  AttachPhoto,
  SubmitButton,
} from "./EditorComponent";

interface EditTweetProps
  extends Pick<ITweet, "text" | "imageUrl" | "uid" | "id"> {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTweet({
  text,
  imageUrl,
  id,
  setModalOpen,
}: EditTweetProps) {
  const [isLoading, setLoading] = useState(false);
  const [tweetText, setText] = useState(text);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState(imageUrl);

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        alert("Please add image that is 1MB or less");
      } else {
        setFile(files[0]);
        setUrl(URL.createObjectURL(files[0]));
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweetText === "" || tweetText.length > 200)
      return;
    try {
      setLoading(true);

      const docRef = doc(db, "tweets", id);
      await updateDoc(docRef, {
        text: tweetText,
      });
      if (file) {
        // 이미지 오버라이트
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${id}`
        );

        const result = await uploadBytes(locationRef, file);
        const uploadedUrl = await getDownloadURL(result.ref);
        await updateDoc(docRef, {
          imageUrl: uploadedUrl,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setText("");
      setFile(null);
      setUrl("");
      setModalOpen(false);
    }
  };

  return (
    <EditForm onSubmit={onSubmit}>
      <Textarea
        placeholder="What is happening?!"
        rows={5}
        maxLength={200}
        value={tweetText}
        onChange={onChangeText}
      ></Textarea>
      {url === "" ? null : (
        <ImagePreview>
          <img src={url} />
        </ImagePreview>
      )}
      <ButtonWrapper>
        <AttachPhoto>
          <label htmlFor="file2">
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
          <input
            type="file"
            id="file2"
            accept="image/*"
            onChange={onChangeFile}
          />
        </AttachPhoto>
        <SubmitButton type="submit" value={isLoading ? "Posting..." : "Save"} />
      </ButtonWrapper>
    </EditForm>
  );
}
