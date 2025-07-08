import { useState } from "react";
import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";
import Spreadsheet from "./components/Spreadsheet";
import { RowData } from "./types/RowData";

const sampleData: RowData[] = [
  {
    job: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhan.com",
    assigned: "Tejas Pandey",
    priority: "High",
    due: "30-10-2024",
    value: "3,500,000",
  },
  {
    job: "Finalize user testing feedback for app",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohnson.com",
    assigned: "Rachel Lee",
    priority: "Medium",
    due: "10-12-2024",
    value: "4,750,000",
  },
  {
    job: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen.com",
    assigned: "Tom Wright",
    priority: "Low",
    due: "15-01-2025",
    value: "5,900,000",
  },
  {
    job: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.com",
    assigned: "Kevin Smith",
    priority: "Low",
    due: "30-01-2025",
    value: "2,800,000",
  },
  {
    job: "Launch social media campaign for product",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    due: "20-11-2024",
    value: "6,200,000",
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("Sheet1");

  return (
    <>
      <h1 className="text-xl mt-2 text-center font-bold ">Spreadsheet</h1>
      <div className=" m-6 font-sans border border-gray-300">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Toolbar />
        <Spreadsheet data={sampleData} />
        
      </div>
    </>
  );
};

export default App;
