import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material"
import Image from "next/image";
import "./TableSection.css"

const ActionCell = ({ handleDeleteClick, handleEdit, color, card }) => {
    return (
        <TableCell sx={{ minWidth: "100px" }} className="!text-start !cursor-pointer" >
            <Edit sx={{ color: `${color}`, marginRight: '10px' }} onClick={handleEdit} />
            {card !== "Admin" && <Delete sx={{ color: `${color}` }} onClick={handleDeleteClick} />}
        </TableCell>
    )
}

export const CustomTable = ({ headerData, color, bodyData, handleEdit, handleDeleteClick, handleRediractOnclick, sizeData, imageData, tablename, subdesc, handleSubRedirect, ssubdesc, handlesubback, handleback, title, subtitle }) => {
    const mobile = useMediaQuery('(max-width: 1023px)')
    const minheight = window.innerHeight - 150
    const sizeLabels = [
        { label: 'XS', flag: 'extrasmall' },
        { label: 'S', flag: 'small' },
        { label: 'M', flag: 'meduim' },
        { label: 'L', flag: 'large' },
        { label: 'XL', flag: 'extralarge' },
        { label: 'XXL', flag: 'extraextralarge' }
    ];
    const splitStr = (str, num = 10) => {
        return str.slice(0, num) + "..."
    }
    const handleClick = (data) => {
        if (subdesc) {
            handleSubRedirect(data)
        } else {
            handleRediractOnclick(data)
        }
    }

    return (
        <>
            {
                subdesc && tablename === "ats" ?
                    <Box sx={{ display: 'flex', marginBlock: "30px", marginLeft: "20px", gap: "15px" }}>
                        <ArrowBack sx={{ color: "var(--orange)", cursor: "pointer" }} onClick={ssubdesc ? handlesubback : handleback} />
                        <Typography className="!font-poppins !font-[600] !text-orange" >{ssubdesc ? `${title} => ${subtitle}` : `${title}`}</Typography>
                    </Box>
                    : ""
            }
            <Box className="!flex !justify-center !items-center">
                <TableContainer className="!flex  datatable" sx={{
                    marginBlock: '30px',
                    margin: "0 20px",
                    maxHeight: minheight,
                    border: `1px solid ${color}`,
                    scrollbarColor: `${color} transparent`
                }}>
                    <Table stickyHeader className="maintable" >
                        <TableHead>
                            <TableRow >
                                {
                                    headerData.length > 0 && headerData.map((items, i) =>
                                        <TableCell sx={{ backgroundColor: `${color}`, color: "var(--white)", fontWeight: "600" }} className="table-head-row" key={i}>{items.title}</TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bodyData.length > 0 &&
                                bodyData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {headerData.map((headerItem, colIndex) => {
                                            const cellData = row[headerItem.keys];
                                            if (headerItem.keys === "action") {
                                                return (
                                                    <ActionCell card={tablename} color={color} key={colIndex} handleEdit={() => handleEdit(row)} handleDeleteClick={() => handleDeleteClick(tablename === "raina" ? row : row.id)} />
                                                )
                                            } else if (headerItem.keys === "image") {
                                                const filterimages = imageData && imageData.filter((item) => item.ImageId === row.id)
                                                let thumbimage = imageData && filterimages.length > 0 && filterimages[2].filename
                                                return (
                                                    <TableCell className="table-body-row" sx={{ paddingLeft: "0px", height: 'object-fit' }} key={colIndex}>
                                                        <Box sx={{ width: "50px" }} className="!h-[50px]">
                                                            <Image unoptimized quality={92} src={thumbimage ? `/${thumbimage}` : `/${cellData}`} alt='thumbnail' fill className='!w-[100%] !h-[100%] !object-contain !relative' />
                                                        </Box>
                                                    </TableCell>
                                                )
                                            } else if (headerItem.keys === "size") {
                                                return (
                                                    <TableCell key={colIndex}>
                                                        {sizeData.map((item) => (
                                                            item.id === row.id && <Box
                                                                key={item.id}
                                                                sx={{ gap: "5px" }}
                                                                className="!flex !items-center !flex-wrap"
                                                            >
                                                                {sizeLabels.map(
                                                                    ({ label, flag }) =>
                                                                        item[flag] && <p className="table-body-row" key={flag}>{label}</p>
                                                                )}
                                                            </Box>
                                                        ))}
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell className="table-body-row" onClick={tablename === "ats" ? () => handleClick(row) : undefined}  sx={{ textDecoration: headerItem.keys === "title" ? 'underline' : 'none', cursor: headerItem.keys === "title" && 'pointer' }} key={colIndex}>
                                                        {
                                                            headerItem.keys === "index" ?
                                                                (rowIndex + 1)
                                                                :
                                                                tablename === "raina" && headerItem.keys === "description" ?
                                                                    cellData?.split('\n').map((line, index) => (
                                                                        <p key={index} className="table-body-row">{mobile ? `${splitStr(line)}` : `${line}`}</p>
                                                                    ))
                                                                    :
                                                                    tablename === "ats" && headerItem.keys === "description" ?
                                                                        splitStr(cellData, 60)
                                                                        :
                                                                        cellData
                                                        }
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}