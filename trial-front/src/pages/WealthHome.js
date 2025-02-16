import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TabHeader } from "../templates";
import { SectionSpends, MonthlySpends, TransactionTable } from './WealthComponents';

import transactions from "../assets/transactions.json"

import "./_styles/wealth-main.css";

const WealthHome = ({tabTitle}) => {

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionDisplay, setTransactionDisplay] = useState(false);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecords,setSelectedRecords] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [typeDisplay,setTypeDisplay] = useState(false);
  const [barDisplay,setBarDisplay] = useState(false);

  const CustomDateInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    ),
  );

  useEffect(() => {
    const filtered = transactions.filter((tx) => tx.date.startsWith(selectedMonth));
    setFilteredTransactions(filtered);
  }, [selectedMonth]);

  useEffect(() => {
    let filtered;

    if (!typeDisplay){
      filtered = filteredTransactions.filter((tx) => tx.category === selectedCategory);
    }
    else{
      filtered = filteredTransactions.filter((tx) => tx.type === selectedCategory);
    }

    const sorted = [...filteredTransactions].sort((a, b) => {
      if (selectedCategory === '') {
        return 0;
      }
      if (!typeDisplay){
        if (a.category === selectedCategory && b.category !== selectedCategory) {
          return -1;  
        }
        if (b.category === selectedCategory && a.category !== selectedCategory) {
          return 1;
        }
        return 0;
      }
      else{
        if (a.type === selectedCategory && b.type !== selectedCategory) {
          return -1;  
        }
        if (b.type === selectedCategory && a.type !== selectedCategory) {
          return 1;
        }
        return 0;
      }
      
    });
    setSelectedRecords(filtered);
    setSortedTransactions(sorted);

  }, [filteredTransactions,selectedCategory,typeDisplay]);



  const totalExpenses = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryData = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Math.round(tx.amount);
    return acc;
  }, {});
    
  const typesData = filteredTransactions.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + Math.round(tx.amount);
    return acc;
  }, {});

  const monthlyExpenses = transactions.reduce((acc, tx) => {
    const month = tx.date.substring(0, 7);
    acc[month] = (acc[month] || 0) + Math.round(tx.amount);
    return acc;
  }, {});

  const toggleTransactionsView = () => {
    setTransactionDisplay(!transactionDisplay);
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const handleMonthChange = (increment) => {
      const [year, month] = selectedMonth.split('-').map(Number);
      let newYear = year;
      let newMonth = month + increment;
  
      if (newMonth === 0) {
        newYear -= 1;
        newMonth = 12;
      } else if (newMonth === 13) {
        newYear += 1;
        newMonth = 1;
      }
  
      const newMonthStr = `${newYear}-${String(newMonth).padStart(2, '0')}`;
      setSelectedMonth(newMonthStr);
  };

  return (
    <>
      <TabHeader tabTitle={tabTitle} />

      <div className="date-container">
          <button className='date-container-field inactive-button black-box' onClick={() => handleMonthChange(-1)}>&lt;</button>
          <DatePicker
              closeOnScroll={true}
              selected={new Date(selectedMonth)}
              onChange={(date) => setSelectedMonth(date.toISOString().substring(0, 7))}
              dateFormat="MMMM yyyy"
              className='date-container-field inactive-button black-box'
              customInput = {<CustomDateInput />}
              showMonthYearPicker
          />
          <button className='date-container-field inactive-button black-box' onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>

      <div className='budget-charts-section'>
        {filteredTransactions.length === 0 ?
          <div className='no-result-message'>
            <h3>No transactions found for the selected month.</h3>
          </div>
          :
          <>
            <div className='expense-container'>
              <p className='expense-container-field black-box'>Total Expenses: ₹ <span className={totalExpenses.toFixed(2) < 7000.0 ? "go-value" : "no-go-value"}>{totalExpenses.toFixed(2)}</span></p>
            </div>
            <button className='budget-chart-selector black-box inactive-button' onClick={() => (setTypeDisplay(!typeDisplay))}> {typeDisplay ? "Show Category Spends" : "Show Type Spends"} </button>
            <button onClick={() => setBarDisplay(!barDisplay)} hidden >View Monthly Spends</button>
            <div className='budget-chart-container'>
              {!barDisplay && 
                !typeDisplay ?
                  <>
                    <SectionSpends 
                      series={Object.values(categoryData)} 
                      pieCategories={Object.keys(categoryData).sort()}
                      colors={COLORS} 
                      setSelectedCategory={setSelectedCategory}
                      currentCategory={selectedCategory}
                      setSelectedColor={setSelectedColor}
                      title="Expenses by Category"/>
                  </>
                :
                  <>
                    <SectionSpends 
                      series={Object.values(typesData)} 
                      pieCategories={Object.keys(typesData).sort()} 
                      colors={COLORS}
                      setSelectedCategory={setSelectedCategory}
                      currentCategory={selectedCategory}
                      setSelectedColor={setSelectedColor}
                      title="Expenses by Type"/>
                  </>  
              }
              {barDisplay &&
                  <MonthlySpends 
                      series={Object.values(monthlyExpenses)} 
                      barCategories={Object.keys(monthlyExpenses)}
                      colors={COLORS} />
              }
            </div>
            <div className='transactions-section'>
              {!barDisplay && (
                <>
                  <button className='transactions-button inactive-button black-box'
                    onClick={toggleTransactionsView}> View Transactions </button>
                  {transactionDisplay &&
                    <TransactionTable 
                      sortedData={sortedTransactions} 
                      selectedRecords={selectedRecords}
                      sortedRecordsColor={selectedColor}
                      />
                  }  
                </>)
              }
            </div>
          </>
        }
      </div>   
    </>
  );
};

export default WealthHome;