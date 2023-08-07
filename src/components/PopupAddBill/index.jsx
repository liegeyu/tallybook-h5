import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Popup } from "zarm";
import { Close } from '@zarm-design/icons';

import css from "./style.module.less";

const PopupAddBill = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [payType, setPayType] = useState("expense");

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

  const changeType = (type) => {
    setPayType(type);
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
        </div>
      </div>
    </Popup>
  )
})

export default PopupAddBill;