import React from 'react';
import { Typography } from 'antd';


type TProps = {
    text?: string,
    title?: string
}

const { Title, Text } = Typography;

const Helper = (props: TProps) => {

    const { text, title } = props;


    return (
        <div className="helper-container">
            <Typography>
                {
                    title ? (
                        <Title>{title}</Title>
                    ) : (null)
                }
                <Text>
                    {text}
                </Text>
            </Typography>
        </div>
    );
}

export default Helper;