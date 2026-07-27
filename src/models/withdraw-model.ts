import { Bank } from "./bank-model";

export interface WithdrawModalData {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
  };
  availableBalance: number;
  banks: Bank[];
  defaultBankId?: string;
}
