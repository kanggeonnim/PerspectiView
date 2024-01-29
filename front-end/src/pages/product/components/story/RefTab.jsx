import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RefTab() {
  return (
    <Tabs defaultValue="relation" className="flex flex-col justify-between w-1/2 h-full">
      <TabsList className="flex items-center justify-start w-full ">
        <TabsTrigger value="relation" className="text-bold">
          전체 인물 관계도
        </TabsTrigger>
        <TabsTrigger value="foreshadowing" className="text-bold">
          복선 목록
        </TabsTrigger>
        <TabsTrigger value="comment" className="text-bold">
          댓글
        </TabsTrigger>
      </TabsList>
      {/* 전체 인물 관계도 */}
      <TabsContent value="relation" className="h-full">
        <Card className="h-full "></Card>
      </TabsContent>

      {/* 복선 목록 */}
      <TabsContent value="foreshadowing" className="h-full">
        <Card className="h-full "></Card>
      </TabsContent>

      {/* 댓글 */}
      <TabsContent value="comment" className="h-full">
        <Card className="h-full "></Card>
      </TabsContent>
    </Tabs>
  );
}
