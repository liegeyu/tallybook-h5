import { useState, useEffect } from 'react';
import { Button, List } from "zarm";
import { get } from "@/utils";
import { useNavigate } from "react-router-dom";

import css from "./style.module.less";

const User = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get('/user/get_userinfo');
    setUser(data);
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigateTo("/login");
  }

  return (
    <div className={ css.user }>
      <div className={ css.header }>
        <div className={ css.info }>
          <span>昵称: { user.username || '--' }</span>
          <span>
            <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="tag" />
            <b>{ user.signature || '暂无个签' }</b>
          </span>
        </div>
        <img className={ css.avatar } style={{ width: 60, height: 60, borderRadius: 8 }} src={ user.avatar || '' } alt="头像" />
      </div>
      <div className={ css.content }>
        <List>
          <List.Item 
            hasArrow
            title="用户信息修改" 
            onClick={() => navigateTo('/userinfo')}
            prefix={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />}
          />
          <List.Item 
            hasArrow
            title="重置密码" 
            onClick={() => navigateTo('/account')}
            prefix={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />}
          />
          <List.Item 
            hasArrow
            title="关于我们" 
            onClick={() => navigateTo('/about')}
            prefix={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />}
          />
        </List>
      </div>
      <Button className={ css.logout } block theme="danger" onClick={() => logout()} >退出登录</Button>
    </div>
  )
}

export default User