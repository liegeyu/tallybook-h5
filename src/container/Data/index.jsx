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

let chartIns = null;

const Data = () => {
  const dateRef = useRef();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [totalType, setTotalType] = useState("expense");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [pieType, setPieType] = useState('expense');

  useEffect(() => {
    fetchData();
    return () => {
      // chartIns.dispose(); // 释放图表实例
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const fetchData = async () => {
    const { data } = await get(`/bill/data?date=${currentMonth}`);

    setTotalExpense(data.total_expense);
    setTotalIncome(data.total_income);

    const _expenseData = data.total_data.filter(item => item.pay_type === 1).sort((a, b) => a.number - b.number);
    const _incomeData = data.total_data.filter(item => item.pay_type === 2).sort((a, b) => a.number - b.number);

    setExpenseData(_expenseData);
    setIncomeData(_incomeData);
    
    drawPieChart(totalType === 'expense' ? _expenseData : _incomeData);
  }

  const drawPieChart = (data) => {
    if (window.echarts) {
      const echarts = window.echarts;
      chartIns = echarts.init(document.getElementById("proportion"));
      chartIns.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例
        legend: {
            data: data.map(item => item.type_name)
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map(item => {
              return {
                value: item.number,
                name: item.type_name
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }

  const toggleDate = () => {
    dateRef.current && dateRef.current.show();
  }

  const selectMonth = (month) => {
    setCurrentMonth(month);
  }

  const togglePieType = (type) => {
    setPieType(type);
    drawPieChart(type === 'expense' ? expenseData : incomeData);
  }

  return (
    <div className={ css.data }>
      <div className={ css.total }>
        <div className={ css.time } onClick={ toggleDate }>
          <span>{ currentMonth }</span>
          <WaitingCircle className={ css.date } />
        </div>
        <div className={ css.title }>共支出</div>
        <div className={ css.expense }>￥{ totalExpense }</div>
        <div className={ css.income }>共收入￥{ totalIncome }</div>
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
                <div className={ css.progress }>￥{ Number(item.number).toFixed(2) || 0 }</div>
              </div>
              <div className={ css.right }>
                <div className={ css.percent }>
                  <Progress 
                    shape="line"
                    percent={Number((item.number / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
                    theme="primary"
                  />
                </div>
              </div>
            </div>)
          }
        </div>
        <div className={ css.proportion }>
          <div className={ css.header }>
            <span className={ css.title }>收支构成</span>
            <div className={ css.tabs }>
              <span onClick={() => togglePieType('expense')} className={cx({[css.expense]: true, [css.active]: pieType === 'expense'})}>支出</span>
              <span onClick={() => togglePieType('income')} className={cx({[css.income]: true, [css.active]: pieType === 'income'})}>收入</span>
            </div>
          </div>
          <div id="proportion"></div>
        </div>
      </div>
      <PopupDate ref={ dateRef } mode="month" onSelect={ selectMonth } />
    </div>
  )
}

export default Data