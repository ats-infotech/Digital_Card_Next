'use client'
import React, { useEffect, useState } from "react"
import './ProductDetails.css'
import { Box, Button, Typography } from "@mui/material"
import { IosShare, KeyboardArrowLeft } from "@mui/icons-material"
import ProductWhatsappfill from "../../../common/svg/ProductWhatsappfill"
import { RWebShare } from "react-web-share";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImageZoomModel, Sizechartmodal } from "@/pages/ATS/modals/centralizedModel"
import { SideContainer } from "@/pages/common/CommonUI"

const dresssizechart = [
    {
        "name": "extrasmall",
        "type": "XS",
        "Bust": "32",
        "Waist": "24",
        "FrontLength": "51",
        "Hips": "34",
    },
    {
        "name": "small",
        "type": "S",
        "Bust": "34",
        "Waist": "26",
        "FrontLength": "51",
        "Hips": "36",
    },
    {
        "name": "meduim",
        "type": "M",
        "Bust": "38",
        "Waist": "28",
        "FrontLength": "51",
        "Hips": "38",
    },
    {
        "name": "large",
        "type": "L",
        "Bust": "40",
        "Waist": "30",
        "FrontLength": "51",
        "Hips": "40",
    },
    {
        "name": "extralarge",
        "type": "XL",
        "Bust": "42",
        "Waist": "32",
        "FrontLength": "51",
        "Hips": "42",
    },
    {
        "name": "doublexl",
        "type": "XXL",
        "Bust": "44",
        "Waist": "34",
        "FrontLength": "51",
        "Hips": "44",
    },
]

const ProductDetails = () => {

    const [activeIndex, setActiveIndex] = useState()
    const [sizeIndex, setSizeIndex] = useState()
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleopen = () => setOpen(true)
    const [fullscreen, setFullscreen] = useState(false)
    const [id, setID] = useState()
    const router = useRouter()
    const [productcode, setProductcode] = useState()
    const [productprice, setProductprice] = useState()
    const [zoomImage, setZoomImage] = useState('')
    const [profile, setProfile] = useState([])
    const [profiledata, setProfiledata] = useState({
        phone: '',
        tel: '',
        address: '',
        insta: '',
        gmap: '',
        instalink: '',
        iframe: null,
        name: '',
        year: '',
        nature: '',
        desc: '',
        otherlink: '',
        otherlinktitle: ''
    })

    const fetchProfile = async () => {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data?.data)
    }

    useEffect(() => {
        if (profile && profile.length > 0) {
            const filterProfile = profile.find(p => p.id === 1);
            if (filterProfile) {
                setProfiledata({
                    phone: filterProfile?.Phone,
                    tel: filterProfile?.Tel,
                    address: filterProfile?.Address,
                    insta: filterProfile?.Insta,
                    gmap: filterProfile?.Gmap,
                    instalink: filterProfile?.Instalink,
                    iframe: filterProfile?.iframe,
                    name: filterProfile?.name,
                    year: filterProfile?.year,
                    nature: filterProfile?.nature,
                    desc: filterProfile?.Desc,
                    otherlink: filterProfile?.otherlink,
                    otherlinktitle: filterProfile?.linktitle
                });
            }
        }
    }, [profile]);

    const whatsappnumber = profiledata.tel.replace(/[^+\d]/g, '')


    const handledCategory = (id) => {
        setSizeIndex(id)
    }

    const handlehoverimage = (item) => {
        let fileImage = item.filename
        if (fileImage) {
            setZoomImage(fileImage)
        }
        setActiveIndex(item.id)
    }

    const handlefullscreenclose = () => setFullscreen(false)

    const handleShare = () => {
        const url = window.location.href;
        const text = encodeURIComponent(`Hi,\n I have checked your Dress and I have Liked it Can you please give me more details on Dress ${productcode} \n URL: ${url}\n  Thanks`);
        const whatsappURL = `https://wa.me/${whatsappnumber}?text=${text}`;
        window.open(whatsappURL, '_blank');
    };

    const shareurl = window.location.href;

    const [post, setPost] = useState([])
    const [fsize, setFsize] = useState([])
    const [Images, setImages] = useState([])
    const [productdesc, setProductdesc] = useState()

    useEffect(() => {
        fetchData()
        fetchImages()
        fetchSize()
        fetchProfile()
    }, []);

    useEffect(() => {
        const path = window.location.pathname
        const codee = path.slice(29)
        const filterpost = post.filter((items) => items.code === codee)
        const finalpost = filterpost.shift()
        setID(finalpost?.id)
        setProductdesc(finalpost?.description)
        setProductcode(finalpost?.code)
        setProductprice(finalpost?.price)
    }, [post])

    useEffect(() => {
        const filterImageindex = Images.filter((items) => items.ImageId === id);
        const activeid = filterImageindex.shift();
        if (activeid) {
            if (activeid.id !== activeIndex?.id) {
                setActiveIndex(activeid.id);
                setZoomImage(activeid.filename)
            }
        } else {
            console.log('No matching image found');
        }
    }, [id, Images])

    const fetchData = async () => {
        let response = await fetch('/api/posts');
        const data = await response.json();
        setPost(data?.data)
    }

    const fetchSize = async () => {
        let response = await fetch('/api/sizes');
        const data = await response.json();
        setFsize(data?.data)
    }

    const fetchImages = async () => {
        const response = await fetch('/api/images');
        const data = await response.json();
        setImages(data?.data);
    };

    const filterimages = Images.filter((items) => items.ImageId === id)

    const handleBack = () => {
        router.back()
        window.scrollTo(0, 0);
    }

    const handleBuy = () => {
        if (sizeIndex === undefined) {
            alert("Please Select Size")
        } else {
            const text = encodeURIComponent(`Hi,\n Product - ${productcode} \n Price - ${productprice} \n Size - ${sizeIndex} \n I have checked your Product and I loved it, Can you please tell me how i get this Product \n  Thanks`);
            const whatsappURL = `https://wa.me/${whatsappnumber}?text=${text}`;
            window.open(whatsappURL, '_blank');
        }
    }

    return (
        <Box className='ProductDetailsPage'>
            <Box className="backbuttonsection !fixed !top-0 !bg-white !z-1 !w-[100%] !max-w-[370px] !py-[10px] !ml-[20px]">
                <Button onClick={handleBack} aria-label="backbtn" sx={{ paddingInline: "0px !important", justifyContent: "start !important", minWidth: "0px !important" }} >
                    <Box className="backbtnsection">
                        <KeyboardArrowLeft sx={{ color: 'var(--purpledark)' }} fontSize="large" />
                    </Box>
                </Button>
            </Box>
            <SideContainer>
                <Box className="!pt-[70px]">
                    <Box className='productssection z-0'>
                        <Box className="leftimagesection">
                            {
                                filterimages.map((items, i) => (
                                    <Box key={i}>
                                        <Box className="flex-col" key={i}>
                                            <Box className={`productimagesection ${activeIndex === items.id ? "!border-purpledark" : "!border-transparent"}`} >
                                                <Image quality={100} priority key={i} src={`/${items.filename}`} width={300} height={300} alt="product" onMouseOver={() => handlehoverimage(items)} onClick={() => handlehoverimage(items)} />
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                        <Box className='productimageselected' >
                            <Box>
                                <Box className="productimageselectedsection">
                                    {
                                        post.map((items, i) => {

                                            return (
                                                <Box key={i}>
                                                    {items.id === id &&
                                                        <Box className="productimageselectedsubsection">
                                                            <Box >
                                                                <Typography variant="h5">{items.code}</Typography>
                                                            </Box>
                                                            <Box className="!flex">
                                                                <Box>
                                                                    <RWebShare
                                                                        data={{
                                                                            url: shareurl,
                                                                        }}
                                                                        onClick={() => console.info("share successful!")}
                                                                    >
                                                                        <button className="pdsharebtn" aria-label="sharebtn">
                                                                            <IosShare sx={{
                                                                                fontSize: '18px',
                                                                                color: 'var(--white)',
                                                                                marginBottom: '3px'
                                                                            }} />
                                                                        </button>
                                                                    </RWebShare>
                                                                </Box>
                                                                <Box className='!w-[40px]'>
                                                                    <Box onClick={handleShare} aria-label="whatsappButton" target="_blank">
                                                                        <Box sx={{ cursor: 'pointer' }} >
                                                                            <ProductWhatsappfill
                                                                                height={30}
                                                                                width={30}
                                                                            />
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    }
                                                    {
                                                        items.id === id &&
                                                        <Box className="selectedimage">
                                                            <Image quality={100} priority onClick={() => setFullscreen(true)} src={`/${zoomImage}`} width={300} height={300} alt="product" />
                                                            <Box className="selectedimagesubsection">
                                                                <Typography variant="h5">{items.name}</Typography>
                                                                <Typography variant="h5">₹{items.price}</Typography>
                                                            </Box>
                                                        </Box>
                                                    }
                                                </Box>
                                            )
                                        }
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        {
                            fsize.map((item, i) => {
                                const sizeOptions = [
                                    { label: 'XS', key: 'extrasmall' },
                                    { label: 'S', key: 'small' },
                                    { label: 'M', key: 'meduim' },
                                    { label: 'L', key: 'large' },
                                    { label: 'XL', key: 'extralarge' },
                                    { label: 'XXL', key: 'extraextralarge' }
                                ];
                                return (
                                    item.id === id &&
                                    <Box key={i} className="pdsizesection">
                                        {sizeOptions.map(({ label, key }) =>
                                            item[key] && (
                                                <button
                                                    key={label}
                                                    onClick={() => handledCategory(label)}
                                                    className={`pdsizebutton ${sizeIndex === label ? '!bg-purpledark !text-white' : '!bg-white !text-purpledark'}`}
                                                >
                                                    {label}
                                                </button>
                                            )
                                        )}
                                    </Box>
                                );
                            })
                        }
                    </Box>
                    {<Box className="sizechartbtn ">
                        <Button className='sizebtn' onClick={handleopen}> Size Chart</Button>
                    </Box>}
                    <Box className='producttextdetail '>
                        <Typography className="productdetailtext !mb-[15px]" variant="h3">
                            {
                                productdesc?.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        <Typography className="productdetailtext">{line}</Typography>
                                        {index < productdesc.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))
                            }
                        </Typography>
                    </Box>
                    <Box className="pdbuybtnsection">
                        <Button className="pdbuybtn" onClick={handleBuy} >Buy Now</Button>
                    </Box>
                    <Box>
                        <Sizechartmodal open={open} close={handleClose} chartsize={dresssizechart} />
                    </Box>
                    <Box>
                        <ImageZoomModel open={fullscreen} close={handlefullscreenclose} setFullscreen={() => setFullscreen(false)} zoomImage={zoomImage} />
                    </Box>
                </Box>
            </SideContainer>
        </Box>
    )
}

export default ProductDetails