
function signInButton(){
    container.classList.remove("right-panel-active");
    }

async function signIn(e){
    try{
        e.preventDefault();
        const signInDetails={
            email:e.target.email.value,
            password:e.target.password.value
        }
        console.log(signInDetails);
        const response = await axios.post("http://localhost:3000/index-login",signInDetails);
                alert(response.data.message);
            window.location.href="http://localhost:3000/expense/verified-user";

    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`;
    }
}