import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

import css from "./style.module.less";

const About = () => {

    return (
        <>
            <Header title="关于" />
            <div className={ css.about }>
                <div className={ css.content }>
                    <p className={ css.haihai }>嗨嗨嗨</p>
                    <p className={ css.lailai }>快来用用我的流水账本儿</p>
                </div>
                <div className={ css.footer }>
                    <p className={ css.author }>Power by hairy</p>
                    <p className={ css.github }>Github: &nbsp;<a href="https://github.com/liegeyu/tallybook-h5">https://github.com/liegeyu/tallybook-h5</a></p>
                </div>
                <div className={ css.square }></div>
                <div className={ css.circle }></div>
                <div className={ css.trangle }></div>
            </div>
        </>
    )
}

export default About;
