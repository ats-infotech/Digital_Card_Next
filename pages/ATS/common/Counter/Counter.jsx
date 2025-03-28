'use client'
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react"

const Counter = ({ targetValue, title, progressColor, completed}) => {
    const [count, setCount] = useState(1)
    const speed = 200
    const sm = useMediaQuery('(max-width: 374px)')
    const md = useMediaQuery('(max-width: 389px)')

    const progressBarStyle = {
        width: `${(count / targetValue) * completed}%`,
        height: '8px',
        borderRadius:'40px',
        background: progressColor,
        transition: 'width 0.6 linear'
    };

    useEffect(() => {
        const updateCount = () => {
          const inc = targetValue / speed;
          if (count < targetValue) {
            setCount(prevCount => prevCount + inc);
          }
        };
    
        if (count < targetValue) {
          const timer = setTimeout(updateCount, 1);
          return () => clearTimeout(timer);
        }
      }, [count, targetValue]);
    return (
        <Box className='!w-[100%]'>
            <Typography variant="h5" className="!text-center !font-poppins !text-atscountertitle !leading-[33px] !font-[600] !mb-[6px] !text-darkbblue">{Math.floor(count)}+</Typography>
            <Typography variant="h6" className={`!text-center !font-poppins !leading-[18px] !font-[600] !mb-[8px] ${sm ? '!text-atscounterdesc_md' : md ? '!text-atscounterdesc_lg' : '!text-atscounterdesc'}`}>{title}</Typography>
            <div className='!w-[100%] !bg-[#ccc] !h-[8px] !rounded-[40px]'>
                <div style={progressBarStyle}></div>
            </div>
        </Box>
    )
}

export default Counter