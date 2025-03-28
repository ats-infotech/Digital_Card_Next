'use client'
import { Box, Typography, useMediaQuery } from '@mui/material'
import './Login.css'
import { useEffect, useState } from 'react'
import { ResetModel } from '@/pages/ATS/modals/centralizedmodel'

const Login = ({ auth }) => {

    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setResetid()
    };
    const handleClose = () => setOpen(false);
    const [fusername, setFusername] = useState()
    const [admins, setAdmins] = useState([])
    const [resetid, setResetid] = useState()
    const [sendingmail, setSendingmail] = useState(false)
    const [email, setEmail] = useState()
    const [profile, setprofile] = useState([])
    const [clientnumber, setClientnumber] = useState()
    const moble = useMediaQuery('(max-width: 767px)')

    const fetchadmin = async () => {
        const response = await fetch('/api/admin');
        const data = await response.json();
        if (data?.data) {
            const decodedAdmins = data.data.map((admin) => ({
                ...admin,
                username: atob(admin.username),
                id: admin.id,
                email: atob(admin.email)
            }));
            setAdmins(decodedAdmins);
        }
    }

    useEffect(() => {
        fetchadmin()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        const payload = {
            username: data.username,
            password: data.password,
        }
        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.message === "Login successful") {
                sessionStorage.setItem('admin', result.userName);
                sessionStorage.setItem('id', result.adminId)
                auth(true)
                window.location.href = '/admin';
            } else {
                alert("Wrong username or password")
            }
        } catch (error) {
            console.error('Error while login:', error);
        }
    }

    const handleResetSubmit = async (resetid) => {
        if (resetid) {
            const text = `<p>Dear atssoftwaresolution,</p>
                    <p>I am reaching out because I seem to have forgotten the Password associated with my admin account. Unfortunately, I am unable to access my account or complete necessary tasks due to this issue.</p>
                    <p>Could you kindly assist me in recovering or confirming the username and password linked to my admin account? Any guidance you can provide will be greatly appreciated.</p>
                    <p>Please let me know if you require any further details to process my request.</p>
                    <p>Thank you for your attention to this matter, and I look forward to your assistance.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p>${fusername}</p>
                    <p>${clientnumber.replace(/[^+\d]/g, '')}</p>`
            const response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: `${email}`,
                    subject: 'Request for Assistance: Forgotten Password Address',
                    text: text,
                }),
            });
            const result = await response.json();
            if (result.status === 'success') {
                console.log('Email sent successfully:', result.reply);
                alert("Mail sent successfully");
            } else {
                console.error('Error sending email:', result.error);
                alert("Error sending mail");
            }
        } else {
            alert("Wrong username");
        }
        setSendingmail(false);
        setOpen(false);
        setprofile([])
        setClientnumber()
    };

    const handleReset = async () => {
        const filteredImages = admins.filter(item =>
            item.username.toLowerCase().includes(fusername.toLowerCase())
        );
        if (filteredImages.length > 0) {
            const item = filteredImages[0];
            setResetid(item.id);
            setEmail(item.email)
            if (item.id === 1) {
                const response = await fetch('/api/profile');
                const data = await response.json();
                setprofile(data.data)
            } else if (item.id === 2) {
                const response = await fetch('/api/atsprofile');
                const data = await response.json();
                setprofile(data.data)
            } else if (item.id === 3) {
                const response = await fetch('/api/sdprofile');
                const data = await response.json();
                setprofile(data.data)
            }
        } else {
            alert("No matching username found");
        }
        setSendingmail(true)
    };

    useEffect(() => {
        const filterProfile = profile.find(p => p.id === 1);
        if (filterProfile && resetid === 1) {
            setClientnumber(filterProfile.Phone)
        } else if (filterProfile) {
            setClientnumber(filterProfile.number)
        }
    },[resetid, profile])
    
    useEffect(() => {
        if (resetid && clientnumber !== undefined) {
            handleResetSubmit(resetid);
        }
    }, [resetid, clientnumber]);

    return (
        <Box className="flex">
            { !moble && <Box className="background-image w-[50%] !min-h-[100vh]">
            </Box>}
            <Box className={`raina-login-section flex flex-col justify-center items-center ${moble ? "w-[100%] !min-h-[100vh]" : "w-[50%]"}`}>
                <Box className="login-title">
                    <Typography variant='h2'>Admin Login</Typography>
                </Box>
                <Box>
                    <form className="login-input-section" onSubmit={handleClick}>
                        <input required className='login-input-text' placeholder='Enter username' type='text' onChange={(e) => setData({
                            ...data,
                            username: e.target.value
                        })} />
                        <input required className='login-input-text' placeholder='Enter password' type='password' onChange={(e) => setData({
                            ...data,
                            password: e.target.value
                        })} />
                        <Box className="login-btn-section">
                            <button className='login-btn' >Login</button>
                        </Box>
                    </form>
                </Box>
                <Box className="!mt-[20px]">
                    <Typography onClick={handleOpen} className='!underline !font-poppins !font-[600] !cursor-pointer'>Forgot password?</Typography>
                </Box>
            </Box>
            <Box>
                <ResetModel open={open} close={handleClose} sendingmail={sendingmail} setFusername={setFusername} reset={handleReset} />
            </Box>
        </Box>
    )
}

export default Login