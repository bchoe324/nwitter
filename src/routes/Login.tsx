import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import logo from "../../public/logo.png";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Divider,
  Error,
  Switcher,
  ResetButton,
} from "../components/AuthComponents";
import GithubButton from "../components/GithubButton";

export default function Login() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
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
    if (isLoading || userInfo.email === "" || userInfo.password === "") return;
    try {
      setLoading(true);
      // log in
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
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
          Log into <img src={logo} />
        </Title>
        {/* onSubmit 함수는 form 태그에 */}
        <Form onSubmit={onSubmit}>
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
          <Input type="submit" value={isLoading ? "Loading" : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Divider>or</Divider>
        <GithubButton />
        <ResetButton>
          <Link to={"/forgot-password"}>Forgot your password?</Link>
        </ResetButton>
        <Switcher>
          Don't have an account?{" "}
          <Link to={"/create-account"}>Create one &rarr;</Link>
        </Switcher>
      </div>
    </Wrapper>
  );
}
