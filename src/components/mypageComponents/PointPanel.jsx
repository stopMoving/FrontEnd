import styled from "styled-components";

export default function DonateHistoryPanel({
    activeTab = 3
}) {
    return (
      <Wrap>
        <BookWrap>
          <BookCover />
          <Title></Title>
          <Library></Library>
          <Quantity></Quantity>
          <DonatedDate></DonatedDate>
          <Point></Point>
        </BookWrap>
      </Wrap>
    )
}

const Wrap = styled.div`
`;

const BookWrap = styled.div`
`;

const BookCover = styled.img`
`;

const Title = styled.div`
`;

const Library = styled.div`
`;

const Quantity = styled.div`
`;

const DonatedDate = styled.div`
`;

const Point = styled.div`
`;