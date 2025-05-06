export default class OrderModel {

    constructor(order_id, order_date, customer_id, total) {
        this._order_id = order_id;
        this._order_date = order_date;
        this._customer_id = customer_id;
        this._total = total;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get order_date() {
        return this._order_date;
    }

    set order_date(value) {
        this._order_date = value;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}