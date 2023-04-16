import {event} from "jquery";

(function(){

    /**
     * instatiate and contact to local storage
     * @param {string}fullName
     * @param {string}contactNumber
     * @param {string}emailAddress
     */
     function AddContact(fullName: string, contactNumber: string, emailAddress :string): void{
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.Serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.Serialize() as  string);
        }
    }
    function DisplayHomePage(): void {
        console.log("display home Page called!");

        $("#AboutUs").on("click", () => {
            location.href="/about";
        });
        //add text to the main tag using JQuery
        $("main").append(`<p id="mainParagraph" class="mt-3">This is the main paragraph</p>`)

        $("main").append(`<article ">
        <p id="articleParagraph" class="mt-3">This is the article paragraph</p>
        </article>`)


    }

        function DisplayProjectsPage(): void {

        }

        function DisplayServicesPage() {

        }

        function DisplayAboutUsPage(): void {

        }

    /**
     *
     * @param {string}input_field_id
     * @param {RegExp}regular_expression
     * @param {string}error_message
     */
    function ValidateField(input_field_id: string, regular_expression: RegExp, error_message: string): void{

        //Retrieve message area (id= "messageArea") –using Jquery
        let messageArea= $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                //fails validation
                $(this).trigger("focus").trigger("select")
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                //passes Validation
                messageArea.removeAttr("class").hide();
            }
        });

    }
    function ContactFormValidation(): void
    {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid first Name and lastName");

        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone contact number.");

        ValidateField("#emailAddress", /^[a-zA-z0-9._-]+@[a-zA-z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");

    }

        function DisplayContactPage(): void {

            console.log("Contact Us Page")

            $("a[data='contact-list']").off("click");

            $("a[data='contact-list']").on("click", function (){
                location.href="/contact-list";
            })

            //call function for each field validation
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

         function DisplayContactlistPage(): void {

            console.log("contact list page");

             $("a.delete").on("click", function (event) {
                             // confirm delete
                             if (!confirm("Delete contact, please confirm")) {
                                 event.preventDefault()
                                 location.href="/contact-list";
                             }
                         });
         }

        function DisplayEditPage(): void {
            console.log("Edit Contact Page")
            ContactFormValidation()

        }

        function DisplayLoginPage(): void{
            console.log("login page!")
        }

        function Authgaurd() :void{
            let protected_routes: string[] = ["contact-list", "edit"];

            if(protected_routes.indexOf(location.pathname)> -1){
                if(!sessionStorage.getItem("user")){
                    location.href  = "/login"
                }
            }

        }
        function CheckLogin(): void{
            //check if user is looged in
            if(sessionStorage.getItem("user")){
                $("#Login").html(`<a id="logout"  class ="nav-link" href="#">
                    <i class ="fa-solid fa-sign-out-alt"></i> Logout</a>`)

            }
            $("#logout").on("click", function(){
                sessionStorage.clear();
                location.href="/home";
            });

        }

        function DisplayRegisterPage(){
            console.log("Register page!")

            /*
            create a div element with an id of
            “ErrorMessage”. This div element should be hidden when the user first navigates to the
            register.html page. This area will be used to display errors if the user enters invalid data in the
            input fields of the registerForm. When the error clears, this div element should be hidden
            */

            let errorMessage = $("#messageArea").hide();
            //create a regular expression for both last name and first names and password
            let nameRegEx = /^[A-Za-z]{2,}$/;
            let passRegEx = /^.{6,}$/;

            /*
            ensure when the user enters their First Name
            and Last Name that the minimum length  2 characters
             */

                $("#firstName").on("blur", function (){
                    let firstName = $(this).val() as string;

                    if(!nameRegEx.test(firstName)){
                        //fails validation
                        $(this).trigger("focus").trigger("select")
                        errorMessage.addClass("alert alert-danger").text("Invalid first Name").show();
                    }else{
                        //passes Validation
                        errorMessage.removeAttr("class").hide();
                    }
                });

            $("#lastName").on("blur", function (){
                let lastName = $(this).val() as string;

                if(!nameRegEx.test(lastName)){
                    //fails validation
                    $(this).trigger("focus").trigger("select")
                    errorMessage.addClass("alert alert-danger").text("Invalid last Name").show();
                }else{
                    //passes Validation
                    errorMessage.removeAttr("class").hide();
                }
            });

            /*
            when the user enters their email address ensure
            that the minimum length is 8 and that an @ symbol is present
             */
            $("#emailAddress").on("blur", function (){
                let emailAddress = $(this).val() as string;
                let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegEx.test(emailAddress)){
                    //fails validation
                    $(this).trigger("focus").trigger("select")
                    errorMessage.addClass("alert alert-danger").text("Invalid Email Address").show();
                }else{
                    //passes Validation
                    errorMessage.removeAttr("class").hide();
                }
            });

            $("#password, #confirmPassword").on("blur", function (){
                let password = $("#password").val() as string;
                let confirmPassword = $ ("#confirmPassword").val();

                if(password !== confirmPassword && !passRegEx.test(password)){
                    $("#submitButton").prop('disabled', true);
                    errorMessage.addClass("alert alert-danger").text("Invalid password").show();
                }else{
                    errorMessage.removeAttr("class").hide();
                    $("#submitButton").prop('disabled', false);
                }
            });

            $("#submitButton").on("click", (event) => {
                event.preventDefault();
                let firstName = document.forms[0].firstName.value;
                let lastName = document.forms[0].lastName.value;
                //let username = document.forms[0].username.value;
                let emailAddress = document.forms[0].emailAddress.value;

//revisit
                let user = new core.User(firstName, lastName, emailAddress);
            });
        }

        function Display404Page(){
            console.log("Displaying 404 Page");
        }

    function Start() {
        console.log("App Started!")

        let page_id= $("body")[0].getAttribute("id")


        switch(page_id){
            case "home":
                DisplayHomePage();
                break
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

        window.addEventListener("load", Start)

})()