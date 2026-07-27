import { URLS } from "@/lib/urls";
import httpClient from "../api-service";
import { BankDetailsFormValues } from "@/lib/schemas";

export const getBanks = () =>
  httpClient.get(URLS.bank.get_banks);

export const validateBank = (payload: {
  accountNumber: string;
  bankCode: string;
}) =>
  httpClient.post(
    URLS.bank.validate_bank,
    payload
  );

export const createBankDetails = (
  payload: BankDetailsFormValues
) =>
  httpClient.post(
    URLS.bank.create_bank,
    payload
  );


export const getEmployeeBanks = () =>
  httpClient.get(URLS.bank.get_employee_banks);

export const setPrimaryBank = (bankId: string) =>
  httpClient.put(URLS.bank.primary_bank(bankId));

export const deleteBank = (bankId: string) =>
  httpClient.delete(URLS.bank.delete_bank(bankId));