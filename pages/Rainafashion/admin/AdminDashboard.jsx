'use client'
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import FirstSection from "@/common/admincomponents/FirstSection"
import { CustomTable } from "@/common/admincomponents/TableSection"
import { CommonAdminModel, LogoutModel } from "@/pages/ATS/modals/centralizedmodel"

const newHeader = [
    {
        title: 'Sr.no',
        keys: 'index',
    },
    {
        title: 'Code',
        keys: 'code',
    },
    {
        title: 'Image',
        keys: 'image',
    },
    {
        title: 'Name',
        keys: 'name',
    },
    {
        title: 'Type',
        keys: 'type',
    },
    {
        title: 'Size',
        keys: 'size',
    },
    {
        title: 'Description',
        keys: 'description',
    },
    {
        title: 'Price (Rs)',
        keys: 'price',
    },
    {
        title: 'Action',
        keys: 'action',
    },
]

const AdminDashboard = ({ auth }) => {

    const [useremail, setUseremail] = useState()
    const [open, setOpen] = useState(false);
    const [openform, setOpenForm] = useState(false)
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)
    const [filechange, setFileChange] = useState([])
    const [editId, setEditId] = useState()
    const [imagefiles, setImagefiles] = useState([])
    const [post, setPost] = useState([])
    const [Images, setImages] = useState([])
    const [fsize, setFsize] = useState([])
    const [prevurl, setPrevurl] = useState([])
    const [data, setData] = useState({
        name: "",
        type: "",
        size: {
            XS: false,
            S: false,
            M: false,
            L: false,
            XL: false,
            XXL: false
        },
        image: [],
        price: "",
        code: "",
        description: "",
    })
    const [deleteData, setDeleteData] = useState([])
    const [deleteProduct, setDeleteProduct] = useState(false)
    const [openprofile, setOpenProfile] = useState(false)
    const [profiledata, setProfiledata] = useState({
        phone: '',
        tel: '',
        address: '',
        insta: '',
        gmap: '',
        iframe: '',
        instalink: '',
        name: '',
        year: '',
        nature: '',
        description: '',
        otherlinktitle: '',
        otherlinkurl: '',
        Broadcastlink: ''
    })
    const [profile, setProfile] = useState([])
    const [cancleimage, setCancleimage] = useState(false)
    const [cancleimageid, setCancleimageid] = useState()
    const [sizeerror, setSizeerror] = useState(false)
    const [modelType, setModelType] = useState()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handledeleteclose = () => {
        setOpen(false)
        setDeleteProduct(false)
    }

    const handlecloseform = () => {
        setOpenForm(false)
        setError(false)
        setPrevurl([])
        setData({
            name: "",
            type: "",
            size: {
                XS: false,
                S: false,
                M: false,
                L: false,
                XL: false,
                XXL: false
            },
            image: [],
            code: "",
            price: "",
            description: "",
        })
        setEdit(false)
    }

    useEffect(() => {
        return () => {
            prevurl.forEach((url) => window.URL.revokeObjectURL(url));
        };
    }, []);

    useEffect(() => {
        const email = sessionStorage.getItem('admin')
        setUseremail(email)
    }, [])

    useEffect(() => {
        const filterprofile = profile?.shift()
        setProfiledata({
            phone: filterprofile?.Phone,
            tel: filterprofile?.Tel,
            address: filterprofile?.Address,
            insta: filterprofile?.Insta,
            gmap: filterprofile?.Gmap,
            iframe: filterprofile?.iframe,
            instalink: filterprofile?.Instalink,
            name: filterprofile?.name,
            year: filterprofile?.year,
            nature: filterprofile?.nature,
            description: filterprofile?.Desc,
            otherlinktitle: filterprofile?.linktitle,
            otherlinkurl: filterprofile?.otherlink,
            Broadcastlink: filterprofile?.Broadcastlink
        })
    }, [profile])

    useEffect(() => {
        fetchData()
        fetchImages()
        fetchSize()
        fetchProfile()
    }, []);

    const handlelogout = () => {
        setOpen(false)
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('id')
        auth(false)
        window.location.href = '/admin';
    }

    const inputsize = [
        {
            name: 'XS',
            text: 'XS',
        },
        {
            name: 'S',
            text: 'S'
        },
        {
            name: 'M',
            text: 'M'
        },
        {
            name: 'L',
            text: 'L'
        },
        {
            name: 'XL',
            text: 'XL'
        },
        {
            name: 'XXL',
            text: 'XXL'
        }
    ]

    const inputs = [
        {
            name: "name",
            type: "text",
            text: "Catelog Name"
        },
        {
            name: "type",
            type: "text",
            text: "Product Type"
        },
        {
            name: "code",
            type: "text",
            text: "Product Code"
        },
        {
            name: "price",
            type: "number",
            text: "Price"
        },
        {
            name: "description",
            type: "text",
            text: "Description"
        }
    ]

    const profileinputs = [
        {
            name: "name",
            type: "text",
            text: "Business Name",
            required: true
        },
        {
            name: "year",
            type: "number",
            text: "Establish Year",
            required: true
        },
        {
            name: "nature",
            type: "text",
            text: "Nature of Business",
            required: true
        },
        {
            name: "description",
            type: "text",
            text: "Description",
            required: true
        },
        {
            name: "phone",
            type: "text",
            text: "Phone Number",
            required: true
        },
        {
            name: "tel",
            type: "text",
            text: "Whatsapp Number",
            required: true
        },
        {
            name: "Broadcastlink",
            type: "url",
            text: "Whatsapp Channel Url",
            required: false
        },
        {
            name: "address",
            type: "text",
            text: "Address",
            required: true
        },
        {
            name: "gmap",
            type: "url",
            text: "Google Map Url",
            required: true
        },
        {
            name: "iframe",
            type: "text",
            text: "Address Map Url",
            required: true
        },
        {
            name: "otherlinktitle",
            type: "text",
            text: "Other Link Title",
            required: false
        },
        {
            name: "otherlinkurl",
            type: "url",
            text: "Other Link Url",
            required: false
        },
        {
            name: "insta",
            type: "text",
            text: "Instagram Profile Name",
            required: true
        },
        {
            name: "instalink",
            type: "url",
            text: "Instagram Url",
            required: true
        }
    ]

    const handleProfileEditClick = () => {
        setOpenProfile(true)
    }

    const handleProfileClose = () => {
        fetchProfile()
        setOpenProfile(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleProfileInputChange = (event) => {
        const { name, value } = event.target;
        setProfiledata(prev => ({ ...prev, [name]: value }));
    }

    const handleCheckChange = (event) => {
        const { name, checked } = event.target;
        setData((prev) => ({
            ...prev,
            size: {
                ...prev.size,
                [name]: checked
            }
        }));
    }

    const editlength = data.image.length

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        if (edit && editlength + files.length > 7) {
            alert("Cannot have images more than 7")
        } else if (files.length > 7) {
            alert("Cannot upload more than 7 images");
        } else if (files.every(file => file.size < 10485760 || file.size === undefined)) {
            setPrevurl(prev => prev.concat(files.map(f => window.URL.createObjectURL(f))));
            setFileChange(event.target.files);
        } else {
            alert('Images size cannot be larger than 10 MB');
        }
    }

    const handleImageCancle = () => {
        setOpen(false)
        setData((prevData) => ({
            ...prevData,
            image: prevData.image.filter(image => image.id !== cancleimageid)
        }));
        setPrevurl([...prevurl.filter((item, index) => index !== cancleimageid)])
        setFileChange([...filechange].filter((item, index) => index !== cancleimageid))
        setCancleimage(false)
        handleDeleteImage(cancleimageid)
    }

    const handlecancle = (i) => {
        setOpen(true)
        setCancleimageid(i)
        setCancleimage(true)
    }

    const handleImageCancleClose = () => {
        setOpen(false)
        setCancleimage(false)
    }

    const postlength = post.length

    const handleopenform = () => {
        if (postlength < 20) {
            setOpenForm(true)
        } else {
            alert("Product Limit Cannot exceed more than 20")
        }
    };

    const handleEdit = (data) => {
        const sizes = fsize.find((item) => item.id === data.id);
        const images = Images.filter((items) => items.ImageId === data.id)

        setData({
            name: data.name,
            type: data.type,
            code: data.code,
            price: data.price,
            description: data.description,
            size: {
                XS: sizes.extrasmall,
                S: sizes.small,
                M: sizes.meduim,
                L: sizes.large,
                XL: sizes.extralarge,
                XXL: sizes.extraextralarge
            },
            image: images
        })
        setEdit(true)
        handleModelClick("product")
        setEditId(data.id)
    }

    const handleClick = () => {
        if (data.size.XS === false && data.size.S === false && data.size.M === false && data.size.L === false && data.size.XL === false && data.size.XXL === false) {
            setSizeerror(true)
        } else if (!edit && prevurl.length === 0) {
            setError(true)
            setSizeerror(false)
        } else {
            setError(false)
            setSizeerror(false)
            setImagefiles(filechange);
        }
    }

    const clearState = () => {
        setData({
            name: "",
            type: "",
            size: {
                XS: false,
                S: false,
                M: false,
                L: false,
                XL: false,
                XXL: false
            },
            image: [],
            price: "",
            code: "",
            description: "",
        })
    }

    const fetchData = async () => {
        let response = await fetch('/api/posts');
        const data = await response.json();
        setPost(data?.data)
    }

    const fetchSize = async () => {
        let response = await fetch('/api/sizes');
        const data = await response.json();
        setFsize(data?.data)
    }

    const fetchProfile = async () => {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data?.data)
    }

    const createPost = async (payload) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            const formData = new FormData();
            {
                imagefiles.length > 0 && Array.from(imagefiles).map((f, i) => {
                    formData.append('id', data?.data?.id)
                    formData.append('image', f);
                    formData.append('folder', data?.data?.id)
                })
            }

            if (imagefiles.length > 0) {
                const response = await fetch('/api/images', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Image uploaded successfully:', data);
                        setImagefiles([])
                        setFileChange([])
                        fetchImages()
                    } else {
                        console.error('Error uploading image:', data.error);
                    }
                }
            }

            alert("Product Added Successfully")
            clearState()
            fetchData()
        } catch (error) {
            console.error('Error creating post:', error);
            alert("Error while Adding Product")
        }
    }

    const createSize = async (payload) => {
        try {
            const response = await fetch('/api/sizes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            clearState()
            fetchData()
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const fetchImages = async () => {
        const response = await fetch('/api/images');
        const data = await response.json();
        setImages(data?.data);
    };

    const UpdateProfile = async (payload) => {
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            handleProfileClose()
            const data = await response.json();
            fetchProfile()
            alert("Profile Updated Successfully")
        } catch (error) {
            console.error('Error update post:', error);
            alert("Error While Updating Profile")
        }
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        const payload = {
            "Phone": profiledata.phone,
            "Tel": profiledata.tel,
            "Address": profiledata.address,
            "Gmap": profiledata.gmap,
            "iframe": profiledata.iframe,
            "Insta": profiledata.insta,
            "Instalink": profiledata.instalink,
            "name": profiledata.name,
            "year": profiledata.year,
            "nature": profiledata.nature,
            "Desc": profiledata.description,
            "otherlink": profiledata.otherlinkurl,
            "linktitle": profiledata.otherlinktitle,
            "Broadcastlink": profiledata.Broadcastlink
        }
        UpdateProfile({ "id": 1, ...payload })
    }

    const UpdatePost = async (payload) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            clearState()
            setEditId()
            fetchData()
            fetchImages()
            fetchSize()
            alert("Product Updated Successfully")
        } catch (error) {
            console.error('Error update post:', error);
        }
    }

    const UpdateSize = async (payload) => {
        try {
            const response = await fetch('/api/sizes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            clearState()
            setEditId()
            fetchData()
        } catch (error) {
            console.error('Error update post:', error);
            alert("Error Updating size")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!error) {
            const payload = {
                "name": data.name,
                "type": data.type,
                "price": data.price,
                "code": data.code,
                "description": data.description
            }
            const sizepayload = {
                "extrasmall": data.size.XS,
                "small": data.size.S,
                "meduim": data.size.M,
                "large": data.size.L,
                "extralarge": data.size.XL,
                "extraextralarge": data.size.XXL
            }
            if (!error && edit === false) {
                handlecloseform()
                createSize(sizepayload)
                fetchSize()
                createPost(payload)
                fetchData()
                fetchImages()
            }
            else {
                const formData = new FormData();
                {
                    imagefiles.length > 0 && Array.from(imagefiles).map((f, i) => {
                        formData.append('id', editId)
                        formData.append('image', f);
                        formData.append('folder', editId)
                    })
                }
                if (imagefiles.length > 0) {
                    const response = await fetch('/api/images', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (response.ok) {
                            console.log('Image uploaded successfully:', data);
                            setImagefiles([])
                            setFileChange([])
                            setEditId()
                            setEdit(false)
                            fetchImages()
                        } else {
                            console.error('Error uploading image:', data.error);
                        }
                    }
                }
                UpdatePost({ "id": editId, ...payload })
                UpdateSize({ "id": editId, ...sizepayload })
                fetchData()
                fetchSize()
                fetchImages()
                handlecloseform()
            }
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": id }),
            });

            const data = await response.json();
            handleDeleteSize(id)
            fetchData()
            fetchSize()
            fetchImages()
        } catch (error) {
            console.error('Error Delete post:', error);
        }
    }

    const handleDeleteSize = async (id) => {
        try {
            const response = await fetch('/api/sizes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": id }),
            });

            const data = await response.json();
            if (data?.message === "Size deleted successfully") {
                alert("Product Deleted Successfully")
            }
        } catch (error) {
            console.error('Error Delete post:', error);
        }
    }

    // this method called for deleting perticular image in edit mode

    const handleDeleteImage = async (id) => {
        try {
            const response = await fetch('/api/particularimage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            let res = await response.json();
            if (res?.status === 200) {
                fetchImages()
                setCancleimageid()
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // this method is called when delete product is called as it will delete all the images related to that products

    const handleDeleteImages = async (data) => {
        const filterimagess = Images.filter((items) => data.id === items.ImageId)
        const idd = filterimagess.map((items) => items.id)

        try {
            const response = await fetch('/api/images', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: idd }),
            });

            let res = await response.json();
            handleDeleteProduct(data.id)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteClick = (data) => {
        setOpen(true)
        setDeleteProduct(true)
        setDeleteData(data)
    }

    const handleDelete = () => {
        handleDeleteImages(deleteData)
        setOpen(false)
    }

    const handleModelClick = (type) => {
        if (type === "product") {
            handleopenform()
        } else if (type === "profile") {
            handleProfileEditClick()
        }
        setModelType(type)
    }

    return (
        <Box className="!bg-white !pt-[10px] !min-h-[100vh] ">
            <FirstSection
                card={"rainafashion"}
                welcometitle={"welcome-title"}
                username={useremail}
                handleOpen={handleOpen}
                addclick={handleModelClick}
                editclick={handleModelClick}
                color={"var(--purpledark)"}
            />

            <CustomTable
                headerData={newHeader}
                color={"var(--purpledark)"}
                tablename={"raina"}
                bodyData={post}
                imageData={Images}
                sizeData={fsize}
                handleEdit={handleEdit}
                handleDeleteClick={handleDeleteClick}
            />

            <LogoutModel
                open={open}
                close={handleClose}
                yes={deleteProduct ? handleDelete : cancleimage ? handleImageCancle : handlelogout}
                no={deleteProduct ? handledeleteclose : cancleimage ? handleImageCancleClose : handleClose}
                title={deleteProduct ? "Delete" : cancleimage ? "Remove Image" : "Logout"}
                desc={deleteProduct ? "delete this product" : cancleimage ? "remove this image this method cannot be undo" : "logout"}
                color={"var(--purpledark)"}
            />

            <CommonAdminModel
                open={modelType === "product" ? openform : openprofile}
                close={modelType === "product" ? handlecloseform : handleProfileClose}
                submit={modelType === "product" ? handleSubmit : handleProfileUpdate}
                input={modelType === "product" ? inputs : profileinputs}
                onchange={modelType === "product" ? handleInputChange : handleProfileInputChange}
                data={modelType === "product" ? data : profiledata}
                error={modelType === "product" && error}
                inputsize={modelType === "product" && inputsize}
                oncheck={modelType === "product" && handleCheckChange}
                onclick={modelType === "product" ? () => setPrevurl([]) : undefined}
                filechange={modelType === "product" && handleFileChange}
                prevurl={modelType === "product" && prevurl}
                click={modelType === "product" && handleClick}
                handlecancle={modelType === "product" && handlecancle}
                edit={modelType === "product" && edit}
                sizeerror={modelType === "product" && sizeerror}
                color={"var(--purpledark)"}
                buttontext={modelType === "product" && edit ? "Update Catelog" : modelType === "product" ? "Add Catelog" : "Edit"}
                model={modelType === "product" ? "raina" : "profile"}
            />
        </Box>
    )
}

export default AdminDashboard