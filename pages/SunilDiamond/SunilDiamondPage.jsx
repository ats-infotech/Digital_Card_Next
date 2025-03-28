'use client'
import React, { Fragment, useState, useEffect } from "react"
import { Box, Typography, Button, CircularProgress } from "@mui/material"
import './SunilDiamondPage.css'
import CarouselSlide from "./common/Carousel/CarouselSlide"
import { Progress } from "rsuite"
import { Circle } from "@mui/icons-material"
import SvgIcon from "@/assets/icons/SvgIcon"
import qrcode from '../../assets/image/sunildiamond/qrcode.png'
import i from '../../assets/image/sunildiamond/Frame.png'
import Link from "next/link"
import Image from "next/image"
import Loader from "@/common/Loader"
import { SideContainer } from "../common/CommonUI"

const EnquiryField = [
    {
        id: 1,
        name: "name",
        text: 'Name',
        type: 'text',
    },
    {
        id: 2,
        name: 'email',
        text: 'Email',
        type: 'email',
    },
    {
        id: 3,
        name: 'phonenumber',
        text: 'Phone Number',
        type: 'tel',
    },
    {
        id: 4,
        name: 'message',
        text: 'Message',
        type: 'text',
    }
]

const SunilDiamondPage = () => {

    const [progress, setProgress] = useState(0);
    const [File, setFile] = useState()
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phonenumber: "",
        message: "",
        fileName: 'Choose an image'
    });
    const [profile, setProfile] = useState([])
    const [profiledata, setProfiledata] = useState({
        name: "",
        year: "",
        number: "",
        gmap: "",
        iframe: null,
        title: "",
        subtitle: "",
        fromday: "",
        today: "",
        fromtime: "",
        totime: "",
        email: "",
        Broadcastlink: ""

    })
    const [profileloading, setProfileLoading] = useState(true)
    const [iframeloading, setIframeloading] = useState(true)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    useEffect(() => {
        if (profile && profile.length > 0) {
            const filterProfile = profile.find(p => p.id === 1);
            function convertTo12Hour(fromtime) {
                let [hour, minute] = fromtime.split(':').map(Number);
                let period = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12;
                hour = hour === 0 ? 12 : hour;
                let formattedHour = hour < 10 ? hour.toString() : hour.toString();
                let formattedMinute = minute.toString().padStart(2, '0');
                return `${formattedHour}:${formattedMinute} ${period}`;
            }
            let fromtime = convertTo12Hour(filterProfile?.fromtime);
            let totime = convertTo12Hour(filterProfile?.totime)
            if (filterProfile) {
                setProfiledata({
                    name: filterProfile?.name,
                    year: filterProfile?.year,
                    number: filterProfile?.number,
                    gmap: filterProfile?.gmap,
                    iframe: filterProfile?.iframe,
                    title: filterProfile?.title,
                    subtitle: filterProfile?.subtitle,
                    fromday: filterProfile?.fromday,
                    today: filterProfile?.today,
                    fromtime: fromtime,
                    totime: totime,
                    email: filterProfile?.email,
                    Broadcastlink: filterProfile?.Broadcastlink
                })
            }
        }
    }, [profile]);

    const fromam = profiledata.fromtime.slice(5).replace(" ", "").toLowerCase()
    const toam = profiledata.totime.slice(5).replace(" ", "").toLowerCase()
    const fromtime = profiledata.fromtime.slice(0, 2).replace(/[^+\d]/g, '')
    const totime = profiledata.totime.slice(0, 2).replace(/[^+\d]/g, '')
    const fromday = profiledata.fromday.slice(0, 3)
    const today = profiledata.today.slice(0, 3)
    const phonenumber = profiledata.number.replace(/[^+\d]/g, '')

    const fetchProfile = async () => {
        const response = await fetch('/api/sdprofile');
        const data = await response.json();
        if (data?.message === "Get Data Successfully") {
            setProfileLoading(false)
        }
        setProfile(data?.data)
    }

    const Contact = [
        {
            id: 1,
            name: 'Call',
            icon: 'call',
            call: profiledata.number,
            redirect: `tel:${phonenumber}`
        },
        {
            id: 2,
            name: 'Whatsapp',
            icon: 'whatsappFill',
            whatsapp: profiledata.number,
            redirect: `https://wa.me/${phonenumber}?text=${window.location.href}`
        },
        {
            id: 3,
            name: 'Location',
            icon: 'location',
            location: '',
            redirect: profiledata.gmap
        },
    ]

    const ContactDetails = [
        {
            name: 'Call Us',
            icon: 'call',
            info: `${fromday}-${today} From ${fromtime}${fromam} to ${totime}${toam}`,
            btntitle: 'Call Our Team',
            redirect: `tel:${phonenumber}`,
        },
        {
            name: 'Visit Us',
            icon: 'location',
            info: 'Visit Our Office HQ.',
            btntitle: 'View On Google Map',
            redirect: profiledata.gmap
        }
    ]

    const AboutUsRight = [
        {
            icon: 'company',
            title: 'Company Profile',
            detail: profiledata.name
        },
        {
            icon: 'callonOutline',
            title: 'Contact Number',
            detail: profiledata.number
        }
    ]

    const AboutUsLeft = [
        {
            icon: 'business',
            title: 'Year Of Business',
            subtitle: 'Since',
            detail: profiledata.year
        }
    ]

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormValues(prev => ({ ...prev, fileName: file ? file.name : 'Choose an image' }));
        setFile(URL.createObjectURL(event.target.files[0]));
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileDataUrl = reader.result;
            sessionStorage.setItem('uploadedImage', fileDataUrl);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const [err, setErr] = useState(false)
    let re = /@/;

    const handleerr = () => {
        if (formValues.name === '') {
            setErr(true)
        } else if (formValues.email === '') {
            setErr(true)
        } else if (!re.test(formValues.email)) {
            setErr(true)
        } else if (formValues.phonenumber === '') {
            setErr(true)
        } else if (formValues.message === '') {
            setErr(true)
        } else {
            setErr(false)
            setSubmit(true)
            setSending(true)
            handleFormSubmit()
        }
    }

    const countErrors = [
        formValues.name === '',
        formValues.email === '' || !re.test(formValues.email),
        formValues.phonenumber === '',
        formValues.message === ''
    ].filter(Boolean).length;
    const heightClass = countErrors === 4 ? 'h-[560px]' : countErrors === 3 ? 'h-[550px]' : countErrors === 2 ? 'h-[540px]' : countErrors === 1 ? 'h-[530px]' : 'h-[510px]';
    const boxClass = err ? `!bg-white !rounded-[20px] !shadow-default !relative !top-[-100px] !mx-[15px] !p-[30px] ${heightClass}` : 'bg-white rounded-[20px] h-[510px] shadow-default relative top-[-100px] mx-[15px] p-[30px]';

    const [submit, setSubmit] = useState(false)

    const handleSubmit = () => {
        handleerr()
    };

    const handleFormSubmit = async () => {
        const text = `<p>Dear ${profiledata.name},</p>
        </br>
        <p>Inquiry for product</p>
        <br/>
        <p>I hope this message finds you well. My name is ${formValues.name}, and I am writing to inquire about product offered by your company${formValues.fileName === 'Choose an image' ? '' : ' whose image is attached with this mail'}.</p>
        <p>Message - ${formValues.message}</p>
        <p>Name - ${formValues.name}</p>
        <p>Email - ${formValues.email}</p>
        <p>Phone Number - ${formValues.phonenumber}</p>`;
        const imageDataUrl = sessionStorage.getItem('uploadedImage');
        if (!imageDataUrl) {
            const response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: profiledata.email,
                    subject: 'Inquiry Regarding Product',
                    text: text
                }),
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert("message sent successfully");
                setFormValues({
                    name: "",
                    email: "",
                    phonenumber: "",
                    message: "",
                    fileName: 'Choose an image'
                })
                setSubmit(false)
                setSending(false)
            } else {
                alert("Error sending message");
            }
        } else {
            const formDataToSend = {
                to: profiledata.email,
                subject: 'Inquiry Regarding Product',
                text: text,
                image: imageDataUrl,
            };

            const response = await fetch('/api/enquirymail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });

            const result = await response.json();
            if (result.status === 'success') {
                alert('message sent successfully');
                sessionStorage.removeItem('uploadedImage')
                setFormValues({
                    name: "",
                    email: "",
                    phonenumber: "",
                    message: "",
                    fileName: 'Choose an image'
                })
                setSubmit(false)
                setSending(false)
            } else {
                alert('Error sending message');
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 200);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box className='sunildiamond'>
            {
                profileloading ?
                    <Loader />
                    : <Box className='HomePage'>

                        {/* Top Header-Section */}

                        <Box className='logosection'>
                            <Box className='logoImage' id='home-section'>
                                <Image quality={100} src={require('../../assets/image/sunildiamond/logo.webp')} alt="sunildiamond" />
                            </Box>
                            <Box className='companyname'>
                                <Typography variant="h5">{profiledata.name}</Typography>
                                <Box className='sdqrsection'>
                                    <Box className="qrimage">
                                        <Image unoptimized src={qrcode} alt="scanner !h-[100%] w-[100%] !object-contain" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className='companyinfo'>
                            <Typography variant="h5" >{profiledata.subtitle}</Typography>
                            <Typography variant="h6" >{profiledata.title}</Typography>
                        </Box>

                        <Box className='sdcontactsection'>
                            {Contact.length > 0 && Contact.map((item) => {
                                return (
                                    <Link href={item?.redirect} target="_blank" key={item?.id}>
                                        <Button className='roundedIconn' aria-label={item?.name}
                                            sx={{
                                                textDecoration: 'none'
                                            }}>
                                            <SvgIcon
                                                name={item?.icon}
                                                width={17}
                                                height={17}
                                                className='!text-white'
                                            />
                                            <Typography variant="h6" className="roundedIconnText">{item?.name}</Typography>
                                        </Button>
                                    </Link>
                                )
                            })}
                        </Box>

                        {/* Contact Section */}

                        <Box className="contact-section">
                            {
                                ContactDetails.map((item, i) => (
                                    <Box key={i} className='card-div'
                                    >
                                        <Box className='card'>
                                            <Link href={item?.redirect} target="_blank" >
                                                <Button className='roundedIcon'
                                                    aria-label={item.name}
                                                >
                                                    <SvgIcon
                                                        name={item?.icon}
                                                        width={17}
                                                        height={17}
                                                        className='!text-inherit hover:!text-yellowmild'
                                                    />
                                                </Button>
                                            </Link>
                                            <Typography variant="h5">{item.name}</Typography>
                                            <Typography variant="h6">{item.info}</Typography>
                                            <Box className="contact-button-section">
                                                <Link href={item?.redirect} target="_blank">
                                                    <Typography className={item.icon === 'location' ? "contact-button hover:!text-white" : "contact-button hover:!text-white"}>{item.btntitle}</Typography>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>

                        {/* Product Section */}

                        <Box className="Product-section" id="products-services-section">
                            <CarouselSlide />
                        </Box>

                        {/* About-Us Section */}

                        <Box className="sdaboutus" id="about-us-section">
                            <Typography variant="h4">About Us</Typography>
                            <SideContainer>
                                <Box className="aboutuscards">
                                    <Box className="!w-[45%]">
                                        {
                                            AboutUsLeft.map((items) => (
                                                <Box className="Leftcard" key={items.title}>
                                                    <SvgIcon name={items?.icon} width={25} height={25} className={progress >= 34 && progress <= 66 ? 'sdactivesvg' : 'sdinactivesvg'} />
                                                    <Typography variant="h5" className={progress >= 34 && progress <= 66 ? "sdactivetext !mb-[5px]" : "sdinactivetext !mb-[5px]"}>{items?.title}</Typography>
                                                    <Typography variant="h5" className={progress >= 34 && progress <= 66 ? "sdactivetext !mb-[2px]" : "sdinactivetext !mb-[2px]"}>{items?.subtitle}</Typography>
                                                    <Typography variant="h5" className={progress >= 34 && progress <= 66 ? "sdactivetext" : "sdinactivetext"}>{items?.detail}</Typography>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                    <Box className="Middlecard !rotate-180 !w-[10%]">
                                        <Box className="Progressbar">
                                            <Progress.Line vertical percent={progress} showInfo={false} strokeColor="#C8A06C" strokeWidth={5} style={{ height: 530 }} aria-label="Progress" />
                                        </Box>
                                        <Box className="first-point">
                                            <Circle sx={{ color: '#C8A06C' }} />
                                        </Box>
                                        <Box className="second-point">
                                            <Circle sx={{ color: '#C8A06C' }} />
                                        </Box>
                                        <Box className="third-point">
                                            <Circle sx={{ color: '#C8A06C' }} />
                                        </Box>
                                    </Box>
                                    <Box className="!w-[45%] ">
                                        {
                                            AboutUsRight.map((items) => (
                                                <Box className="Rightcard" key={items.title}>
                                                    <SvgIcon name={items?.icon} width={25} height={25} className={items.title === 'Company Profile' && progress >= 1 && progress <= 34 ? 'sdactivesvg' : items.title === "Contact Number" && progress >= 66 ? 'sdactivesvg' : 'sdinactivesvg'} />
                                                    <Typography variant="h5" className={items.title === 'Company Profile' && progress >= 1 && progress <= 34 ? "sdactivetext !mb-[15px]" : items.title === "Contact Number" && progress >= 66 ? "sdactivetext !mb-[15px]" : "sdinactivetext !mb-[15px]"}>{items?.title}</Typography>
                                                    <Typography variant="h5" className={items.title === 'Company Profile' && progress >= 1 && progress <= 34 ? "sdactivetext" : items.title === "Contact Number" && progress >= 66 ? "sdactivetext" : "sdinactivetext"}>{items?.detail}</Typography>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </SideContainer>
                        </Box>

                        {/* Join-Us Section */}

                        <Box className="Joinus-section">
                            <Link href={profiledata.Broadcastlink} target="_blank" >
                                <Box className='joinussubsection'>
                                    <Box className='joinusbtnsection'>
                                        <Typography variant="h5">
                                            <span>Join Us</span>
                                            <SvgIcon name='rightArrow' width={20} height={20} className='text-white' />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                            <Typography variant="h6">Join With Us Today And Grow your Business</Typography>
                        </Box>

                        {/* Enquiry Section */}

                        <Box className="Enquiry-section" id='inquiry-section'>
                            <Typography variant="h5">Inquiry</Typography>
                            <Box>
                                <Link href={`${profiledata.gmap}`} target='_blank'>
                                    <Box className="sdinquirysubsection">
                                        {(profileloading || iframeloading) && profiledata.iframe === null ?
                                            <Box className="sdinquiryloadingsection">
                                                <CircularProgress
                                                    sx={{
                                                        color: "var(--yellowmild)"
                                                    }}
                                                />
                                            </Box>
                                            : <iframe
                                                title="Google Map"
                                                onLoad={() => setIframeloading(false)}
                                                src={`${profiledata.iframe}`}
                                                width="600"
                                                height="450"
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="map-section"
                                            ></iframe>}
                                        <Box className='clickmap'>Click On Map</Box>
                                    </Box>
                                </Link>
                                <Box className={boxClass}>
                                    <Box className="mt-[20px]">
                                        {EnquiryField.map((items) => (
                                            <Fragment key={items.name}>
                                                <Box key={i} >
                                                    <input
                                                        name={items.name}
                                                        value={formValues[items.name] || ""}
                                                        onChange={handleInputChange}
                                                        type={items.type}
                                                        className="!border-2 w-[100%] !h-[50px] !border-solid !border-greydark !p-2 !rounded-[15px] !mb-[10px] focus:!outline-none"
                                                    />
                                                    <Box className={`relative top-[-69px] bottom-0 right-0 left-[30px] !flex !justify-center bg-white ${items.text === 'Name' || items.text === 'Email' ? "!w-[60px]" : items.text === "Phone Number" ? "w-[125px]" : "w-[85px]"}`}>
                                                        <Typography className="!font-poppins !text-inputlabel !font-[600] !text-greydark">{items.text}</Typography>
                                                    </Box>
                                                </Box>
                                                {
                                                    err && (
                                                        (formValues[items.name] === '' || (items.name === 'email' && !re.test(formValues.email))) &&
                                                        <Box className='!mt-[-30px] !mb-[20px]' sx={{ color: 'red' }}>
                                                            {items.name === 'email' && !re.test(formValues.email) ? 'Please Include @ in the email address' : `Please enter ${items.name}`}
                                                        </Box>
                                                    )
                                                }
                                            </Fragment>
                                        ))}
                                        <Box className="!flex !justify-center ">
                                            <Box className='uploadsection' sx={{
                                                width: "100%"
                                            }}>
                                                <label htmlFor="fileId" className="!w-[100%]">
                                                    <div className='uploadsubsection'>
                                                        <div>
                                                            {formValues.fileName === 'Choose an image' ? <Image quality={100} src={i} height={20} width={25} alt="icon" className="!h-[25px] !mr-[10px]" /> : <Image quality={100} src={File} height={30} width={30} alt="" className="!mr-[10px]" />}
                                                        </div>
                                                        <div id="fileNameContainer">
                                                            <h2 id="fileName" className={'!text-imagegrey'}>{formValues.fileName}</h2>
                                                        </div>
                                                    </div>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="fileId"
                                                    className="!w-[100%]"
                                                    onChange={handleFileChange}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className="!flex !justify-center !w-[100%]">
                                            <Button
                                                onClick={handleSubmit}
                                                type="submit"
                                                sx={{
                                                    background: !submit ? "" : 'linear-gradient(90deg, var(--yellowmild) 12%, #E2C8A6 90%)',
                                                }}
                                                className="sdsubmitbtn"
                                            >
                                                {sending ?
                                                    <Box className="submitbtnloadingsection">
                                                        <CircularProgress size={"30px"} sx={{ color: 'var(--white)' }} />
                                                    </Box>
                                                    :
                                                    <Box className="!flex !justify-center !w-[100%]">
                                                        <SvgIcon name='flysend' width={25} height={25} className={!submit ? '!text-black !mr-[10px]' : '!text-white !mr-[10px]'} />
                                                        <span className={!submit ? '!text-black' : '!text-white'}>Send Message</span>
                                                    </Box>}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
            }
        </Box>
    )
}

export default SunilDiamondPage