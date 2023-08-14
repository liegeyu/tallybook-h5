import React, { useState } from "react";
import PropTypes from 'prop-types';
import { TabBar } from "zarm";
import { useNavigate, useLocation } from "react-router-dom";
import css from './style.module.less';
import CustomIcon from "../CustomIcon";

NavBar.prototype = {
    showNav: PropTypes.bool,
}

function NavBar({ showNav }) {
    const navigateTo = useNavigate();
    const location = useLocation();
    const [activeBar, setActiveBar] = useState(location.pathname);

    const changeTab = (path) => {
        setActiveBar(path);
        navigateTo(path);
    }

    return (
        <div>
            {
                showNav ? 
                <TabBar className={ css.navbar } activeKey={ activeBar } onChange={ changeTab }>
                    <TabBar.Item itemKey="/" title="账单" icon={ <CustomIcon type="zhangdan"/>}></TabBar.Item>
                    <TabBar.Item itemKey="/data" title="统计" icon={ <CustomIcon type="tongji"/>}></TabBar.Item>
                    <TabBar.Item itemKey="/user" title="我的" icon={ <CustomIcon type="wode"/>}></TabBar.Item>
                </TabBar>
                : null
            }
        </div>
    )
}

export default NavBar;