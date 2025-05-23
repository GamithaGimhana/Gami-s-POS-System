import {customers_db, items_db, orders_db, order_details_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

let currentId = 1; // Starting ID

$(document).ready(function () {
    clear();
});

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
    $('#cust-id').val(generateCustomerId());
    $('#fname').val('');
    $('#lname').val('');
    $('#contact').val('');
    $('#address').val('');
}

function updateCustomerCount() {
    $('#customer-count').text(customers_db.length);
}

$('#search-customer').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let keyword = $(this).find('input[type="search"]').val().trim().toLowerCase();

    $('#customer-tbody').empty();

    if (keyword === '') {
        loadCustomers(); // Show all customers if search is empty
        return;
    }

    let filteredCustomers = customers_db.filter(customer =>
        customer.customer_id.toLowerCase().includes(keyword) ||
        customer.fname.toLowerCase().includes(keyword) ||
        customer.lname.toLowerCase().includes(keyword) ||
        customer.contact.toString().toLowerCase().includes(keyword) ||
        customer.address.toLowerCase().includes(keyword)
    );

    if (filteredCustomers.length === 0) {
        $('#customer-tbody').append(`<tr><td colspan="5" class="text-center">No matching records found</td></tr>`);
        return;
    }

    filteredCustomers.forEach((customer) => {
        let row = `<tr>
            <td>${customer.customer_id}</td>
            <td>${customer.fname}</td>
            <td>${customer.lname}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
        </tr>`;
        $('#customer-tbody').append(row);
    });
});

$('#customer_reset').on('click', function(){
    // currentId--; // Decrement the ID for next time
    // $('#cust-id').val('C' + String(currentId).padStart(3, '0'));
    // $('#fname').val('');
    // $('#lname').val('');
    // $('#contact').val('');
    // $('#address').val('');
    clear();
});

// save customer
$('#customer_save').on('click', function () {
    let customer_id = $('#cust-id').val().trim();
    let fname = $('#fname').val().trim();
    let lname = $('#lname').val().trim();
    let contact = $('#contact').val().trim();
    let address = $('#address').val().trim();

    console.log(`customer_id: ${customer_id}, fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    // Reset styles
    $('#fname, #lname, #contact').css('border-color', '');

    // Validate first name
    if (!/^[A-Za-z\s]{3,30}$/.test(fname)) {
        $('#fname').css('border-color', 'red');
        Swal.fire({
            title: "Invalid First Name",
            text: "First name must be 3–30 letters only",
            icon: "error"
        });
        return;
    }

    // Validate last name
    if (!/^[A-Za-z\s]{3,30}$/.test(lname)) {
        $('#lname').css('border-color', 'red');
        Swal.fire({
            title: "Invalid Last Name",
            text: "Last name must be 3–30 letters only",
            icon: "error"
        });
        return;
    }

    // Validate contact number
    // if (!/^\+94\d{9}$/.test(contact)) {
    //     $('#contact').css('border-color', 'red');
    //     Swal.fire("Invalid Contact", "Use +94 format (e.g., +94701234567)", "error");
    //     return;
    // }

    // Check empty fields
    if (!customer_id || !fname || !lname || !contact || !address) {
        Swal.fire({
            title: "Error",
            text: "Fill in all the fields!",
            icon: "error"
        });
        return;
    }

    // Check for duplicate ID
    if (customers_db.some(customer => customer.customer_id === customer_id)) {
        Swal.fire({
            title: "Error",
            text: "Customer ID already exists!",
            icon: "error"
        });
        return;
    }

    // Save customer
    let customer_data = new CustomerModel(customer_id, fname, lname, contact, address);
    customers_db.push(customer_data);
    console.log(customers_db);

    currentId++;

    loadCustomers();
    updateCustomerCount();
    loadCustomerIDSelection();

    Swal.fire({
        title: "Success!",
        text: "Customer Added Successfully!",
        icon: "success"
    });
    clear();
});


// update customer
$('#customer_update').on('click', function () {
    let customer_id = $('#cust-id').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let contact = $('#contact').val();
    let address = $('#address').val();
    console.log(`customer_id: ${customer_id}, fname: ${fname}, lname: ${lname}, contact: ${contact}, address: ${address}`);

    // Reset styles
    $('#fname, #lname, #contact').css('border-color', '');

    // Validate first name
    if (!/^[A-Za-z\s]{3,30}$/.test(fname)) {
        $('#fname').css('border-color', 'red');
        Swal.fire({
            title: "Invalid First Name",
            text: "First name must be 3–30 letters only",
            icon: "error"
        });
        return;
    }

    // Validate last name
    if (!/^[A-Za-z\s]{3,30}$/.test(lname)) {
        $('#lname').css('border-color', 'red');
        Swal.fire({
            title: "Invalid Last Name",
            text: "Last name must be 3–30 letters only",
            icon: "error"
        });
        return;
    }

    // Validate contact number
    // if (!/^\+94\d{9}$/.test(contact)) {
    //     $('#contact').css('border-color', 'red');
    //     Swal.fire("Invalid Contact", "Use +94 format (e.g., +94701234567)", "error");
    //     return;
    // }

    // Check empty fields
    if (!customer_id || !fname || !lname || !contact || !address) {
        Swal.fire({
            title: "Error",
            text: "Fill in all the fields!",
            icon: "error"
        });
        return;
    }

    // Show a confirmation dialog before updating
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to update this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
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
            updateCustomerCount();
            loadCustomerIDSelection();

            Swal.fire({
                title: "Updated!",
                text: "Customer Updated Successfully!",
                icon: "success"
            });

            clear();
        }
    });
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

    // Show a confirmation dialog before deleting
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
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

            // Decrease the currentId if greater than 1
            if (currentId > 1) {
                currentId--;
            }

            loadCustomers();
            updateCustomerCount();
            loadCustomerIDSelection();

            Swal.fire({
                title: "Deleted!",
                text: "Customer Deleted Successfully!",
                icon: "success"
            });

            clear();
        }
    });
});

export function loadCustomerIDSelection() {
    let $select = $('#order-customer-id');
    $select.empty();
    $select.append('<option selected>Choose Customer ID...</option>');

    customers_db.forEach(customer => {
        $select.append(`<option value="${customer.customer_id}">${customer.customer_id}</option>`);
    });
}

function generateCustomerId() {
    let customerId = 'C' + String(currentId).padStart(3, '0');
    // currentId++; // Increment the ID for next time
    return customerId;
}