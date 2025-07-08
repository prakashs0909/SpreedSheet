import React, { useState } from "react";

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

const BottomTabs: React.FC = () => {
  const [active, setActive] = useState("All Orders");

  return (
    <div className="flex space-x-1 mt-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            console.log(`${tab} clicked`);
            setActive(tab);
          }}
          className={`px-4 py-1 text-sm rounded-t ${
            active === tab
              ? "bg-green-100 text-green-800 border border-b-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
      <button
        onClick={() => console.log("Add tab clicked")}
        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

export default BottomTabs;
