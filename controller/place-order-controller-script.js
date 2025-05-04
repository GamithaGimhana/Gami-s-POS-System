import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import {loadCustomerIDSelection} from "./customer-controller-script.js";
import {loadItemIDSelection} from "./item-controller-script.js";

$(document).ready(function () {
    loadCustomerIDSelection();
    loadItemIDSelection();

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