export interface Register {
    id: string,
    fullName: string,
    email: string,
    user: string,
    password: string,
    role: string,
}

export interface LoginResults {
    status: boolean,
    data: Register[],
    errors: any
}
