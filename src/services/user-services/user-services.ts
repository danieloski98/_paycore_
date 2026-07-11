import httpClient from "@/services/api-service";
import { UserFormValues } from "@/lib/schemas";
import { URLS } from "@/lib/urls";

type UpdateUserPayload = {
  id: string;
  payload: Partial<UserFormValues>;
};

export const update_user = ({ id, payload }: UpdateUserPayload) => {
  return httpClient.patch(URLS.users.update_user(id), payload);
};