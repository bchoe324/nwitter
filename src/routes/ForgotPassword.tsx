import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Message,
  Error,
} from "../components/AuthComponents";

export default function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isDone, setDone] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setDone(false);
    if (isLoading || email === "") return;
    try {
      setLoading(true);
      // log in
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      //setError
      console.error(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
      setDone(true);
    }
  };
  return (
    <Wrapper>
      <div>
        <Title>Find my account</Title>
        {/* onSubmit 함수는 form 태그에 */}
        <Form onSubmit={onSubmit}>
          <Input
            name="email"
            value={email}
            onChange={onChangeInput}
            placeholder="email"
            type="email"
            required
          />
          <Input type="submit" value={isLoading ? "Loading" : "next"} />
          {isDone ? (
            <Message>
              <span>we have emailed you a link to reset your password</span>
              <Link to={"/login"}>Log in &rarr;</Link>
            </Message>
          ) : null}
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </div>
    </Wrapper>
  );
}
