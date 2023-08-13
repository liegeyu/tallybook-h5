import React, { useState, useEffect, useRef } from 'react';
import { Progress } from "zarm";
import { WaitingCircle } from "@zarm-design/icons"
import cx from "classnames";
import dayjs from "dayjs";
import { get } from "@/utils/index.js";
import { typeMap } from "@/utils/typeMap.js";
import PopupDate from "@/components/PopupDate/index.jsx";
import CustomIcon from "@/components/CustomIcon/index.jsx";

import css from "./style.module.less";

const Data = () => {
  const dateRef = useRef();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [totalType, setTotalType] = useState("expense");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentMonth]);

  const fetchData = () => {

  }

  const toggleDate = () => {
    dateRef.current && dateRef.current.show();
  }

  const selectMonth = (month) => {
    setCurrentMonth(month);
  }

  return (
    <div className={ css.data }>
      <div className={ css.total }>
        <div className={ css.time } onClick={ toggleDate }>
          <span>{ currentMonth }</span>
          <WaitingCircle className={ css.date } />
        </div>
        <div className={ css.title }>共支出</div>
        <div className={ css.expense }>￥1000</div>
        <div className={ css.income }>共收入￥200</div>
      </div>
      <div className={ css.structure }>
        <div className={ css.header }>
          <span>收支构成</span>
          <div className={ css.tabs }>
            <span>支出</span>
            <span>收入</span>
          </div>
        </div>
        <div className={ css.content }>
          <div className={ css.left }>

          </div>
          <div className={ css.right }>
            
          </div>
        </div>
      </div>
      <PopupDate ref={ dateRef } mode="month" onSelect={ selectMonth } />
    </div>
  )
}

export default Data