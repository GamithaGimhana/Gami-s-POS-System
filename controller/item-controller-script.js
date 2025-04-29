import {customers_db, items_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel";

function loadItems() {

    $('#item-tbody').empty();

    customers_db.map((item, index) => {
        let description = item.description;
        let price = item.price;
        let qty = item.qty;

        let data = `<tr>
            <td>${index + 1}</td>
            <td>${description}</td>
            <td>${price}</td>
            <td>${qty}</td>
            </tr>`;

        $('#item-tbody').append(data);
    });
}

// save student
$('#item_save').on('click', function(){
    let description = $('#item-description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();
    console.log(`description: ${description}, price: ${price}, qty: ${qty}`);

    if (description === '' || price === '' ||  qty === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
    } else {
        let item_data = new ItemModel(description, price, qty);

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
    $('#item-description').val('');
    $('#price').val('');
    $('#qty').val('');
}

$('#item-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = items_db[idx];
    console.log(obj);

    let description = obj.description;
    let price = obj.price;
    let qty = obj.qty;

    $('#item-description').val(description);
    $('#price').val(price);
    $('#qty').val(qty);
});
