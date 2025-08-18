import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
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
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 140%;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;

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
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 4px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  min-height: 2.4em;
  line-height: 1.2;
`;

const BookAuthor = styled.p`
  font-size: 12px;
  color: #868686;
  margin: 0;
  line-height: 1.4;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  min-height: 2.8em;
`;
