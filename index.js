const signUpButton =  document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signInFormButton = document.getElementById('signInForm');
const container = document.getElementById('container');

signUpButton.addEventListener('click' , ()=>{
    console.log("Entered SIgnUp");
    container.classList.add("right-panel-active");

})

signInButton.addEventListener('click', ()=>{
    container.classList.remove("right-panel-active");
})

signInFormButton.addEventListener('click',async (event)=>{
    try
    {      
        event.preventDefault(); 
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const userDetails = {
            email:email,
            password:password
        }
        const response = await axios.post('http://localhost:5500/user/login',userDetails);
        console.log(response);
        if(response.status === 201){
            container.classList.remove("right-panel-active");
        }else{
            throw new Error('Failed To Login')
        }
    }catch(error){
        document.body.innerHTML += `<div style="color:red;">${error} </div>`
    }
})
