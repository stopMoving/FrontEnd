import styled from "styled-components";

export default function CompletePanel({
  title,         // 상단 굵은 제목
  description,      // 작은 부제
  Icon,          // 가운데 아이콘 컴포넌트(선택)
  highlight,     // 가운데 굵은 텍스트(포인트 or 메시지)
  buttonText,    // 하단 버튼 문구
  onPrimary,     // 버튼 클릭
}) {
  return (
    <Card role="dialog" aria-modal="true">
      <Title>{title}</Title>
      <Sub
        dangerouslySetInnerHTML={{
          __html: description.replace(
            /나눔책장/g,
            `<span class="highlight-text">나눔책장</span>`
          ),
        }}
      />
      
      <IconWrap>
        <Icon width={78} height={78} />
      </IconWrap>

      <Highlight
        dangerouslySetInnerHTML={{
          __html: highlight.replace(
            /적립/g,
            `<span class="highlight-text">적립</span>`
          ),
        }}
      />

      <Button type="button" onClick={onPrimary}>
        {buttonText}
      </Button>
    </Card>
  );
}

const Card = styled.div`
  width: 335px;
  height: 352px;
  border-radius: 10px;
  background: #FFFFFF;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 0;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 15px;
`;

const Sub = styled.p`
  margin: 0;
  text-align: center;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;

  .highlight-text {
    font-size: 18px;
    font-weight: 600;
    color: #0D8847;
    }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 5px;
`;

const Highlight = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 18px;

  .highlight-text {
    font-size: 20px;
    font-weight: 500;
    }
`;

const Button = styled.button`
  height: 47px;
  border: none;
  border-radius: 10px;
  background: #11B55F;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:active { transform: translateY(1px); }
`;