import React, { useState, useEffect } from 'react';
import {  getBudgetNowAPI } from '../../../services/BudgetService';
import { CategoryBudgetDto } from '../../../models/ExpenseDto';
import { BudgetGet } from '../../../models/BudgetDto';

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<CategoryBudgetDto[]>([]);
    const [usedAmount, setUsedAmount] = useState<number>(0);
    useEffect(() => {
        const fetchBudgetAndCategories = async () => {
            try {
                const response = await getBudgetNowAPI(localStorage.getItem('user') as string); // Assuming getBudgetAPI returns budget data including categories
                if (response && response.data) {
                    const budgetData = response.data.result as BudgetGet;
                    if (budgetData.categories) {
                        setCategories(budgetData.categories);
                        setUsedAmount(budgetData.usedAmount);
                    }
                }
            } catch (error) {
                console.error('Error fetching budget and categories:', error);
            }
        };

        fetchBudgetAndCategories();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Categories:</h3>
            <ul>
                {categories.map((category) => {
                    const usedPercentage = (category.usedAmount / usedAmount) * 100;
                    return (
                        <li key={category.id} className="mb-4">
                            <div className="flex items-center">
                                <strong className="mr-2">{category.name}</strong>
                                <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${usedPercentage}%` }}></div>
                                </div>
                                <span className="ml-2">{usedPercentage.toFixed(2)}%</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Used Amount: ${category.usedAmount.toFixed(2)} of target</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CategoryList;
