export type CreateDailyExpense = {
    userId: string;
    amount: number;
    description: string;
    date: Date;
    category: Category;
    type: string;
};

export type CreateFuturePlannedExpense = {
    userId: string;
    amount: number;
    description: string;
    date: Date;
    status: string;
};

export type ReadDailyExpense = {
    id:number;
    userId: string;
    amount: number;
    description: string;
    date: Date;
    category: Category;
    type: string;
}

export type ReadFuturePlannedExpense = {
    id: number;
    userId: string;
    amount: number;
    description: string;
    date: Date;
    status: string;
};

export enum Category{
    Food,
    Housing,
    Transportation,
    Utilities,
    Health,
    Other
}
