import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../components/style/Button";
import useUserStore from "../../store/useUserStore";
import axios from "../../lib/axios";

import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

const CategoryCard = ({ item, isSelected, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image src={item.cover_url} alt={item.category} />
        {isSelected && <SelectionOverlay />}
      </ImageWrapper>
      <CategoryName>{item.category}</CategoryName>
    </CardContainer>
  );
};

const AiPreferencePage = () => {
  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedIsbns, setSelectedIsbns] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 초기 데이터 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출(취향분석) 로딩 상태
  const [error, setError] = useState(null);

  // 카테고리 목록 리퀘스트
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("bookinfo/list/");
        setCategories(response.data);
      } catch (err) {
        console.error("카테고리 로딩 실패:", err);
        setError("카테고리 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (isbn) => {
    setSelectedIsbns((prev) => {
      const isAlreadySelected = prev.includes(isbn);
      if (isAlreadySelected) {
        return prev.filter((item) => item !== isbn);
      } else {
        if (prev.length < 3) {
          return [...prev, isbn];
        }
      }
      return prev;
    });
  };

  // 사용자가 선택한 ISBN 목록 POST 리퀘스트
  const handleSubmit = async () => {
    if (selectedIsbns.length !== 3) return;

    setIsSubmitting(true);
    try {
      await axios.post("preferences/keywords/", {
        isbns: selectedIsbns,
      });
      // 성공 시 메인페이지 이동
      navigate("/");
    } catch (err) {
      console.error("취향 정보 제출 실패:", err);
      setIsSubmitting(false); // 실패 시 로딩 상태 해제
    }
  };

  const isSubmitDisabled = selectedIsbns.length !== 3;

  if (isLoading || isSubmitting) {
    return (
      <PageWrapper>
        <LoadingContainer>
          {isSubmitting ? (
            <>
              <Spinner>
                <SpinnerIcon width={80} height={80} />
              </Spinner>
              <LoadingText>
                {userNickName}님을 위한
                <br />
                취향 분석 중...
              </LoadingText>
              <LoadingSubText>좋아하실 만한 책을 찾는 중이에요.</LoadingSubText>
            </>
          ) : (
            <LoadingPage />
          )}
        </LoadingContainer>
      </PageWrapper>
    );
  }
  if (error) {
    return (
      <PageWrapper>
        <LoadingContainer>{error}</LoadingContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>
          <Title>{userNickName}님,</Title>
          <Title>관심 있는 책 분야 3개를 골라주세요.</Title>
          <Subtitle>좋아하실 만한 책을 더 많이 추천해드릴게요.</Subtitle>
        </Header>

        <BookGrid>
          {categories.map((item) => (
            <CategoryCard
              key={item.isbn}
              item={item}
              isSelected={selectedIsbns.includes(item.isbn)}
              onClick={() => handleSelect(item.isbn)}
            />
          ))}
        </BookGrid>
      </ContentWrapper>

      <ButtonWrapper>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          style={{
            backgroundColor: isSubmitDisabled ? "#DEDEDE" : "#11B55F",
            margin: 0,
          }}
        >
          완료
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

export default AiPreferencePage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;

  padding-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: black;
  margin-top: 8px;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 8px;
  flex: 1;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 0.8; }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4; // 이미지가 들어갈 틀을 3:4 비율로 고정
  object-fit: cover; // 이미지가 틀을 가득 채우도록 설정
  display: block;
  border: 1px solid #dedede;
`;

const SelectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: var(--Foundation-Grey-Darker, #343434);
  opacity: 0.8;
  animation: ${fadeIn} 0.2s ease-in-out;
`;

const CategoryName = styled.span`
  font-size: 14px;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  animation: ${rotate} 1s linear infinite;
  margin-bottom: 24px;

  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
`;

const LoadingSubText = styled.p`
  font-size: 16px;
  color: black;
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  position: fixed; /* 화면에 고정 */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 600px;
  padding: 0 20px 20px;
  background-color: transparent;
`;
