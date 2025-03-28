'use client'
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const AdminDashboard = dynamic(() => import('../admin/AdminDashboard'),{
    loading: () => <Loading />
})
const Login = dynamic(() => import('../Login/Login'),{
    loading: () => <Loading />
})
const ATSAdminPage = dynamic(() => import('@/pages/ATS/ATSAdmin/ATSAdminDashboard'),{
    loading: () => <Loading />
})
const SunilDiamondAdminDashboard = dynamic(() => import('@/pages/SunilDiamond/admin/SunilDiamondAdminDashboard'),{
    loading: () => <Loading />
})
const Adminlist = dynamic(() => import('@/pages/ATS/Adminlist/Adminlist'),{
    loading: () => <Loading />
})

const Admin = () => {

    const [token, setToken] = useState()
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        const tokenn = sessionStorage.getItem('admin')
        if (tokenn) {
            const tokenn = sessionStorage.getItem('id')
            setToken(tokenn)
            setAuthenticated(true)
        } else{
            setAuthenticated(false)
        }
    }, [token])

    return (
        authenticated && token ? token === "1" ?  <AdminDashboard auth={setAuthenticated} /> : token === "2" ? <ATSAdminPage auth={setAuthenticated} /> : token === "3" ? <SunilDiamondAdminDashboard auth={setAuthenticated} /> : token === "4" && <Adminlist auth={setAuthenticated}/> :  <Login auth={setAuthenticated} />
    )
}

export default Admin