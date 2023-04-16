"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.Serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.Serialize());
        }
    }
    function DisplayHomePage() {
        console.log("display home Page called!");
        $("#AboutUs").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id="mainParagraph" class="mt-3">This is the main paragraph</p>`);
        $("main").append(`<article ">
        <p id="articleParagraph" class="mt-3">This is the article paragraph</p>
        </article>`);
    }
    function DisplayProjectsPage() {
    }
    function DisplayServicesPage() {
    }
    function DisplayAboutUsPage() {
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid first Name and lastName");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone contact number.");
        ValidateField("#emailAddress", /^[a-zA-z0-9._-]+@[a-zA-z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        $("#sendButton").on("click", () => {
            if ($("#suscribecheckbox").is("checked")) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactlistPage() {
        console.log("contact list page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Delete contact, please confirm")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Edit Contact Page");
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("login page!");
    }
    function Authgaurd() {
        let protected_routes = ["contact-list", "edit"];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#Login").html(`<a id="logout"  class ="nav-link" href="#">
                    <i class ="fa-solid fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "/home";
        });
    }
    function DisplayRegisterPage() {
        console.log("Register page!");
        let errorMessage = $("#messageArea").hide();
        let nameRegEx = /^[A-Za-z]{2,}$/;
        let passRegEx = /^.{6,}$/;
        $("#firstName").on("blur", function () {
            let firstName = $(this).val();
            if (!nameRegEx.test(firstName)) {
                $(this).trigger("focus").trigger("select");
                errorMessage.addClass("alert alert-danger").text("Invalid first Name").show();
            }
            else {
                errorMessage.removeAttr("class").hide();
            }
        });
        $("#lastName").on("blur", function () {
            let lastName = $(this).val();
            if (!nameRegEx.test(lastName)) {
                $(this).trigger("focus").trigger("select");
                errorMessage.addClass("alert alert-danger").text("Invalid last Name").show();
            }
            else {
                errorMessage.removeAttr("class").hide();
            }
        });
        $("#emailAddress").on("blur", function () {
            let emailAddress = $(this).val();
            let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegEx.test(emailAddress)) {
                $(this).trigger("focus").trigger("select");
                errorMessage.addClass("alert alert-danger").text("Invalid Email Address").show();
            }
            else {
                errorMessage.removeAttr("class").hide();
            }
        });
        $("#password, #confirmPassword").on("blur", function () {
            let password = $("#password").val();
            let confirmPassword = $("#confirmPassword").val();
            if (password !== confirmPassword && !passRegEx.test(password)) {
                $("#submitButton").prop('disabled', true);
                errorMessage.addClass("alert alert-danger").text("Invalid password").show();
            }
            else {
                errorMessage.removeAttr("class").hide();
                $("#submitButton").prop('disabled', false);
            }
        });
        $("#submitButton").on("click", (event) => {
            event.preventDefault();
            let firstName = document.forms[0].firstName.value;
            let lastName = document.forms[0].lastName.value;
            let emailAddress = document.forms[0].emailAddress.value;
            let user = new core.User(firstName, lastName, emailAddress);
        });
    }
    function Display404Page() {
        console.log("Displaying 404 Page");
    }
    function Start() {
        console.log("App Started!");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "projects":
                DisplayProjectsPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                DisplayContactlistPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "edit":
                DisplayEditPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404Page();
                break;
            default:
                console.log("error: callback does not exists" + page_id);
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map