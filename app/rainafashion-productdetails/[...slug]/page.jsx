import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const ProductDetails = dynamic(() => import('@/pages/Rainafashion/ProductDetails/ProductDetails'),{
    loading: () => <Loading />
})

const Pdetails = () => {
    return(
        <>
        <ProductDetails/>
        </>
    )
}

export default Pdetails