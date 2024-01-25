import DefaultHeader from "./components/header/DefaultHeader";
import ProductHeader from "./components/header/ProductHeader";
import { LoginBox } from "./pages/auth/components/LoginBox";
import { KakaoButton } from "./components/button/KakaoButton";
import { GoogleButton } from "./components/button/GoogleButton";
import UserSidebar from "./components/sidebar/UserSidebar";
import BodyHeader from "./pages/workspace/components/BodyHeader";
import WorkList from "./pages/workspace/components/WorkList";

function App() {
  const works = [
    { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
    { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  ];
  return (
    <>
      <div>
        <DefaultHeader />
        <ProductHeader />
        <LoginBox>
          <GoogleButton />
          <KakaoButton />
        </LoginBox>
      </div>
      <div className="flex flex-row">
        <UserSidebar />
        <div className="flex flex-col">
          <BodyHeader />
          <WorkList works={works} />
        </div>
      </div>
    </>
  );
}

export default App;
