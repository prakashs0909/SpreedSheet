import { useState } from "react";
import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";

const App = () => {
  const [activeTab, setActiveTab] = useState("Sheet1");

  return (
    <>
      <h1 className="text-5xl p-6 text-center font-bold mb-4">Spreadsheet</h1>
      <div className=" m-6 font-sans border border-gray-300">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Toolbar />
      </div>
    </>
  );
};

export default App;
