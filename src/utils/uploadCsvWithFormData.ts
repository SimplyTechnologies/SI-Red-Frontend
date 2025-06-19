export async function uploadCsvWithFormData(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${apiUrl}/vehicles/upload-csv-preview`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error?.message || "Upload failed");
  }

  return await res.json();
}
