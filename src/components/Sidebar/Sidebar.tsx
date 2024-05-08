import { Link } from "react-router-dom";
import { FaHome, FaMoneyBill, FaTable,  } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";

interface Props {
}

const Sidebar = (props: Props) => {
    return (
      <nav className="mt-24 h-screen block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
        <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
          <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
            <div className="md:flex-col md:min-w-full flex flex-col list-none">
            <Link
              to=""
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaHome />
              <h6 className="ml-3">Dashboard</h6>
            </Link>
            <Link
              to="income"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTable />
              <h6 className="ml-3">Income</h6>
            </Link>
            <Link
              to="expense"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaTableCells />
              <h6 className="ml-3">Expense</h6>
            </Link>
            <Link
              to="budget"
              className="flex md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              <FaMoneyBill />
              <h6 className="ml-3">Budget</h6>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;