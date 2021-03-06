import React from 'react';
import {useClassName} from '@hooks';
import './Preloader.scss';

const Preloader = () => {
    const {cn} = useClassName('preloader');
    return (
        <div className={cn()}>
            <div className={cn('wrapper')}>
                <svg className="preloader__logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 79 76">
                    <path fill="url(#paint0_linear)" fillRule="evenodd"
                          d="M1.85742 18.391C2.35242 8.288 10.1454.495 20.2494 0h38.285c10.103.495 17.897 8.288 18.392 18.391.668 13.62.667 24.666 0 38.286-.495 10.103-8.289 17.897-18.392 18.392h-38.285c-10.103-.495-17.89698-8.289-18.39198-18.392V18.391z"
                          clipRule="evenodd"/>
                    <path fill="#fff" fillRule="evenodd"
                          d="M17.792 19.965H60.99c9.787 0 17.793 8.007 17.793 17.793 0 8.069-5.444 14.927-12.839 17.086v12.747l-15.538-12.04H17.792C8.006 55.551 0 47.544 0 37.758s8.006-17.793 17.792-17.793z"
                          clipRule="evenodd"/>
                    <path fill="#2C3D4F" fillRule="evenodd"
                          d="M61.7987 34.227c-1.762-1.76-4.194-2.85-6.882-2.85-2.687 0-5.12 1.089-6.881 2.85-1.761 1.762-2.851 4.195-2.851 6.882 0 .713.29 1.359.757 1.826.467.468 1.113.757 1.826.757.713 0 1.359-.289 1.827-.757l-.002-.002c.469-.469.758-1.115.758-1.824 0-1.261.512-2.403 1.338-3.229.826-.826 1.967-1.337 3.228-1.337 1.261 0 2.403.511 3.229 1.337.826.826 1.337 1.968 1.337 3.229 0 .713.289 1.359.757 1.826.467.468 1.113.757 1.826.757.713 0 1.359-.289 1.827-.757l-.002-.002c.469-.469.758-1.115.758-1.824 0-2.687-1.089-5.12-2.85-6.882zm-30.589 0c-1.761-1.76-4.194-2.85-6.881-2.85-2.687 0-5.12 1.089-6.882 2.85-1.761 1.762-2.85 4.195-2.85 6.882 0 .713.289 1.359.757 1.826.467.468 1.113.757 1.826.757.713 0 1.359-.289 1.827-.757l-.002-.002c.469-.469.758-1.115.758-1.824 0-1.261.511-2.403 1.337-3.229.826-.826 1.968-1.337 3.229-1.337 1.261 0 2.403.511 3.229 1.337.825.826 1.337 1.968 1.337 3.229 0 .713.289 1.359.756 1.826.468.468 1.114.757 1.827.757.713 0 1.359-.289 1.826-.757l-.002-.002c.469-.469.759-1.115.759-1.824 0-2.687-1.09-5.12-2.851-6.882z"
                          clipRule="evenodd"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="68.3484" x2=".902422" y1="-6.991" y2="98.695"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F50A74"/>
                            <stop offset="1" stopColor="#762E85"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div className={cn('three-bounce')}>
                    <div className={cn('child')}/>
                    <div className={cn('child')}/>
                    <div className={cn('child')}/>
                </div>
            </div>
        </div>
    );
};

export default Preloader;