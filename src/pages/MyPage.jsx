import styled from "styled-components"
import { useEffect, useState } from "react";
import BottomNavBar from "../components/Layout/BottomNavBar"
import DonateHistoryPanel from "../components/mypageComponents/DonateHistoryPanel"
import TakeHistoryPanel from "../components/mypageComponents/TakeHistoryPanel"
import PointPanel from "../components/mypageComponents/PointPanel"
import { userAPI } from "../lib/axios";
import { ReactComponent as ProfileImage } from "../assets/images/profileImage.svg";
import { ReactComponent as PointIcon } from "../assets/icons/pointIcon.svg"

export default function MyPage() {
    const [activeTab, setActiveTap] = useState('donate');
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const profileData = await userAPI.getUserProfile();
          setUserProfile(profileData);
        } catch (error) {
          console.error("사용자 프로필 로딩 실패: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserProfile();
    }, []);

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

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!userProfile) {
        return <div>사용자 정보를 불러올 수 없습니다.</div>;
    }

    return (
      <Wrap>
        <MyInfoWrap>
          <ProfileContainer>
            <LeftWrap>
              <ProfileImage width={70} height={70}/>
              <Name>{userProfile.nickname}님</Name>
            </LeftWrap>

            <Reward>{userProfile.points} P</Reward>
          </ProfileContainer>

          <HashTagContainer>
            {userProfile.keywords.map((tag, index) => (
                <HashTag key={index}>#{tag}</HashTag>
            ))}
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

          <ContentWrap>
            {renderPanel()}
          </ContentWrap>
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
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const MyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px 0;
  margin-bottom: 50px;
  flex-shrink: 0;
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
  flex-grow: 1;
  min-height: 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #000000;
  flex-shrink: 0;
`;

const TabButton = styled.button`
  position: relative;
  padding: 3px 6px 11px;
  font-family: inherit;
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

const ContentWrap = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 40px;
`;