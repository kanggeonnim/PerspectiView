import UserSidebar from '@/components/sidebar/UserSidebar';
import { MainLayout } from '@/layouts/MainLayout';
import WorkspaceBody from './components/WorkListCard';

const works = [
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 3, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 2, url: "https://picsum.photos/200/300", title: "mywork" },
  { id: 1, url: "https://picsum.photos/200/300", title: "mywork" },
  
];



// layout사용해 본것
export default function MyWorkspacePage() {
  
  return (
    <MainLayout variant="horizontal">
      <UserSidebar />
      <div className="flex items-center justify-center w-full h-full">
        <WorkspaceBody className="" word="내 워크스페이스" works={works}  />
      </div>
    </ MainLayout>
  );
}
