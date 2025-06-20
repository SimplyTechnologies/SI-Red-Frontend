import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import clsx from "clsx";

interface Props {
  id: string;
  label: string;
  error?: string;
  className?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function FileUploadField({
  id,
  label,
  error,
  className = "",
  files,
  onFilesChange,
}: Props) {
  return (
    <div className={clsx("flex flex-col gap-[1px]", className)}>
      <Label
        htmlFor={id}
        className="text-xs text-heading text-text-muted mb-[5px]"
      >
        {label}
      </Label>
      <div className="min-h-[44px] rounded-md border text-sm relative">
        <input
          id={id}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const newFiles = Array.from(e.target.files || []);
            onFilesChange([...files, ...newFiles]);
          }}
        />
        <Label
          htmlFor={id}
          className="h-11 px-3 flex items-center cursor-pointer hover:bg-accent rounded-md"
        >
          <Upload className="h-4 w-4 mr-2 text-text-muted" />
          <span className="text-text-muted">Upload Documents</span>
        </Label>
        {files.length > 0 && (
          <div className="p-2 border-t">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1 px-2 hover:bg-accent rounded"
              >
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => {
                    onFilesChange(files.filter((_, i) => i !== index));
                  }}
                >
                  <X className="h-4 w-4 text-text-muted" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-[14px]">
        {error && <p className="text-[11px] text-red-500 ml-1">{error}</p>}
      </div>
    </div>
  );
}