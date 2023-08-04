import React, { useState, useCallback } from "react";
import { Button, Input, Checkbox, Cell, Toast } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import { post } from "@/utils";

import css from "./style.module.less";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [checked, setChecked] = useState('');
  const [type, setType] = useState('login');
  
  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }

    try {
      if (type === "login") {
        const { data } = await post("/user/login", {
          username,
          password
        });
        localStorage.setItem("token", data.token);
        window.location.href = '/';
      } else {
        if (!verify) {
          Toast.show("请输入验证码");
          return;
        }
        if (!checked) {
          Toast.show("请阅读并勾选条款");
          return;
        }
        await post("/user/register", { username, password });
        Toast.show("注册成功");
        setType("login");
      }
    } catch (err) {
      Toast.show(err.msg);
    }
  }

  const changeCheckbox = (e) => {
    if (!e.target.checked) {
      setChecked(false);
      return;
    }
    setChecked(true);
  }

  return (
    <div className={ css.auth }>
      <div className={ css.head } />
      <div className={ css.tab }>
        <span className={ type === "login" ? css.active : null } onClick={() => setType("login")}>登录</span>
        <span className={ type === "register" ? css.active : null } onClick={() => setType("register")}>注册</span>
      </div>
      <div className={ css.form }>
        <Cell icon={ <CustomIcon type="zhanghao" /> }>
          <Input 
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={ (value) => setUsername(value) }
          />
        </Cell>
        <Cell icon={ <CustomIcon type="mima" /> }>
          <Input 
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={ (value) => setPassword(value) }
          />
        </Cell>
        {
          type === 'register' ?
          <Cell icon={ <CustomIcon type="mima" /> }>
            <Input 
              clearable
              type="text"
              placeholder="请输入验证码(1234)"
              onChange={ (value) => setVerify(value) }
            />
          </Cell>
          : null
        }
      </div>
      <div className={ css.operation }>
        {
          type === "register" ?
          <div className={ css.agree }>
            <Checkbox checked={ checked } onChange={ changeCheckbox } />
            <label className="text-light">阅读并同意<a>《嗨嗨手记条款》</a></label>
          </div>
          : null
        }
        <Button block theme="primary" onClick={ onSubmit }>{ type === "login" ? "登录" : "注册" }</Button>
      </div>
    </div>
  )
}

export default Login;
