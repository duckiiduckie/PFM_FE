
import ExpenseLineChart from '../Expense/ExpenseLineChart/ExpenseLineChart'
import ExpenseOverview from '../Expense/ExpenseOverview/ExpenseOverview'
import IncomeLineChart from '../Income/IncomeLineChart/IncomeLineChart'
import IncomeOverview from '../Income/IncomeOverview/IncomeOverview'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <>
     <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <ExpenseOverview />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <IncomeOverview />
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="p-4 bg-white rounded-lg shadow-md w-1/2">
          <ExpenseLineChart />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md w-1/2">
          <IncomeLineChart />
        </div>
      </div>
    </div>

    </>
  )
}

export default Dashboard