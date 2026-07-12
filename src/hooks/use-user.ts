import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormValues } from "@/lib/schemas";
import { update_user } from "@/services/user-services/user-services";
import { upload_image } from "@/services/upload/upload-service";

export const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update_user", id],
        mutationFn: (payload: Partial<UserFormValues>) =>
            update_user({ id, payload }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", id] });
        },
    });
};


// hooks/use-user.ts

interface UpdateUserPicturePayload {
  userId: string;
  file: File;
}

export const useUpdateUserPicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-picture"],

    mutationFn: async ({ userId, file }: UpdateUserPicturePayload) => {
      const uploadRes = await upload_image(file); // the same plain function used for the company logo
      const picture = uploadRes?.data;

      if (!picture) {
        throw new Error("No image URL returned");
      }

      await update_user({
        id: userId,
        payload: { picture },
      });

      return picture as string;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};