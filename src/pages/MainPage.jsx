import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import useUserStore from "../store/useUserStore.js"; // 방금 만든 Zustand 스토어 import
import { useNavigate } from "react-router-dom";

// 앱이 시작될 때 한번만 실행되어 Firebase의 인증 상태 변화를 감지하고 Zustand 스토어를 업데이트합니다.
onAuthStateChanged(auth, (user) => {
  // 스토어의 setUser 액션을 호출하여 상태를 업데이트합니다.
  useUserStore.getState().setUser(user);
});

const MainPage = () => {
  const { user, isLoading } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 로그아웃 시 onAuthStateChanged 리스너가 자동으로 감지하여 user 상태를 null로 변경해줍니다.
      console.log("로그아웃 성공");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <header>
      <h1>My App</h1>
      <nav>
        {user && (
          // 로그인 된 경우 (Zustand 스토어의 user 상태를 사용)
          <div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              width="40"
              style={{ borderRadius: "50%" }}
            />
            <span>환영합니다, {user.displayName}님!</span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainPage;
