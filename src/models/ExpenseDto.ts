export type ExpenseGet = {
    id: number;
    user_id: string;
    amount: number;
    description: string;
    date: Date;
    category: string;
};

export type ExpensePost = {
    user_id: string;
    amount: number;
    description: string;
    date: Date;
    category: string;
};

export type ExpenseChart = {
    amount: number;
    date: Date;
}

export type CategoryGet = {
    id: number;
    name: string;
    user_id: string;
    expenses: ExpenseGet[];
};

export type CategoryPost = {
    user_id: string;
    name: string;
};

export type CategoryChart = {
    name: string;
    amount: number;
}