import styled from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { bookAPI } from "../lib/api";

export default function BookInfoPage() {
    const navigate = useNavigate();
    const {isbn} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const { location, isLocationLoading } = useUserStore();

    const onBack = () => {
        navigate(-1);
    }

    const fetchBookInfo = async (bookIsbn, lat, lng) => {
        setLoading(true);
        try {
            const data = await bookAPI.getBookInfoByISBN(bookIsbn, lat, lng);
            console.log("Received Book Data: ", data);

            setBook({
                ...data,
                libraries: data?.libraries || [],
            });
        } catch (e) {
            console.error("도서 정보 조회 실패: ", e);
            alert(e.message || "도서 정보를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      if (isbn && location?.latitude != null && location?.longitude != null ) {
        fetchBookInfo(isbn, location.latitude, location.longitude);
      }
    }, [isbn, location?.latitude, location?.longitude]);

  if (isLocationLoading) {
    return (
        <PageWrap>
          <Header>
            <BackButton type="button" onClick={onBack}>
              <BackIcon width={24} height={24} />
            </BackButton>
          </Header>

          <p>위치 정보를 불러오는 중...</p>
        </PageWrap>
    );
  }
  
  return (
    <PageWrap>
      <Header>
        <BackButton type="button" onClick={onBack}>
          <BackIcon width={24} height={24} />
        </BackButton>
      </Header>
      
      <BookDetailWrap>
        <Cover>
            {book?.cover_url
            ? <CoverImg src={book?.cover_url} alt="" />
            : <CoverFallback />}
        </Cover>

        <BookInfoContainer>
            <BookInfoWrap>
              <Title>{book?.title || "-"}</Title>

              <Meta>
                <Sub>{book?.author || "-"}</Sub>
                <Sub>{book?.publisher || "-"}</Sub>
                <Sub>{book?.published_date || "-"}</Sub>
                <Sub><del>{book?.regular_price || "-"}</del>원</Sub>
              </Meta>

              <Highlight>
                <Info>{book?.sale_price || "-"} 원</Info>
                <Info>ISBN 코드 : {book?.isbn || "-"}</Info>
              </Highlight>
            </BookInfoWrap>

            <LibraryInfoWrap>
              <Desc>이 책이 있는 도서관</Desc>

              {book?.libraries.length > 0 && 
                book.libraries.map((library) => (
                  <LibraryWrap key={library.library_id}>
                    <LibraryName>{library.name}</LibraryName>
                    <LibraryInfo>
                        <span>{library.distance_m}m</span>
                        <span>수량: {library.available_books}권</span>
                    </LibraryInfo>
                  </LibraryWrap>
                ))
            }
            </LibraryInfoWrap>

            <BookIntroduceWrap>
              <Desc>책 소개</Desc>
              <Introduce>{book?.description || "-"}</Introduce>
            </BookIntroduceWrap>

        </BookInfoContainer>
      </BookDetailWrap>

      </PageWrap>
  )
}

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #E6F4F0;
`;

const Header = styled.div`
  position: relative;
  height: 52px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  margin: 38px 20px 0;
`;

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const BookDetailWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
  // flex: 1;
  // min-height: calc(100dvh - 60px);
`;

const Cover = styled.div`
  width: 199px;
  height: 253px;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const CoverFallback = styled.div`
  width: 199px;
  height: 253px;
  border-radius: 5px;
  background-color: #D9D9D9;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BookInfoContainer = styled.div`
  width: 100%;
  padding: 8px 20px 0;
  background-color: #FFFFFF;
  flex: 1;
`;

const BookInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const Highlight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const LibraryInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  margin: 40px 0;
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
`;

const LibraryWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E6F4F0;
  color: #000000;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 4px;
`;

const LibraryName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12px;
`;

const LibraryInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  gap: 8px;
`;

const BookIntroduceWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  // justify-content: center;
  // align-items: center;
`;

const Introduce = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
`;