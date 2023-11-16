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
    <section className="font-mono container mx-auto mt-5">
      <div className="mb-8 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md border-b border-gray-600 bg-gray-100 text-left tracking-wide text-bs-font_primary">
                {heads}
              </tr>
            </thead>
            <tbody className="bg-white">
              {bodies.length === 0 && data.length === 0 ? (
                <tr>
                  <td colSpan={heads.length} className="py-4 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                ""
              )}
              {bodies}
            </tbody>
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
  return <td className="border px-4 py-3">{children}</td>;
};

// Set display name for identification
TableHead.displayName = "TableHead";
TableBody.displayName = "TableBody";
TableData.displayName = "TableData";

Table.Head = TableHead;
Table.Body = TableBody;
Table.Data = TableData;

export default Table;
