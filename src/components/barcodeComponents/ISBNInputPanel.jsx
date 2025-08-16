import { useState } from "react";
import styled from "styled-components";


export default function ISBNInputPanel({
  onClose,
  mode,
  libraryId
}) {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = (value) => {
    if (isbn.length === 13) {
      console.log("입력된 ISBN: ", isbn);
      onClose();
    } else {
      alert("ISBN 13자리를 정확히 입력해주세요.");
    }
  };

  const disabled = isbn.length !== 13;

  return (
    <PanelWrap>
      <TopBar />

      <InputContainer>
        <Title>ISBN 코드 직접 입력</Title>

        <Input
          type="text"
          placeholder="책 뒷면 바코드 하단의 숫자 13자리를 입력해주세요."
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          inputMode="numeric" // 모바일에서 숫자 키패드 유도
          pattern="[0-9]*"
        />
        </InputContainer>

      <BottomBar>
        <NextButton disabled={disabled} onClick={handleSubmit}>
          확인
        </NextButton>
       </BottomBar>
    </PanelWrap>
  );
}

const PanelWrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 521px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding-bottom: 20px;
`;

const TopBar = styled.div`
  width: 80px;
  height: 4px;
  background-color: #11B55F;
  border-radius: 2px;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  min-width: 335px;
  height: 47px;
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 16px;
  
  &::placeholder {
    color: #DEDEDE;
  }
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  border: 0;
  color: #fff;
  background: ${(p) => (p.disabled ? "#DEDEDE" : "#11B55F")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;
`;