export type AuthToken = string;
export type UserId = string;

export type AuthResponse = {
    token: AuthToken;
    userId: UserId;
};

export type PostsResponse = {
    posts: Array<TPost>;
    totalItems: number;
};

export type TPost = {
    _id: string;
    title: string;
    imageUrl: string;
    content: string;
    creator: User;
    createdAt: number;
};

export type User = {
    _id: UserId;
    name: string;
    email: string;
    password: string;
};