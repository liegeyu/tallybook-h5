import React, { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Popup, DatePicker } from "zarm";
import dayjs from "dayjs";

const PopupDate = forwardRef(({ onSelect, mode = 'date' }, ref) => {
  const [show, setShow] = useState(false);
  const [nowTime, setNowTime ] = useState(new Date());
  const [columnType, setColumnType] = useState(['year', 'month']);

  const choseDate = (date) => {
    setNowTime(date);
    setShow(false);
    if (mode === 'month') {
      onSelect(dayjs(date).format("YYYY-MM"));
    } else if (mode === 'date') {
      onSelect(dayjs(date).format("YYYY-MM-DD"));
    }
  }

  useEffect(() => {
    if (mode === 'month') {
      setColumnType(['year', 'month']);
    } else if (mode === 'date') {
      setColumnType(['year', 'month', 'day']);
    }
    choseDate()
  }, [mode])

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
      <div>
        <DatePicker
          visible={ show }
          value={ nowTime }
          columnType={ columnType }
          onConfirm={ choseDate }
          onCancel={() => setShow(false)}
        />
      </div>
    </Popup>
  )
})

PopupDate.propTypes = {
  onSelect: PropTypes.func,
  mode: PropTypes.string
}

PopupDate.displayName = 'PopupDate';

export default PopupDate;