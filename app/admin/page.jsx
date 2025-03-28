import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const Admin = dynamic(() => import('@/pages/Rainafashion/adminpage/Admin'),{
    loading: () => <Loading />
})

const Radmin = () => {
    return (
        <>
            <Admin />
        </>
    )
}

export default Radmin