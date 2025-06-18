import { Button } from "@/components/ui/button";

interface Props {
  isEditing: boolean;
  isSaveDisabled: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileActions({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaveDisabled,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-heading text-[18px] font-bold">
        Personal Information
      </h2>
      {isEditing ? (
        <div className="flex gap-2">
          <Button
            className="w-[10vw] h-[5vh] mr-5 min-w-[110px]"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="w-[10vw] h-[5vh] min-w-[110px]"
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button className="w-[10vw] h-[5vh] min-w-[110px]" onClick={onEdit}>
          Edit
        </Button>
      )}
    </div>
  );
}
