import React from "react";

const Table = ({ children }) => {
  let heads = [];
  let bodies = [];
  let data = [];

  React.Children.forEach(children, (child) => {
    // Check if the child is TableHead
    if (child.type && child.type.displayName === "TableHead") {
      heads.push(child);
    }
    // Check if the child is TableBody
    else if (child.type && child.type.displayName === "TableBody") {
      bodies.push(child);
    } else if (child.type && child.type.displayName === "TableData") {
      bodies.push(data);
    }
  });

  return (
    <section className="container mx-auto mt-5 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="tracking-wide text-left bg-gray-100 border-b border-gray-600 text-md text-bs-font_primary">
                {heads}
              </tr>
            </thead>
            <tbody className="bg-white">{bodies}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const TableHead = ({ children }) => {
  return (
    <th className="px-4 py-3">
      <div className="flex items-center gap-2">{children}</div>
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableData = ({ children }) => {
  return <td className="px-4 py-3 border">{children}</td>;
};

// Set display name for identification
TableHead.displayName = "TableHead";
TableBody.displayName = "TableBody";
TableData.displayName = "TableData";

Table.Head = TableHead;
Table.Body = TableBody;
Table.Data = TableData;

export default Table;
