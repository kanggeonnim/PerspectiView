import { GoogleButton } from "./pages/auth/components/button/GoogleButton";
import { KakaoButton } from "./pages/auth/components/button/KakaoButton";
import DefaultHeader from "./components/header/DefaultHeader";
import ProductHeader from "./components/header/ProductHeader";
import UserSidebar from "./components/sidebar/UserSidebar";
import { LoginBox } from "./pages/auth/components/LoginBox";
import WorkspaceBody from "./pages/workspace/components/WorkspaceBody";
import { MainLayout } from "./layouts/MainLayout";
import { PageLayout } from "./layouts/PageLayout";
import { CharCard } from "./pages/product/components/CharCard";

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
      <MainLayout order="horizon" />
    </>
  );
}

export default App;
