import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import logo from "../../public/logo.png";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
  Divider,
} from "../components/AuthComponents";
import GithubButton from "../components/GithubButton";

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
      console.error(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div>
        <Title>
          Join <img src={logo} />
        </Title>
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
          <Input
            type="submit"
            value={isLoading ? "Loading" : "Create Account"}
          />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Divider>or</Divider>
        <GithubButton />
        <Switcher>
          Already have an account? <Link to={"/login"}>Log in &rarr;</Link>
        </Switcher>
      </div>
    </Wrapper>
  );
}
