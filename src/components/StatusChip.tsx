import React from "react";

interface Props {
  status: string;
}

const StatusChip: React.FC<Props> = ({ status }) => {
  let color = "bg-gray-200 text-gray-700";
  if (status === "In-process") color = "bg-yellow-100 text-yellow-800";
  if (status === "Need to start") color = "bg-blue-100 text-blue-800";
  if (status === "Complete") color = "bg-green-100 text-green-800";
  if (status === "Blocked") color = "bg-red-100 text-red-800";

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

export default StatusChip;
