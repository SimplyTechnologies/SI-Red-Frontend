import type { ParsedVehicleUpload } from "@/api/schemas";
import { BASE_URL } from "@/config/apiConfig";

export async function uploadCSVPreview(
  formData: FormData
): Promise<ParsedVehicleUpload[]> {
  const res = await fetch(`${BASE_URL}/vehicles/upload-csv-preview`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error?.message || "Upload failed");
  }

  return await res.json();
}
