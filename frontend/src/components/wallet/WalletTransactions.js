import { useState } from "react";
import "./WalletTransactions.scss";
import ReactPaginate from "react-paginate";

const WalletTransactions = (props) => {


    //Begin Paginate:
  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = props.transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.transactions.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.transactions.length;
    setItemOffset(newOffset);
  };
//End Paginate


  return (
    <div className="wallet-transaction">
      <h2>Wallet Transactions</h2>
      <div className="--underline"></div>
      <br />
      <h3>Transactions</h3>
      <div className="table">
        {props.transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Ref Account</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {props.transactions.map((transaction, index) => { */}
              {currentItems.map((transaction, index) => {
                const {
                  _id,
                  createdAt,
                  amount,
                  sender,
                  receiver,
                  description,
                  status,
                } = transaction;
                return (
                  <tr key={_id}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{createdAt}</td>
                    <td>{_id}</td>
                    <td>${amount}</td>
                    {/* <td>{sender}</td> */}
                    <td>
                      {props.user?.email === sender ? "Debilt" : "Credit"}
                    </td>
                    <td>{props.user?.email===sender ? receiver: sender}</td>
                    <td>{description}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default WalletTransactions;
