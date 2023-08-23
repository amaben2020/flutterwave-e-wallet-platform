const mockData = [
  {
    id: "64e5cf01ac3062a0a975fedf",
    email: "tsest@gmail.com",
    amount: 1000,
    currency: "NGN",
    paymentStatus: "successful",
    paymentGateway: "flutterwave",
    createdAt: "2023-08-23T09:18:55.442Z",
  },
  {
    id: "64e5d037ac3062a0a975fee3",
    email: "tsest@gmail.com",
    amount: 1000,
    currency: "NGN",
    paymentStatus: "successful",
    paymentGateway: "flutterwave",
    createdAt: "2023-08-23T09:24:06.345Z",
  },
  {
    id: "64e5d06aac3062a0a975fee7",
    email: "tsest@gmail.com",
    amount: 10000000,
    currency: "NGN",
    paymentStatus: "successful",
    paymentGateway: "flutterwave",
    createdAt: "2023-08-23T09:24:55.776Z",
  },
];

const Table = (transactions: any) => {
  console.log(transactions);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Payment Gateway
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.transactions.map((elem: any) => (
                  <>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {elem.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {elem.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {elem.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {elem.createdAt}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {elem.paymentStatus}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {elem.paymentGateway}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
