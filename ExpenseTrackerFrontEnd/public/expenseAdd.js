const submitExpense = async (event) => {
  event.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const expenseDetails = {
      amount: event.target.amount.value,
      description: event.target.description.value,
      category: event.target.category.value,
    };
    console.log(`toekn expense add hone liye aa gya  ${token}`);
    const response = await axios.post(
      "http://localhost:3000/expense/verified-user",
      expenseDetails,
      { headers: { Authorization: `${token}` } }
    );

    console.log(`add hoke response aa gya`);
    console.log(response.data);
    addNewExpensetoUI(response.data.response);
    location.reload();
    event.target.amount.value = "";
    event.target.description.value = "";
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  //This part is fetching token and total count of expenses user has.This part is showing expenses on screen
  // as per selected entries per page by user
  const token = localStorage.getItem("token");
  console.log("token expense fetch hone ke liye aa gya :::::" + token);
  const Page = document.getElementById("page");
  localStorage.setItem("entrySize", Page.value);
  const responseFromPage = await axios.get(
    `http://localhost:3000/expense/verified-user/expenses/${1}`,
    {
      headers: {
        Authorization: `${token}`,
        entry_size: Page.value,
      },
    }
  );
  console.log(responseFromPage.data);
  const parentElement = document.getElementById("listOfExpenses");
  parentElement.innerHTML = "";
  responseFromPage.data.expense.rows.forEach((expense) => {
    addNewExpensetoUI(expense);
  });
  doPagination(responseFromPage.data);

  const conditionalDiv = document.getElementById("conditional-element");
  const leaderboardDiv = document.getElementById("leaderboard");

  if (responseFromPage.data.ispremiumuser) {
    leaderboardDiv.style.display = "block";
    conditionalDiv.style.display = "none";
  } else {
    leaderboardDiv.style.display = "none";
    conditionalDiv.style.display = "block";
  }

  Page.addEventListener("change", async (event) => {
    const SIZE = event.target.value;
    localStorage.setItem("entrySize", Page.value);
  });
});

function doPagination(data) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ``;
  if (data.hasPreviousPage) {
    const btn2 = document.createElement("button");
    btn2.innerHTML = `<h3>${data.prevPage}</h3>`;
    btn2.addEventListener("click", () => getProducts(data.prevPage));
    pagination.appendChild(btn2);
  }

  const btn1 = document.createElement("button");
  btn1.innerHTML = `<h3>${data.currentPage}</h3>`;
  btn1.addEventListener("click", () => getProducts(data.currentPage));
  pagination.appendChild(btn1);

  if (data.hasNextPage) {
    const btn3 = document.createElement("button");
    btn3.innerHTML = data.nextPage;
    btn3.addEventListener("click", () => getProducts(data.nextPage));
    pagination.appendChild(btn3);
  }

  const btnLast = document.createElement("button");
  btnLast.innerHTML = "Last";
  btnLast.addEventListener("click", () => getProducts(data.lastPage));
  pagination.appendChild(btnLast);
}

async function getProducts(page) {
  const token = localStorage.getItem("token");
  const entry_size = localStorage.getItem("entrySize");
  const parentElement = document.getElementById("listOfExpenses");
  const responseFromPage = await axios.get(
    `http://localhost:3000/expense/verified-user/expenses/${page}`,
    {
      headers: {
        Authorization: `${token}`,
        entry_size: entry_size,
      },
    }
  );
  parentElement.innerHTML = "";
  console.log(responseFromPage.data);
  responseFromPage.data.expense.rows.forEach((expense) => {
    addNewExpensetoUI(expense);
  });
  doPagination(responseFromPage.data);
}

const deleteexpense = async (event, expenseId) => {
  const token = localStorage.getItem("token");
  try {
    event.preventDefault();
    console.log("this expense" + expenseId);
    await axios.delete(
      `http://localhost:3000/expense/verified-user/deleteExpenses/${expenseId}`,
      { headers: { Authorization: `${token}` } }
    );
    const expenseElemId = `expense-${expenseId}`;
    const expenseElem = document.getElementById(expenseElemId);
    expenseElem.parentNode.removeChild(expenseElem);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

function addNewExpensetoUI(expense, user) {
  console.log("ot coming");

  const parentElement = document.getElementById("listOfExpenses");
  const expenseElemId = `expense-${expense.id}`;
  parentElement.innerHTML += `<br><li id=${expenseElemId}>
                                    ${expense.amount} - ${expense.category} - ${expense.description}
                                    <button onclick='deleteexpense(event,${expense.id})'>Delete</button>
                                </li>`;
}

document.getElementById("premium").onclick = async function (e) {
  const token = localStorage.getItem("token");
  console.log(`Button click hone pe aaya yahan tak`);

  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    { headers: { Authorization: `${token}` } }
  );
  console.log(`but fir yahan n aaya`);
  var options = {
    key: response.data.key_id, //Enter the key ID generated from the dashboard
    order_id: response.data.orderid, //For one time payment
    //this handler function is a callback function and it will only handle the process after success of payment
    handler: async function (response) {
      const transaction_Updated = await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      alert("You are a Premium User Now");
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", async (response) => {
    console.log("response me payment id hai ki n");
    console.log(response);
    await axios.post(
      "http://localhost:3000/purchase/failedtransactionstatus",
      {
        order_id: options.order_id,
        payment_id: response.error.metadata.payment_id,
      },
      { headers: { Authorization: token } }
    );
    alert("Something went wrong in rzp1");
  });
};

document.getElementById("show-leaderboard").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    "http://localhost:3000/premium/showLeaderboard",
    { headers: { Authorization: token } }
  );
  console.log(result.data.result[0]);
  const leaders = document.getElementById("leaders");
  leaders.innerHTML = "";
  result.data.result.forEach((expense) => {
    leaders.innerHTML += `<br><li> ${expense.name} -- ${expense.totalExpense} </li>`;
  });
  leaders.classList.toggle("hidden"); // toggle visibility
};

document.getElementById("download-expenses").onclick = async function (e) {
  const token = localStorage.getItem("token");
  console.log("on click download fnction");
  const response = await axios.get(
    "http://localhost:3000/premium/downloadExpenses",
    { headers: { Authorization: token } }
  );

  console.log("Download expenses");
  var a = document.createElement("a");
  console.log(`okaaayy  ::::: ${response.data.fileUrl}`);
  a.href = response.data.fileUrl;
  a.download = "Expense.txt";
  a.click();
};
///
