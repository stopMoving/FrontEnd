import styled from "styled-components";
import { useEffect, useState } from "react";
import BottomNavBar from "../components/Layout/BottomNavBar";
import DonateHistoryPanel from "../components/mypageComponents/DonateHistoryPanel";
import TakeHistoryPanel from "../components/mypageComponents/TakeHistoryPanel";
import PointPanel from "../components/mypageComponents/PointPanel";
import { userAPI } from "../lib/api";
import { ReactComponent as ProfileImage } from "../assets/images/profileImage.svg";
import { ReactComponent as PointIcon } from "../assets/icons/pointIcon.svg"
import { ReactComponent as LogoImage } from "../assets/images/LogoImage.svg";
import { useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import useUserStore from "../store/useUserStore";
import ProfileImageUpload from "../components/mypageComponents/ProfileImageUpload";

export default function MyPage() {
  const location = useLocation();
  const initialTab = location.state?.initialTab || 'donate';
  const logout = useUserStore((state) => state.logout);
  const [activeTab, setActiveTap] = useState(initialTab);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchUserProfile = async () => {
    try {
      const profileData = await userAPI.getUserProfile();
      setUserProfile(profileData);
    } catch (error) {
      console.error("사용자 프로필 로딩 실패: ", error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUploadSuccess = () => {
    console.log("업로드 성공! 프로필 정보를 다시 불러옵니다.");
    fetchUserProfile();
  };
 
  const renderPanel = () => {
    if (activeTab === "donate") {
      return <DonateHistoryPanel />;
    }
    if (activeTab === "take") {
      return <TakeHistoryPanel />;
    }
    if (activeTab === "point") {
      return <PointPanel />;
    }
    return null;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!userProfile) {
    return <LoadingPage />;
  }

  return (
    <Wrap>
      <Header>
        <LogoImage width={41} height={17}/>
        <LogoutBtn onClick={() => logout()}>로그아웃</LogoutBtn>
      </Header>

      <MyInfoWrap>
        <ProfileContainer>
          <LeftWrap>
            <ProfileImageUpload
              currentImageUrl={userProfile.user_image_url}
              userId={userProfile.id}
              onUploadSuccess={handleUploadSuccess}
            />
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
          <TabButton
            onClick={() => setActiveTap("donate")}
            $active={activeTab === "donate"}
          >
            나눔 내역
          </TabButton>
          <TabButton
            onClick={() => setActiveTap("take")}
            $active={activeTab === "take"}
          >
            데려간 내역
          </TabButton>
          <TabButton
            onClick={() => setActiveTap("point")}
            $active={activeTab === "point"}
          >
            <PointIcon width={25} height={25} />
            포인트
          </TabButton>
        </TabContainer>

        <ContentWrap>{renderPanel()}</ContentWrap>
      </ReportWrap>

      <BottomNavBar />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100dvh;
  background: #FFFFFF;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  padding: 4px 20px 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #DEDEDE;
`;

const LogoutBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  background-color: #FFFFFF;
  border: none;
  cursor: pointer;
`;

const MyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 16px;
  flex-shrink: 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
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
  color: #063f21;
`;

const Reward = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 35px;
  border-radius: 20px;
  padding: 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: #11b55f;
`;

const ReportWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
`;

const TabContainer = styled.div`
  display: flex;
  // justify-content: space-around;
  border-bottom: 1px solid #6f6f6f;
  flex-shrink: 0;
`;

const TabButton = styled.button`
  flex: 1;
  position: relative;
  padding: 8px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 500;
  color: #6f6f6f;
  background-color: #ffffff;
  border: none;

  display: flex;
  justify-content: center;
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
        width: 100%;
        background: #11B55F;
        border-radius: 999px;
      }
    `}
`;

const ContentWrap = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 45px;
`;
