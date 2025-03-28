'use client'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import './AtsPage.css'
import SvgIcon from '@/assets/icons/SvgIcon';
import Counter from './common/Counter/Counter';
import ConsoleText from './common/ConsoleText/ConsoleText';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader from '@/common/Loader';
import { East } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { SideContainer } from '../common/CommonUI';

const EnquiryField = [
  {
    label: 'Your Name',
    type: 'text',
    name: 'name'
  },
  {
    label: 'Phone',
    type: 'tel',
    name: 'phone'
  },
  {
    label: 'Website',
    type: 'url',
    name: 'website'
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email'
  },
  {
    label: 'Message',
    type: 'text',
    name: 'message'
  }
]

const Atspage = () => {

  const [profile, setProfile] = useState([])
  const [profiledata, setProfiledata] = useState({
    facebook: "",
    instagram: "",
    linkdin: "",
    twitter: "",
    mail: "",
    number: "",
    website: "",
    location: "",
    gmap: "",
    iframe: null,
    projects: Number,
    clients: Number,
    countries: Number
  })
  const [services, setServices] = useState([])
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    message: ""
  })
  const [profileloading, setProfileLoading] = useState(true)
  const [iframeloading, setIframeloading] = useState(true)
  const [sending, setSending] = useState(false)
  const router = useRouter()

  const fetchProfile = async () => {
    const response = await fetch('/api/atsprofile');
    const data = await response.json();
    if (data?.message === "Get Data Successfully") {
      setProfileLoading(false)
    }
    setProfile(data?.data)
  }

  const fetchService = async () => {
    const response = await fetch('/api/atsservice');
    const data = await response.json();
    setServices(data?.data)
  }

  const handleEnquirySubmit = async () => {
    const response = await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: profiledata.mail,
        subject: 'Inquiry Regarding Service',
        text: `<p>Dear atssoftwaresolution,</p>
        <br/>
        <p>Inquiry for service</p>
        <br/>
        <p>I hope this message finds you well. My name is ${formdata.name}, and I am writing to inquire about service offered by your company.</p>
        <p>Message - ${formdata.message}</p>
        <p>Name - ${formdata.name}</p>
        <p>Phone Number - ${formdata.phone}</p>
        <p>Email - ${formdata.email}</p>
        ${formdata.website === "" ? "" : `<p>Website - ${formdata.website}</p>`}`
      }),
    });
    const result = await response.json();
    if (result.status === 'success') {
      alert("message sent successfully");
      setSending(false)
      setFormdata({
        name: "",
        email: "",
        website: "",
        phone: "",
        message: ""
      })
    } else {
      alert("Error sending message");
    }
  }

  useEffect(() => {
    if (profile && profile.length > 0) {
      const filterProfile = profile.find(p => p.id === 1);

      if (filterProfile) {
        setProfiledata({
          facebook: filterProfile?.facebook,
          instagram: filterProfile?.instagram,
          linkdin: filterProfile?.linkdin,
          twitter: filterProfile?.twitter,
          mail: filterProfile?.mail,
          number: filterProfile?.number,
          website: filterProfile?.website,
          location: filterProfile?.Location,
          gmap: filterProfile?.gmap,
          iframe: filterProfile?.iframe,
          projects: filterProfile?.Projects,
          clients: filterProfile?.Clients,
          countries: filterProfile?.Countries
        })
      }
    }
  }, [profile]);

  useEffect(() => {
    fetchProfile()
    fetchService()
  }, [])

  const phonenumber = profiledata.number.replace(/[^+\d]/g, '')

  const Contactwith = [
    {
      icon: 'mail',
      text: profiledata.mail,
      link: `mailto:${profiledata.mail}`
    },
    {
      icon: 'callOutline',
      text: profiledata.number,
      link: `tel:${phonenumber}`
    },
    {
      icon: 'websiteOutline',
      text: profiledata.website.slice(8),
      link: profiledata.website
    },
    {
      icon: 'locationOutline',
      text: profiledata.location,
      link: profiledata.gmap
    },
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    handleEnquirySubmit()
  }

  const handleNavigate = (title) => {
    router.push(`/atssoftwaresolution-service/${title}`)
  }

  return (
    <Box className='AtsMainBox'>
      {
        profileloading ?
          <Loader />
          :
          <Box>
            <Box id='home-section' className='AtsHomePage'>
              <Box className='sildeSection'>
                <Box className='!h-[82px] !w-[155px] !mx-auto'>
                  <Image quality={100} src={require('../../assets/image/ats/Logo.png')} alt='Logo' fill className='!relative !h-[100%] !w-[100%]' />
                </Box>
                <Typography variant='h2'>One Stop Solution</Typography>
                <ConsoleText className="console-container" />
                <Box className='socialMediasection'>
                  <Box className='socialMedia'>
                    <Link href={`${profiledata.facebook}`} target="_blank">
                      <SvgIcon name='facebookFill' width={14} height={14} className='!text-orange' />
                    </Link>
                    <Link href={`${profiledata.instagram}`} target="_blank">
                      <SvgIcon name='instagram' width={14} height={14} className='!text-orange' />
                    </Link>
                    <Link href={`${profiledata.linkdin}`} target="_blank">
                      <SvgIcon name='linkedinFill' width={14} height={14} className='!text-orange' />
                    </Link>
                    <Link href={`${profiledata.twitter}`} target="_blank">
                      <SvgIcon name='twitterFill' width={14} height={14} className='!text-orange' />
                    </Link>
                  </Box>
                  <Box className='qrsection'>
                    <Image unoptimized quality={100} src={require('../../assets/image/ats/ATSqrcode.png')} alt='' fill className='!relative' />
                  </Box>
                </Box>
              </Box>
              <SideContainer>
                <Box className='info-description'>
                  <Typography variant='h6'>{`We have deployed ${profiledata.projects}+ apps for ${profiledata.clients}+ satisfied clients globally including large enterprises and startups. Your app can be the next successful app.`}</Typography>
                </Box>
                <Box className='countersection'>
                  <Counter targetValue={profiledata.projects} title={'Successful Project'} progressColor={'linear-gradient(90deg, #F85668 0%, #F59950 100%)'} completed={90} />
                  <Counter targetValue={profiledata.clients} title={'Happy Clients'} progressColor={'linear-gradient(90deg, #2D4FDB 0%, #4D6AE1 100%)'} completed={85} />
                  <Counter targetValue={profiledata.countries} title={'Working Country'} progressColor={'linear-gradient(90deg, #2D3CA3 0%, #4A57AF 100%)'} completed={80} />
                </Box>
              </SideContainer>
            </Box>
            <SideContainer>
              <Box id='services-section' className='ServicePage'>
                <Typography variant='h4'>Our Services</Typography>
                {services?.length > 0 && services.map((item, i) => {

                  return (
                    <Box className="servicesection" key={i}>
                      <Box className="servicesectioninfo">
                        <Box className="serviceimagesection">
                          <Image unoptimized src={`/${item.image}`} alt='thumbnail' fill className='!w-[100%] !h-[100%] !object-contain !relative' />
                        </Box>
                        <Box>
                          <Typography variant='h5'>{item?.title}</Typography>
                        </Box>
                        <Box>
                          <Typography variant='h6'>{item?.description}</Typography>
                        </Box>
                        <Box>
                          <Button className='servicebutton' onClick={() => handleNavigate(item.title)} >
                            <Box className="servicebuttonsection">
                              <Typography variant='h6'>See More</Typography>
                              <East />
                            </Box>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </SideContainer>
            <Box className='explorehere'>
              <Typography variant='h6' >Do we Have Idea and Want to Explore.
                <span className='!text-orange'>
                  <Link href='#more-section'>Click Here</Link>
                </span>
              </Typography>
            </Box>
            <Box id='contact-section' className='contactPage'>
              {Contactwith?.length > 0 && Contactwith.map((item, i) => {
                return (
                  <Box className='contactBox' key={i}>
                    <Box className='contactBoxsubsection'>
                      <SvgIcon name={item?.icon} width={20} height={20} className='!text-white' />
                    </Box>
                    <Typography variant='h6'>
                      <Link href={item?.link} target='_blank'>{item?.text}</Link>
                    </Typography>
                  </Box>
                )
              })}
            </Box>
            <SideContainer>
              <Box id='more-section' className='contactmessage'>
                <Link href={`${profiledata.gmap}`} target='_blank'>
                  <Box className="contactmessageiframesection">
                    {(profileloading || iframeloading) && profiledata.iframe === null ?
                      <Box className="iframeloadingsection">
                        <CircularProgress
                          sx={{
                            color: "var(--orange)"
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
                        className='gmap'
                      ></iframe>}
                    <Box className='clickmap'>Click On Map</Box>
                  </Box>
                </Link>

                <Box className='letsgetInTouch'>
                  <Typography variant='h3' >Let's Get In Touch</Typography>
                  <Typography variant='h6' >We have world-class, flexible support via live chat, email and home. We guarantee that you'll be able to have any issue resolved within 24 hours.
                  </Typography>
                  <form action="" onSubmit={handleSubmit}>
                    {
                      EnquiryField.map((items) => {
                        return (
                          <React.Fragment key={items.label}>
                            <TextField
                              id="standard-basic"
                              key={items}
                              label={items.label}
                              variant="standard"
                              type={items.type}
                              name={items.name}
                              value={formdata?.[items.name]}
                              onChange={handleInputChange}
                              className="textfield"
                              required={items.type !== 'url'}
                              InputProps={{
                                className: items.label === 'Message' ? '!h-[60px] atsinputfields' : 'atsinputfields',
                              }}
                              InputLabelProps={{
                                className: 'atsinputlabel',
                              }}
                            />
                          </React.Fragment>
                        )
                      })
                    }
                    <Button variant='outlined' className='atssubmitbutton' type='submit'>
                      {
                        sending ?
                          <Box className="formloadingsection">
                            <CircularProgress sx={{ color: "var(--orange)" }} size={"22px"} />
                          </Box>
                          :
                          <Box className="atsbuttonsection">
                            <SvgIcon name='sendSuperfast' width={22} height={22} className={'!text-orange'} />
                            <span>Sent Message</span>
                          </Box>
                      }
                    </Button>
                  </form>
                </Box>
              </Box>
            </SideContainer>
          </Box>
      }
    </Box>
  )
}
export default Atspage