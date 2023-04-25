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

export enum INPUT_ACTIONS {
    VALUE = "value",
    TOUCH = "touch",
    FILE = "file"
    // VALID = "valid",
}

export type ValueAction = {
    type: INPUT_ACTIONS.VALUE;
    payload: string;
};

export type BlurAction = {
    type: INPUT_ACTIONS.TOUCH;
};

export type FileAction = {
    type: INPUT_ACTIONS.FILE;
    payload: File;
};

export type Actions = ValueAction | BlurAction;
export type FileActions = ValueAction | BlurAction | FileAction;

export type State = {
    value: string;
    valid: boolean;
    touched: boolean;
};

export type FileState = State & {
    file: File | null;
};