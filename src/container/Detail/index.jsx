import React from "react";
import Header from "@/components/Header";

import css from "./style.module.less";

const Detail = () => {
  return (
    <div className={ css.detail }>
      <Header title="账单详情" />
    </div>
  )
}

export default Detail;