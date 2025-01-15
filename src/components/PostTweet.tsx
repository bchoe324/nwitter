import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Form,
  Textarea,
  ImagePreview,
  ButtonWrapper,
  AttachPhoto,
  SubmitButton,
} from "./EditorComponent";

export default function PostTweet() {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  // NOTE: type...언제 어떻게 쓰는건지 모르겠다
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

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
    if (!user || isLoading || text === "" || text.length > 200) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        createdAt: Date.now(),
        text,
        name: user.displayName,
        uid: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const uploadedUrl = await getDownloadURL(result.ref);
        await updateDoc(doc, {
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
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        placeholder="What is happening?!"
        rows={5}
        maxLength={200}
        value={text}
        onChange={onChangeText}
      ></Textarea>
      {url === "" ? null : (
        <ImagePreview>
          <img src={url} />
        </ImagePreview>
      )}
      <ButtonWrapper>
        <AttachPhoto>
          <label htmlFor="file">
            <svg
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={onChangeFile}
          />
        </AttachPhoto>
        <SubmitButton
          type="submit"
          value={isLoading ? "Posting..." : "Tweet"}
        />
      </ButtonWrapper>
    </Form>
  );
}
