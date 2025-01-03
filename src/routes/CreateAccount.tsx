import styled from "styled-components";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 0 none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 15px;
`;

export default function CreateAccount() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (
      isLoading ||
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.password === ""
    )
      return;
    try {
      setLoading(true);
      // create an account
      const credential = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      console.log(credential.user);
      // set the name of the user
      await updateProfile(credential.user, {
        displayName: userInfo.name,
      });
      // redirect to the home page
      nav("/", { replace: true });
    } catch (e) {
      //setError
      console.log(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wapper>
      <Title>Join 🐦</Title>
      {/* onSubmit 함수는 form 태그에 */}
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={userInfo.name}
          onChange={onChangeInput}
          placeholder="name"
          type="text"
          required
        />
        <Input
          name="email"
          value={userInfo.email}
          onChange={onChangeInput}
          placeholder="email"
          type="email"
          required
        />
        <Input
          name="password"
          value={userInfo.password}
          onChange={onChangeInput}
          placeholder="password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading" : "Create Account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wapper>
  );
}
