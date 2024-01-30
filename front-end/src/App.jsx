import TeamWorkspacePage from "./pages/workspace/TeamWorkspacePage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import MyPage from "./pages/MyPage/MyPage";
import IndexPage from "./pages/auth/IndexPage";
import MyWorkspacePage from "./pages/workspace/MyWorkspacePage";

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

      {/* 
      <div className="flex flex-row">
        <UserSidebar />
        <WorkspaceBody word="내 워크스페이스" works={works} /> 
      </div> */}
      <ProductPage />

      {/* <WorkspaceBody word="내 워크스페이스" works={works} /> */}
      {/* <MyWorkspacePage /> */}
      {/* <TeamCreate /> */}
      {/* <MyPage /> */}
      {/* <IndexPage /> */}
      {/* <TeamWorkspacePage /> */}
    </>
  );
}

export default App;
