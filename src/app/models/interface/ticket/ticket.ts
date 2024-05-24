export interface Ticket {
    id: string,
    fullName: string,
    amountProduct: number,
    total: number,
    tax: number,
    address: string,
    phoneNumber: string,
    phoneNumberPrefix:string
    comment: string,
    createdAt: string
}

export interface DataTicket {
    id: string,
    role: string,
    token:string
}

export interface TicketResults {
    status: boolean,
    data: DataTicket,
    errors: any
}
