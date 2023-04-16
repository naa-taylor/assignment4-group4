"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_emailAddress;
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        get FullName() {
            return this.m_fullName;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        toString() {
            return `full Name:${this.FullName}, Contact Number:${this.ContactNumber}, Email:${this.EmailAddress}`;
        }
        Serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber} , ${this.EmailAddress}`;
            }
            console.error("one or more of the properties are missing or invalid");
            return null;
        }
        Deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map