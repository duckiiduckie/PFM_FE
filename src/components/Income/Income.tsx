
import AddAdditionalIncome from "./CreateIncome/CreateAdditionalIncome";
import AddMainIncome from "./CreateIncome/CreateMainIncome";
import AdditionalIncomeTable from "./IncomeTable/AdditionalIncomeTable";
import MainIncomeTable from "./IncomeTable/MainIncomeTable";
import IncomeOverview from "./IncomeOverview/IncomeOverview";

interface Props {}

const Income: React.FC<Props> = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      
        <div className="mt-8 border border-gray-300 shadow-md p-4 rounded-md">
          <IncomeOverview />
        </div>

      <div className="flex mt-8 border border-gray-300 shadow-md p-4 rounded-md ">
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md justify-center">
          <h1>Additional Income</h1>
          <AddAdditionalIncome />
          <AdditionalIncomeTable />
        </div>
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md">
          <h1>Main Income</h1>
          <AddMainIncome />
          <MainIncomeTable />
        </div>
      </div>
    </div>
  );
};

export default Income;
