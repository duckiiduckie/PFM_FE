import { CategoryGet } from "./ExpenseDto";

export type BudgetGet = {
    id: number;
    total_amount: number;
    start_date: Date;
    end_date: Date;
    used_amount: number;
    categories: CategoryGet[];
    user_id: string;
}

export type BudgetPost = {
    total_amount: number;
    start_date: Date;
    end_date: Date;
    user_id: string;
}