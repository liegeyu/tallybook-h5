import React, { useState, useEffect, useRef } from 'react';
import { List, Pull } from "zarm";
import dayjs from "dayjs";
import { REFRESH_STATE, LOAD_STATE } from "@/utils/pull.js";
import { get } from "@/utils/index.js";

import { ArrowDown } from '@zarm-design/icons';
import BillItem from "@/components/BullItem";
import PopupType from "@/components/PopupType";
import PopupDate from '@/components/PopupDate';
import PopupAddBill from "@/components/PopupAddBill";
import CustomIcon from "@/components/CustomIcon";
import css from "./style.module.less";

const Home = () => {
  const typeRef = useRef();
  const dateRef = useRef();
  const addBillRef = useRef();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);  // 分页
  const [totalPage, setTotalPage] = useState(0);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  const [currentSelect, setCurrentSelect] = useState({});
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    getBillList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentSelect, currentTime]);

  const getBillList = async () => {
    try {
      const { data } = await get(`/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
      if (page === 1) {
        setList(data.list);
      } else {
        setList(list.concat(data.list));
      }
      setTotalExpense(data.totalExpense.toFixed(2));
      setTotalIncome(data.totalIncome.toFixed(2));
      setTotalPage(data.totalPage);
      setRefreshing(REFRESH_STATE.success);
      setLoading(LOAD_STATE.success);
    } catch (err) {
      setLoading(LOAD_STATE.failure);
      setRefreshing(REFRESH_STATE.failure);
    }
  }

  const refreshDate = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page !== 1) {
      setPage(1);
    } else {
      getBillList();
    }
  }

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  }

  const toggle = () => {
    typeRef.current && typeRef.current.show();
  }

  const dateToggle = () => {
    dateRef.current && dateRef.current.show();
  }

  const addToggle = () => {
    addBillRef.current && addBillRef.current.show();
  }

  const select = (type) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentSelect(type);
  }

  const selectDate = (date) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(date);
  }

  return (
    <div className={ css.home }>
      <div className={ css.header }>
        <div className={ css.dataWrap }>
          <span className={ css.expense }>总支出: <b>￥{ totalExpense }</b></span>
          <span className={ css.income }>总支出: <b>￥{ totalIncome }</b></span>
        </div>
        <div className={ css.typeWrap }>
          <div className={ css.left }>
            <span className={ css.title } onClick={ toggle }>{ currentSelect.name || "全部类型" }
              <ArrowDown className={css.arrow} />
            </span>
          </div>
          <div className={ css.right }>
            <span className={ css.time } onClick={ dateToggle }>{ currentTime }<ArrowDown className={css.arrow} /></span>
          </div>
        </div>
      </div>
      <div className={ css.contentWrap }>
        {
          list.length ? <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshDate
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData
            }}
          >
            {
              <List>{ list.map((item, index) => <BillItem bill={ item } key={ index } />) }</List>
            }
          </Pull> : null
        }
      </div>
      <div className={ css.add } onClick={ addToggle }><CustomIcon type="tianjia" /></div>
      <PopupType ref={ typeRef } onSelect={ select } />
      <PopupDate ref={ dateRef } onSelect={ selectDate } mode="month" />
      <PopupAddBill ref={ addBillRef } />
    </div>
  )
}

export default Home