export interface Login {
    nickName: string,
    password: string
}

export interface LoginResults {
    status: boolean,
    data: Login[],
    errors: any
}
