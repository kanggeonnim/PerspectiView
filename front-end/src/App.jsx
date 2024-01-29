import ProductHeader from "./components/header/ProductHeader";
import UserSidebar from "./components/sidebar/UserSidebar";

import WorkspaceBody from "./pages/workspace/components/WorkspaceBody";

import LoginPage from "./pages/auth/LoginPage";

import ProductPage from "./pages/product/ProductPage";
import { PageLayout } from "./layouts/PageLayout";

function App() {
  // const works = [
  //   { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  //   { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  // ];
  return (
    <>
      {/* <LoginPage /> */}
      {/* <ProductPage /> */}
      <PageLayout />
        {/* <WorkspaceBody word="내 워크스페이스" works={works} /> */}
    </>
  );
}

export default App;
