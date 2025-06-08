import { Button } from "@/components/ui/button";

interface Props {
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onEdit: () => void;
}

export default function ProfileActions({
  isEditing,
  onCancel,
  onSave,
  onEdit,
}: Props) {
  return isEditing ? (
    <div className="flex gap-2">
      <Button
        className="w-[10vw] h-[5vh] mr-5 min-w-[110px]"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button className="w-[10vw] h-[5vh] min-w-[110px]" onClick={onSave}>
        Save
      </Button>
    </div>
  ) : (
    <Button className="w-[10vw] h-[5vh] min-w-[110px]" onClick={onEdit}>
      Edit
    </Button>
  );
}
