import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'zarm';
import cx from 'classnames';
import { get } from '@/utils';

import css from './style.module.less';

const PopupType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [active, setActive] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: { list }} = await get('/type/list');
      setExpense(list.filter(item => item.type ==="1"));
      setIncome(list.filter(item => item.type === "2"));
    })()
  }, []);

  const choseType = (type) => {
    setActive(type.id);
    setShow(false);
    // 传给父组件
    onSelect(type);
  }

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

  return (
    <Popup
      visible={ show }
      direction='bottom'
      destroy={false}
      onMaskClick={() => setShow(false)}
      mountContainer={() => document.body}
    >
      <div className={ css.popupType }>
        <div className={ css.header }>
          请选择类型
          <Icon type="wrong" className={ css.cross } onClick={() => setShow(false)} />
        </div>
        <div className={ css.content }>
          <div className={cx({[css.all]: true, [css.active]: active == 'all' })} onClick={() => choseType({ id: 'all' })}>全部类型</div>
          <div className={ css.title }>支出</div>
          <div className={ css.expenseWrap }>
            {
              expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[css.active]: active == item.id})}>{ item.name }</p>)
            }
          </div>
          <div className={ css.title }>收入</div>
          <div className={ css.incomeWrap }>
            {
              income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[css.active]: active == item.id})}>{ item.name }</p>)
            }
          </div>
        </div>
      </div>
    </Popup>
  )
})

PopupType.propTypes = {
  onSelect: PropTypes.func
}

PopupType.displayName = 'PopupType';

export default PopupType;
