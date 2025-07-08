import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiArrowsSplitFill } from "react-icons/pi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { TbViewportTall } from "react-icons/tb";
import { BiExport, BiImport, BiHide, BiSortAlt2, BiFilter  } from "react-icons/bi";

const Toolbar: React.FC = () => {
  return (
    <div className="flex justify-between border-b border-gray-200">
      <div className="flex flex-wrap gap-2 p-2">
        <button
          onClick={() => console.log("Tool bar clicked")}
          className="flex items-center px-3 py-1 border-r border-gray-200"
        >
          Tool bar
          <MdKeyboardDoubleArrowRight className="ml-2 pt-1 size-6" />
        </button>
        <button
          onClick={() => console.log("Hide fields clicked")}
          className="flex items-center px-3 py-1 "
        ><BiHide className="mr-2" />
          Hide fields
        </button>
        <button
          onClick={() => console.log("Sort clicked")}
          className="flex items-center px-3 py-1 "
        ><BiSortAlt2 className="mr-2"/>
          Sort
        </button>
        <button
          onClick={() => console.log("Filter clicked")}
          className="flex items-center px-3 py-1 "
        ><BiFilter className="mr-2" />
          Filter
        </button>
        <button
          onClick={() => console.log("Cell view clicked")}
          className="flex items-center px-3 py-1 "
        ><TbViewportTall className="mr-2" />
          Cell view
        </button>
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        <button
          onClick={() => console.log("Import clicked")}
          className="flex items-center px-3 py-1 border rounded border-gray-200"
        >
          <BiImport className="mr-2" />
          Import
        </button>
        <button
          onClick={() => console.log("Export clicked")}
          className="flex items-center px-3 py-1 border rounded border-gray-200"
        >
          <BiExport className="mr-2" />
          Export
        </button>
        <button
          onClick={() => console.log("Share clicked")}
          className="flex items-center px-3 py-1 border rounded border-gray-200"
        >
          {" "}
          <FaRegShareFromSquare className="mr-2" /> Share
        </button>
        <button
          onClick={() => console.log("New Action clicked")}
          className="flex items-center px-3 py-2 text-sm border rounded bg-green-900 text-white"
        ><PiArrowsSplitFill className="mr-2 size-4" />
          New Action
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
