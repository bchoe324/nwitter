import { signOut } from "firebase/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  width: 100%;
  min-width: 480px;
  max-width: 820px;
  display: flex;
  position: relative;
  border-left: 1px solid var(--gray);
  border-right: 1px solid var(--gray);
`;

const Header = styled.header`
  position: relative;
  flex: 1 0 72px;
  justify-content: center;
  height: 100vh;
  border-right: 1px solid var(--gray);
`;

const Menu = styled.nav`
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    fill: white;
  }
  :hover {
    opacity: 0.9;
  }
  &.logout {
    cursor: pointer;
  }
  @media screen and (max-width: 720px) {
    span {
      display: none;
    }
  }
`;

const Content = styled.div`
  flex: 5 1 300px;
  position: relative;
  height: 100vh;
  overflow-y: auto;
`;

export default function Layout() {
  const nav = useNavigate();
  const onClickSubmit = async () => {
    const isLoggingOut = confirm("Are you sure you want to log out?");
    if (isLoggingOut) {
      try {
        await signOut(auth);
        nav("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Wrapper>
      <Header>
        <Menu>
          <MenuItem>
            <Link to="/">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                />
              </svg>
            </Link>
            <span>Home</span>
          </MenuItem>
          <MenuItem>
            <Link to="/profile">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            </Link>
            <span>Profile</span>
          </MenuItem>
          <MenuItem className="logout" onClick={onClickSubmit}>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              />
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
              />
            </svg>
            <span>Log out</span>
          </MenuItem>
        </Menu>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
}
