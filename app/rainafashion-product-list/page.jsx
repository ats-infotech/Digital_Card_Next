import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const ProductList = dynamic(() => import('@/pages/Rainafashion/Productlist/ProductList'),{
    loading: () => <Loading />
})

const Plist = () => {
    return(
        <>
        <ProductList/>
        </>
    )
}

export default Plist