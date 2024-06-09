export type ReadMainIncome = {
    id: number;
    userId: string;
    description: string;
    amount: number;
    date: Date;
    name: string;
};

export type CreateMainIncome = {
    userId: string;
    description: string;
    amount: number;
    date: Date;
    name: string;
};

export type ReadAdditionalIncome = {
    id: number;
    userId: string;
    amount: number;
    description: string;
    date: Date;
    category:string;
}

export type CreateAdditionalIncome = {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
};
