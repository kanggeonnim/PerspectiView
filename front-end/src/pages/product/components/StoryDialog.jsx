import { cn } from "@/lib/utils"
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { ForeshadowingCard } from "../../../components/card/ForeshadowingCard"
import { Button } from "../../../components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function StoryDialog({ className }) {
  return (
	<Card className={cn("grid grid-rows-4 grid-cols-2 grid-flow-col p-2 w-[96vw] h-[95vh] ", className)}>
		<CardContent className="col-span-1 row-span-2 border p-4">
			<CardTitle className="pt-2 text-2xl">
				전체 인물 관계도
			</CardTitle>
			<div className="p-2">
				<img src="" alt="" />
			</div>
		</CardContent>
		<CardContent className="col-span-1 row-span-2 border p-4">
			<CardTitle className="py-2 text-2xl">
				복선
			</CardTitle>
			<div className="flex flex-wrap justify-center max-h-[25vh] overflow-y-scroll">
				{/* TODO 복선카드 크기 조절 */}
				<ForeshadowingCard />
				<ForeshadowingCard />
				<ForeshadowingCard />
				<ForeshadowingCard />

			</div>
		</CardContent>
		<CardContent className="row-span-1 p-4">
			<div>
				<div className="text-2xl font-semibold">
					{/* TODO 여기에 스토리 이름 입력 */} 스토리 이름
					<div className="mt-4 text-xl font-semibold">
						등장인물
					</div>
					<div>
						{/* TODO 여기에 등장인물 이미지 */}
					</div>
				</div>
			</div>
		</CardContent>
		<CardContent className="row-span-1 p-4 relative">
			<div className="mt-4 text-xl font-semibold align-bottom absolute bottom-1">
				내용
			</div>
		</CardContent>
		<CardContent className="row-span-2 p-4">
			<div>
				<div className="col-span-1 box-border" >
					<Textarea placeholder="여기에 입력" className="p-2"/>
					<CardFooter className="justify-end mt-2 px-2">
						<Button className="mr-2" variant="gray"> 
							취소하기
						</ Button>
						<Button className="" variant="indigo"> 
							등록하기
						</ Button>
					</CardFooter>
				</div>
			</div>	
		</CardContent>
	</Card>
  )
}