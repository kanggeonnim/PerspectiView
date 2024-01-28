import DefaultHeader from "./components/header/DefaultHeader";
import ProductHeader from "./components/header/ProductHeader";

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
        {/* <LoginBox>
          <GoogleButton />
          <KakaoButton />
        </LoginBox> */}
      </div>
      {/* <div className="flex flex-row">
        <UserSidebar />
        <div className="flex flex-col">
          <BodyHeader />
          <WorkList works={works} />
        </div>
      </div> */}
    </>
  );
}

export default App;
