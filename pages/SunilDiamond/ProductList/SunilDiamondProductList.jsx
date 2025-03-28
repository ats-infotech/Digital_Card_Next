'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import './SunilDiamondProductList.css'
import SvgIcon from '@/assets/icons/SvgIcon'
import { KeyboardArrowLeft } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import WhatsappFill from '@/common/svg/WhatsappFill'

const SunilDiamondProductList = () => {

    const [data, setData] = useState('')
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [profile, setProfile] = useState([])
    const [profiledata, setProfiledata] = useState({
        number: "",
    })

    const fetchProfile = async () => {
        const response = await fetch('/api/sdprofile');
        const data = await response.json();
        setProfile(data?.data)
    }

    const fetchProduct = async () => {
        const response = await fetch('/api/sdproduct');
        const data = await response.json();
        setProducts(data?.data)
    }

    useEffect(() => {
        fetchProduct()
        fetchProfile()
    }, [])

    useEffect(() => {
        if (profile && profile.length > 0) {
            const filterProfile = profile.find(p => p.id === 1);
            if (filterProfile) {
                setProfiledata({
                    number: filterProfile?.number,
                })
            }
        }
    }, [profile]);

    const whatsappnumber = profiledata.number.replace(/[^+\d]/g, '')

    const handleback = () => {
        router.back()
    }

    const filteredImages = products.filter(item =>
        item.name.toLowerCase().includes(data.toLowerCase())
    );

    const handleShare = (name) => {
        const url = window.location.href;
        const text = `Hi, \nI have checked your product and I have Liked it Can you please give me more details on product ${name} \nURL: ${url} \nThanks`;
        const whatsappURL = `https://wa.me/${whatsappnumber}?text=${text}`;
        window.open(whatsappURL, '_blank');
    };

    const sm = useMediaQuery('(max-width: 325px)');
    const msm = useMediaQuery('(max-width: 335px)');
    const lsm = useMediaQuery('(max-width: 345px)');
    const md = useMediaQuery('(max-width: 355px)');
    const mmd = useMediaQuery('(max-width: 365px)');
    const lmd = useMediaQuery('(max-width: 375px)');
    const lg = useMediaQuery('(max-width: 385px)');
    const mlg = useMediaQuery('(max-width: 395px)');
    const llg = useMediaQuery('(max-width: 405px)');
    const xl = useMediaQuery('(max-width: 415px)');
    const xxl = useMediaQuery('(max-width: 425px)');
    const inputWidth = useMemo(() => {
        if (sm) return "300px";
        if (msm) return "310px";
        if (lsm) return "320px";
        if (md) return "330px";
        if (mmd) return "340px";
        if (lmd) return "350px";
        if (lg) return "360px";
        if (mlg) return "370px";
        if (llg) return "380px";
        if (xl) return "390px";
        if (xxl) return "400px";
        return "410px";
    }, [sm, msm, lsm, md, mmd, lmd, lg, mlg, llg, xl, xxl]);

    return (
        <Box className='ProductListPage !min-h-[100vh]'>

            <Box className="!fixed !top-0 !bg-white !pt-[10px] z-10">
                <Box className="backbuttonsection">
                    <Button onClick={handleback}>
                        <Box className="backbuttonsubsection">
                            <KeyboardArrowLeft sx={{ color: 'var(--yellowmild)' }} fontSize="large" />
                        </Box>
                    </Button>
                </Box>
                <div className="Search-Section mb-[20px]">
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '430px' }}>
                        <input
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Search Products"
                            className="searchbox"
                            style={{ width: inputWidth, }}
                        />
                        <button className="search-btn" aria-label="Search">
                            <SvgIcon
                                name={"search"}
                                width={25}
                                height={25}
                                className={"text-white"}
                            />
                        </button>
                    </div>
                </div>
            </Box>

            {filteredImages.length > 0 ? <Box className="!mx-[15px] !grid !grid-cols-2 !gap-[15px] sd-product-image">
                {filteredImages.map((item, i) => (
                    <Box key={item.id} className="product-image-main-section mb-[-50px]">
                        <Box className="product-image-section product-image-main-section">
                            <Box className="product-image-subsection">
                                <Box className="!flex !justify-end !w-[95%]">
                                    <Box className={`!cursor-pointer ${ md ? "!mr-[2px] !mt-[4px]" : lg ? "!mr-[4px] !mt-[4px]" : "!mr-[7px] !mt-[7px]" }`} onClick={() => handleShare(item.name)}>
                                        <WhatsappFill height={ md ? 25 : lg ? 27 : 30} width={ md ? 25 : lg ? 27 : 30} />
                                    </Box>
                                </Box>
                                <Box className="product-image">
                                    <Image quality={100} src={`/${item.image}`} alt="" fill className="!h-[100%] !w-[100%] !object-contain !relative" />
                                </Box>
                            </Box>
                        </Box>
                        <Typography className="product-info">{item.name}</Typography>
                    </Box>
                ))}
            </Box> : <Box className='noproductsection !pt-[60px]'>
                <Typography>No Product Found</Typography>
            </Box>}

        </Box>
    )
}

export default SunilDiamondProductList