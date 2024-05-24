export interface User {
    id: string,
    fullName: string,
    email: string,
    user: string,
    password: string,
    role: string
}

export interface UserResults {
    status: boolean,
    data: User,
    errors: any
}
