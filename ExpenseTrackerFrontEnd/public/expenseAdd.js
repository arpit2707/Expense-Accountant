const submitExpense = async (event)=>{
    event.preventDefault();
    try{
    const expenseDetails = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    }
    const response = await axios.post("http://localhost:3000/expense/verified-user",expenseDetails);

        addNewExpensetoUI(response.data.response)

        event.target.amount.value='';
        event.target.description.value='';
    }catch(err){
        console.log(err);
    }
}
window.addEventListener('DOMContentLoaded',async ()=>{
    const response = await axios.get("http://localhost:3000/expense/verified-user/expenses");
    response.data.expenses.forEach(expense => {
        addNewExpensetoUI(expense);
    });
})

const deleteexpense=async(event,expenseId)=>{
    try {
        event.preventDefault();
        console.log("this expense"+expenseId);
        await axios.delete(`http://localhost:3000/expense/verified-user/deleteExpenses/${expenseId}`);
        const expenseElemId = `expense-${expenseId}`;
        const expenseElem = document.getElementById(expenseElemId);
        expenseElem.parentNode.removeChild(expenseElem);
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