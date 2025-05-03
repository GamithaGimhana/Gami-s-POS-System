import {customers_db, items_db, order_db, order_detail_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

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

function clear() {
    $('#item-id').val('');
    $('#item-description').val('');
    $('#price').val('');
    $('#qty').val('');
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

$('#item_reset').on('click', function(){
    clear();
});
