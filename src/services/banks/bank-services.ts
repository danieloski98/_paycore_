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