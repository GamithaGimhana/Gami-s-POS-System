import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";

$(document).ready(function () {
    loadOrders();
});

export function loadOrders() {

    $('#order-tbody').empty();

    orders_db.map((order) => {
        let order_id = order.order_id;
        let order_date = order.order_date;
        let customer_id = order.customer_id;
        let total = order.total;

        let data = `<tr>
            <td>${order_id}</td>
            <td>${order_date}</td>
            <td>${customer_id}</td>
            <td>${total}</td>
            </tr>`;

        $('#order-tbody').append(data);
    });
}

$('#search-order').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let keyword = $(this).find('input[type="search"]').val().trim().toLowerCase();

    $('#order-tbody').empty();

    if (keyword === '') {
        loadOrders(); // Show all orders if search is empty
        return;
    }

    let filteredOrders = orders_db.filter(order =>
        order.order_id.toLowerCase().includes(keyword) ||
        order.order_date.toLowerCase().includes(keyword) ||
        order.customer_id.toLowerCase().includes(keyword) ||
        order.total.toString().toLowerCase().includes(keyword)
    );

    if (filteredOrders.length === 0) {
        $('#order-tbody').append(`<tr><td colspan="5" class="text-center">No matching records found</td></tr>`);
        return;
    }

    filteredOrders.forEach((order) => {
        let row = `<tr>
            <td>${order.order_id}</td>
            <td>${order.order_date}</td>
            <td>${order.customer_id}</td>
            <td>${order.total}</td>
        </tr>`;
        $('#order-tbody').append(row);
    });
});
