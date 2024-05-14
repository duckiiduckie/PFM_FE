import internal from "stream";

export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type UserGet = {
    id: string
    email: string;
    phoneNumber: string;
    fullName: string;
    birthDay: string;
};

export type UserTmp = {
    id: number;
    email: string;
    password: string;
}

export type UserPut = {
    email: string;
    phoneNumber: string;
    fullName: string;
    birthDay: string;
};

export type LoginResponse = {
    token: string;
    user: UserGet;
};