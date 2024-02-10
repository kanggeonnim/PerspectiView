import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import usePlotQueryModule from "@/hook/usePlotQueryModule";
import { XCircle } from "lucide-react";

export function ConfirmModal({ teamId, productId, plotId }) {
  const { deletePlot } = usePlotQueryModule(teamId, productId, plotId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="sm" className="p-0">
          <XCircle size={15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>플롯을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription className="text-destructive-accent">
            삭제 시 플롯에 속하는 스토리가 모두 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary-accent">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
              deletePlot();
            }}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
