import React from "react";
import { Button } from "zarm";

import css from './style.module.less';

export default function Index() {
    return (
        <div className={ css.index }>
            <span>Index</span>
            <Button theme="primary">按钮</Button>
        </div>
    )
}