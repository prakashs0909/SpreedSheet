import React from "react";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Tabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300">
      <div className="flex space-x-2 ">
        {["Sheet1", "Sheet2"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1  ${
              activeTab === tab
                ? "border-b-2 border-blue-700 text-gray-700"
                : "bg-white text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex pl-3 items-center border border-gray-300 rounded-md">
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.85-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          id="search"
          className="pl-3 py-2 text-sm items-center outline-none"
          placeholder="Search within sheet"
          required
        ></input>
      </div>
    </div>
  );
};

export default Tabs;
