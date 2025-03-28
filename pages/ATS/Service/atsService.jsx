'use client'
import { Box, Divider, Typography } from "@mui/material"
import './atsService.css'
import { Done, East, West } from "@mui/icons-material"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import SvgIcon from "@/assets/icons/SvgIcon"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Socialmodel } from "../modals/centralizedModel"
import { SideContainer } from "@/pages/common/CommonUI"

const success = [
    {
        id: 1,
        title: "Experienced Team",
        desc: "We are backed with our highly Qualified and Experienced team of Developers.",
        icon: "exp-team"
    },
    {
        id: 2,
        title: "Fast and Accurate Work",
        desc: "We Belive in Delivering High Quality Work Done Precisely in Minimum Promised Time.",
        icon: "fna-work"
    },
    {
        id: 3,
        title: "Wide Range of Services and Products",
        desc: "We are Providing wide range of Services like Mobile Development, Web Development, SEO, Graphic Designing etc.",
        icon: "service-range"
    },
    {
        id: 4,
        title: "Cost Effective Solutions",
        desc: "We Provide Cost Effective Solutions for Every Budget in this cutting edge Market.",
        icon: "cost-effective"
    },
    {
        id: 5,
        title: "Global Exposure",
        desc: "We have Experience of working Globally with Clients from more than 15 different Countries.",
        icon: "global"
    },
    {
        id: 6,
        title: `"Custom-Centric Model" Work`,
        desc: "Our Customer is Our Top Most Prority and We Are bound to Peovide the Best Services for Customer Satisfaction.",
        icon: "global"
    },
]

const process = [
    {
        id: 1,
        title: "Research",
        desc: "Market research is the process of gathering valuable information about the needs.",
        icon: "research"
    },
    {
        id: 2,
        title: "Plan",
        desc: "A digital marketing plan is a document that includes (at minimum) the following information.",
        icon: "plan"
    },
    {
        id: 3,
        title: "Implement",
        desc: "Digital Strategy is a plan or implementation of digital marketing or online trends.",
        icon: "implement"
    },
    {
        id: 4,
        title: "Measure",
        desc: "Digital Marketing Metrics and KPIs are values used by marketing teams to measure.",
        icon: "measure"
    },
    {
        id: 5,
        title: "Optimize",
        desc: "Marketing optimization is performed on each individual marketing tactic employed.",
        icon: "optimize"
    },
]

const websteps = [
    {
        id: 1,
        title: "CMS Website",
        description: "Content in a CMS is typically stored in a database and displayed in a presentation layer based on a set of templates.",
        icon: "cms-web"
    },
    {
        id: 2,
        title: "Website Development",
        description: "Web development is the building and maintenance of websites.",
        icon: "web-dev"
    },
    {
        id: 3,
        title: "Application Development",
        description: "Every app-building process follows the same steps: gathering requirements, designing.",
        icon: "app-dev"
    },
    {
        id: 4,
        title: "UI/UX Design",
        description: "UI/UX is responsible for applying interactive and visual design principles on websites & Application.",
        icon: "uiux-dev"
    }
]

const dmgdsteps = [
    {
        id: 1,
        title: "Search Engine Optimization",
        description: "Create such SEO friendly website using organic keywords, SEO increases the numbers of visitors on any website and gets valuable customers.",
        icon: "rocket"
    },
    {
        id: 2,
        title: "Social Media Marketing",
        description: "Social media marketing is the use of social media platforms to connect with your audience to build your brand, increase sales.",
        icon: "smmarketing"
    },
    {
        id: 3,
        title: "Website Development",
        description: "Get your Business featured in completely customised Web Solution with best designed Websites and Web Pages.",
        icon: "web-development"
    },
    {
        id: 4,
        title: "Mobile App Development",
        description: "We develop Android, iPhone & iPad Applications. We transform Ideas in Application form that run across multiple platforms",
        icon: "app-dev"
    },
    {
        id: 5,
        title: "Digital Wedding Card",
        description: "So, here comes Digital Wedding Card, where you send your card's at a click of a button to anyone staying anywhere in the world.",
        icon: "digital-wedding"
    },
    {
        id: 6,
        title: "Graphic Design",
        description: "Graphic design is a craft where professionals create visual content to communicate messages.",
        icon: "graphic-design"
    }
]

const inputs = [
    {
        name: "name",
        type: "text",
        text: "Name"
    },
    {
        name: "email",
        type: "email",
        text: "Email"
    },
    {
        name: "number",
        type: "number",
        text: "Phone Number"
    }
]

const AtsService = () => {

    const [serviceinfo, setServiceinfo] = useState([])
    const [servicedesc, setServicedesc] = useState([])
    const [services, setServices] = useState([])
    const [title, setTitle] = useState()
    const router = useRouter()
    const [activeid, setActiveid] = useState(0)
    const [serviceId, setServiceId] = useState()
    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        number: ""
    })
    const [servicetype, setServicetype] = useState()
    const [profile, setProfile] = useState([])
    const [profiledata, setProfiledata] = useState({
        mail: "",
        number: ""
    })
    const [sending, setSending] = useState(false)

    useEffect(() => {
        fetchinfo()
        fetchdec()
        fetchService()
        fetchprofile()
    }, [])

    useEffect(() => {
        const path = window.location.pathname
        const splitpath = path.split('/')[2]
        const title = decodeURIComponent(splitpath)
        setTitle(title)
    }, [])

    useEffect(() => {
        const filterservices = services.filter((items, i) => items.title === title)
        if (filterservices.length > 0) {
            setServiceId(filterservices[0].id);
        }
    }, [services])

    const fetchService = async () => {
        const response = await fetch('/api/atsservice');
        const data = await response.json();
        setServices(data?.data)
    }

    const fetchprofile = async () => {
        const response = await fetch('/api/atsprofile');
        const data = await response.json();
        setProfile(data?.data)
    }

    const fetchinfo = async () => {
        const response = await fetch('/api/atsserviceinfo');
        const data = await response.json();
        setServiceinfo(data?.data)
    }
    const fetchdec = async () => {
        const response = await fetch('/api/atsservicedescription');
        const data = await response.json();
        setServicedesc(data?.data)
    }

    useEffect(() => {
        const filterProfile = profile.find(p => p.id === 1);
        setProfiledata({
            mail: filterProfile?.mail,
            number: filterProfile?.number.replace(/[^+\d]/g, '')
        })
    },[profile])

    const filtermobileservices = serviceinfo.filter((items) => serviceId === items.ServiceId)
    const length = filtermobileservices.length - 1

    const handleNext = () => {
        if (activeid < length) {
            setActiveid(activeid + 1)
        }
    }

    const handlePrev = () => {
        if (activeid > 0) {
            setActiveid(activeid - 1)
        }
    }

    const ShareSection = ({ subservice }) => {

        return (
            <Box className="sharesection">
                <Box className="iconsection" onClick={() => handleOpen({subservice})}>
                    <SvgIcon name={"gmail"} />
                </Box>
                <Box className="iconsection" onClick={() => handleShare(subservice)}>
                    <SvgIcon name={"servicewhatsapp"} />
                </Box>
            </Box>
        )
    }

    const CommonText = ({ title, subtitle }) => {
        return (
            <Box className="commontext">
                <Box>
                    <Typography variant="h5">{title}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1">{subtitle}</Typography>
                </Box>
            </Box>
        )
    }

    const handleOpen = ({ subservice}) => {
        setOpen(true)
        setServicetype(subservice)
    }

    const handleClose = () => {
        setOpen(false)
        setFormValues({
            name: "",
            email: "",
            number: ""
        })
        setServicetype()
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleEnquirySubmit = async () => {
        setSending(true)
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
            <p>I hope this message finds you well. My name is ${formValues.name}, and I am writing to inquire about ${servicetype !== undefined ? `${title} - ${servicetype}` : `${title}`} service offered by your company.</p>
            <p>Name - ${formValues.name}</p>
            <p>Phone Number - ${formValues.number}</p>
            <p>Email - ${formValues.email}</p>`
            }),
        });
        const result = await response.json();
        if (result.status === 'success') {
            setSending(false)
            alert("message sent successfully");
            handleClose()
        } else {
            alert("Error sending message");
        }
    }

    const handleShare = (subservice) => {
        const url = encodeURI(window.location.href);
        const text = `Hi, \nI have checked your Service and I have inquiry about it Can you please give me more details on this service ${subservice !== undefined ? `${title} - ${subservice}` : `${title}`}  \nURL: ${url} \nThanks`;
        const whatsappURL = `https://wa.me/${profiledata.number}?text=${text}`;
        window.open(whatsappURL, '_blank');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleEnquirySubmit()
    }

    return (
        <Box className="atsservice">

            <SideContainer className="atsservicesection !fixed !bg-white !top-0 !overflow-hidden !w-[100%] !max-w-[430px]" maxWidth="xs">
                <Box className="atstitlesection !h-[40px] !pt-[10px]">
                    <West sx={{ color: "var(--blue)", cursor: "pointer" }} onClick={() => router.back()} />
                    <Typography variant="h2">{title}s</Typography>
                </Box>
            </SideContainer>

            {/* Mobile app Development */}

            <Box className="">
                {title === "Mobile App Development" && <Box>
                    {
                        filtermobileservices.map((items, i) => {

                            return (
                                activeid === i &&
                                <Box key={i}>
                                    <SideContainer className="!mt-[40px]">
                                        <ShareSection subservice={items.title} />
                                        <Box className="atssubtitlesection">
                                            <Divider className="subtitleborder" orientation="vertical" />
                                            <Typography variant="h3">{items.title}</Typography>
                                        </Box>
                                        <Box className="gifsection">
                                            <Box className="atsservicecontrolsection" sx={{ cursor: 'pointer' }} onClick={handlePrev}>
                                                <West />
                                            </Box>
                                            <Box>
                                                {
                                                    activeid === 0 ?
                                                        <Image unoptimized src={require('../../../assets/image/ats/1.gif')} alt="" /> :
                                                        activeid === 1 ?
                                                            <Image unoptimized src={require('../../../assets/image/ats/2.gif')} alt="" /> :
                                                            <Image unoptimized src={require('../../../assets/image/ats/3.gif')} alt="" />
                                                }
                                            </Box>
                                            <Box className="atsservicecontrolsection" sx={{ cursor: 'pointer' }} onClick={handleNext}>
                                                <East />
                                            </Box>
                                        </Box>
                                    </SideContainer>
                                    <Box className="atsservicedescriptionsection">
                                        <Box className="atsservicedescriptionsubsection">
                                            {
                                                servicedesc.map((item, i) => {
                                                    return (
                                                        items.id === item.SubServiceId &&
                                                        <Box key={i} className="servicedescription">
                                                            <Box>
                                                                <Box className="descriptionsvgsection">
                                                                    <Done />
                                                                </Box>
                                                            </Box>
                                                            <Box className="servicedescriptionsubsection">
                                                                <Typography variant="body1">{item.description}</Typography>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
                }
            </Box>

            {/* Website Development */}

            {
                title === "Website Development" &&
                <SideContainer className="!mt-[20px]">
                    <ShareSection  />
                    <Box className="wdinfosection">
                        {
                            serviceinfo.map((items, i) => {
                                return (
                                    serviceId === items.ServiceId && <Box key={i}>
                                        <Box>
                                            <Typography variant="subtitle1">{items.title}</Typography>
                                        </Box>
                                        <Box>
                                            {
                                                servicedesc.map((item, e) => (
                                                    item.SubServiceId === items.id && <Box className="my-[20px]" key={e}>
                                                        <Typography variant="body1">{item.description}</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box className="workprocesssection">
                        <CommonText title={"Work process"} subtitle={"This is How We Streamline Our Design Workflow"} />
                        <Box className="mt-[30px]">
                            <Carousel autoPlay={true} infiniteLoop={true} >
                                {
                                    websteps.map((items, i) => {
                                        return (
                                            <Box key={i} className="webstepsection">
                                                <Box>
                                                    <SvgIcon name={items.icon} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">{items.title}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1">{items.description}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                            </Carousel>
                        </Box>
                    </Box>
                </SideContainer>
            }

            {/* Digital Marketing & Graphic Design */}

            {
                (title === "Digital Marketing" || title === "Graphic Design") &&
                <SideContainer className="!mt-[20px]">
                    <Box className="dmgdwelcomesection">
                        <Typography variant="h5">Welcome To ATS Software Solution</Typography>
                    </Box>
                    <Box>
                        {
                            serviceinfo.map((items, i) => {
                                return (
                                    serviceId === items.ServiceId &&
                                    <Box key={i} className="dmgdinfosection">
                                        <Box>
                                            <Typography variant="h6">{items.title}</Typography>
                                        </Box>
                                        <ShareSection  />
                                        <Box>
                                            <Image src={require("../../../assets/image/ats/image1.png")} alt="" />
                                        </Box>
                                        <Box>
                                            {
                                                servicedesc.map((item, e) => (
                                                    item.SubServiceId === items.id &&
                                                    <Box key={e}>
                                                        <Typography variant="body1">{item.description}</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box className="atsourservicesection">
                        <CommonText title={"Our services"} subtitle={"How We Can Help?"} />
                        <Box className="!flex !items-center !flex-col !gap-[50px] !mt-[30px]">
                            {
                                dmgdsteps.map((items, i) => {
                                    return (
                                        <Box key={i} className="atsourservicecard">
                                            <Box className="atsservicesocialshare">
                                                <ShareSection subservice={items.title} />
                                            </Box>
                                            <Box className="atsourservicesvg">
                                                <SvgIcon name={items.icon} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">{items.title}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body1">{items.description}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box className="atsoursuccesssection">
                        <CommonText title={"Our Success"} subtitle={"Why Choose Us ?"} />
                        <Box className="!flex !justify-center !items-center !overflow-hidden !my-[20px]">
                            <Image unoptimized src={require('../../../assets/image/ats/4.gif')} alt="" />
                        </Box>
                        <Box className="!flex !flex-col !items-center !gap-[30px]">
                            {
                                success.map((items, i) => {
                                    return (
                                        <Box key={i} className="atsoursuccesscard">
                                            <Box>
                                                <SvgIcon name={items.icon} />
                                            </Box>
                                            <Box>
                                                <Typography variant="h5">{items.title}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body1">{items.desc}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box className="atsourprocesssection">
                        <CommonText title={"How we work"} subtitle={"This is How We Streamline Our Workflow Process"} />
                        <Box className="mt-[20px]">
                            {
                                process.map((items, i) => {
                                    return (
                                        <Box key={i}>
                                            <Box className="flex items-center">
                                                <Box className="atsourprocesssvg">
                                                    <SvgIcon name={items.icon} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1">{items.title}</Typography>
                                                </Box>
                                            </Box>
                                            <Box className="flex items-center !my-[10px]">
                                                <Box className="w-[16%] dividersection" sx={{ height: items.id === 5 && "50px" }}>
                                                    {items.id !== 5 && <Divider className="atsourprocessdivider" orientation="vertical" />}
                                                </Box>
                                                <Box className="w-[84%] informationsection">
                                                    <Typography variant="body1">{items.desc}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </SideContainer>
            }

            <Socialmodel sending={sending} open={open} close={handleClose} submit={handleSubmit} onchange={handleInputChange} data={formValues} inputs={inputs} />

        </Box>
    )
}

export default AtsService