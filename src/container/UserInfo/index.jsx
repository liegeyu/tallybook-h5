import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useNavigate  } from "react-router-dom";
import { FilePicker, Input, Button, Toast } from "zarm";
import { get, post, imgUrlTrans } from "@/utils";
import axios from "axios";
import { baseUrl } from "config";


import css from "./style.module.less"

const UserInfo = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    const { data } = await get('/user/get_userinfo');
    setUser(data);
    setAvatar(imgUrlTrans(data.avatar));
    setSignature(data.signature);
  }

  const handleSelect = (file) => {
    if (file && file.file.size > 200 * 1024) {
      Toast.show("上传头像不得超过 200 KB");
      return;
    }
    let formData = new FormData();
    formData.append('file', file.file);

    axios({
      method: 'post',
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }).then(res => {
      const { data } = res;
      setAvatar(imgUrlTrans(data.data));
    })
  }

  const save = async () => {
    await post('/user/edit_userinfo', {
      signature,
      avatar
    });

    Toast.show('修改成功');
    navigateTo(-1);
  }

  return (
    <>
      <Header title="用户信息" />
      <div className={ css.userinfo }>
        <h1>个人资料</h1>
        <div className={ css.item }>
          <div className={ css.title }>头像</div>
          <div className={ css.avatar }>
            <img className={ css.avatarUrl } src={ avatar } alt="头像" />
            <div className={ css.desc }>
              <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker className={ css.filePicker } onChange={ handleSelect } accept="image/*">
                <Button className={ css.upload } theme='primary' size='xs'>点击上传</Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={ css.item }>
          <div className={ css.title }>个性签名</div>
          <div className={ css.signature }>
            <Input
              clearable
              type="text"
              value={ signature }
              placeholder="请输入个性签名"
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={ save } style={{ marginTop: 50 }} block theme='primary'>保存</Button>
      </div>
    </>
  )
}

export default UserInfo;