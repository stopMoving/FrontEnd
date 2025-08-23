import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../lib/axios";

// 컴포넌트 및 아이콘 임포트
import { ReactComponent as BackIcon } from "../../assets/icons/backIcon.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/infoIcon.svg";
import { ReactComponent as InstaGreenIcon } from "../../assets/icons/instaGreen.svg";

// 지도 컴포넌트 호출
import StaticKakaoMap from "../../components/mapComponents/StaticKakaoMap";
import LoadingPage from "../LoadingPage";

const LibraryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLibraryDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`library/detail/${id}/`);
        console.log("API 응답 데이터: ", response.data);
        setLibrary(response.data);
      } catch (err) {
        setError("도서관 정보를 불러오는 데 실패했습니다.");
        console.error("Failed to fetch library details:", err);
      } finally {
        setLoading(false);
      }
    };

    getLibraryDetails();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return (
      <PageWrapper>
        <StatusContainer>{error}</StatusContainer>
      </PageWrapper>
    );
  }
  if (!library) {
    return (
      <PageWrapper>
        <StatusContainer>도서관 정보가 없습니다.</StatusContainer>
      </PageWrapper>
    );
  }

  const kakaoMapUrl = `https://map.kakao.com/link/map/${library.name},${library.lat},${library.long}`;

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </Header>

      <ContentContainer>
        <Title>
          <InfoIcon width={20} height={20} />
          <h1>{library.name}</h1>
        </Title>

        <InfoSection>
          <InfoTitle>주소</InfoTitle>
          <AddressContent>{library.address}</AddressContent>
        </InfoSection>

        <MapLink href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
          <MapContainer>
            <StaticKakaoMap
              lat={library.lat}
              lng={library.long}
              libraryName={library.name}
            />
            <MapCaption>지도를 클릭하시면 카카오 지도로 이동합니다.</MapCaption>
          </MapContainer>
        </MapLink>

        <InfoSection>
          <InfoTitle>연락처</InfoTitle>
          <InfoContent>
            <SubLabel>전화</SubLabel>
            {library.contact}
          </InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>휴관일</InfoTitle>
          <InfoContent>
            <SubLabel>정기휴관</SubLabel>
            {library.closed_days.closed_days}
          </InfoContent>
        </InfoSection>

        <InfoSection>
          <InfoTitle>이용시간</InfoTitle>
          <InfoContent>
            <SubLabel>화~금요일</SubLabel>
            {library.hours_of_use.weekday.start} ~{" "}
            {library.hours_of_use.weekday.end}
          </InfoContent>
          <InfoContent>
            <SubLabel>토~일요일</SubLabel>
            {library.hours_of_use.saturday.start} ~{" "}
            {library.hours_of_use.saturday.end}
          </InfoContent>
        </InfoSection>

        {library.sns && (
          <InfoSection>
            <InfoTitle>SNS 안내</InfoTitle>
            <InfoContent style={{ display: "flex", alignItems: "center" }}>
              <SnsLink
                href={library.sns}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstaGreenIcon width={24} height={24} />
                <span>인스타그램 바로가기</span>
              </SnsLink>
            </InfoContent>
          </InfoSection>
        )}
      </ContentContainer>
    </PageWrapper>
  );
};

export default LibraryDetailPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.header`
  padding: 16px 20px 0;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  z-index: 10;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ContentContainer = styled.main`
  padding: 60px 20px 12px;
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
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const InfoContent = styled.div`
  font-size: 16px;
  color: #6f6f6f;
  line-height: 1.6;
  border: 1px solid #dedede;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
`;

const SubLabel = styled.span`
  color: #595959;
  font-weight: 500;
  margin-right: 8px;
`;

const AddressContent = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 400;
  line-height: 1.6;
  border: none;
`;

const MapLink = styled.a`
  display: block;
  text-decoration: none;
  margin-bottom: 24px;
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const MapCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 4px;
  background-color: #11b55f;
  color: white;
  text-align: center;
  font-size: 16px;
  z-index: 10;
`;

const SnsLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 16px;

  color: #6f6f6f;

  &:hover {
    text-decoration: none;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #666;
`;
