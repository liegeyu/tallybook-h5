import { useState, useEffect, useRef } from 'react';
import { Icon, Pull } from "zarm";
import dayjs from "dayjs";
import { REFRESH_STATE, LOAD_STATE } from "@/utils/pull.js";
import { get } from "@/utils/index.js";

import BillItem from "@/components/BullItem";
import PopupType from "@/components/PopupType";
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
        },
        {
          amount: "20.00",
          date: "1623390740000",
          id: 784,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        },
        {
          amount: "35.00",
          date: "1623390740000",
          id: 432,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    },
    {
      bills: [
        {
          amount: "2.00",
          date: "1623390740000",
          id: 65,
          pay_type: 1,
          remark: "",
          type_id: 3,
          type_name: "交通"
        },
        {
          amount: "2.00",
          date: "1623390740000",
          id: 3213,
          pay_type: 1,
          remark: "",
          type_id: 3,
          type_name: "交通"
        },
        {
          amount: "2.00",
          date: "1623390740000",
          id: 954,
          pay_type: 1,
          remark: "",
          type_id: 3,
          type_name: "交通"
        },
        {
          amount: "2.00",
          date: "1623390740000",
          id: 931,
          pay_type: 1,
          remark: "",
          type_id: 3,
          type_name: "交通"
        },
        {
          amount: "2.00",
          date: "1623390740000",
          id: 9451,
          pay_type: 1,
          remark: "",
          type_id: 3,
          type_name: "交通"
        },
      ],
      date: '2021-06-11'
    }
  ]);
  const [page, setPage] = useState(1);  // 分页
  const [totalPage, setTotalPage] = useState(0);
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  const typeRef = useRef();
  const [currentSelect, setCurrentSelect] = useState({});

  useEffect(() => {
    console.log(page);
    getBillList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentSelect]);

  const getBillList = async () => {
    try {
      const { data } = await get(`/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
      if (page === 1) {
        setList(data.list);
      } else {
        setList(list.concat(data.list));
      }
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

  const select = (type) => {
    console.log('父组件', type);
  }

  return (
    <div className={ css.home }>
      <div className={ css.header }>
        <div className={ css.dataWrap }>
          <span className={ css.expense }>总支出: <b>￥ 200</b></span>
          <span className={ css.income }>总支出: <b>￥ 500</b></span>
        </div>
        <div className={ css.typeWrap }>
          <div className={ css.left } onClick={ toggle }>
            <span className={ css.title }>{ currentSelect.name || "全部类型" }<Icon className={css.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={ css.right } onClick={ toggle }>
            <span className={ css.time }>2023-08<Icon className={css.arrow} type="arrow-bottom" /></span>
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
              list.map((item, index) => <BillItem bill={ item } key={ index } />)
            }
          </Pull> : null
        }
      </div>
      <PopupType ref={ typeRef } onSelect={ select } />
    </div>
  )
}

export default Home