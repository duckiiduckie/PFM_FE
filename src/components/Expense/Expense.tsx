import React from 'react'
import DailyExpenseTable from './ExpenseTable/DailyExpenseTable'
import FuturePlannedExpenseTable from './ExpenseTable/FuturePlannedExpenseTable'
import AddDailyExpense from './CreatExpense/CreateDailyExpense'
import AddFuturePlannedExpense from './CreatExpense/CreateFuturePlannedExpense'
import ExpenseOverview from './ExpenseOverview/ExpenseOverview'


type Props = {}

const Expense = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      
        <div className="mt-8 border border-gray-300 shadow-md p-4 rounded-md">
          <ExpenseOverview/>
        </div>

      <div className="flex mt-8 border border-gray-300 shadow-md p-4 rounded-md">
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md">
          <AddDailyExpense/>
          <DailyExpenseTable/>
        </div>
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md">
          <AddFuturePlannedExpense/>
          <FuturePlannedExpenseTable/>
        </div>
      </div>
    </div>
  )
}

export default Expense