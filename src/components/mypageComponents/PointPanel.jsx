import styled from "styled-components";
import couponImg from "../../assets/images/더북스.svg";
import setImg from "../../assets/images/거치대 set.svg";
import bouquetBookImg from "../../assets/images/부케북.svg";
import standImg from "../../assets/images/거치대.svg";
import paperBagImg from "../../assets/images/페이퍼백.svg";
import bookStoreImg from "../../assets/images/맑음책방.svg";
import { useEffect, useState } from "react";
import { userAPI } from "../../lib/api";
import LoadingPage from "../../pages/LoadingPage";

const GOODS = [
    {
      id: 1,
      point: "3000P",
      title: "더북스 신대방점 5% 할인 쿠폰",
      img: couponImg
    },
    {
      id: 2,
      point: "55000P",
      title: "그레이프랩 친환경 휴대용 거치대 set",
      img: setImg
    },
    {
      id: 3,
      point: "1500P",
      title: "몰리해치 부케북",
      img: bouquetBookImg
    },
    {
      id: 4,
      point: "2000P",
      title: "그레이프랩 친환경 휴대용 거치대",
      img: standImg
    },
    {
      id: 5,
      point: "2500P",
      title: "컬러풀 친환경 페이퍼백",
      img: paperBagImg
    },
    {
      id: 6,
      point: "1500P",
      title: "맑음책방 어린이서점...",
      img: bookStoreImg
    }
  ]

export default function DonateHistoryPanel({
    activeTab = 3
}) {
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
    <LoadingPage />
  }
  
  return (
    <Wrap>
      {GOODS.map((item) => {
        const itemPoints = parseInt(item.point);
        const isDisabled = userPoints < itemPoints;

        return (
          <GoodsWrap key={item.id} $disabled={isDisabled}>
            <ImageWrap>
              <GoodsImage src={item.img} alt={item.title} $disabled={isDisabled}/>
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

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 32px;
  gap: 32px;
`;

const GoodsWrap = styled.div`
  height: 195px;
  border-radius: 5px;
  border: 1px solid #DEDEDE;
  transition: opacity 0.3s ease;

  ${(props) => props.$disabled && `
    opacity: 0.8;
    pointer-events: none;
    filter: grayscale(100%);
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

  ${(props) => props.$disabled && `
    opacity: 0.5;
    `}
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