// import UserSidebar from '@/components/sidebar/UserSidebar';
import { MainLayout } from '@/layouts/MainLayout';
import WorkspaceBody from './components/WorkspaceBody';

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


// function MyWorkspace() {
//   return (
//     <div className="flex flex-row">
//       <UserSidebar/>
//       <WorkspaceBody className="" word="내 워크스페이스" works={works} />
//     </div>
//   );
// }

// export default MyWorkspace;



function MyWorkspace(props) {
  return (
    <MainLayout order="horizon" isProduct={true} >
      <WorkspaceBody className="" word="내 워크스페이스" works={works} />
    </MainLayout>
  );
}

export default MyWorkspace;