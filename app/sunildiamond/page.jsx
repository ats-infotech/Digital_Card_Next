import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const SunilDiamondPage = dynamic(() => import('@/pages/SunilDiamond/SunilDiamondPage'),{
    loading: () => <Loading />
})

const SunilDiamond = () => {
    return (
        <>
            <SunilDiamondPage />
        </>
    )
}

export default SunilDiamond