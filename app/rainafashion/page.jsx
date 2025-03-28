import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const Raina = dynamic(() => import('@/pages/Rainafashion/rainafashion'),{
    loading: () => <Loading />
})

const RF = () => {
    return(
        <>
            <Raina />
        </>
    )
}

export default RF