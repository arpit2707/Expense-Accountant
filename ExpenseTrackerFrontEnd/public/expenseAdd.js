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

function addNewExpensetoUI(expense){
    console.log("ot coming");
    const parentElement =  document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `<br><li id=${expenseElemId}>
                                    ${expense.amount} - ${expense.category} - ${expense.description}
                                    <button onclick='deleteexpense(event,${expense.id})'>Delete</button>
                                </li>`
                            
                            }