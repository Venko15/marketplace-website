export type CreateUserParams = {
    name: string
    password: string
}

export type CreateProductParams = {
    name: string
    description:string
    price: number
    ownerId: number
}