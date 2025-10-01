import React from "react";

interface CaseHistory {
  hearing_date: string;
  purpose_of_hearing: string;
  brief_description: string;
}

interface CaseHistoryTableProps {
  data: CaseHistory[];
}

const CaseHistoryTable: React.FC<CaseHistoryTableProps> = ({ data }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Hearing Date</th>
          <th className="px-4 py-2 border">Purpose of Hearing</th>
          <th className="px-4 py-2 border">Brief Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((history, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border">{history.hearing_date}</td>
            <td className="px-4 py-2 border">{history.purpose_of_hearing}</td>
            <td className="px-4 py-2 border">{history.brief_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CaseHistoryTable;