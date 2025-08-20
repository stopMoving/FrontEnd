import styled from "styled-components";
import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

export default function BookInfoPage() {
    const navigate = useNavigate();
    const {isbn} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useUserStore((state) => state.token)

    const onBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (isbn) {
            fetchBookInfo(isbn);
        }
    }, [isbn, token]); //isbn 또는 token이 변경될 때마다 실행

    const fetchBookInfo = async (bookIsbn) => {
        setLoading(true);
        const accessToken = token?.access_token;
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            setLoading(false);
            return;
        }

        try {
            const url = `https://stopmoving.o-r.kr/bookinfo/donate/?isbn=${bookIsbn}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || `조회 실패 (${res.status})`);
            }

            const data = await res.json();
            setBook(data);
        } catch (e) {
            console.error("도서 정보 조회 실패: ", e);
            alert(e.message || "도서 정보를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <PageWrap>
      <Header>
        <BackButton type="button" onClick={onBack}>
          <BackIcon width={24} height={24} />
        </BackButton>

        <SectionTitle>책 정보</SectionTitle>
      </Header>
      
      <BookDetailWrap>
        <Cover>
            {book?.image
            ? <CoverImg src={book?.image} alt="" />
            : <CoverFallback />}
        </Cover>

        <BookInfoContainer>
            <BookInfoWrap>
              <Title>어린이를 위한 습관의 힘{book?.title || "-"}</Title>

              <Meta>
                <Sub>저자{book?.author || "-"}</Sub>
                <Sub>출판사{book?.publisher || "-"}</Sub>
                <Sub>출판일{book?.published_date || "-"}</Sub>
                <Sub><del>가격{book?.regular_price || "-"}</del></Sub>
              </Meta>

              <Highlight>
                <Info>3600{book?.price || "-"} 원</Info>
                <Info>ISBN 코드 : {book?.isbn || "-"}</Info>
              </Highlight>
            </BookInfoWrap>

            <LibraryInfoWrap>
              <Desc>이 책이 있는 도서관</Desc>

              <LibraryWrap>
                <Library>김영삼도서관</Library>
                <LibraryInfo>150m</LibraryInfo>
              </LibraryWrap>
            </LibraryInfoWrap>

          </BookInfoContainer>
        </BookDetailWrap>

      </PageWrap>
  )
}

const PageWrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #E6F4F0;
  margin: 0 auto;
  padding: 30px 0;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const BookDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10px;
  gap: 20px;
  flex: 1;
  min-height: calc(100dvh - 60px);
`;

const Cover = styled.div`
  width: 199px;
  height: 253px;
  margin: 0 auto;
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
  padding: 20px 25px;
  background-color: #FFFFFF;
  flex: 1;
`;

const BookInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 16px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Sub = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #868686;
`;

const Highlight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 40px;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const LibraryInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000000;
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
  padding: 20px 30px;
  gap: 8px;
;`

const Library = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const LibraryInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
`;