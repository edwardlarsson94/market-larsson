export interface Register {
    id: string,
    fullName: string,
    email: string,
    user: string,
    password: string,
    role: string,
}

export interface RegisterResults {
    status: boolean,
    data: Register[],
    errors: any
}
