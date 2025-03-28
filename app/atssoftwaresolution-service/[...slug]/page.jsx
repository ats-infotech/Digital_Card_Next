import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const AtsService = dynamic(() => import('@/pages/ATS/Service/atsService'), {
    loading: () => <Loading />
})

const ATSService = () => {
    return (
        <>
            <AtsService />
        </>
    )
}

export default ATSService