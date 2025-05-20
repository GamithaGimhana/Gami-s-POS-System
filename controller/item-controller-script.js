import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

let currentId = 1; // Starting ID

$(document).ready(function () {
    clear();
});

export function loadItems() {
    $('#item-tbody').empty();

    items_db.map((item) => {
        let item_id = item.item_id;
        let description = item.description;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
            <td>${item_id}</td>
            <td>${description}</td>
            <td>${price}</td>
            <td>${qty}</td>
            </tr>`;

        $('#item-tbody').append(data);
    });
}

$('#item-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = items_db[idx];
    console.log(obj);

    let item_id = obj.item_id;
    let description = obj.description;
    let price = obj.price;
    let qty = obj.qty;

    $('#item-id').val(item_id);
    $('#item-description').val(description);
    $('#price').val(price);
    $('#qty').val(qty);
});

function clear() {
    $('#item-id').val(generateItemId());
    $('#item-description').val('');
    $('#price').val('');
    $('#qty').val('');
}

function updateItemCount() {
    $('#item-count').text(items_db.length);
}

$('#search-item').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let keyword = $(this).find('input[type="search"]').val().trim().toLowerCase();

    $('#item-tbody').empty();

    if (keyword === '') {
        loadItems(); // Show all items if search is empty
        return;
    }

    let filteredItems = items_db.filter(item =>
        item.item_id.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.price.toString().toLowerCase().includes(keyword) ||
        item.qty.toString().toLowerCase().includes(keyword)
    );


    if (filteredItems.length === 0) {
        $('#item-tbody').append(`<tr><td colspan="4" class="text-center">No matching records found</td></tr>`);
        return;
    }

    filteredItems.forEach((item) => {
        let row = `<tr>
            <td>${item.item_id}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
        </tr>`;
        $('#item-tbody').append(row);
    });
});

// $('#search-item input[type="search"]').on('input', function () {
//     let keyword = $(this).val().trim();
//
//     if (keyword === '') {
//         loadItems(); // Reload full list when search box is cleared
//     }
// });

$('#item_reset').on('click', function(){
    // $('#item-description').val('');
    // $('#price').val('');
    // $('#qty').val('');
    clear();
});

// save student
$('#item_save').on('click', function(){
    let item_id = $('#item-id').val();
    let description = $('#item-description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();
    console.log(`item_id: ${item_id}, description: ${description}, price: ${price}, qty: ${qty}`);

    if (item_id === '' || description === '' || price === '' ||  qty === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;

    } else if (items_db.some(item => item.item_id === item_id)) {
        Swal.fire({
            title: "Error",
            text: "item ID already exists!",
            icon: "error",
        });
        return;

    } else {
        let item_data = new ItemModel(item_id, description, price, qty);

        // push(), pop(), shift(), unshift()
        items_db.push(item_data);
        console.log(items_db);

        currentId++; // Increment the ID for next time

        loadItems();
        updateItemCount();
        loadItemIDSelection();

        Swal.fire({
            title: "Success!",
            text: "Item Added Successfully!",
            icon: "success"
        });
        clear();
    }

});

// update item
$('#item_update').on('click', function () {
    let item_id = $('#item-id').val();
    let description = $('#item-description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();
    console.log(`item_id: ${item_id}, description: ${description}, price: ${price}, qty: ${qty}`);

    if (item_id === '' || description === '' || price === '' ||  qty === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    // Find index of existing item by ID
    let index = items_db.findIndex(item => item.item_id === item_id);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Item not found to update",
            icon: "error"
        });
        return;
    }

    // Update the existing item
    items_db[index] = new ItemModel(item_id, description, price, qty);

    loadItems();
    updateItemCount();
    loadItemIDSelection();

    Swal.fire({
        title: "Updated!",
        text: "Item Updated Successfully!",
        icon: "success"
    });

    clear();
});

// delete item
$('#item_delete').on('click', function () {
    let item_id = $('#item-id').val();
    let description = $('#item-description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();
    console.log(`item_id: ${item_id}, description: ${description}, price: ${price}, qty: ${qty}`);

    if (item_id === '' || description === '' || price === '' ||  qty === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    // Find index of existing item by ID
    let index = items_db.findIndex(item => item.item_id === item_id);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Item not found to delete",
            icon: "error"
        });
        return;
    }

    // Delete the existing item
    items_db.splice(index, 1);

    loadItems();
    updateItemCount();
    loadItemIDSelection();

    Swal.fire({
        title: "Deleted!",
        text: "Item Deleted Successfully!",
        icon: "success"
    });

    clear();
});

export function loadItemIDSelection() {
    let $select = $('#order-item-id');
    $select.empty();
    $select.append('<option selected>Choose Item ID...</option>');

    items_db.forEach(item => {
        $select.append(`<option value="${item.item_id}">${item.item_id}</option>`);
    });
}

function generateItemId() {
    let itemId = 'I' + String(currentId).padStart(3, '0');
    // currentId++; // Increment the ID for next time
    return itemId;
}