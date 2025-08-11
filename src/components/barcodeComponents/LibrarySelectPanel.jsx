import styled from "styled-components";

export default function LibrarySelectPanel({
  title,                 // "나눔하기" | "데려가기"
  branches = [],         // [{id, name}]
  value,                 // 선택된 id
  onChange,              // (id) => void
  onNext,                // 다음 버튼 클릭
  loading = false,       // 목록 로딩중이면 true
}) {
  const disabled = !value || loading;

  return (
    <Wrap>
      <Header>
        <Back>&lt;</Back>
        <H1>{title}</H1>
        <Spacer />
      </Header>

      <Steps>
        <Step active>STEP 1</Step>
        <Step>STEP 2</Step>
        <Step>STEP 3</Step>
      </Steps>

      <SectionTitle>현재 도착한 도서관을 선택해주세요.</SectionTitle>

      <Field>
        <Label>도서관 선택</Label>
        <Select
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={loading}
        >
          <option value="" disabled>도서관 선택</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </Select>
      </Field>

      <BottomBar>
        <NextButton disabled={disabled} onClick={onNext}>다음</NextButton>
      </BottomBar>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background:#fff;
  margin: 0 auto;
  position: relative;
  padding: 70px 20px 100px; /* 상단/하단 바 여유 */
`;

const Header = styled.header`
  position: fixed;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 50px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 0 20px;
  background:#fff;
  border-bottom:1px solid #eee;
  z-index: 10;
`;

const Back = styled.button`
  background:none;
  border:0;
  font-size:20px;
`;

const H1 = styled.div`
  font-weight:700;
`;

const Spacer = styled.div`
  width:20px;`
;

const Steps = styled.div`
  display:flex;
  gap:28px;
  align-items:flex-end;
  padding: 16px 0 8px;
  border-bottom:1px solid #ddd;
  margin-bottom:24px;
`;

const Step = styled.div`
  padding-bottom:8px;
  font-weight:600;
  color:#9ca3af;
  ${({active}) => active && `color:#111; border-bottom:2px solid #111;`}
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  line-height: 1.4;
  margin: 10px 0 24px;
`;

const Field = styled.div`
  margin-top: 8px;
`;

const Label = styled.div`
  font-size:14px;
  color:#6b7280;
  margin-bottom:6px;
`;

const Select = styled.select`
  width:100%;
  padding:12px 4px;
  border:0;
  border-bottom:2px solid #111;
  font-size:16px;
  outline:none;
  background:#fff;
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
  width:100%;
  height:56px;
  border-radius:10px;
  font-weight:700;
  border:0;
  color:#fff;
  background:#111;
  opacity:${p=>p.disabled?0.35:1};
`;