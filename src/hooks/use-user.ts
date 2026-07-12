import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormValues } from "@/lib/schemas";
import { update_user } from "@/services/user-services/user-services";

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