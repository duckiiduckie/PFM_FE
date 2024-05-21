export type ReadExpenseDto = {
    id: number;
    userId: string;
    amount: number;
    description: string;
    date: Date;
    categoryName: string;
};

export type ExpensePost = {
    userId: string;
    amount: number;
    description: string;
    date: Date;
    category: string;
};

export type ExpenseChart = {
    amount: number;
    date: Date;
}

export type CategoryDto = {
    id: number;
    name: string;
    userId: string;
    expenses: ReadExpenseDto[];
};

export type CategoryBudgetDto = {
    id: number;
    name: string;
    userId: string;
    usedAmount: number;
    expenses: ReadExpenseDto[];
};

export type CategoryPost = {
    userId: string;
    name: string;
};

export type CategoryChart = {
    name: string;
    amount: number;
}