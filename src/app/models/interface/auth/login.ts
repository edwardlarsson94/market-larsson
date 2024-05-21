export interface Login {
    nickName: string,
    password: string
}

export interface DataLogin {
    id: string,
    role: string,
    token:string
}

export interface LoginResults {
    status: boolean,
    data: DataLogin,
    errors: any
}
