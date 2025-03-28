import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const Atspage = dynamic(() => import('@/pages/ATS/Atspage'),{
    loading: () => <Loading />
})

const ATSS = () => {
    return(
        <>
        <Atspage />
        </>
    )
}

export default ATSS