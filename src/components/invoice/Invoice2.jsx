import React from "react";
import html2pdt from "html2pdf.js";

function Invoice2({ setOpenInvoiceModal, openInvoiceModal, invoiceDetails }) {
  function handleDownload() {
    const downloadContent = document.querySelector("#invoice");
    html2pdt(downloadContent);
  }
  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        openInvoiceModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-80`}
    >
      <div className="relative p-4 w-full max-h-full max-w-5xl">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900">Invoice</h3>
            <button
              onClick={() => setOpenInvoiceModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4">
            <>
              <main className="p-5 text-gray-900" id="invoice">
                {/* header */}
                <header className="flex flex-col items-center justify-center mb-5">
                  <div>
                    <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
                      {`Invoice -`}
                    </h1>
                  </div>
                </header>
                {/* header end */}

                {/* company detail */}
                <section className="flex flex-col items-end justify-end">
                  <h2 className="font-bold text-2xl uppercase mb-1 text-sky-500">
                    Aoura
                  </h2>
                  <p>aoura, colombo</p>
                </section>
                {/* company detail end */}

                {/* client details */}
                <section className="mt-10">
                  <h2 className="text-2xl uppercase font-bold mb-1">
                    {invoiceDetails.customer}
                  </h2>
                  <p>{invoiceDetails.customerEmail}</p>
                  <p>{invoiceDetails.customerPhone}</p>
                </section>
                {/* client details end */}

                {/* dates */}
                <article className="mt-10 mb-14 flex items-end justify-end">
                  <ul>
                    <li className="p-1 ">
                      <span className="font-bold">Invoicer number:</span>
                    </li>
                    <li className="p-1 bg-gray-100">
                      <span className="font-bold">Invoice date:</span>
                    </li>
                    <li className="p-1 ">
                      <span className="font-bold">Due date:</span>
                    </li>
                  </ul>
                </article>
                {/* dates end */}

                {/* table */}
                <>
                  <table width="100%" className="mb-10">
                    <thead>
                      <tr className="bg-gray-100 p-1">
                        <td className="font-bold">Description</td>
                        <td className="font-bold">Quantity</td>
                        <td className="font-bold">Price</td>
                        <td className="font-bold">Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-10">
                        <td>description</td>
                        <td>quantity</td>
                        <td>price</td>
                        <td>amount</td>
                      </tr>
                    </tbody>
                    {/* {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))} */}
                  </table>

                  {/* <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Kshs. {total.toLocaleString()}
        </h2>
      </div> */}
                </>
                {/* table end */}

                {/* footer */}
                <footer className="footer border-t-2 border-gray-300 pt-5">
                  <ul className="flex flex-wrap items-center justify-center">
                    <li>
                      <span className="font-bold">Your name:</span>
                    </li>
                    <li>
                      <span className="font-bold">Your email:</span>
                    </li>
                    <li>
                      <span className="font-bold">Phone number:</span>
                    </li>
                    <li>
                      <span className="font-bold">Bank:</span>
                    </li>
                    <li>
                      <span className="font-bold">Account holder:</span>
                    </li>
                    <li>
                      <span className="font-bold">Account number:</span>
                    </li>
                    <li>
                      <span className="font-bold">Website:</span>
                    </li>
                  </ul>
                </footer>
                {/* footer end */}
              </main>
              <div className="m-3">
                <button
                  className=" bg-sky-600 p-4 text-white font-semibold"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice2;
