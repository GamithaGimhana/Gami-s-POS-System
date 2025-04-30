export default class OrderDetailModel {

    constructor(order_id, item_code, item_price, item_qty) {
        this.order_id = order_id;
        this.item_code = item_code;
        this.item_price = item_price;
        this.item_qty = item_qty;
    }
}