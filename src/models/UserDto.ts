export type RegisterRequest = {
    username: string;
    password: string;
    phone: string;
    name: string;
    birthday: Date;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type UserGet = {
    id: string;
    username: string;
    phone: string;
    name: string;
    birthday: Date;
};

export type LoginResponse = {
    token: string;
    user: UserGet;
};