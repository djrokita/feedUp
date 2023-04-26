export type AuthToken = string;
export type UserId = string;

export type AuthResponse = {
    token: AuthToken;
    userId: UserId;
};

export type PostResponse = {
    post: TPost;
    message: string;
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
    creator: Partial<User>;
    createdAt: string;
};

export type User = {
    _id: UserId;
    name: string;
    email: string;
};

export type ActionPayload = {
    value: string;
    valid: boolean;
};

export type Action<T extends string> = {
    type: T;
    payload: string | boolean;
};

export type Params = "postId" | "userId";
