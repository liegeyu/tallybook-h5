import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { NavBar } from "zarm";
import { ArrowLeft } from '@zarm-design/icons';

import css from "./style.module.less";

const Header = ({ title = ''}) => {
  const navigateTo = useNavigate();
  return (
    <div className={ css.headerWarp }>
      <div className={ css.block }>
        <NavBar 
          className={ css.header } 
          left={<ArrowLeft theme="primary" onClick={() => navigateTo(-1)} />}
          title={ title }
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header;