import React from "react";
import { List, Input, Button, Toast } from "zarm";
import { createForm } from "rc-form";
import Header from "@/components/Header";
import { post } from "@/utils";

import css from "./style.module.less";

const Account = (props) => {
    const { getFieldProps, getFieldError } = props.form;

    const submit = () => {
        props.form.validateFields(async (error, value) => {
            if (!error) {
                if  (value.newpass !== value.newpass2) {
                    Toast.show('两次输入密码不一致');
                    return;
                }
            }
            await post('/user/modify_pass', {
                old_pass: value.oldpass,
                new_pass: value.newpass,
                new_pass2: value.newpass2
            })
            Toast.show('修改成功');
        })
    }

    return <>
        <Header title="重置密码" />
        <div className={ css.account }>
            <div className={ css.form }>
                <List>
                    <List.Item title="原密码">
                        <Input
                            clearable
                            type="text"
                            placeholder="请输入原密码"
                            {...getFieldProps('oldpass', { rules: [{ required: true }] })}
                        />
                    </List.Item>
                    <List.Item title="新密码">
                        <Input
                            clearable
                            type="text"
                            placeholder="请输入新密码"
                            {...getFieldProps('newpass', { rules: [{ required: true }] })}
                        />
                    </List.Item>
                    <List.Item title="确认密码">
                        <Input
                            clearable
                            type="text"
                            placeholder="请确认新密码"
                            {...getFieldProps('newpass2', { rules: [{ required: true }] })}
                        />
                    </List.Item>
                </List>
            </div>
            <Button className={ css.btn } block theme="primary" onClick={ submit }>提交</Button>
        </div>
    </>
}

const AcountForm = createForm()(Account)

export default AcountForm;