
const submitExpense = async (event)=>{
    event.preventDefault();
    try{
    const token = localStorage.getItem('token');
    const expenseDetails = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    }
    console.log(`toekn expense add hone liye aa gya  ${token}`);
    const response = await axios.post("http://localhost:3000/expense/verified-user",expenseDetails,{headers:{"Authorization":`${token}`}});

        console.log(`add hoke response aa gya`);
        console.log(response.data)
        addNewExpensetoUI(response.data.response)

        event.target.amount.value='';
        event.target.description.value='';
    }catch(err){
        console.log(err);
    }
}
window.addEventListener('DOMContentLoaded',async ()=>{
    const token = localStorage.getItem('token');
    console.log("token expense fetch hone ke liye aa gya :::::"+token);
    const response = await axios.get("http://localhost:3000/expense/verified-user/expenses",{headers:{"Authorization":`${token}`}});
    console.log("Fetch hone ke liye response aa gya");
    response.data.expenses.forEach(expense => {
        addNewExpensetoUI(expense);
    });
})

const deleteexpense=async(event,expenseId)=>{
    const token = localStorage.getItem('token');
    try {
        event.preventDefault();
        console.log("this expense"+expenseId);
        await axios.delete(`http://localhost:3000/expense/verified-user/deleteExpenses/${expenseId}`,{headers:{"Authorization":`${token}`}});
        const expenseElemId = `expense-${expenseId}`;
        const expenseElem = document.getElementById(expenseElemId);
        expenseElem.parentNode.removeChild(expenseElem);
        location.reload();
    } catch (error) {
        console.log(error);
    }
   }

function addNewExpensetoUI(expense,user){
    console.log("ot coming");
    const parentElement =  document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `<br><li id=${expenseElemId}>
                                    ${expense.amount} - ${expense.category} - ${expense.description}
                                    <button onclick='deleteexpense(event,${expense.id})'>Delete</button>
                                </li>`
    }

document.getElementById('premium').onclick = async function (e){
    const token = localStorage.getItem('token');
    console.log(`Button click hone pe aaya yahan tak`);

    const response = await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":`${token}`}});
    console.log(`but fir yahan n aaya`);
    var options = {
        "key":response.data.key_id,//Enter the key ID generated from the dashboard
        "order_id":response.data.orderid,//For one time payment
        //this handler function is a callback function and it will only handle the process after success of payment
        "handler":async function (response){

           const transaction_Updated =  await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})
            alert('You are a Premium User Now');
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', async(response)=>{
        console.log("response me payment id hai ki n");
        console.log(response);
        await axios.post('http://localhost:3000/purchase/failedtransactionstatus',{
                order_id:options.order_id,
                payment_id:response.error.metadata.payment_id,
            },{headers:{"Authorization":token}})
        alert('Something went wrong in rzp1');
    })
}