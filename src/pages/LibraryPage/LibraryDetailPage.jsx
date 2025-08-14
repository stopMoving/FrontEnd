import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoMap from "../../components/mapComponents/KakaoMap";
import LibraryMarker from "../../components/mapComponents/LibraryMarker";

import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoIcon.svg";
import instagramIcon from "../../assets/images/instaLogo.png";

// --- 실제로는 API로 가져올 목업(Mockup) 데이터 ---
const fetchLibraryData = async (libraryId) => {
  console.log(`${libraryId}에 해당하는 도서관 데이터를 API로 요청합니다.`);
  // 이 부분에 전국도서관표준데이터 API 호출 로직을 구현합니다.
  // 지금은 샘플 데이터를 반환합니다.
  return {
    id: "12345",
    libraryName: "김영삼도서관",
    address: "서울특별시 동작구 매봉로 1(상도1동 611)",
    tel: "02-827-0557~8",
    fax: "02-827-0559",
    closed: "매주 월요일, 법정공휴일, 관장이 필요하다고 인정한 날",
    weekDayOpTime: "09:00~22:00",
    weekendOpTime: "09:00~17:00",
    lat: 37.505298,
    lng: 126.957113,
  };
};

const LibraryDetailPage = () => {
  const { id } = useParams(); // URL에서 도서관 ID 가져오기 (예: /library/12345)
  const navigate = useNavigate();
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchLibraryData(id);
      setLibrary(data);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) {
    return <PageContainer>로딩 중...</PageContainer>;
  }

  if (!library) {
    return <PageContainer>도서관 정보를 찾을 수 없습니다.</PageContainer>;
  }

  // 카카오맵 길찾기 URL 생성
  const kakaoMapUrl = `https://map.kakao.com/link/map/${library.libraryName},${library.lat},${library.lng}`;

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon width={24} height={24} />
          </BackButton>
        </Header>

        <Title>
          <InfoIcon width={20} height={20} />
          <h1>{library.libraryName}</h1>
        </Title>

        <InfoSection>
          <InfoTitle>주소</InfoTitle>
          <InfoContent>{library.address}</InfoContent>
        </InfoSection>

        <MapLink href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
          <MapContainer>
            <KakaoMap center={{ lat: library.lat, lng: library.lng }}>
              <LibraryMarker library={library} />
            </KakaoMap>
          </MapContainer>
          <MapCaption>지도를 클릭하시면 카카오 지도로 이동합니다.</MapCaption>
        </MapLink>

        <InfoSection>
          <InfoTitle>연락처</InfoTitle>
          <InfoContent>전화 {library.tel}</InfoContent>
          <InfoContent>팩스 {library.fax}</InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>휴관일</InfoTitle>
          <InfoContent>{library.closed}</InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>이용시간</InfoTitle>
          <InfoContent>화~금요일 : {library.weekDayOpTime}</InfoContent>
          <InfoContent>토~일요일 : {library.weekendOpTime}</InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>SNS 안내</InfoTitle>
          <InfoContent>
            <img
              style={{ width: "24px", height: "24px" }}
              src={instagramIcon}
              alt="인스타그램"
            />
            인스타그램
          </InfoContent>
        </InfoSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default LibraryDetailPage;

// --- Styled Components ---

// const AppContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
//   height: 100%;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
// `;

const PageContainer = styled.div`
  width: 100%
  height: 100%
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 50px 20px 20px 20px;
  background-color: #fff;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const InfoSection = styled.section`
  margin-bottom: 24px;
`;

const InfoTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  border-left: 4px solid #4f614a;
  padding-left: 8px;
`;

const InfoContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  padding-left: 12px;
`;

const MapLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  margin-bottom: 24px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
`;

const MapCaption = styled.div`
  width: 100%;
  padding: 8px;
  background-color: #4f614a;
  color: white;
  text-align: center;
  font-size: 12px;
`;
