import styled from "styled-components";
import couponImg from "../../assets/images/더북스.svg";
import setImg from "../../assets/images/거치대 set.svg";
import bouquetBookImg from "../../assets/images/부케북.svg";
import standImg from "../../assets/images/거치대.svg";
import paperBagImg from "../../assets/images/페이퍼백.svg";
import bookStoreImg from "../../assets/images/맑음책방.svg";
import { useEffect, useState } from "react";
import { userAPI } from "../../lib/api";
import LoadingPage from "../../pages/LoadingPage";

const GOODS = [
  {
    id: 1,
    point: "3000P",
    title: "더북스 신대방점 5% 할인 쿠폰",
    img: couponImg,
  },
  {
    id: 2,
    point: "5500P",
    title: "그레이프랩 친환경 휴대용 거치대 set",
    img: setImg,
  },
  {
    id: 3,
    point: "1500P",
    title: "몰리해치 부케북",
    img: bouquetBookImg,
  },
  {
    id: 4,
    point: "2000P",
    title: "그레이프랩 친환경 휴대용 거치대",
    img: standImg,
  },
  {
    id: 5,
    point: "2500P",
    title: "컬러풀 친환경 페이퍼백",
    img: paperBagImg,
  },
  {
    id: 6,
    point: "1500P",
    title: "맑음책방 어린이서점 5% 할인 쿠폰",
    img: bookStoreImg,
  },
];

export default function DonateHistoryPanel({ activeTab = 3 }) {
  const [userPoints, setUserPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await userAPI.getUserProfile();
        setUserPoints(profile.points);
      } catch (error) {
        console.error("사용자 프로필을 가져오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
    <LoadingWrap>
      <LoadingPage isCompact={true}/>
    </LoadingWrap>
    )
  }

  return (
    <Wrap>
      {GOODS.map((item) => {
        const itemPoints = parseInt(item.point);
        const isDisabled = userPoints < itemPoints;

        return (
          <GoodsWrap key={item.id} $disabled={isDisabled}>
            <ImageWrap>
              <GoodsImage
                src={item.img}
                alt={item.title}
                $disabled={isDisabled}
              />
            </ImageWrap>

            <InfoWrap>
              <Point>{item.point}</Point>
              <Title>{item.title}</Title>
            </InfoWrap>
          </GoodsWrap>
        );
      })}
    </Wrap>
  );
}

const LoadingWrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 32px;
  gap: 32px;
`;

const GoodsWrap = styled.div`
  position: relative;
  height: 195px;
  border-radius: 5px;
  border: 1px solid #dedede;
  transition: opacity 0.3s ease;
  overflow: hidden;

  ${(props) => props.$disabled && `
    pointer-events: none;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height : 100%;
      background-color: #343434;
      opacity: 0.8;
      z-index: 1;
      }
    `}
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 108px;
`;

const GoodsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3 ease;
`;

const InfoWrap = styled.div`
  width: 100%;
  height: 75px;
  padding: 8px;
`;

const Point = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0d8847;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;
