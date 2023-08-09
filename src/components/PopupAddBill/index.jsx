import React, { useState, useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import dayjs from "dayjs";
import { Popup, Keyboard, Input, Toast } from "zarm";
import { Close, ArrowDown } from '@zarm-design/icons';
import PopupDate from "../PopupDate/index.jsx";
import CustomIcon from "@/components/CustomIcon";
import { typeMap } from "@/utils/typeMap.js";
import { get, post } from "@/utils/index.js";

import css from "./style.module.less";

const PopupAddBill = forwardRef((props, ref) => {
  const dateRef = useRef();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');
  const [payType, setPayType] = useState("expense");
  const [date, setDate] = useState(new Date());
  const [currentType, setCurrentType] = useState({});
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [remark, setRemark] = useState('');
  const [showRemark, setShowRemark] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { list }} = await get("/type/list");
      const _expense = list.filter(item => item.type === '1');
      const _income = list.filter(item => item.type === '2');
      setExpense(_expense);
      setIncome(_income);
      setCurrentType(_expense[0]);
    })()
  }, []);

  useEffect(() => {
    if (payType === 'expense') {
      setCurrentType(expense[0]);
    } else {
      setCurrentType(income[0]);
    }
  }, [payType, expense, income])

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
      case 'delete': {
        const _amount = amount.slice(0, amount.length - 1);
        setAmount(_amount);
        return;
      }
      case 'ok': {
        addBill();
        return;
      }
      case 'close': {
        setAmount('');
        setShow(false);
        return;
      }
      case '.': {
        if (amount.includes('.')) {
          return;
        }
        break;
      }
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

  const addBill = async () => {
    if (!amount) {
      Toast.show("请输入具体金额");
      return;
    }
    const params = {
      amount: Number(amount).toFixed(2), // 账单金额小数点后保留两位
      type_id: currentType.id, // 账单种类id
      type_name: currentType.name, // 账单种类名称
      date: dayjs(date).unix() * 1000, // 日期传时间戳
      pay_type: payType == 'expense' ? 1 : 2, // 账单类型传 1 或 2
      remark: remark || '' // 备注
    }
    try {
      await post("/bill/add", params);
      setAmount('');
      setPayType("expense");
      setCurrentType(expense[0]);
      setDate(new Date());
      setRemark('');
      Toast.show('添加成功');
      setShow(false);
      console.log(props);
      if (props.onReload) props.onReload();
    } catch (err) {
      Toast.show('添加失败');
      setShow(false);
    }

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
        <div className={ css.typeWarp }>
          <div className={ css.typeBody }>
            {
              (payType === 'expense' ? expense : income).map(item => <div key={ item.id } className={ css.typeItem }>
                <span className={ 
                  cx({[css.iconfontWrap]: true, [css.expense]: payType === 'expense', [css.income]: payType === 'income', [css.active]: currentType.id === item.id}) }
                  onClick={() => setCurrentType(item)}
                >
                  <CustomIcon className={ css.iconfont } type={ typeMap[item.id].icon } />
                </span>
                <span>{ item.name }</span>
              </div>)
            }
          </div>
        </div>
        <div className={ css.remark }>
          {
            showRemark ? <Input 
              autoHeight
              showLength
              maxLength={50}
              type="text"
              rows={3}
              value={ remark }
              placeholder="请输入备注信息"
              onChange={(e) => setRemark(e.target.value)}
              onBlur={() => setShowRemark(false)}
            /> : <span onClick={() => setShowRemark(true)}>{ remark || '添加备注' }</span>
          }
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

PopupAddBill.displayName = 'PopupAddBill';

export default PopupAddBill;