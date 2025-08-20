import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import useUserStore from "../store/useUserStore";

import { ReactComponent as BackIcon } from "../assets/icons/backIcon.svg";
import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";
import { ReactComponent as PointIcon } from "../assets/icons/pointChat.svg";
import { ReactComponent as BookHandChatIcon } from "../assets/icons/bookHandChat.svg";
import { ReactComponent as BookChatIcon } from "../assets/icons/bookChat.svg";

const getNotificationIcon = (type) => {
  switch (type) {
    case "book_donated":
      return PointIcon;
    case "book_pickup":
      return BookHandChatIcon;
    case "여기에 놓치기전에 데려가세요 아이콘":
      return BookChatIcon;
    default:
      return BellIcon;
  }
};

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      const { token } = useUserStore.getState();

      if (!token || !token.access_token) {
        setError("로그인이 필요한 서비스입니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("notification/", {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        // 리스폰스 데이터 확인
        console.log(response.data);
        if (Array.isArray(response.data.results)) {
          setNotifications(response.data.results);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("알림을 불러오는데 실패했습니다.");
        }
        console.error("Failed to fetch notifications:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification();
  }, []);

  const rederContent = () => {
    if (isLoading)
      return (
        <StatusContainer>
          <p>로딩 중...</p>
        </StatusContainer>
      );
    if (error)
      return (
        <StatusContainer>
          <p>{error}</p>
        </StatusContainer>
      );

    // 받은 알림이 없을때의 UI
    if (notifications.length === 0) {
      return (
        <EmptyStateContainer>
          <BellIcon fill="#B5E8CD" width={48} height={48} />
          <p>받은 알림이 없습니다.</p>
        </EmptyStateContainer>
      );
    }

    // 받은 알림이 있을때의 UI
    return (
      <NotificationList>
        {notifications.map((noti) => {
          const IconComponent = getNotificationIcon(noti.type);
          return (
            <NotificationItem ket={noti.id}>
              <IconWrapper>
                <IconComponent width={24} height={24} />
              </IconWrapper>
              <Message>{noti.message}</Message>
            </NotificationItem>
          );
        })}
        <FooterText>알림은 30일 이후 순차적으로 지워집니다.</FooterText>
      </NotificationList>
    );
  };

  return (
    <PageWrapper>
      <TopNavBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon width={24} height={24} />
        </BackButton>
        <PageTitle>알림</PageTitle>
      </TopNavBar>
      <ContentContainer>{rederContent()}</ContentContainer>
    </PageWrapper>
  );
};

export default NotificationPage;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  min-height: 100vh;
  background-color: #fff;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const TopNavBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  z-index: 10;
`;
const BackButton = styled.h1`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;
const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const ContentContainer = styled.main`
  padding: 60px 0 0;
  height: 100vh;
  overflow-y: auto;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
`;
const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #dedede;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Message = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: black;
  white-space: pre-wrap; // 줄바꿈 렌더링
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #949494;
  text-align: center;
  padding: 20px;
  background-color: #fff;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  font-size: 16px;
  color: #6f6f6f;
`;

const EmptyStateContainer = styled(StatusContainer)`
  flex-direction: column;
  background-color: white;
  gap: 16px;
`;
