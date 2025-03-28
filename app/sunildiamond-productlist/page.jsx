import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const SunilDiamondProductList = dynamic(() => import('@/pages/SunilDiamond/ProductList/SunilDiamondProductList'),{
    loading: () => <Loading />
})

const SunilDiamondProduct = () => {
    return (
        <>
            <SunilDiamondProductList />
        </>
    )
}

export default SunilDiamondProduct