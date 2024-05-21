export type IncomeGet = {
    id: number;
    amount: number;
    description: string;
    date: Date;
    categoryName: string;
    userId: string;
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
    userId: string;
    incomes: IncomeGet[];
};

export type CategoryPost = {
    userId: string;
    name: string;
};

export type CategoryChart = {
    name: string;
    amount: number;
}
