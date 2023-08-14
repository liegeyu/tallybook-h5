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
          <span className={ css.title }>收支构成</span>
          <div className={ css.tabs }>
            <span onClick={() => setTotalType('expense')} className={cx({[css.expense]: true, [css.active]: totalType === 'expense'})}>支出</span>
            <span onClick={() => setTotalType('income')} className={cx({[css.income]: true, [css.active]: totalType === 'income'})}>收入</span>
          </div>
        </div>
        <div className={ css.content }>
          {
            (totalType === 'expense' ? expenseData : incomeData).map(item => <div key={ item.type_id} className={ css.item }>
              <div className={ css.left }>
                <div className={ css.type }>
                  <span className={ cx({[css.expense]: totalType === 'expense', [css.income]: totalType === 'income'}) }>
                    <CustomIcon type={ item.type_id ? typeMap[item.type_id].icon : 1 } />
                  </span>
                  <span className={ css.name }>{ item.type_name }</span>
                </div>
                <div className={ css.progress }>
                  
                </div>
              </div>
              <div className={ css.right }>
                
              </div>
            </div>)
          }
        </div>
      </div>
      <PopupDate ref={ dateRef } mode="month" onSelect={ selectMonth } />
    </div>
  )
}

export default Data