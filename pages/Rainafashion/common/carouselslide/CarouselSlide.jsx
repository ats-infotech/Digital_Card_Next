'use client'
import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/dist/flickity.css';
import './CarouselSlide.css';
import { Box, Typography } from '@mui/material';
import SvgIcon from '@/assets/icons/SvgIcon';


const CarouselSlide = ({ data }) => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const elem = carouselRef.current;
        const flkty = new Flickity(elem, {
            cellAlign: 'center',
            pageDots: true,
            groupCells: "25%",
            selectedAttraction: 0.03,
            friction: 1,
            wrapAround: true,
            autoPlay: true,
            prevNextButtons: false
        });

        return () => {
            flkty.destroy();
        };
    }, []);

    return (
        <div className="carouselSlide" ref={carouselRef}>
            {
                data?.length > 0 && data.map((items) => {
                    return (
                        <Box key={items?.title} className='carousel-cell !shadow-default !p-[15px] !rounded-[15px]'>
                            <SvgIcon name={items?.icon} width={35} height={35} className='!text-purpledark !mb-[15px]' />
                            <Typography variant="h5" className="!text-rainaaboutusinfo !leading-rainaaboutusinfolh !text-purpledark !font-[600] !mb-[15px] !font-poppins !border-b-[1px] !border-grey-[100]">{items?.title}</Typography>
                            <Typography variant="h5" className="!text-rainaaboutusinfo !leading-rainaaboutusinfolh !text-purpledark !font-[600] !mb-[5px] !font-poppins">{items?.detail}</Typography>
                            <Typography variant="h5" className={`!text-rainaaboutusinfo !leading-rainaaboutusinfolh !text-purpledark !font-[400] !font-poppins ${items.icon === "callonOutline" ? "!font-[600]" : ''}`}>{items?.description}</Typography>
                        </Box>
                    )
                })
            }
        </div>
    );
};

export default CarouselSlide;
