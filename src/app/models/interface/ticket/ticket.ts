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

export interface TicketResults {
    status: boolean,
    data: [Ticket],
    errors: any
}
