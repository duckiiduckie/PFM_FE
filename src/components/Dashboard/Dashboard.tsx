import DailyExpenseLineChart from "../Expense/ExpenseChart/DailyExpenseChart"
import ExpenseOverview from "../Expense/ExpenseOverview/ExpenseOverview"
import IncomeOverview from "../Income/IncomeOverview/IncomeOverview"


type Props = {}

const Dashboard = (props: Props) => {
  return (
    <>
     <div className="min-h-screen bg-gray-100 p-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <IncomeOverview />
          <ExpenseOverview />
        </div>
    </div>
      
    <div className="min-h-screen bg-gray-100 p-4 ">
      <h1>Daily Expense</h1>
        <div className="p-4 bg-white rounded-lg shadow-md">
           <DailyExpenseLineChart />

      </div>
    </div>    

    </>
  )
}

export default Dashboard