import Category from "./Category";

export default class Product {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly price: Number,
        readonly expiration_date: string,
        readonly image: any,
        readonly category?: Category,
        readonly category_id?: string,
        readonly id?: string,
    ) { }
}