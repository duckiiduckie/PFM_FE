
export type CreateBudget = {
    userId: string;
    amount: number;
    date: Date;
    userEmail: string;
    type: string;
    isMailSent: boolean;
    essential: number;
    want: number;
    savingAndInvestment: number;
}

export type ReadBudget = {
    id: number;
  userId: string;
  amount: number;
  usedAmount: number;
  date: Date;
  userEmail: string;
  type: string;
  isMailSent: boolean;
  essential: number;
  savingAndInvestment: number;
  want: number;
  usedEssential: number;
  usedSavingAndInvestment: number;
  usedWant: number;
}

export enum Category{
    Food,
    Housing,
    Transportation,
    Utilities,
    Health,
    Other
}
