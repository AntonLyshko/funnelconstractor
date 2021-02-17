import React from 'react';

type TProps = {
    type?: string;
    handleSignSelect?: (connector?: string, sign?: string) => void
}

const SignMenu = (props: TProps) => {
    const { handleSignSelect, type } = props;

    return (
        <div className='sign-menu-container'>
            <div className={`comparison-sign ${type === 'number' || 'string' ? '' : 'disable'}`} onClick={type === 'number' || 'string' ? () => handleSignSelect('=') : null} >
                =
            </div>
            <div className={`comparison-sign ${type === 'number' || 'string' ? '' : 'disable'}`} onClick={type === 'number' || 'string' ? () => handleSignSelect('≠') : null}>
                ≠
            </div>
            <div className={`comparison-sign ${type === 'number' ? '' : 'disable'}`} onClick={type === 'number' ? () => handleSignSelect('>') : null}>
                {'>'}
            </div>
            <div className={`comparison-sign ${type === 'number' ? '' : 'disable'}`} onClick={type === 'number' ? () => handleSignSelect('≥') : null}>
                ≥
            </div>
            <div className={`comparison-sign ${type === 'number' ? '' : 'disable'}`} onClick={type === 'number' ? () => handleSignSelect('<') : null}>
                {'<'}
            </div>
            <div className={`comparison-sign ${type === 'number' ? '' : 'disable'}`} onClick={type === 'number' ? () => handleSignSelect('≤') : null}>
                ≤
            </div>
            <div className={`comparison-sign string-array ${type === 'stringArray' ? '' : 'disable'}`} onClick={type === 'stringArray' ? () => handleSignSelect('has') : null}>
                has
            </div>
            <div className={`comparison-sign string-array ${type === 'stringArray' ? '' : 'disable'}`} onClick={type === 'stringArray' ? () => handleSignSelect('!has') : null}>
                !has
            </div>
        </div >
    )

}

export default SignMenu;