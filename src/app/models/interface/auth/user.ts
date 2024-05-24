export interface User {
    id: string,
    fullName: string,
    email: string,
    user: string,
    password: string,
    role: string
}

export interface DataUser {
    id: string,
    role: string,
    token:string
}

export interface UserResults {
    status: boolean,
    data: DataUser,
    errors: any
}
