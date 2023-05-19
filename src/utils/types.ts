export type CreateUserParams = {
    name: string
    email:string
    password: string
}

export type CreateProductParams = {
    name: string
    description:string
    price: number
    ownerId: number
}

export type JwtAtPayload = {
    sub: number
    name: string
    products: number[]
}
export type JwtRtPayload = {
    sub: number
    name: string
    products: number[]
    refresh_token:string
}