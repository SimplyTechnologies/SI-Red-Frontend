import { useVehicleStore } from "@/store/useVehicleModalStore";
import { useState, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExistingImage {
  id: string;
  image_url: string;
}

interface Props {
  existingImages?: ExistingImage[]; 
}

export default function VehicleImageUploader({ existingImages = [] }: Props) {
  const { setImages, setDeletedImageIds } = useVehicleStore();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existing, setExisting] = useState<ExistingImage[]>(existingImages); 

  useEffect(() => {
    setImages(files); 
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const merged = [...files, ...selected];

    const unique = Array.from(new Map(merged.map((f) => [f.name, f])).values());
    setFiles(unique);
    setPreviews(unique.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveExistingImage = (id: string) => {
    setExisting((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const handleRemoveNewImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="col-span-2 mb-3">
      <label className="text-sm font-medium text-text-muted block mb-1">
        Upload Images (optional)
      </label>

      <label htmlFor="vehicleImageUpload">
        <div className="flex items-center justify-center cursor-pointer text-text-muted border border-[#403C89]  hover:bg-[#403C89] hover:text-white px-4 py-2 rounded-md font-medium text-sm mt-5 bg-transparent transition-colors duration-300 ease-in-out">
          <Upload size={16} className="mr-2" /> Upload Images
        </div>
      </label>

      <input
        id="vehicleImageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2 mt-3 flex-wrap">
        {existing.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.image_url}
              className="h-16 w-16 rounded object-cover border"
            />
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(img.id)}
              className={cn(
                "absolute -top-2 -right-2 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
              )}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {previews.map((src, idx) => (
          <div key={idx} className="relative group">
            <img src={src} className="h-16 w-16 rounded object-cover border" />
            <button
              type="button"
              onClick={() => handleRemoveNewImage(idx)}
              className={cn(
                "absolute -top-2 -right-2 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
              )}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
