import httpClient from "../api-service";

// company-service.ts — plain upload function (not a hook, so it can be awaited inside mutationFn)
export const upload_image = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);

  return httpClient.post("/upload/single", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
};