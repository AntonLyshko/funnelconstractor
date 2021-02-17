import * as React from 'react';
import { Layout } from 'antd';
import { useClassName } from '@hooks';
// import Footer from '@components/Footer/Footer';

import './FooterLayout.scss';

const FooterLayout = () => {
    const { cn } = useClassName('footer-layout');
    return (
        <Layout.Footer className={cn()}>
            {/* <Footer/> */}
        </Layout.Footer>
    );
}

export default FooterLayout;
