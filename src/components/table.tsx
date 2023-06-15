import React from "react";

const mockData = [
  {
    id: 10001,
    details: "Kring New Fit office chair, mesh + PU, black",
    status: "Delivered",
    date: "16/10/2021",
    total: "$200.00",
  },
  {
    id: 10002,
    details: "Kring New Fit office chair, mesh + PU, black",
    status: "Shipped",
    date: "16/10/2021",
    total: "$200.00",
  },
  {
    id: 10003,
    details: "Kring New Fit office chair, mesh + PU, black",
    status: "Cancelled",
    date: "16/10/2021",
    total: "$200.00",
  },
];

const mockTitles = ["No.", "Details", "Status", "Date", "Total"];

function Tabletest() {
  return (
    <div className="p-5 h-screen bg-gray-100">
      <h1 className="text-xl mb-2">Your orders</h1>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {mockTitles.map((title, index) => (
                <th
                  key={index}
                  className="w-20 p-3 text-sm font-semibold tracking-wide text-left"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr className="bg-white" key={item.id}>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
                    {item.id}
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.details}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {mockData.map((item) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={item.id}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a href="#" className="text-blue-500 font-bold hover:underline">
                  #{item.id}
                </a>
              </div>
              <div className="text-gray-500">{item.date}</div>
              <div>
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  {item.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">{item.details}</div>
            <div className="text-sm font-medium text-black">{item.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabletest;
