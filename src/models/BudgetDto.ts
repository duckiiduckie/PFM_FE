import { CategoryBudgetDto, CategoryDto } from "./ExpenseDto";

export type BudgetGet = {
    id: number;
    targetAmount: number;
    startDate: Date;
    endDate: Date;
    usedAmount: number;
    categories: CategoryBudgetDto[];
    userId: string;
    userEmail: string;
    isMailSent: boolean;
}

export type BudgetPost = {
    targetAmount: number;
    startDate: Date;
    endDate: Date;
    userId: string;
    userEmail: string;
    isMailSent: boolean;
}