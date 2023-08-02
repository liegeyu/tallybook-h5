import React, { useState } from 'react';
import { Icon } from "zarm";
import BillItem from "@/components/BullItem";

import css from "./style.module.less";

const Home = () => {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    }
  ])
  return (
    <div className={ css.home }>
      <div className={ css.header }>
        <div className={ css.dataWrap }>
          <span className={ css.expense }>总支出: <b>￥ 200</b></span>
          <span className={ css.income }>总支出: <b>￥ 500</b></span>
        </div>
        <div className={ css.typeWrap }>
          <div className={ css.left }>
            <span className={ css.title }>类型 <Icon className={css.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={ css.right }>
            <span className={ css.time }>2023-08<Icon className={css.arrow} type="arrow-bottom" /></span>
          </div>
        </div>
      </div>
      <div className={ css.contentWrap }>
        {
          list.map((item, index) => <BillItem bill={ item } key={ index } />)
        }
      </div>
    </div>
  )
}

export default Home