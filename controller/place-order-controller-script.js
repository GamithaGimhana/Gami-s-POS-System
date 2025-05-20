import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import {loadCustomerIDSelection} from "./customer-controller-script.js";
import {loadItemIDSelection} from "./item-controller-script.js";
import {loadOrders} from "./order-controller-script.js";
import {loadItems} from "./item-controller-script.js";
import OrderModel from "../model/OrderModel.js";

let currentId = 1; // Starting ID
let cartItems = [];

$(document).ready(function () {
    clear();
    $('#order-id').val(generateOrderId());
    loadCustomerIDSelection();
    loadItemIDSelection();
    loadOrderDate();
});

function clear() {
    $('#order-date').val('');
    $('#order-customer-id').val('');
    $('#order-customer-name').val('');
    $('#order-customer-contact').val('');
    $('#order-customer-address').val('');
    $('#order-item-description').val('');
    $('#order-item-price').val('');
    $('#order-item-qty').val('');
    $('#order-qty').val('');
    $('#lblTotal').val('0');
    $('#lblSubTotal').val('0');
    $('#txtCash').val('');
    $('#txtDiscount').val('');
    $('#txtBalance').val('');
    $('#place-order-tbody').empty();
}

function clearItemSelect() {
    $('#order-item-description').val('');
    $('#order-item-price').val('');
    $('#order-item-qty').val('');
    $('#order-qty').val('');
}

function generateOrderId() {
    let orderId = 'O' + String(currentId).padStart(3, '0');
    return orderId;
}

function loadOrderDate() {
    $('#order-date').val(new Date().toISOString().split('T')[0]);
}

$('#order-customer-id').on('change', function () {
    let selectedCustomer = $(this).val();
    let customer = customers_db.find(c => c.customer_id === selectedCustomer);

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
    let selectedItem = $(this).val();
    let item = items_db.find(i => i.item_id === selectedItem);

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

$('#btnAddToCartItem').on('click', function () {
    let itemId = $('#order-item-id').val();
    let itemName = $('#order-item-description').val();
    let price = parseFloat($('#order-item-price').val());
    let qtyOnHand = parseInt($('#order-item-qty').val());
    let orderQty = parseInt($('#order-qty').val());

    if (!itemId || !orderQty) {
        Swal.fire({
            title: "Error",
            text: "Please fill item and order quantity",
            icon: "error"
        });
        return;
    }

    if (orderQty > qtyOnHand) {
        Swal.fire({
            title: "Error",
            text: "Not enough stock",
            icon: "error"
        });
        return;
    }

    let existingIndex = cartItems.findIndex(item => item.itemId === itemId);

    if (existingIndex !== -1) {
        // Update existing item quantity and total
        cartItems[existingIndex].qty += orderQty;
        cartItems[existingIndex].total = cartItems[existingIndex].qty * price;
    } else {
        // Add new item
        cartItems.push({
            itemId: itemId,
            itemName: itemName,
            price: price,
            qty: orderQty,
            total: price * orderQty
        });
    }

    loadCartTable();
    clearItemSelect();
    updateCartSummary();
});

function loadCartTable() {
    $('#place-order-tbody').empty();
    cartItems.forEach((item, index) => {
        $('#place-order-tbody').append(`
            <tr>
                <td>${index + 1}</td>
                <td>${item.itemName}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.total.toFixed(2)}</td>
            </tr>
        `);
    });
}

// Highlight selected row in table
$('#place-order-tbody').on('click', 'tr', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
});

$('#btnRemoveItem').on('click', function () {
    let selectedRow = $('#place-order-tbody tr.selected');
    if (selectedRow.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Please select a row to remove",
            icon: "error",
        });
        return;
    }

    let index = selectedRow.index();
    cartItems.splice(index, 1);
    selectedRow.remove();
    updateCartSummary();
});

function updateCartSummary() {
    let total = cartItems.reduce((sum, item) => sum + item.total, 0);
    $('#lblTotal').text(total.toFixed(2));

    let discountPercent = parseFloat($('#txtDiscount').val()) || 0;
    let discountAmount = total * (discountPercent / 100);
    let subTotal = total - discountAmount;

    $('#lblSubTotal').text(subTotal.toFixed(2));
}

$('#btnOrderPurchase').on('click', function () {
    let orderId = $('#order-id').val();
    let orderDate = $('#order-date').val();
    let customerId = $('#order-customer-id').val();
    let total = cartItems.reduce((sum, item) => sum + item.total, 0);

    if (customerId === '' || cartItems.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Fill all fields and add items to cart",
            icon: "error",
        });
        return;
    }

    let cash = parseFloat($('#txtCash').val()) || 0;
    let discountPercentage = parseFloat($('#txtDiscount').val()) || 0;

    let discountAmount = (total * discountPercentage) / 100;
    let netTotal = total - discountAmount;
    let balance = cash - netTotal;

    $('#txtBalance').val(balance.toFixed(2));

    if (balance < 0) {
        Swal.fire({
            title: "Error",
            text: "Insufficient cash provided",
            icon: "error",
        });
        return;
    }

    // Save Order
    let order = new OrderModel(orderId, orderDate, customerId, netTotal);
    orders_db.push(order);

    cartItems.forEach(item => {
        order_details_db.push({
            orderId: orderId,
            itemId: item.itemId,
            quantity: item.qty,
            total: item.total
        });
        items_db.find(i => i.item_id === item.itemId).qty -= item.qty;
    });

    Swal.fire({
        title: "Success",
        text: "Order Placed Successfully",
        icon: "success",
    });

    currentId++;
    loadOrders();
    loadItems();
    updateOrderCount();
    cartItems = [];
    clear();
    loadCartTable();
});

function calculateBalanceSummary() {
    let total = cartItems.reduce((sum, item) => sum + item.total, 0);
    let cash = parseFloat($('#txtCash').val()) || 0;
    let discountPercentage = parseFloat($('#txtDiscount').val()) || 0;

    let discountAmount = (total * discountPercentage) / 100;
    let netTotal = total - discountAmount;
    let balance = cash - netTotal;

    $('#txtBalance').val(balance.toFixed(2));
}

// Update balance on input
$('#txtCash, #txtDiscount').on('input', function () {
    calculateBalanceSummary();
});

$('#txtDiscount').on('input', function () {
    updateCartSummary();
});

function updateOrderCount() {
    $('#order-count').text(orders_db.length);
}
