'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { KeyboardArrowLeft } from "@mui/icons-material"
import './ProductList.css'
import WhatsappFill from '../../../common/svg/WhatsappFill'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SideContainer } from '@/pages/common/CommonUI'

const ProductDataImages = ({ id, Images, code }) => {
  const router = useRouter()
  const filterimages = Images.filter((item) => item.ImageId === id)
  return (
    filterimages.map((item, index) => (
      index === 2 && <Box className="Productlistsection" key={index}>
        <Image quality={100} priority loading={item.loading} src={`/${item.filename}`} height={300} width={300} alt="" className='productlistimage' />
        <Button className='productlistbtn' onClick={() => router.push(`/rainafashion-productdetails/${code}`)}>More Details</Button>
      </Box>
    ))
  )
}

const ProductList = () => {

  const [post, setPost] = useState([])
  const [Images, setImages] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchData()
    fetchImages()
  }, []);

  const fetchData = async () => {
    let response = await fetch('/api/posts');
    const data = await response.json();
    setPost(data?.data)
  }

  const fetchImages = async () => {
    const response = await fetch('/api/images');
    const data = await response.json();
    setImages(data?.data);
  };

  const handlewhatsappShare = (code) => {
    const url = window.location.href;
    const text = `Hi,\n I have checked your Dress and I have Liked it Can you please give me more details on Dress ${code} \n URL: ${url}\n  Thanks`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Box className="ProductListPage ">
      <Box>
        <Box className="backbuttonsection">
          <Button onClick={() => router.push("/rainafashion")}
            aria-label='backbtn'>
            <Box className="backbuttonsubsection">
              <KeyboardArrowLeft sx={{ color: 'var(--purpledark)' }} fontSize="large" />
            </Box>
          </Button>
        </Box>
      </Box>
      <SideContainer>
        <Box className='productimagebox'>
          {
            post.map((items, i) =>
              <Box key={i}  >
                <Box className="productwrapper">
                  <Box>
                    <ProductDataImages id={items.id} Images={Images} code={items.code} />
                  </Box>
                </Box>
                <Box className='productinfosection'>
                  <Box className="!pt-[5px]">
                    <Typography className='productinfotext' >{items.name}</Typography>
                    <Box>
                      <Typography className='productinfotext'>₹{items.price}</Typography>
                    </Box>
                  </Box>
                  <Box className='!flex-col !pt-[5px]'>
                    <Box onClick={() => handlewhatsappShare(items.code)} aria-label='whatsapplink' sx={{ cursor: 'pointer' }}>
                      <Box>
                        <WhatsappFill
                          height={27}
                          width={27}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          }
        </Box>
      </SideContainer>
    </Box>
  )
}

export default ProductList