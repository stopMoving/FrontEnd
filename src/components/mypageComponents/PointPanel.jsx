import styled from "styled-components";

export default function DonateHistoryPanel({
    activeTab = 3
}) {
    return (
      <Wrap>
        <GoodsWrap>
          <ImageWrap>
            <GoodsImage />
          </ImageWrap>

          <InfoWrap>
            <Point></Point>
            <Title></Title>    
          </InfoWrap>  
        </GoodsWrap>
      </Wrap>
    )
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 32px;
`;

const GoodsWrap = styled.div`
  width: 139px;
  height: 183px;
  border-radius: 5px;
  border: 1px solid #DEDEDE;
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 108px;
`;

const GoodsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoWrap = styled.div`
  width: 100%;
  height: 75px;
  padding: 8px;
`;

const Point = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0D8847;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;