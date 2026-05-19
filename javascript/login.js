
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event){

      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const message = document.getElementById("message");

      if(email === "" || password === ""){
        message.innerHTML = "Please fill all fields";
        return;
      }

      // Sample Login Validation

      if(email === "admin@gmail.com" && password === "admin123"){
        message.style.color = "green";
        message.innerHTML = "Login Successful";

        // Redirect Example
        // window.location.href = "dashboard.html";
      }
      else{
        message.style.color = "red";
        message.innerHTML = "Invalid Email or Password";
      }

    });

