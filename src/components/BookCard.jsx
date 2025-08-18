import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onClick }) => {
  const navigate = useNavigate();

  const handleClick = onClick
    ? onClick
    : () => {
        if (book.isbn) {
          navigate(`/book/${book.isbn}`);
        }
      };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
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

  /* 고정 크기 설정 */
  width: 110px;
  height: 170px;

  flex-shrink: 0; /* 크기 축소 방지 */
`;

const ImageContainer = styled.div`
  width: 110px;
  height: 130px;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  flex-shrink: 0; /* 크기 축소 방지 */

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  width: 110px;
  overflow: hidden;

  /* 남은 공간 활용하되 고정 너비 유지 */
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* flexbox에서 overflow 처리를 위해 필요 */
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin: 0 0 4px 0;

  /* 텍스트 오버플로우 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 최대 너비 설정 */
  max-width: 110px;
  line-height: 1.2;
`;

const BookAuthor = styled.p`
  font-size: 12px;
  color: #868686;
  margin: 0;

  /* 텍스트 오버플로우 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 최대 너비 설정 */
  max-width: 110px;
  line-height: 1.2;
`;
