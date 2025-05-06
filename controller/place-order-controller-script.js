import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import {loadCustomerIDSelection} from "./customer-controller-script.js";
import {loadItemIDSelection} from "./item-controller-script.js";
import OrderModel from "../model/OrderModel.js";

let currentId = 1; // Starting ID
let cartItems = [];

$(document).ready(function () {
    clear();
    loadOrderDate();

    $('#order-customer-id').on('change', function () {
        const selectedId = $(this).val();
        const customer = customers_db.find(c => c.customer_id === selectedId);

        if (customer) {
            $('#order-customer-name').val(customer.fname + " " + customer.lname);
            $('#order-customer-contact').val(customer.contact);
            $('#order-customer-address').val(customer.address);
        } else {
            $('#order-customer-name').val('');
            $('#order-customer-contact').val('');
            $('#order-customer-address').val('');
        }
    });

    $('#order-item-id').on('change', function () {
        const selectedItem = $(this).val();
        const item = items_db.find(i => i.item_id === selectedItem);

        if (item) {
            $('#order-item-description').val(item.description);
            $('#order-item-price').val(item.price);
            $('#order-item-qty').val(item.qty);
        } else {
            $('#order-item-description').val('');
            $('#order-item-price').val('');
            $('#order-item-qty').val('');
        }
    });
});

function clear() {
    $('#order-id').val(generateOrderId());
    $('#order-date').val('');
    $('#order-customer-id').val('');
    $('#order-customer-name').val('');
    $('#order-customer-contact').val('');
    $('#order-customer-address').val('');
    $('#order-item-description').val('');
    $('#order-item-price').val('');
    $('#order-item-qty').val('');
    $('#txtCash').val('');
    $('#txtDiscount').val('');
    $('#txtBalance').val('');
    $('#place-order-tbody').empty();
}

function loadOrderDate() {
    $('#order-date').val(new Date().toISOString().split('T')[0]);
}

function generateOrderId() {
    let orderId = 'O' + String(currentId).padStart(3, '0');
    currentId++; // Increment the ID for next time
    return orderId;
}

function updateOrderCount() {
    $('#order-count').text(orders_db.length);
}

$('#btnRemoveItem').on('click', function () {
    const selectedRow = $('#place-order-tbody tr.selected');
    if (selectedRow.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Please select a row to remove",
            icon: "error",
        });
        return;
    }

    const index = selectedRow.index();
    cartItems.splice(index, 1);
    selectedRow.remove();
    updateCartSummary();
});

// Highlight selected row in table
$('#place-order-tbody').on('click', 'tr', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
});

// place order
$('#btnOrderPurchase').on('click', function () {
    const orderId = $('#order-id').val();
    const orderDate = $('#order-date').val();
    const customerId = $('#order-customer-id').val();
    const total = parseFloat($('#lblSubTotal').text());

    if (!orderId || !orderDate || !customerId || cartItems.length === 0) {
        Swal.fire("Error", "Fill all fields and add items to cart", "error");
        return;
    }

    let order = new OrderModel(orderId, customerId, orderDate, total);
    orders_db.push(order);

    cartItems.forEach(item => {
        order_details_db.push({
            orderId: orderId,
            itemId: item.itemId,
            quantity: item.qty,
            total: item.total
        });
    });

    Swal.fire("Success", "Order Placed Successfully", "success");
    updateOrderCount();
    cartItems = [];
    clear();
});

function updateCartSummary() {
    let total = cartItems.reduce((sum, item) => sum + item.total, 0);
    $('#lblTotal').text(total.toFixed(2));
    $('#lblSubTotal').text(total.toFixed(2));
}
