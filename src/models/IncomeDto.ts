export type IncomeGet = {
    id: number;
    amount: number;
    description: string;
    date: Date;
    category: string;
    user_id: string;
};

export type IncomePost = {
    amount: number;
    description: string;
    date: Date;
    category: string;
    userId: string;
};

export type IncomeChart = {
    date: Date;
    amount: number;
}

export type CategoryGet = {
    id: number;
    name: string;
    user_id: string;
    incomes: IncomeGet[];
};

export type CategoryPost = {
    user_id: string;
    name: string;
};

export type CategoryChart = {
    name: string;
    amount: number;
}
