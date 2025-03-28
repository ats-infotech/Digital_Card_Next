'use client'
import './rainafashion.css'
import { Box, Button, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { KeyboardArrowRight, Link as LinkIcon } from '@mui/icons-material'
import { RWebShare } from 'react-web-share'
import React, { useState, useEffect } from 'react'
import ButtonBox from '@/common/components/ButtonBox'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import WhatsappFill from '@/common/svg/WhatsappFill'
import ShareFill from '@/common/svg/ShareFill'
import CarouselSlide from './common/carouselslide/CarouselSlide'
import Link from 'next/link'
import Image from 'next/image'
import SvgIcon from '@/assets/icons/SvgIcon'
import GetAppIcon from '@mui/icons-material/GetApp';
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { useRouter } from 'next/navigation'
import Loader from '@/common/Loader'
import { SideContainer } from '../common/CommonUI'

const EnquiryField = [
  {
    icon: 'profileFill',
    text: 'Name',
    type: 'text',
    name: 'name'
  },
  {
    icon: 'mailFill',
    text: 'Email',
    type: 'email',
    name: 'email'
  },
  {
    icon: 'call',
    text: 'Mobile Number',
    type: 'number',
    name: 'number'
  },
  {
    icon: 'messageFill',
    text: 'Message',
    type: 'text',
    name: 'message'
  }
]

const rainaFashion = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: ""
  })
  const [error, setError] = useState(false)
  const [post, setPost] = useState([])
  const [Images, setImages] = useState([])
  const [profile, setProfile] = useState([])
  const [fsize, setFsize] = useState([])
  const [loading, setLoading] = useState(false)
  const [particularloading, setParticularloading] = useState(false)
  const router = useRouter()
  const [profileloading, setProfileLoading] = useState(true)
  const [iframeloading, setIframeloading] = useState(true)
  const [selectedSizes, setSelectedSizes] = useState({});

  const zipimages = Images.filter((item, index, self) => index === self.findIndex((img) => img.ImageId === item.ImageId)).map((items) => items.filename)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    fetchData()
    fetchImages()
    fetchProfile()
    fetchSize()
  }, []);

  const fetchData = async () => {
    let response = await fetch('/api/posts');
    const data = await response.json();
    setPost(data?.data)
  }

  const fetchImages = async () => {
    const response = await fetch('/api/images');
    const data = await response.json();
    setImages(data?.data);
  };

  const fetchProfile = async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    if (data?.message === "Get Data Successfully") {
      setProfileLoading(false)
    }
    setProfile(data?.data)
  }

  const fetchSize = async () => {
    let response = await fetch('/api/sizes');
    const data = await response.json();
    setFsize(data?.data)
  }

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
    otherlinktitle: '',
    Broadcastlink: ''
  })

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
          otherlinktitle: filterProfile?.linktitle,
          Broadcastlink: filterProfile?.Broadcastlink
        });
      }
    }
  }, [profile]);

  const phonenumber = profiledata.phone.replace(/[^+\d]/g, '')
  const whatsappnumber = profiledata.tel.replace(/[^+\d]/g, '')
  let formattedPhoneNumber = `${profiledata.phone.slice(0, 3)} ${profiledata.phone.slice(3)}`;
  let formattedwhatsappPhoneNumber = `${profiledata.tel.slice(0, 3)} ${profiledata.tel.slice(3)}`;

  const ContactDetails = [
    {
      name: 'Call',
      icon: 'call',
      call: [formattedPhoneNumber, formattedwhatsappPhoneNumber],
      redirect: [`tel:${phonenumber}`, `tel:${whatsappnumber}`]
    },
    {
      name: 'Location',
      icon: 'location',
      location: profiledata.address,
      redirect: profiledata.gmap
    },
    {
      name: 'Otherlink',
      icon: 'otherlink',
      otherlink: profiledata.otherlinktitle,
      redirect: profiledata.otherlink
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      instagram: profiledata.insta,
      redirect: profiledata.instalink
    },
  ]

  const Contact = [
    {
      name: 'Call',
      icon: 'call',
      call: formattedwhatsappPhoneNumber,
      redirect: `tel:${whatsappnumber}`
    },
    {
      name: 'Whatsapp',
      icon: 'whatsappFill',
      whatsapp: formattedwhatsappPhoneNumber,
      redirect: `https://wa.me/${whatsappnumber}?text=${window.location.href}`
    },
    {
      name: 'Location',
      icon: 'location',
      location: profiledata.address,
      redirect: profiledata.gmap
    },
  ]

  const AboutUs = [
    {
      icon: 'company',
      title: 'Company Profile',
      detail: profiledata.name,
      description: profiledata.desc
    },
    {
      icon: 'business',
      title: 'Year Of Business',
      detail: profiledata.year
    },
    {
      icon: 'tradeview',
      title: 'Nature Of Business',
      detail: profiledata.nature
    },
    {
      icon: 'callonOutline',
      title: 'Our Broadcast Number',
      detail: formattedPhoneNumber,
      description: formattedwhatsappPhoneNumber
    }
  ]

  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const name = formData.name;
    const email = formData.email;
    const number = formData.number;
    const message = formData.message;
    const text = encodeURIComponent("Name: " + name + ", Email: " + email + ", Number: " + number + ", Message: " + message);
    const whatsappURL = `https://wa.me/${whatsappnumber}?text=${text}%20${url}`;
    window.open(whatsappURL, '_blank');
  };

  const shareurl = window.location.href

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pattern = /^[a-zA-Z]{1,}( [a-zA-Z]{1,})+$/;

  const handleClick = () => {
    if (formData.name.match(pattern)) {
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!error) {
      handleShare()
    } else {
      alert("Please Enter Full Name")
    }
  }

  const ParticularProductPdf = ({ id }) => {
    const pdfimages = Images.filter((item) => item.ImageId === id)

    return (
      <div>
        {
          post.map((items, i) => {
            return (
              items.id === id &&
              <div key={i}>
                <h3 className='particularpdfinfo'>{items.code}</h3>
                <h3 className='inline-flex flex-row gap-[10px] mt-[10px]'>
                  {
                    pdfimages.map((items, e) => {
                      return (
                        <div key={e} className='h-[70px] w-[70px]'>
                          <img src={`/${items.filename}`} className='h-[100%] w-[100%] object-contain' />
                        </div>
                      )
                    })
                  }
                </h3>
                <h3 className='particularpdfinfo'>{items.name}</h3>
                <h3 className='particularpdfinfo'>Rs {items.price}</h3>
                {
                  items.description?.split('\n').map((line, index) => (
                    <h3 key={index} className="particularpdfdesc">{line}</h3>
                  ))
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  const pprint = (id, code) => {
    setParticularloading(true)
    const string = renderToString(<ParticularProductPdf id={id} />);
    const pdf = new jsPDF("p", "px", "a4");
    pdf.html(document.createElement('div').innerHTML = string, {
      callback: (pdf) => {
        pdf.save(`Rainafashion ${code}`);
        setParticularloading(false)
      },
      x: 20,
    });
  }

  const ProductSize = ({ id }) => {

    const handledCategory = (id, size) => {
      setSelectedSizes((prevSizes) => ({
        ...prevSizes,
        [id]: size,
      }));
    };

    return (
      <Box className="">
        {
          fsize.map((item, i) => {
            const sizeOptions = [
              { label: 'XS', key: 'extrasmall' },
              { label: 'S', key: 'small' },
              { label: 'M', key: 'medium' },
              { label: 'L', key: 'large' },
              { label: 'XL', key: 'extralarge' },
              { label: 'XXL', key: 'extraextralarge' }
            ];

            return (
              item.id === id &&
              <Box key={i} className="sizesection">
                {sizeOptions.map(({ label, key }) =>
                  item[key] && (
                    <button
                      key={label}
                      onClick={() => handledCategory(id, label)}
                      className={`sizebutton ${selectedSizes[id] === label ? '!bg-purpledark !text-white' : '!bg-var(--greypro) !text-purpledark'}`}
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
    );
  };

  const HandleProduct = ({ producttype, id, code }) => {
    const pzipimages = Images.filter((item) => item.ImageId === id).map((items) => items.filename)

    const handleBuy = () => {
      if (selectedSizes[producttype.id] === undefined) {
        alert("Please Select Size");
      } else {
        const selectedSize = selectedSizes[producttype.id];
        const text = encodeURIComponent(`Hi,\n Product - ${producttype.code} \n Price - ${producttype.price} \n Size - ${selectedSize} \n I have checked your Product and I loved it, Can you please tell me how I get this Product? \n Thanks`);
        const whatsappURL = `https://wa.me/${whatsappnumber}?text=${text}`;
        window.open(whatsappURL, '_blank');
      }
    };

    return (
      <Box className='productmainsection !mt-[-30px]'>
        <Box className="!flex !px-[20px] !justify-between !items-center" >
          <Box>
            <Typography variant="h3">{producttype.name}</Typography>
          </Box>
          <Box className='productmainsubsection'>
            <Link href={`https://wa.me/${whatsappnumber}?text=${window.location.href}`} target="_blank" >
              <Box className="socialsharebtns !pt-[2.5px] !pl-[2.5px]">
                <WhatsappFill width={27} height={27} />
              </Box>
            </Link>
            <RWebShare
              data={{
                url: shareurl,
              }}
              onClick={() => console.info("share successful!")}
            >
              <Box className="socialsharebtns">
                <ShareFill width={20} height={20} />
              </Box>
            </RWebShare>
          </Box>
        </Box>
        <ProductSize id={id} />
        <Box className='downloadbtnsection'>
          <Button
            onClick={() => pprint(id, code)}
            className='productpurpleBorder-btn'
            disabled={particularloading ? true : false}
          >
            {!particularloading ? <Box className="pdfbutton">
              <GetAppIcon className='!h-[20px] !w-[20px]' />&nbsp;&nbsp;
              <Typography variant='body1' sx={{ fontWeight: 600, fontFamily: 'poppins' }}>PDF</Typography>
            </Box> :
              <Box className="pdfbutton">
                <Typography variant='body1' sx={{ fontWeight: 600, fontFamily: 'poppins' }}>Downloading...</Typography>
              </Box>
            }
          </Button>
          <ButtonBox
            disabled={particularloading ? true : false}
            type='zip'
            icons={<SvgIcon id='download' width={15} height={15} className='!h-[20px] !w-[20px]' />}
            title={'ZIP'}
            className='productpurpleBorder-btn pdfbutton'
            images={pzipimages}
          />
        </Box>
        <Box className="buybtnsection">
          <Button className="buybtn" onClick={handleBuy}  >Buy Now</Button>
        </Box>
      </Box>
    )
  }

  const ProductCarousel = ({ id, code }) => {

    const filterimage = Images.filter((item) => item.ImageId === id)

    return (
      <>
        <Carousel autoPlay={true} infiniteLoop={true}>
          {filterimage.length > 0 && filterimage.map((item) => {
            return (
              <Box className='productItems' key={item}>
                <Button className='!w-[100%] !h-[100%] hover:bg-greypro' key={item} onClick={() => router.push(`/rainafashion-productdetails/${code}`)}>
                  <Image quality={100} priority width={300} height={300} src={`/${item.filename}`} alt="product" className='h-[100%] w-[100%] !object-contain !object-top' />
                </Button>
              </Box>
            )
          })}
        </Carousel>
      </>
    )
  }

  const ProductPdf = () => {
    return (
      <div className="grid grid-cols-3 gap-x-[130px] gap-y-[55px] w-[100%]">
        {post.map((items, i) => (
          <div key={i} id="PDF-Products">
            <h3 className="mt-[5px] allproductpdfinfo">{items.code}</h3>

            <div className="h-[100px] w-[100px] mt-[5px]">
              {Images.filter((item) => item.ImageId === items.id)
                .map((item, index) => {
                  return (
                    index === 2 && (
                      <img
                        key={item.ImageId}
                        alt=""
                        src={`/${item.filename}`}
                        className="h-[100%] w-[100%] object-contain"
                      />
                    )
                  );
                })}
            </div>

            <h3 className="mt-[0px] allproductpdfinfo">{items.name}</h3>
            <h3 className="mt-[0px] allproductpdfinfo">Rs {items.price}</h3>
          </div>
        ))}
      </div>
    );
  };

  const print = () => {
    setLoading(true)
    const string = renderToString(<ProductPdf />);
    const pdf = new jsPDF("p", "px", "a4");
    pdf.html(document.createElement('div').innerHTML = string, {
      callback: (pdf) => {
        pdf.save("Rainafashion");
        setLoading(false)
      },
      x: 45,
    });
  }

  return (
    <Box>
      {
        profileloading ?
          <Loader />
          : <Box className='rainafashion' >

            <Box>
              <Box id='home-section' className='HomePage'>
                <Box className='logoImage'>
                  <Image quality={100} src={require('../../assets/image/rainafashion/logo.png')} alt="rainafashion" className='rainalogoimg' />
                </Box>
                <Box className="compant-title">
                  <Typography variant="h5">{profiledata.name}</Typography>
                  <Typography variant="h6">{profiledata.desc}</Typography>
                </Box>
                <Box className='contactsection'>
                  {Contact.length > 0 && Contact.map((item) => {
                    return (
                      <Link href={item?.redirect} target="_blank" key={item?.icon}>
                        <Button className='roundedIcon' aria-label={item?.name}>
                          <SvgIcon
                            name={item?.icon}
                            width={17}
                            height={17}
                            className="!text-white"
                          />
                          <Typography variant="h6" className="roundedIconText">{item?.name}</Typography>
                        </Button>
                      </Link>
                    )
                  })}
                </Box>
                <Box className='rainContactDetailMain'>
                  <List className='!z-10'>
                    {ContactDetails.length > 0 && ContactDetails.map((item, i) => {
                      if (item.icon === 'otherlink' && !item.redirect) {
                        return null;
                      }
                      return (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <Box className='roundedborderIcon'>
                              <Box className='iconbg'>
                                {item?.icon !== 'otherlink' ? <SvgIcon
                                  name={item?.icon}
                                  width={17}
                                  height={17}
                                  className='!text-white'
                                /> : <LinkIcon sx={{ color: 'var(--white)', height: '17px', width: '17px' }} />}
                              </Box>
                            </Box>
                          </ListItemIcon>
                          {
                            Array.isArray(item[item.icon]) && item[item.icon]?.length <= 2 ? (
                              <Box>
                                {
                                  item[item.icon].map((itm, i) => {
                                    return (
                                      <ListItemText className="roundedborderIconText" key={i}>
                                        <Link href={item?.redirect[i]} target="_blank" >
                                          {itm}
                                        </Link>
                                      </ListItemText>
                                    )
                                  })
                                }
                              </Box>
                            ) : (
                              <ListItemText className="roundedborderIconText !pr-[60px]" key={i}>
                                <Link href={item.redirect} target="_blank" >
                                  {Array.isArray(item[item.icon]) ? item[item.icon].join(', ') : item[item.icon]}
                                </Link>
                              </ListItemText>
                            )
                          }
                        </ListItem>
                      )
                    })}
                  </List>
                  <Box className='qrsection'>
                    <Image unoptimized src={require('../../assets/image/rainafashion/RainaFashionQR.png')} alt='scanner' />
                  </Box>
                </Box>
              </Box>
              <SideContainer>
                <Box id='products-services-section' className='RainfashionProducts'>
                  <Box className='rainafashionproductssubsection'>
                    {<Button
                      className='!purpleBorder-btn !w-full !mb-[15px]'
                      onClick={print}
                      disabled={loading ? true : false}
                    >
                      {!loading ? <Box className="rainapdfbtn">
                        <GetAppIcon className='' />&nbsp;&nbsp;
                        <Typography sx={{ fontWeight: 600, fontFamily: 'poppins' }}>Full Catalog PDF</Typography>
                      </Box> :
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontFamily: 'poppins' }}>Downloading...</Typography>
                        </Box>}
                    </Button>}
                    <ButtonBox
                      type='zip'
                      icons={<SvgIcon id='download' width={20} height={20} className='downloadIcon' />}
                      title={'Full Catelog ZIP'}
                      className='purpleBorder-btn !w-full !mb-[15px] hover:text-white'
                      images={zipimages}
                      disabled={particularloading ? true : false}
                    />
                  </Box>
                  <Box className="!flex !justify-end">
                    <Button className='explorebtn mr-[30px]' onClick={() => router.push('/rainafashion-product-list')}>
                      Explore More
                      <KeyboardArrowRight sx={{
                        marginLeft: '5px'
                      }} fontSize='small' />
                    </Button>
                  </Box>

                  <Box id='products-section'></Box>
                  <Box className='productDetails' >

                    <Box className="">
                      {
                        post.map((items, i) => (
                          i <= 4 &&
                          <Box key={i} className="productsection">
                            <ProductCarousel id={items.id} code={items.code} />
                            {/* <ProductSize id={items.id} /> */}
                            <HandleProduct producttype={items} id={items.id} code={items.code} />
                          </Box>
                        ))
                      }
                    </Box>

                  </Box>
                </Box>
              </SideContainer>
              <Box id='about-us-section'>
                <Box className='AboutRainaFashion'>
                  <Typography variant="h3">About Us</Typography>
                  <Typography variant="h4">Imagine <span className="!text-purpledark">The Next Level</span> of Fashion.</Typography>
                  <Typography variant="h5">Women Clothing Manufacturer At Surat.</Typography>
                </Box>
                <CarouselSlide data={AboutUs} />
              </Box>

              <Box className='joinus'>
                <Link href={profiledata.Broadcastlink} target="_blank" >
                  <Typography variant="h3">
                    <span >Join Us</span>
                    <SvgIcon name={'rightArrow'} width={20} height={20} className='!text-purpledark' />
                  </Typography>
                </Link>
                <Typography variant="h4">Join With Us Today And Grow your Business</Typography>
              </Box>

              <SideContainer>
                <Box id='inquiry-section' className='rainaFshionEnquiry'>
                  <Typography variant="h5">Inquiry</Typography>
                  <Box className='rainainquirysubsection'>
                    <Link href={profiledata.gmap} target='_blank'>
                      <Box className="rainaiframesection">
                        {(profileloading || iframeloading) && profiledata.iframe === null ?
                          <Box className="rainaiframeloadingsection">
                            <CircularProgress
                              sx={{
                                color: "var(--purpledark)"
                              }}
                            />
                          </Box>
                          :
                          <iframe
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
                    <Box className='rainaformsection'>
                      <form action="" onSubmit={handleSubmit}>
                        {
                          EnquiryField.length > 0 && EnquiryField.map((items) => {
                            return (
                              <React.Fragment key={items?.text}>
                                <Box className="rainaformsubsection">
                                  <Box className={`${items?.text === 'Message' ? '!items-start' : '!items-center'} formInput`}>
                                    <SvgIcon name={items?.icon} width={17} height={17} className={`${items?.text === 'Message' ? '!mt-[2px]' : ''} !text-purpledark`} />
                                    <Box className={`w-[100%]`}>
                                      {items?.text === 'Message' ?
                                        <textarea onChange={handleInputChange} name={items?.name} type={items?.type} required placeholder={items?.text} className='enquiryinputfield' />
                                        :
                                        <input min={items.name === "number" ? 10 : 'auto'} onChange={handleInputChange} name={items?.name} type={items?.type} required placeholder={items?.text} rows='5' className='enquiryinputfield' />
                                      }
                                    </Box>
                                  </Box>
                                  <Box className='formborder'></Box>
                                </Box>
                              </React.Fragment>
                            )
                          })
                        }
                        <Button onClick={handleClick} variant='contained' className='enquiryformbtn' type='submit'>
                          <SvgIcon name={'sendupFill'} width={22} height={22} className={'!text-white'} />
                          <span>Send</span>
                        </Button>
                      </form>
                    </Box>
                  </Box>
                </Box>
              </SideContainer>
            </Box>
          </Box>
      }
    </Box>
  )
}

export default rainaFashion