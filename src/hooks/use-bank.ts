import { createBankDetails, deleteBank, getBanks, getEmployeeBanks, setPrimaryBank, validateBank } from "@/services/banks/bank-services";
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
        queryKey: ["employee-banks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["employee-bank"],
      });
    },
  });
};

// export const useEmployeeBanks = () =>
//   useQuery({
//     queryKey: ["employee-banks"],
//     queryFn: async () => {
//       const { data } = await getEmployeeBanks();
//       return {
//         banks: data.data.data,
//         isLoading: data.
//       };
//     },
//   });

export const useEmployeeBanks = (enabled: boolean = true) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee-banks"],
    queryFn: async () => await getEmployeeBanks(),
    enabled
  });

  return {
    banks: data?.data.data.data,
    isLoading,
    isError,
    ...data
  }
}

export const useSetPrimaryBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["set-primary-bank"],
    mutationFn: setPrimaryBank,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-banks"],
      });
    },
  });
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-bank"],
    mutationFn: deleteBank,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-banks"],
      });
    },
  });
};