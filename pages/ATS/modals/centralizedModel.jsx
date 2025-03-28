import SvgIcon from "@/assets/icons/SvgIcon";
import { Close, Add, Edit, Cancel } from "@mui/icons-material";
import { Box, Button, Typography, Checkbox, FormControlLabel, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useMediaQuery, Dialog, DialogTitle, DialogContent } from "@mui/material"
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import './centralizedModel.css'

export const CommonAdminModel = ({ open, close, submit, input, data, onchange, color, title, subtitle, subdesc, buttontext, model, edit, prevurl,
    fileclick, filechange, oncheck, error, inputsize, sizeerror, handlecancle, click }) => {
    const tabletwidth = useMediaQuery('(max-width: 1023px)')
    const mobilewidth = useMediaQuery('(max-width: 700px)')
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '.MuiPaper-root': {
                    margin: "10px",
                    width: "100%",
                    maxWidth: mobilewidth ? "90%" : tabletwidth ? "60%" : "50%",
                    borderRadius: "15px"
                }
            }}
        >
            <DialogTitle sx={{ paddingBottom: '0px !important' }} >
                <Box className="!flex" sx={{ width: '100%', justifyContent: model === "description" ? 'space-between !important' : 'flex-end !important' }}>
                    {model === "description" && <Typography sx={{ color: `${color} !important` }} className="!font-poppins !font-[600] !pl-[20px] !pt-[10px]" >{subdesc ? `${title} => ${subtitle}` : `${title}`}</Typography>}
                    <Close sx={{ color: `${color} !important`, cursor: 'pointer' }} onClick={close} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    scrollbarColor: `${color} transparent !important`
                }} className=" !overflow-x-hidden">

                    <form onSubmit={submit}>
                        <Box>
                            {
                                input.map((items, i) => (
                                    <Box key={i}>
                                        <Box className={`!flex !mt-[12px] !gap-[8px] flex-col`}>
                                            <Box className={"100%"}>
                                                <Typography sx={{ color: `${color} !important`, fontSize: '14px !important' }} className={"!font-poppins !font-[600]"}>{items.text}</Typography>
                                            </Box>
                                            <Box className={"100%"}>
                                                {(items.name === "description" || subdesc) && model !== "profile" ? (
                                                    <textarea
                                                        required
                                                        className="catloginput h-[120px]" style={{ border: `2px solid ${color}` }}
                                                        name={items.name}
                                                        value={data[items.name]}
                                                        onChange={onchange}
                                                    />
                                                ) : <input
                                                    type={items.type}
                                                    name={items.name}
                                                    value={data[items.name]}
                                                    required={items.required}
                                                    onChange={onchange}
                                                    className="catloginput" style={{ border: `2px solid ${color}` }}
                                                />}
                                            </Box>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                        {model === "raina" && <Box className="!mt-[20px]">
                            <Typography sx={{ color: `${color} !important` }} className="!font-poppins !font-[600] !mb-[10px] !text-[14px]">Select Available Sizes</Typography>
                            <Box >
                                {inputsize.map((items, i) => (
                                    <FormControlLabel
                                        key={i}
                                        name={items.name}
                                        label={items.text}
                                        sx={{ color: `${color} !important` }}
                                        control={
                                            <Checkbox
                                                required={sizeerror ? true : false}
                                                checked={items.name === "XS" ? data.size.XS : items.name === "S" ? data.size.S : items.name === "M" ? data.size.M : items.name === "L" ? data.size.L : items.name === "XL" ? data.size.XL : items.name === "XXL" ? data.size.XXL : false}
                                                sx={{
                                                    color: color,
                                                    '&.Mui-checked': {
                                                        color: color,
                                                    },
                                                }}
                                                onChange={oncheck}
                                            />
                                        }
                                    />
                                ))
                                }
                            </Box>
                        </Box>}
                        {(model === "service" || model === "raina") && <Box className="!mt-[20px]">
                            <label style={{ color: `${color}`, fontSize: '14px !important' }} className={"!font-poppins !font-[600] !cursor-pointer"} htmlFor="file">
                                {edit && model === "service" ? `Change Image ` : model === "service" ? `Add Image ` : "Add Images"}{edit && model === "service" ? <Edit sx={{ marginLeft: '10px' }} /> : <Add />}
                            </label>
                            {model === "raina" && error && prevurl.length === 0 && <Typography className="!font-poppins !font-[600] !font-[10px] !text-red-500">Please choose one or more image</Typography>}
                            <input className="hidden" id="file" type="file" multiple={model === "raina" ? true : false} onClick={fileclick} onChange={filechange} accept=".png, .jpg" />
                            <Box className="!flex !flex-wrap !mt-[20px]" sx={{ justifyContent: model === "raina" && 'center' }}>
                                {
                                    model === "raina" && data.image.map((items, i) => (
                                        <Box key={i} className="!mt-[-30px]">
                                            <Close onClick={() => handlecancle(items.id)} className="!relative top-[30px] left-[-3px] !text-admintable !mt-[10px] !ml-[90px] !cursor-pointer" />
                                            <Image quality={100} priority src={`/${items.filename}`} alt="" className="!h-[150px] !w-auto !mt-[10px] !mx-[5px]" width={66} height={100} />
                                        </Box>
                                    ))
                                }
                                {
                                    prevurl.map((url, i) => (
                                        <Box key={i} sx={{ marginTop: model === "raina" ? "-30px" : "0px" }}>
                                            {model === "service" ? <Image quality={100} key={url} src={url} fill alt="" className="!h-[150px] !w-auto !mt-[10px] !mx-[5px] !relative" />
                                                : <Box>
                                                    <Close onClick={() => handlecancle(i)} className="!relative top-[30px] left-[-3px] !text-admintable !mt-[10px] !ml-[90px] !cursor-pointer" />
                                                    <Image quality={100} priority key={url} src={url} alt="" className="!h-[150px] !w-auto !mt-[10px] !mx-[5px]" width={66} height={100} />
                                                </Box>}
                                        </Box>
                                    ))
                                }
                                {
                                    model === "service" && edit && prevurl.length === 0 && <Image unoptimized fill src={`/${data?.image}`} alt="" className="!h-[150px] !w-auto !mt-[10px] !mx-[5px] !relative" />
                                }
                            </Box>
                        </Box>}
                        <Box className="!flex !justify-center">
                            <Button sx={{
                                backgroundColor: color,
                                '&:hover': {
                                    color: `${color} !important`,
                                    borderColor: `${color} !important`
                                }
                            }} className={"addbutton"} onClick={model === "raina" ? click : undefined} type="submit" >{buttontext}</Button>
                        </Box>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export const Sizechartmodal = ({ open, close, chartsize }) => {
    const HeadTitle = ['Size', 'Bust', 'Waist', 'Length', 'Hip']
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '&.MuiPaper-root': {
                    margin: "10px"
                }
            }}
        >
            <Box className='!rounded-[10px] !h-[100%] !w-[100%] p-[20px]'>
                <Box className='!flex !justify-end !cursor-pointer' onClick={close}>
                    <Close sx={{
                        color: 'var(--purpledark)'
                    }} />
                </Box>
                <Typography variant='h6' sx={{
                    color: 'var(--purpledark)',
                    textAlign: 'center',
                    fontFamily: 'poppins',
                    fontWeight: '600',
                    marginBottom: '10px'
                }}>All Sizes are in Inches</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{
                        minWidth: 300,
                        "& .MuiTableCell-head": {
                            backgroundColor: "var(--purpledark)",
                            color: 'var(--white)',
                            fontFamily: "poppins"
                        }
                    }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    HeadTitle.map((items, i) => (
                                        <TableCell key={i}>{items}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                chartsize.map((items) => (
                                    <TableRow key={items.name} scope="row"
                                        sx={{
                                            '&:nth-of-type(even)': {
                                                color: 'var(--white) !important',
                                                backgroundColor: "#AA5692",
                                                '& td': {
                                                    color: 'var(--white) !important',
                                                },
                                            },
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell>{items.type}</TableCell>
                                        <TableCell>{items.Bust}</TableCell>
                                        <TableCell>{items.Waist}</TableCell>
                                        <TableCell>{items.FrontLength}</TableCell>
                                        <TableCell>{items.Hips}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Dialog>
    )
}

export const ImageZoomModel = ({ open, close, setFullscreen, zoomImage }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '.MuiPaper-root': {
                    margin: "10px",
                    width: "90%",
                    maxWidth: "400px",
                    borderRadius: "15px",
                    overflow: 'visible'
                }
            }}
        >
            <Box className="!rounded-[10px] !p-[20px]">
                <Box className='!flex !justify-end !w-[100%]'>
                    <Button className="!px-0 !absolute !top-[-16px] right-[-25px]" onClick={setFullscreen}><Cancel sx={{
                        color: 'black',
                    }} /></Button>
                </Box>
                <InnerImageZoom
                    hideHint={!isMobile && true}
                    zoomType="hover"
                    zoomScale={1}
                    src={`/${zoomImage}`}
                    alt="product"
                    className="!h-[100%] !w-[100%] !object-contain !rounded-[5px]"
                />
            </Box>
        </Dialog>
    )
}

export const ResetModel = ({ open, close, setFusername, reset, sendingmail }) => {
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '.MuiPaper-root': {
                    margin: "10px",
                    width: "90%",
                    maxWidth: "400px",
                    borderRadius: "15px"
                }
            }}
        >
            <Box className="rounded-[15px] !p-[20px]">
                {sendingmail ?
                    <Box className="!flex !justify-center !items-center">
                        <CircularProgress sx={{ color: "black" }} />
                    </Box>
                    :
                    <Box>
                        <Box className="!flex !justify-end">
                            <Close sx={{ color: 'black', cursor: 'pointer' }} onClick={close} />
                        </Box>
                        <Box className="login-title">
                            <Typography variant='h2'>Forget password</Typography>
                        </Box>
                        <Box className="!flex !justify-center">
                            <input className='login-input-text' type='text' required placeholder='Enter username' onChange={(e) => setFusername(e.target.value)} />
                        </Box>
                        <Box className="login-btn-section">
                            <button onClick={reset} className='login-btn' >Reset</button>
                        </Box>
                    </Box>
                }
            </Box>
        </Dialog>
    )
}

export const LogoutModel = ({ open, close, yes, no, title, desc, color }) => {
    const CommonButton = ({ title, onclick }) => {
        return (
            <Button sx={{
                backgroundColor: color,
                '&:hover': {
                    color: `${color} !important`,
                    borderColor: `${color} !important`
                }
            }} className={`logoutbutton`} onClick={onclick} >{title}</Button>
        )
    }
    const buttons = ['yes', 'no']
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '.MuiPaper-root': {
                    margin: "10px",
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "15px"
                }
            }}
        >
            <Box className="!p-[20px]">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to {desc}
                </Typography>
                <Box className='!flex !justify-center !mt-[30px] !mx-auto !gap-[20px]'>
                    {
                        buttons.map((items, i) => {
                            return (
                                <CommonButton key={i} title={items} onclick={i === 0 ? yes : no} />
                            )
                        })
                    }
                </Box>
            </Box>
        </Dialog>
    )
}

export const Socialmodel = ({ open, close, submit, onchange, data, inputs, sending }) => {
    return (
        <Dialog
            open={open}
            onClose={close}
            sx={{
                '.MuiPaper-root': {
                    margin: "10px",
                    width: "90%",
                    maxWidth: "400px",
                    borderRadius: "15px",
                    overflow: 'visible'
                }
            }}
        >
            <Box className="rounded-[15px] !p-[20px]">
                {sending ?
                    <Box className="!flex !justify-center !items-center">
                        <CircularProgress sx={{ color: "var(--blue)" }} />
                    </Box>
                    :
                    <Box>
                        <Box className="!absolute !top-0 !bottom-0 !left-0 !right-0 !flex !justify-end !mt-[-60px] !h-[42px]">
                            <Box className="!w-[42px] !h-[42px] !rounded-[50%] !bg-white !flex !justify-center !items-center" onClick={close}>
                                <Close sx={{ cursor: 'pointer', color: "var(--blue)" }} />
                            </Box>
                        </Box>
                        <Box>
                            <form onSubmit={submit} >
                                {
                                    inputs.map((items, i) => {
                                        return (
                                            <Box key={i} >
                                                <input
                                                    required
                                                    name={items.name}
                                                    value={data[items.name] || ""}
                                                    onChange={onchange}
                                                    type={items.type}
                                                    className="!border-2 w-[100%] !h-[50px] !border-solid !border-greydark !p-2 !rounded-[10px] !my-[10px] focus:!outline-none"
                                                />
                                                <Box className={`relative top-[-69px] bottom-0 right-0 left-[30px] !flex !justify-center bg-white ${items.text === 'Name' || items.text === 'Email' ? "!w-[60px]" : items.text === "Phone Number" ? "w-[125px]" : "w-[125px]"}`}>
                                                    <Typography className="!font-poppins !text-inputlabel !font-[600] !text-greydark">{items.text}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                    )
                                }
                                <Box className="!flex !justify-center">
                                    <Button className="!bg-blue !w-[180px] !h-[45px] !rounded-[10px] !flex !justify-evenly" type="submit">
                                        <SvgIcon name={"send"} className="!h-[20px] !w-[20px]" />
                                        <Typography className="!normal-case !font-poppins !text-white !font-[600] !text-inputlabel !leading-[18px]">Send Message</Typography>
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>}
            </Box>
        </Dialog>
    )
}