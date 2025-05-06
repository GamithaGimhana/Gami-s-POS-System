export default class CustomerModel {

    constructor(customer_id, fname, lname, contact, address) {
        this._customer_id = customer_id;
        this._fname = fname;
        this._lname = lname;
        this._contact = contact;
        this._address = address;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get fname() {
        return this._fname;
    }

    set fname(value) {
        this._fname = value;
    }

    get lname() {
        return this._lname;
    }

    set lname(value) {
        this._lname = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}