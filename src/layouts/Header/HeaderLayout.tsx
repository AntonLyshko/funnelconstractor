import * as React from 'react';

import { Layout } from 'antd';
import Header from '@components/Header/Header';

import './HeaderLayout.scss';

const HeaderLayout = () => {
    return (
        <Layout.Header className={'header-layout'}>
            <Header />
        </Layout.Header>
    );
}

export default HeaderLayout;
