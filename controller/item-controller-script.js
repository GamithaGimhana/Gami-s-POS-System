import {customers_db, items_db, order_db, order_detail_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

let count = 0;

function loadItems() {

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
    $('#item-id').val('');
    $('#item-description').val('');
    $('#price').val('');
    $('#qty').val('');
}

$('#item_reset').on('click', function(){
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
    } else {
        let item_data = new ItemModel(item_id, description, price, qty);
        count++;

        // push(), pop(), shift(), unshift()
        items_db.push(item_data);
        console.log(items_db);

        loadItems();

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

    Swal.fire({
        title: "Updated!",
        text: "Item Updated Successfully!",
        icon: "success"
    });

    clear();
});

