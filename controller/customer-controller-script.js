import {customers_db, items_db, order_db, order_detail_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

let count = 0;

function loadCustomers() {

    $('#customer-tbody').empty();

    customers_db.map((customer) => {
        let customer_id = customer.customer_id;
        let fname = customer.fname;
        let lname = customer.lname;
        let contact = customer.contact;
        let address = customer.address;

        let data = `<tr>
            <td>${customer_id}</td>
            <td>${fname}</td>
            <td>${lname}</td>
            <td>${contact}</td>
            <td>${address}</td>
            </tr>`;

        $('#customer-tbody').append(data);
    });
}

$('#customer-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = customers_db[idx];
    console.log(obj);

    let customer_id = obj.customer_id;
    let fname = obj.fname;
    let lname = obj.lname;
    let contact = obj.contact;
    let address = obj.address;

    $('#cust-id').val(customer_id);
    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#contact').val(contact);
    $('#address').val(address);
});

function clear() {
    $('#cust-id').val('');
    $('#fname').val('');
    $('#lname').val('');
    $('#contact').val('');
    $('#address').val('');
}

$('#customer_reset').on('click', function(){
    clear();
});

// save customer
$('#customer_save').on('click', function(){
    // let fname = document.getElementById('fname').value;
    let customer_id = $('#cust-id').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let contact = $('#contact').val();
    let address = $('#address').val();
    console.log(`customer_id: ${customer_id}, fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    if (customer_id === '' || fname === '' || lname === '' || contact === '' || address === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
    } else {
        let customer_data = new CustomerModel(customer_id, fname, lname, contact, address);
        count++;

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

// update customer
$('#customer_update').on('click', function () {
    let customer_id = $('#cust-id').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let contact = $('#contact').val();
    let address = $('#address').val();
    console.log(`customer_id: ${customer_id}, fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    if (customer_id === '' || fname === '' || lname === '' || contact === '' || address === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    // Find index of existing customer by ID
    let index = customers_db.findIndex(customer => customer.customer_id === customer_id);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Customer not found to update",
            icon: "error"
        });
        return;
    }

    // Update the existing customer
    customers_db[index] = new CustomerModel(customer_id, fname, lname, contact, address);

    loadCustomers();

    Swal.fire({
        title: "Updated!",
        text: "Customer Updated Successfully!",
        icon: "success"
    });

    clear();
});

// delete customer
$('#customer_delete').on('click', function () {
    let customer_id = $('#cust-id').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let contact = $('#contact').val();
    let address = $('#address').val();
    console.log(`customer_id: ${customer_id}, fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    if (customer_id === '' || fname === '' || lname === '' || contact === '' || address === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    // Find index of existing customer by ID
    let index = customers_db.findIndex(customer => customer.customer_id === customer_id);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Customer not found to delete",
            icon: "error"
        });
        return;
    }

    // Delete the existing customer
    customers_db.splice(index, 1);

    loadCustomers();

    Swal.fire({
        title: "Deleted!",
        text: "Customer Deleted Successfully!",
        icon: "success"
    });

    clear();
});
