import { useGetPatientQuery } from "../../../store";
import "./styles.css";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
const ViewFinancials = () => {
  const transactions = [
    {
      type: "Refund for cancelling order",
      date: "1 Jan 2019",
      amount: 1000,
    },
    {
      type: "Credit Use",
      date: "5 Jan 2019",
      amount: -500,
    },
  ];
  const { data, isFetching, error } = useGetPatientQuery();
  if (isFetching) {
    return <LoadingIndicator />;
  }
  const mappedArray = transactions.map((transaction) => {
    const isPositive = transaction.amount > 0 ? "positive" : "negative";
    return (
      <div className="transaction-container">
        <h1 className="transaction-type">{transaction.type}</h1>
        <h1 className="transaction-date">{transaction.date}</h1>
        <h2 className={`transaction-amount ${isPositive}`}>{transaction.amount}</h2>
      </div>
    );
  });

  return (
    <div className="view-financials-container">
      <div className="view-financials-wallet">
        <h1 className="wallet-header">Wallet Balance :</h1>
        <h2 className="wallet-amount">{data.wallet}</h2>
      </div>
      {mappedArray}
    </div>
  );
};

export default ViewFinancials;
