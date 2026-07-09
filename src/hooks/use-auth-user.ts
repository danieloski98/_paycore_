import { useAtomValue } from "jotai";
import { authUserAtom } from "@/states/auth-user-state";

export const useAuthUser = () => {
  return useAtomValue(authUserAtom);
};