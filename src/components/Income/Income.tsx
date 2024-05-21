import IncomeAddCategoryButton from "./Category/AddCategory";
import IncomeCategoryList from "./Category/CategoryList";
import IncomeCreate from "./IncomeCreate/IncomeCreate";
import IncomeOverview from "./IncomeOverview/IncomeOverview";
import IncomeTable from "./IncomeTable/IncomeTable";

interface Props {}

const Income: React.FC<Props> = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <IncomeOverview />
      
      <div className="mt-4 border border-gray-300 shadow-md p-4 rounded-md" >
        <IncomeCategoryList />
        <IncomeAddCategoryButton />
      </div>

      <div className="flex mt-8 border border-gray-300 shadow-md p-4 rounded-md">
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md">
          <IncomeTable />
        </div>
        <div className="w-1/2 ml-4 border border-gray-300 shadow-md p-4 rounded-md">
          <IncomeCreate />
        </div>
      </div>
    </div>
  );
};

export default Income;
