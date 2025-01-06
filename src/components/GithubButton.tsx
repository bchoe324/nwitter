import styled from "styled-components";
import githubLogo from "../assets/github-mark.svg";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 20px;
  background-color: #fff;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0 none;
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  color: #000;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
`;

export default function GithubButton() {
  const nav = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      nav("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src={githubLogo} />
      Continue with Github
    </Button>
  );
}
