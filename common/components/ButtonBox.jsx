'use client'
import * as React from 'react';
import { Button, Typography, Box } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { handleZipDownload } from "../function";
import GetAppIcon from '@mui/icons-material/GetApp';

const ButtonBox = (props) => {
    const { type, images, icons, title, className } = props
    const [name, setName] = useState('')
    const [icon, setIcon] = useState()

    const handleClick = (type) => {
        switch (type) {
            case 'zip':
                handleZipDownload(images)
                break;
            default:
                break;
        }
    }

    const init = useCallback(() => {
        switch (type) {
            case 'zip':
                setName(title || 'ZIP')
                setIcon(<GetAppIcon />)
                break
            default:
                setName('')
                setIcon()
                break
        }
    }, [type, title, icons])

    useEffect(() => {
        init()
    }, [init])

    return (
        <Button
            className={className}
            sx={{
                width: className,
            }}
            onClick={() => handleClick(type)}>
            <Box className='flex justify-center items-center'>
                {icon}&nbsp;&nbsp;
                <Typography variant='body1' sx={{ fontWeight: 600, fontFamily: 'poppins' }}>{name}</Typography>
            </Box>
        </Button>
    )
}

export default ButtonBox