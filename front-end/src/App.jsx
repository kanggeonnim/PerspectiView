import UserSidebar from "./components/sidebar/UserSidebar"
import WorkspaceBody from "./pages/workspace/components/WorkspaceBody"



function App() {
  const works = [{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:3,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"},{id:1,url:"https://picsum.photos/200/300",title:"mywork"},{id:2,url:"https://picsum.photos/200/300",title:"mywork"}]
  return (
    <>
      <div className="flex flex-row">
        <UserSidebar />
        <WorkspaceBody word="내 워크스페이스" works={works} />
      </div>
    </>

  )
}

export default App