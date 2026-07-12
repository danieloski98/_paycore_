export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  taxId: string | null;
  RCNumber: string;
  industry: string;
  logo: string | null;
  creatorId: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UpdateCompanyPayload = Partial<{
  name: string;
  address: string;
  phone: string | null;
  taxId: string | null;
  RCNumber: string;
  industry: string;
}>;