import React from 'react';
import BudgetTable from './BudgetTable/BudgetTable';
import BudgetSummary from './BudgetOverview/BudgetOverview';
import BudgetChart from './BudgetChart/BudgetChart';
import EditBudget from './EditBudget/EditBudget';
import AddBudget from './CreateBudget/CreateBudget';

type Props = {};

const Budget = (props: Props) => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-md shadow-md">
          <div className="lg:col-span-1">
            <div className="p-6">
              <AddBudget />
              <BudgetChart />
            </div>
          </div>
          <div className="lg:col-span-2 flex items-center justify-center"> 
            <div className="p-6">
              <BudgetSummary />
              <EditBudget />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <BudgetTable />
        </div>

        <div className="mt-8"></div>
      </div>
    </>
  );
};

export default Budget;
