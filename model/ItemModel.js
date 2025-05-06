export default class ItemModel {

    constructor(item_id, description, price, qty) {
        this._item_id = item_id;
        this._description = description;
        this._price = price;
        this._qty = qty;
    }

    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }
}