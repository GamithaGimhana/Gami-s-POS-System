import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";

$(document).ready(function () {
    loadOrders();
});

function loadOrders() {

    $('#order-tbody').empty();

    orders_db.map((order) => {
        let order_id = order.order_id;
        let order_date = order.order_date;
        let customer_id = order.customer_id;

        let data = `<tr>
            <td>${order_id}</td>
            <td>${order_date}</td>
            <td>${customer_id}</td>
            </tr>`;

        $('#order-tbody').append(data);
    });
}
