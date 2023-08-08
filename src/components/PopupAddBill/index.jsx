import React, { useState, useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import dayjs from "dayjs";
import { Popup, Keyboard } from "zarm";
import { Close, ArrowDown } from '@zarm-design/icons';
import PopupDate from "../PopupDate/index.jsx";

import css from "./style.module.less";

const PopupAddBill = forwardRef((props, ref) => {
  const dateRef = useRef();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');
  const [payType, setPayType] = useState("expense");
  const [date, setDate] = useState(new Date());

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      }
    }
  }

  const pressHandler = (key) => {
    switch(key) {
      case 'delete':
        break;
      case 'ok':
        break;
      case 'close':
        setShow(false);
      case '.':
        if (amount.includes('.')) break;
      default: break;
    }
    console.log(key);
    if (amount.includes('.') && amount && amount.split('.')[1].length >= 2) {
      return;
    }
    setAmount(amount + key);
  }

  const changeType = (type) => {
    setPayType(type);
  }

  const selectDate = (val) => {
    setDate(val);
  }

  const dateToggle = () => {
    dateRef.current && dateRef.current.show();
  }

  const keyboarkStyle = {
    '--item-gap': `0px`,
    '--item-border-radius': `0px`,
    '--item-box-shadow': 'none'
  }

  return (
    <Popup
      visible={ show }
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={ false }
      mountContainer={() => document.body}
    >
      <div className={ css.addWrap }>
        <header className={ css.header }>
          <span className={ css.close } onClick={() => setShow(false)}><Close size="sm" /></span>
        </header>
        <div className={ css.filter }>
          <div className={ css.type }>
            <span onClick={() => changeType('expense')} className={cx({ [css.expense]: true, [css.active]: payType === 'expense'})}>支出</span>
            <span onClick={() => changeType('income')} className={cx({ [css.income]: true, [css.active]: payType === 'income'})}>收入</span>
          </div>
          <div className={ css.time } onClick={ dateToggle }>
            { dayjs(date).format("MM-DD") }
            <ArrowDown className={ css.arrow } size="sm" />
          </div>
        </div>
        <div className={ css.money }>
          <span className={ css.sufix }>￥</span>
          <span className={ cx(css.amount, css.animation) }>{ amount }</span>
        </div>
        <Keyboard type="price" style={ keyboarkStyle } onKeyClick={(key) => pressHandler(key) } />
        <PopupDate ref={ dateRef } onSelect={ selectDate } />
      </div>
    </Popup>
  )
})

export default PopupAddBill;