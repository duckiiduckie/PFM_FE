import React from 'react'
import ExpenseCreate from './ExpenseCreate/ExpenseCreate'
import ExpenseOverview from './ExpenseOverview/ExpenseOverview'
import ExpenseTable from './ExpenseTable/ExpenseTable'
import AddCategoryButton from './Category/AddCategory'
import CategoryList from './Category/CategoryList'

type Props = {}

const Expense = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ExpenseOverview />
      
      <div className="mt-4 border border-gray-300 shadow-md p-4 rounded-md">
        <CategoryList />
        <AddCategoryButton />
      </div>
      <div className="flex mt-8">
        <div className="w-1/2 mr-4 border border-gray-300 shadow-md p-4 rounded-md">
          <ExpenseTable />
        </div>
        <div className="w-1/2 ml-4 border border-gray-300 shadow-md p-4 rounded-md">
          <ExpenseCreate />
        </div>
      </div>
    </div>
  )
}

export default Expense