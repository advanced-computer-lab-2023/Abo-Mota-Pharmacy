import "./styles.css";

const ViewFinancials = () => {
  const transactions = [
    {
      type: "Salary",
      date: "1 Jan 2019",
      amount: 1000,
    },
    {
      type: "withdrawal",
      date: "5 Jan 2019",
      amount: -500,
    },
    {
      type: "OverTime",
      date: "10 Jan 2019",
      amount: 200,
    },
    {
      type: "withdrawl",
      date: "11 Jan 2019",
      amount: -200,
    },
    {
      type: "Bonus",
      date: "15 Jan 2019",
      amount: 100,
    },
  ];

  const mappedArray = transactions.map((transaction) => {
    const isPositive = transaction.amount > 0 ? "positive" : "negative";
    return (
      <div className='transaction-container'>
        <h1 className='transaction-type'>{transaction.type}</h1>
        <h1 className='transaction-date'>{transaction.date}</h1>
        <h2 className={`transaction-amount ${isPositive}`}>
          {transaction.amount}
        </h2>
      </div>
    );
  });

  return (
    <div className='view-financials-container'>
      <div className='view-financials-wallet'>
        <h1 className='wallet-header'>Wallet Balance :</h1>
        <h2 className='wallet-amount'>1000</h2>
      </div>
      {mappedArray}
    </div>
  );
};

export default ViewFinancials;
