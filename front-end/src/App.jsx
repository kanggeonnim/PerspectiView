import UserSidebar from "./components/sidebar/UserSidebar"
import BodyHeader from "./pages/workspace/components/BodyHeader"
import WorkList from "./pages/workspace/components/WorkList"


function App() {
  const works = [{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:3,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"}]
  return (
    <>
      <div className="flex flex-row">
        <UserSidebar />
        <div className="flex flex-col">
          <BodyHeader />
          <WorkList works={works} />
        </div>
      </div>
    </>

  )
}

export default App
