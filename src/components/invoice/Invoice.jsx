import { useState } from "react";
import { useParams } from "react-router-dom";
//import html2pdt from "html2pdf.js";

function Invoice() {
  const { id } = useParams();

  function handleDownload() {
    const downloadContent = document.querySelector("#invoice");
    //html2pdt(downloadContent);
  }
  return (
    <>
      <main className="p-5" id="invoice">
        {/* header */}
        <header className="flex flex-col items-center justify-center mb-5">
          <div>
            <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
              {`Invoice - ${id}`}
            </h1>
          </div>
        </header>
        {/* header end */}

        {/* company detail */}
        <section className="flex flex-col items-end justify-end">
          <h2 className="font-bold text-2xl uppercase mb-1 text-sky-500">
            Aoura
          </h2>
          <p>address</p>
        </section>
        {/* company detail end */}

        {/* client details */}
        <section className="mt-10">
          <h2 className="text-2xl uppercase font-bold mb-1">clientName</h2>
          <p>clientAddress</p>
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
  );
}

export default Invoice;
