import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RefTab() {
  return (
    <Tabs defaultValue="relation" className="w-1/2 h-full border border-yellow-300">
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
      <TabsContent value="relation" className="border border-yellow-300 min-h-100vh">
        <Card className="flex flex-col min-h-100vh">
          <CardContent className="space-y-2"></CardContent>
        </Card>
      </TabsContent>

      {/* 복선 목록 */}
      <TabsContent value="foreshadowing">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* 댓글 */}
      <TabsContent value="comment">
        <Card>
          <CardHeader>
            <CardTitle>댓글</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
