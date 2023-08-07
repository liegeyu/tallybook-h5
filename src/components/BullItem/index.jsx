import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "zarm";
import PropTypes from "prop-types";
import CustomIcon from "../CustomIcon";
import dayjs from "dayjs";
import { typeMap } from "@/utils/typeMap.js";

import css from "./style.module.less";

const BillItem = ({ bill }) => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const navigateTo = useNavigate();

  useEffect(() => {
    const _income = bill.bills.filter(item => item.pay_type === 2).reduce((cur, item) => {
      cur += Number(item.amount);
      return cur;
    }, 0);
    setIncome(_income);

    const _expense = bill.bills.filter(item => item.pay_type === 1).reduce((cur, item) => {
      cur += Number(item.amount);
      return cur;
    }, 0);
    setExpense(_expense);
  }, [bill.bills])

  const goToDetail = (item) => {
    navigateTo(`/detail?id=${item.id}`);
  }

  return (
    <div className={ css.billitem }>
      <div className={ css.headerDate }>
        <div className={ css.date }>{ bill.date }</div>
        <div className={ css.money }>
          <span>
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>￥{ expense.toFixed(2) }</span>
          </span>
          <span>
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>￥{ income.toFixed(2) }</span>
          </span>
        </div>
      </div>
      {
        bill && bill.bills.map(item => {
          return (
            <List.Item
              className={ css.bill }
              key={ item.id }
              onClick={() => goToDetail(item)}
              title={
                <>
                  <CustomIcon 
                    className={ css.itemIcon } 
                    type={ item.type_id ? typeMap[item.type_id].icon : 1 } 
                  />
                  <span className={ css.typeName}>{ item.type_name }</span>
                </>
              }
              description={ 
              <span style={{ color: item.pay_type === 2 ? 'red' : '#39be77' }}>
                  { `${item.pay_type === 1 ? '-' : '+'}${item.amount}` }
              </span> 
              }
              help={
                <div>
                  { dayjs(Number(item.date)).format("HH:mm") } { item.remark ? `| ${item.remark}` : '' }
                </div>
              }
            >
            </List.Item>
          )
        })
      }
    </div>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object
}

export default BillItem;