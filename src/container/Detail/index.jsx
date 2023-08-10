import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import cx from "classnames";
import { get, post, parseUrl } from "@/utils/index.js";
import { typeMap } from "@/utils/typeMap.js";
import { Modal, Toast } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import Header from "@/components/Header";
import PopupAddBill from "@/components/PopupAddBill";

import css from "./style.module.less";

const Detail = () => {
  const editRef = useRef();
  const location = useLocation();
  const navigateTo = useNavigate();
  const { id } = parseUrl(location.search);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetail();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBill = () => {
    Modal.confirm({
      title: "删除",
      content: "确认删除此账单",
      onConfirm: async () => {
        console.log('click ok');
        const { data } = await post('/bill/delete', { id });
        console.log('confirm', data);
        Toast.show("删除成功");
        navigateTo(-1);
      }
    })
  }

  const getDetail = async () => {
    const { data } = await get(`/bill/detail?id=${id}`)
    setDetail(data);
  }

  const editToggle = () => {
    editRef.current && editRef.current.show();
    getDetail();
  }

  return (
    <div className={ css.detail }>
      <Header title="账单详情" />
      <div className={ css.card }>
        <div className={ css.type }>
          <span className={ cx({[css.expense]: detail.pay_type === 1, [css.income]: detail.pay_type === 2}) }>
            <CustomIcon className={ css.iconfont } type={ detail.type_id ? typeMap[detail.type_id].icon : 1 } />
          </span>
          <span>{ detail.type_name || '' }</span>
        </div>
        {
          detail.pay_type === 1
            ? <div className={cx(css.amount, css.expense)}>-{ detail.amount }</div>
            : <div className={cx(css.amount, css.income)}>+{ detail.amount }</div>
        }
        <div className={ css.info }>
          <div className={ css.time }>
            <span>记录时间</span>
            <span>{dayjs(Number(detail.date)).format("YYYY-MM-DD HH:MM")}</span>
          </div>
          <div className={ css.remark }>
            <span>备注</span>
            <span>{ detail.remark || '-' }</span>
          </div>
        </div>
        <div className={ css.operation }>
          <span onClick={ deleteBill }><CustomIcon type="shanchu" />删除</span>
          <span onClick={ editToggle }><CustomIcon type="tianjia" />编辑</span>
        </div>
      </div>
      <PopupAddBill ref={ editRef } detail={ detail } onReload={ getDetail } />
    </div>
  )
}

export default Detail;