import styled from "styled-components";
import StepHeader from "../StepHeader";
import CustomSelect from "../CustomSelect";
import { useState } from "react";

export default function LibrarySelectPanel({
  title,                 // "나눔하기" | "데려가기"
  branches = [],         // [{ id, name }]
  value,                 // 선택된 id
  onChange,              // (id) => void
  onNext,                // 다음 버튼 클릭
  loading = false,       // 목록 로딩 중이면 true
  onBack,                // 뒤로가기 콜백
}) {
  const [open, setOpen] = useState(false); // select 열림 여부
  const disabled = !value || loading;

  return (
    <Wrap>
      <StepHeader title={title} activeStep={1} onBack={onBack} />

      <Inner>
        <SectionTitle>현재 도착한 도서관을 선택해주세요.</SectionTitle>

        <CustomSelect
          options={branches.map(b => ({ value: b.libraryId, label: b.name }))}
          value={value || ""}
          onChange={onChange}
          placeholder="도서관 선택"
          disabled={loading}
        />
      </Inner>

      <BottomBar>
        <NextButton disabled={disabled} onClick={onNext}>
          다음
        </NextButton>
      </BottomBar>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #fff;
  margin: 0 auto;
  position: relative;

  /* 고정 헤더 공간 확보 + 하단 버튼 여유 */
  padding-top: 180px; 
`;

const Inner = styled.div`
  padding: 0 20px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  margin: 10px 0 20px;
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
  font-weight: 500;
  border: 0;
  color: #fff;
  background: ${(p) => (p.disabled ? "#DEDEDE" : "#11B55F")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;
`;