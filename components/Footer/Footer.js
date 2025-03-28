'use client'
import { Box, List, ListItem, Typography } from '@mui/material';
import './Footer.css'
import SvgIcon from '@/assets/icons/SvgIcon';

const Footer = ({handleClick, path, FooterList, color, activeColor}) => {
    
    return (
        <Box className='!fixed !bottom-0 !left-0 !w-[100%] !z-[1024] !text-center !bg-white !shadow-custom !overflow-hidden !rounded-t-[30px]'>
            {FooterList?.length > 0 &&<List className='!flex !item-center'>
                {
                    FooterList?.length > 0 && FooterList.map((item) => {
                            
                        const isActive =( path === item?.path.slice(1))
                        return(
                            <ListItem className={`!relative listItems !justify-center !py-[0px] ${ isActive && `!text-${activeColor} active`}`} key={item?.name}>
                                {isActive && <Box className={`!w-[60px] !h-[4px] !bg-${activeColor} !rounded-b-[20px] !absolute !top-[-8px]`}></Box>}
                                <a href={item?.path} onClick={handleClick} className='!flex !items-center !flex-col'>
                                   <SvgIcon name={item?.icon} width={30} height={30} className={`${isActive ? `!text-${activeColor}` : `!text-footergrey` } !mt-[10px] !mb-[5px] !transition-all !duration-[500] listItemsIcon`}/>
                                   <Typography variant="h6" className={`listItemsName !font-poppins !font-[600] !leading-[18px] ${isActive ? `!text-${activeColor}` : `!text-footergrey`}`}>{item?.name}</Typography>
                                </a>
                            </ListItem>
                        )
                    })
                }
           </List>}
        </Box>
    )
}

export default Footer