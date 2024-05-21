import React from 'react'
import BudgetLineChart from './BudgetLineChart/BudgetLineChart'
import BudgetOverview from './BudgetOverview/BudgetOverview'
import BudgetModal from './BudgetModal/BudgetModal'
import CategoryList from './Category/CategoryList'

type Props = {}

const Budget = (props: Props) => {
  return (
  <>
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-md shadow-md">
          <div className="lg:col-span-1">
            <div className="p-6">
              <BudgetOverview />
            </div>
          </div>
          <div>
            <div className="p-6">
              <CategoryList />
            </div>
          </div>
      </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <BudgetLineChart />
        </div>

      <div className="mt-8">
        <BudgetModal />
      </div>
    </div>
  </>
  )
}

export default Budget