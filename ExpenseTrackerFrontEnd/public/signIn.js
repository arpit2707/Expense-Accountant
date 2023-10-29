function signInButton() {
  container.classList.remove("right-panel-active");
}

async function signIn(e) {
  try {
    e.preventDefault();
    const signInDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(signInDetails);
    const response = await axios.post(
      "http://localhost:3000/index-login",
      signInDetails
    );
    console.log(response);
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    if (
      response.data.ispremiumuser == undefined ||
      response.data.ispremiumuser == null
    )
      localStorage.setItem("ispremiumuser", false);
    console.log(
      "sign in me token create hokar aa gya::" + localStorage.getItem("token")
    );
    window.location.href = "/expense/verified-user";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;">${err.message}</div>`;
  }
}
