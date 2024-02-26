export default class Product {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly expiration_date: string,
        readonly image: null | File,
        readonly category?: object,
        readonly category_id?: string,
        readonly id?: string,
    ) { }
}