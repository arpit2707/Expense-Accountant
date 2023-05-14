const forgotPasswordLink = document.getElementById("forgot-password");
const forgotPasswordPopup = document.getElementById("forgot-password-popup");
const resetEmail = document.getElementById("emailID");
function forgotpassword(e) {
  e.preventDefault();

  // Do something with the email value, such as send it to a server for password reset
  forgotPasswordPopup.style.display = "none"; // Hide the popup box
  const form = new FormData(e.target);

  const userDetails = {
    email: resetEmail.value,
  };
  const response = axios
    .post("http://localhost:3000/password/sendResetLink", userDetails)
    .then((response) => {
      if (response.status === 200) {
        document.body.innerHTML +=
          '<div style="color:green;">Mail Successfuly sent <div>';
      } else {
        throw new Error("Something went wrong!!!");
      }
    })
    .catch((err) => {
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    });
}

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  forgotPasswordPopup.style.display = "block"; // Show the popup box
});
