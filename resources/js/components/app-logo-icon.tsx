import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M.97,11.11l17.96,25.14s1.52,2.4,4.97,2.91h4.7l-14.99-21.02,11.42-.04-3.45-4.86s-2.22-2.24-5.14-2.13H.97Z"
                stroke="#000" stroke-miterlimit="10" />
            <path
                d="M5,.5h21.29s8.85.17,10.87,11.78c0,0,1.55,9.37-5.75,14.56l8.74,12.32h-4.91s-3.13-.49-5.02-3.16-10.22-14.42-10.22-14.42l6.05.04s5.32-.39,5.52-7.03c0,0,.15-5.97-5.37-7.1h-13.26s-3.27.04-5.67-3.66L5,.5Z"
                stroke="#000" stroke-miterlimit="10" />
        </svg>
    )
        ;
}
