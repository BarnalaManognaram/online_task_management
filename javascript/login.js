const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    // Prevent Form Refresh
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            // Admin Redirect
            if (data.role === "admin") {

                window.location.href = "admin.html";

            }

            // Manager Redirect
            else if (data.role === "manager") {

                window.location.href = "admin.html";

            }

            // Developer Redirect
            else if (data.role === "developer") {

                window.location.href = "admin.html";

            }
            sessionStorage.setItem("role", data.role);

        }

        else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.log(error);

    });

});