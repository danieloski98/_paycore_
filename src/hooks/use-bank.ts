import { createBankDetails, getBanks, validateBank } from "@/services/banks/bank-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBanks = () => {
  const query = useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const res = await getBanks();
      return res.data.data;
    },
  });

  return {
    ...query,

    banks:
      query.data?.map((bank: any) => ({
        label: bank.name,
        value: bank.code,
      })) ?? [],
  };
};

export const useValidateBank = () => {
  return useMutation({
    mutationKey: ["validate-bank"],

    mutationFn: validateBank,
  });
};


export const useCreateBankDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-bank"],

    mutationFn: createBankDetails,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-bank"],
      });
    },
  });
};