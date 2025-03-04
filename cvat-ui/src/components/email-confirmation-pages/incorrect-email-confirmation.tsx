// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import './styles.scss';

const { Content } = Layout;

/**
 * Component for displaying message that email confirmation URL is incorrect
 */

export default function IncorrectEmailConfirmationPage(): JSX.Element {
    return (
        <Layout>
            <Content>
                <Row justify='center' align='middle' id='incorrect-email-confirmation-page-container'>
                    <Col>
                        <h1>
                            邮件中确认链接失效或不合法
                        </h1>
                        <p>
                            请发起新的邮件确认请求
                        </p>
                        <Button className='cvat-go-to-login-button' type='link' href='/auth/login'>
                            去登录页
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
