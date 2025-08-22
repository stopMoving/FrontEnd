import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../components/style/Button";
import useUserStore from "../../store/useUserStore";

import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";

const mockBookCategories = [
  {
    id: 1,
    category: "소설/시/희곡",
    imageUrl: "https://placehold.co/106x129?text=소설",
  },
  {
    id: 2,
    category: "에세이",
    imageUrl: "https://placehold.co/106x129?text=에세이",
  },
  {
    id: 3,
    category: "자기계발",
    imageUrl: "https://placehold.co/106x129?text=자기계발",
  },
  {
    id: 4,
    category: "경제/경영",
    imageUrl: "https://placehold.co/106x129?text=경제",
  },
  {
    id: 5,
    category: "건강/취미",
    imageUrl: "https://placehold.co/106x129?text=건강",
  },
  {
    id: 6,
    category: "역사/문화",
    imageUrl: "https://placehold.co/106x129?text=역사",
  },
  {
    id: 7,
    category: "여행/지리",
    imageUrl: "https://placehold.co/106x129?text=여행",
  },
  {
    id: 8,
    category: "과학/기술",
    imageUrl: "https://placehold.co/106x129?text=과학",
  },
  {
    id: 9,
    category: "외국어",
    imageUrl: "https://placehold.co/106x129?text=외국어",
  },
  {
    id: 10,
    category: "여행/지리",
    imageUrl: "https://placehold.co/106x129?text=여행",
  },
  {
    id: 11,
    category: "과학/기술",
    imageUrl: "https://placehold.co/106x129?text=과학",
  },
  {
    id: 12,
    category: "외국어",
    imageUrl: "https://placehold.co/106x129?text=외국어",
  },
];

const CategoryCard = ({ item, isSelected, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <Image src={item.imageUrl} alt={item.category} />
        {isSelected && <SelectionOverlay />}
      </ImageWrapper>
      <CategoryName>{item.category}</CategoryName>
    </CardContainer>
  );
};

const AiPreferencePage = () => {
  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (itemId) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.includes(itemId);
      if (isAlreadySelected) {
        return prev.filter((id) => id !== itemId);
      } else {
        if (prev.length < 3) {
          return [...prev, itemId];
        }
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    console.log("선택된 카테고리 ID:", selected);
    setIsLoading(true);
  };

  const isSubmitDisabled = selected.length !== 3;

  if (isLoading) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner>
            <SpinnerIcon width={80} height={80} />
          </Spinner>
          <LoadingText>
            {userNickName}님을 위한
            <br />
            취향 분석 중...
          </LoadingText>
          <LoadingSubText>좋아하실 만한 책을 찾는 중이에요.</LoadingSubText>
        </LoadingContainer>
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
          {mockBookCategories.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
              isSelected={selected.includes(item.id)}
              onClick={() => handleSelect(item.id)}
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
  border-radius: 8px;
  display: block;
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
  //   animation: ${rotate} 0.8s ease-in-out infinite;
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
  background-color: #fff;
`;
