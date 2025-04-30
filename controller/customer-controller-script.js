import {customers_db, items_db, order_db, order_detail_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

function loadCustomers() {

    $('#customer-tbody').empty();

    customers_db.map((customer, index) => {
        let fname = customer.fname;
        let lname = customer.lname;
        let contact = customer.contact;
        let address = customer.address;

        let data = `<tr>
            <td>${index + 1}</td>
            <td>${fname}</td>
            <td>${lname}</td>
            <td>${contact}</td>
            <td>${address}</td>
            </tr>`;

        $('#customer-tbody').append(data);
    });
}

// save student
$('#customer_save').on('click', function(){
    // let fname = document.getElementById('fname').value;
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let contact = $('#contact').val();
    let address = $('#address').val();
    console.log(`fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    if (fname === '' || lname === '' || contact === '' || address === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
    } else {
        let customer_data = new CustomerModel(fname, lname, contact, address);

        // push(), pop(), shift(), unshift()
        customers_db.push(customer_data);
        console.log(customers_db);

        loadCustomers();

        Swal.fire({
            title: "Success!",
            text: "Customer Added Successfully!",
            icon: "success"
        });
        clear();
    }

});

function clear() {
    $('#fname').val('');
    $('#lname').val('');
    $('#contact').val('');
    $('#address').val('');
}

$('#customer-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = customers_db[idx];
    console.log(obj);

    let fname = obj.fname;
    let lname = obj.lname;
    let contact = obj.contact;
    let address = obj.address;

    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#contact').val(contact);
    $('#address').val(address);
});
