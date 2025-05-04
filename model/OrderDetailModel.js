export default class OrderDetailModel {

    constructor(order_id, item_id, item_price, item_qty) {
        this.order_id = order_id;
        this.item_id = item_id;
        this.item_price = item_price;
        this.item_qty = item_qty;
    }
}