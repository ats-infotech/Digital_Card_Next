'use client'
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const Loader = () => {
    const pathname = window.location.pathname
    const pathSegment = pathname.split('/')[1]?.toLowerCase();
    const [color, setColor] = useState({ color: '#3B3663'});

    useEffect(() => {
        let newColor;
        switch (pathSegment) {
            case 'atssoftwaresolution':
            case 'atssoftwaresolution-service':
                  newColor = { color: 'var(--orange)' };
                break;
            case 'rainafashion':
            case 'rainafashion-product-list':
            case 'rainafashion-productdetails':
                  newColor = { color: 'var(--purpledark)' };
                break;
            case 'sunildiamond':
            case 'sunildiamond-productlist':
                  newColor = { color: 'var(--yellowmild)' }
                break;
            default:
                  newColor = { color: '#3B3663' };
                break;
        }
        setColor(newColor)
    }, [pathname])

    return (
        <Box sx={{
            backgroundColor: 'var(--white)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <CircularProgress
                sx={{
                    color: color
                }}
                size={"30px"}
            />
        </Box>
    )
}

export default Loader