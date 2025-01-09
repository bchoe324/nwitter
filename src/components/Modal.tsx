import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  min-width: 240px;
  height: auto;
  background-color: #000;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Wrapper className="modal">
      <ModalBackground onClick={onClose}></ModalBackground>
      <ModalBody>{children}</ModalBody>
    </Wrapper>
  );
}
