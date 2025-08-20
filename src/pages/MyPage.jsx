import styled from "styled-components"
import { useState } from "react";
import BottomNavBar from "../components/Layout/BottomNavBar"
import DonateHistoryPanel from "../components/mypageComponents/DonateHistoryPanel"
import TakeHistoryPanel from "../components/mypageComponents/TakeHistoryPanel"
import PointPanel from "../components/mypageComponents/PointPanel"
import { ReactComponent as ProfileImage } from "../assets/images/profileImage.svg";
import { ReactComponent as PointIcon } from "../assets/icons/pointIcon.svg"

export default function MyPage() {
    const [activeTab, setActiveTap] = useState('donate');

    const renderPanel = () => {
        if (activeTab === 'donate') {
            return <DonateHistoryPanel />
        }
        if (activeTab === 'take') {
            return <TakeHistoryPanel />
        }
        if (activeTab === 'point' ) {
            return <PointPanel />
        }
        return null;
    };

    return (
      <Wrap>
        <MyInfoWrap>
          <ProfileContainer>
            <LeftWrap>
              <ProfileImage width={70} height={70}/>
              <Name>닉네임님</Name>
            </LeftWrap>

            <Reward>3400 P</Reward>
          </ProfileContainer>

          <HashTagContainer>
            <HashTag>#자기계발</HashTag>
            <HashTag>#재태크</HashTag>
            <HashTag>#연애</HashTag>
            <HashTag>#소설</HashTag>
            <HashTag>#컴퓨터</HashTag>
            <HashTag>#여행</HashTag>
          </HashTagContainer>
        </MyInfoWrap>
        
        <ReportWrap>
          <TabContainer>
              <TabButton onClick={() => setActiveTap('donate')} $active={activeTab === 'donate'}>나눔 내역</TabButton>
              <TabButton onClick={() => setActiveTap('take')} $active={activeTab === 'take'}>데려간 내역</TabButton>
              <TabButton onClick={() => setActiveTap('point')} $active={activeTab === 'point'}>
                <PointIcon width={25} height={25} />
                포인트
              </TabButton>
          </TabContainer>

          <ContetnWrap>
            {renderPanel()}
          </ContetnWrap>
        </ReportWrap>
        
        <BottomNavBar />
        </Wrap>
    )
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  background: #FFFFFF;
  margin: 0 auto;
  padding: 30px 0;
`;

const MyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px 0;
  margin-bottom: 50px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;

const HashTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 164px;
  gap: 4px;
`;

const HashTag = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #063F21;
`;

const Reward = styled.div`
  width: 71px;
  height: 35px;
  border-radius: 20px;
  padding: 0 8px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 8px;
  color: #FFFFFF;
  background-color: #11B55F;
`;

const ReportWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #000000;
`;

const TabButton = styled.button`
  position: relative;
  padding: 3px 6px 11px;
  font-size: 20px;
  font-weight: 500;
  color: #6F6F6F;
  background-color: #FFFFFF;
  border: none;

  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $active }) =>
    $active &&
    `
      color: #000000;
    `}

  ${({ $active }) =>
    $active &&
    `
      &::after{
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -2px;
        height: 3.5px;
        width: clamp(72px, 31vw, 140px); /* 가운데 짧은 밑줄 */
        background: #11B55F;
        border-radius: 999px;
      }
    `}
`;

const ContetnWrap = styled.div`

`;