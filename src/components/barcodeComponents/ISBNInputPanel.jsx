import { useRef, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { bookAPI } from "../../lib/api.js";
import { ReactComponent as ExitIcon } from "../../assets/icons/ExitIcon.svg";

export default function ISBNInputPanel({
  onClose,
  onConfirm,
  mode,
  libraryId
}) {
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useUserStore((state) => state.token);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isbn.length !== 13) {
      alert("ISBN 13자리를 정확히 입력해주세요.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setLoading(true);

    try {
      let data;

      if (mode === "give") {
        data = await bookAPI.getBookByISBN(isbn);
      }
      
      else if (mode === "take") {
        const res = await bookAPI.getPickupBookDetail(isbn, libraryId);
        data = {
          bookData: res.data,
          bookIds: res.book_ids,
        };
      }

      onClose(); // ✅ 바텀 시트를 먼저 닫음
      onConfirm(data); // ✅ onConfirm 콜백으로 책 데이터 전달
    } catch (error) {
      console.error("조회 실패:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = isbn.length !== 13 || loading;

  return (
    <PanelWrap>
      <InputContainer>
        <Title>
          ISBN 코드 직접 입력
          <ExitButton type="button" onClick={onClose}>
            <ExitIcon width={22} height={22} />
          </ExitButton>
        </Title>

        <Input
          type="text"
          ref={inputRef}
          placeholder="책 뒷면 바코드 하단의 숫자 13자리를 입력해주세요."
          maxLength={13}
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
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding-top: 20px;
`;

const Title = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;
`;

const ExitButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: 0;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 47px;
  color: #000000;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 16px;

  &::placeholder {
    color: #dedede;
  }
`;

const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  width: 100%;
  padding: 0 20px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  border: 0;
  color: #ffffff;
  background: ${(p) => (p.disabled ? "#DEDEDE" : "#11B55F")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;
`;
