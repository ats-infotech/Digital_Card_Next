'use client'
import './CarouselSlide.css';
import React, { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity/dist/flickity.css';
import './CarouselSlide.css';
import { Box, Typography } from '@mui/material';
import "flickity-as-nav-for";
import { KeyboardArrowRight } from '@mui/icons-material';
import { Button } from 'rsuite';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { SideContainer } from '@/pages/common/CommonUI';

const CarouselSlide = () => {

    const [products, setProducts] = useState([])
    const params = useParams()
    const router = useRouter()

    const fetchProduct = async () => {
        const response = await fetch('/api/sdproduct');
        const data = await response.json();
        setProducts(data?.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const carouselRef = useRef(null);
    const carouselRef1 = useRef(null);

    useEffect(() => {
        const elem = carouselRef.current;
        const flkty = new Flickity(elem, {
            cellAlign: 'center',
            pageDots: false,
            groupCells: 1,
            selectedAttraction: 0.03,
            wrapAround: true,
            autoPlay: false,
            asNavFor: '.carousel-main',
            prevNextButtons: true,
            draggable: false
        });

        const elem1 = carouselRef1.current;
        const flkty1 = new Flickity(elem1, {
            cellAlign: 'center',
            pageDots: false,
            selectedAttraction: 0.03,
            wrapAround: true,
            autoPlay: false,
            asNavFor: '.carousel-main',
            prevNextButtons: false,
            groupCells: 1,
            draggable: false
        });

        return () => {
            flkty.destroy();
            flkty1.destroy();
        };
    }, [products, params]);

    return (
        <>
            <SideContainer>
                <div className="carousel-div">
                    <Box className='exploresection !mb-[25px]'>
                        <Button onClick={() => router.push("/sunildiamond-productlist")} className='expmorebtn !shadow-[0_0px_2px_rgba(0,0,0,0.25)] !bg-white hover:!bg-white hover:!text-yellowmild !text-sdexplorebtn !font-poppins !font-[600] !text-yellowmild'>
                            Explore More
                            <KeyboardArrowRight sx={{
                                marginLeft: '5px'
                            }} fontSize='small' />
                        </Button>
                    </Box>
                    <div className="carouselSlide-1 carousel-main" ref={carouselRef}>
                        {
                            products?.length > 0 && products.map((items) => {
                                return (
                                    <Box id='c1' key={items?.id} className='carousel-cell-1 carousel-main !p-[15px] !rounded-[15px]'>
                                        <Box className="carousel-img-1">
                                            <Image quality={100} src={`/${items.image}`} alt="" className='!h-[100%] w-[100%] !object-contain !relative carousel-main' fill />
                                        </Box>
                                        <Typography className='productinfo !text-poppins !font-[600]' sx={{ textAlign: 'center' }}>{items.name}</Typography>
                                    </Box>
                                )
                            })
                        }
                    </div>
                    <div className="carouselSlide carousel-nav" ref={carouselRef1}>
                        {
                            products?.length > 0 && products.map((items) => {
                                return (
                                    <Box id='c2' key={items?.id} className='carousel-cell carousel-nav !shadow-default'>
                                        <Box className='round-shape !shadow-[0_0px_10px_rgba(0,0,0,0.25)] !rounded-[50px]'>
                                            <Box className="carousel-img">
                                                <Image quality={100} src={`/${items.image}`} alt="" className='!h-[100%] !w-[100%] !object-contain carousel-nav !relative' fill />
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </div>
                </div>
            </SideContainer>
        </>
    );
};

export default CarouselSlide;
