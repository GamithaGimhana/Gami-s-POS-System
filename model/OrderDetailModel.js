export default class OrderDetailModel {

    constructor(order_id, item_id, item_price, item_qty) {
        this._order_id = order_id;
        this._item_id = item_id;
        this._item_price = item_price;
        this._item_qty = item_qty;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get item_price() {
        return this._item_price;
    }

    set item_price(value) {
        this._item_price = value;
    }

    get item_qty() {
        return this._item_qty;
    }

    set item_qty(value) {
        this._item_qty = value;
    }
}