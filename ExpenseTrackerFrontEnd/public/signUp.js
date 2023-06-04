function signUpButton() {
  console.log("Entered signup");
  container.classList.add("right-panel-active");
}

async function signUp(e) {
  try {
    e.preventDefault();
    console.log("entered here");
    console.log("it is" + e.target.userName.value);

    const signUpDetails = {
      name: e.target.userName.value,
      email: e.target.userEmail.value,
      password: e.target.userPassword.value,
    };

    const response = await axios.post(
      "http://http://18.206.230.45:3000/index-signup",
      signUpDetails
    );

    if (response.status === 201 || 200) {
      window.location.href = "http://http://18.206.230.45:3000";
    } else {
      throw new Error("Failed to singup");
    }
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
}
