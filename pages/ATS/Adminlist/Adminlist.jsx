'use client'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import FirstSection from '@/common/admincomponents/FirstSection'
import { CustomTable } from '@/common/admincomponents/TableSection'
import { CommonAdminModel, LogoutModel } from '../modals/centralizedmodel'

const newHeader = [
    {
        title: 'Sr.no',
        keys: 'index',
    },
    {
        title: 'Username',
        keys: 'username',
    },
    {
        title: 'Email',
        keys: 'email',
    },
    {
        title: 'Action',
        keys: 'action',
    },
]

const Adminlist = ({ auth }) => {

    const inputs = [
        {
            name: 'username',
            type: 'text',
            text: 'Username'
        },
        {
            name: 'password',
            type: 'text',
            text: 'Password'
        },
        {
            name: 'email',
            type: 'text',
            text: 'Email'
        }
    ]

    const [admins, setAdmins] = useState([])
    const [username, setUsername] = useState()
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [openadmin, setOpenadmin] = useState(false)
    const [admindata, setAdmindata] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [editId, setEditId] = useState()
    const handleAdminModelClose = () => {
        setAdmindata({
            username: "",
            password: "",
            email: ""
        })
        setOpenadmin(false)
        setEditId()
    }

    const fetchadmin = async () => {
        const response = await fetch('/api/adminlist');
        const data = await response.json();
        if (data?.data) {
            const decodedAdmins = data.data.map((admin) => ({
                ...admin,
                username: atob(admin.username),
                id: admin.id,
                email: atob(admin.email),
                password: atob(admin.password)
            }));
            setAdmins(decodedAdmins);
        }
    }

    const handlelogout = () => {
        setOpen(false)
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('id')
        auth(false)
        window.location.href = '/admin';
    }

    useEffect(() => {
        const name = sessionStorage.getItem('admin')
        setUsername(name)
    }, [])

    useEffect(() => {
        fetchadmin()
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdmindata(prev => ({ ...prev, [name]: value }));
    }

    const handleEdit = (data) => {
        setOpenadmin(true)
        setAdmindata({
            username: data.username,
            password: data.password,
            email: data.email
        })
        setEditId(data.id)
    }

    const UpdateAdmin = async (payload) => {
        try {
            const response = await fetch('/api/adminlist', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            fetchadmin()
            alert("Admin Data Updated Successfully")
        } catch (error) {
            console.error('Error update post:', error);
            alert("Error While Updating Admin Data")
        }
    }

    const handleAdminUpdate = (e) => {
        e.preventDefault()
        const payload = {
            username: admindata.username,
            password: admindata.password,
            email: admindata.email
        }
        UpdateAdmin({ "id": editId, ...payload })
        handleAdminModelClose()
    }

    return (
        <Box className="!bg-white !min-h-[100vh] !pt-[20px]">
            <FirstSection
                card={"Adminlist"}
                username={username}
                handleOpen={handleOpen}
            />

            <CustomTable
                headerData={newHeader}
                bodyData={admins}
                color={"black"}
                handleEdit={handleEdit}
                tablename={"Admin"}
            />

            <CommonAdminModel
                open={openadmin}
                close={handleAdminModelClose}
                input={inputs}
                onchange={handleInputChange}
                submit={handleAdminUpdate}
                data={admindata}
                color={"black"}
                buttontext={"Update"}
            />

            <LogoutModel
                open={open}
                close={handleClose}
                yes={handlelogout}
                no={handleClose}
                title={"Logout"}
                desc={"logout"}
                color={"black"}
            />
        </Box>
    )
}

export default Adminlist