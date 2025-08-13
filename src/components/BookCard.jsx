import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/**
 * 책 정보를 표시하는 카드 컴포넌트
 * @param {object} book - { id, imageUrl, title, author }
 */
const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // 카드 클릭 시 상세 페이지로 이동 (경로는 추후 결정)
  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        {/* 이미지가 없을 경우를 대비해 플레이스홀더 텍스트 표시 */}
        {book.imageUrl ? <img src={book.imageUrl} alt={book.title} /> : "책"}
      </ImageContainer>
      <TextContainer>
        <BookTitle>{book.title}</BookTitle>
        <BookAuthor>{book.author}</BookAuthor>
      </TextContainer>
    </CardContainer>
  );
};

export default BookCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 140%; /* 1:1.4 비율의 높이 설정 */
  position: relative;
  background-color: #f0f0f0;
  border-radius: 12px;
  margin-bottom: 8px;
  overflow: hidden;

  /* 이미지가 없을 때를 위한 플레이스홀더 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 14px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 컨테이너에 꽉 차도록 설정 */
  }
`;

const TextContainer = styled.div`
  text-align: left;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  /* 제목이 길 경우 말줄임표(...) 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const BookAuthor = styled.p`
  font-size: 12px;
  color: #777;
`;
