export interface Product {
    id: string,
    image:string,
    name: string,
    description: string,
    price: number,
    availableQuantity:number,
    available: boolean
}

export interface ProductResults {
    status: boolean,
    data: Product[],
    errors: any
}
