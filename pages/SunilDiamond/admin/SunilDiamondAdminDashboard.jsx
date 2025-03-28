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
        title: 'Name',
        keys: 'name',
    },
    {
        title: 'Price',
        keys: 'price',
    },
    {
        title: 'Image',
        keys: 'image',
    },
    {
        title: 'Action',
        keys: 'action',
    },
]


const SunilDiamondAdminDashboard = ({ auth }) => {

    const [username, setUsername] = useState()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [profile, setProfile] = useState([])
    const [profiledata, setProfiledata] = useState({
        name: "",
        year: "",
        number: "",
        gmap: "",
        iframe: "",
        title: "",
        subtitle: "",
        fromday: "",
        today: "",
        fromtime: "",
        totime: "",
        email: "",
        Broadcastlink: ""
    })
    const [openprofile, setOpenProfile] = useState(false)
    const handleProfileClose = () => {
        setOpenProfile(false)
        fetchProfile()
    }
    const [products, setProducts] = useState([])
    const [edit, setEdit] = useState(false)
    const [openproduct, setOpenproduct] = useState(false)
    const [prevurl, setPrevurl] = useState([])
    const [data, setData] = useState({
        name: "",
        price: 0,
        image: []
    })
    const handleCloseProduct = () => {
        setOpenproduct(false)
        setPrevurl([])
        setData({
            name: "",
            price: 0,
            image: []
        })
        setEdit(false)
        setEditId()
    }
    const [imagefiles, setImagefiles] = useState([])
    const [deleteproduct, setDeleteProduct] = useState(false)
    const [deleteid, setDeleteid] = useState()
    let productlength = products.length
    const [editId, setEditId] = useState()
    const [modelType, setModelType] = useState()

    const profileinputs = [
        {
            name: 'name',
            type: 'text',
            text: 'Business Name',
            required: true
        },
        {
            name: 'year',
            type: 'text',
            text: 'Establish Year',
            required: true
        },
        {
            name: 'number',
            type: 'text',
            text: 'Contact Number',
            required: true
        },
        {
            name: 'Broadcastlink',
            type: 'url',
            text: 'Whatsapp Channel Url',
            required: false
        },
        {
            name: 'email',
            type: 'email',
            text: 'Email id',
            required: true
        },
        {
            name: 'subtitle',
            type: 'text',
            text: 'Sub Title',
            required: true
        },
        {
            name: 'title',
            text: 'text',
            text: 'Main Title',
            required: true
        },
        {
            name: 'fromday',
            type: 'text',
            text: 'Working Day From',
            required: true
        },
        {
            name: 'today',
            type: 'text',
            text: 'Working Day To',
            required: true
        },
        {
            name: 'fromtime',
            type: 'time',
            text: 'Working Time From',
            required: true
        },
        {
            name: 'totime',
            type: 'time',
            text: 'Working Time To',
            required: true
        },
        {
            name: 'gmap',
            type: 'url',
            text: 'Google Map Url',
            required: true
        },
        {
            name: 'iframe',
            type: 'url',
            text: 'Address Map Url',
            required: true
        }
    ]

    const inputs = [
        {
            name: 'name',
            type: 'text',
            text: 'Product Name'
        },
        {
            name: 'price',
            type: 'number',
            text: 'Price'
        }
    ]

    useEffect(() => {
        if (profile && profile.length > 0) {
            const filterProfile = profile.find(p => p.id === 1);
            if (filterProfile) {
                setProfiledata({
                    name: filterProfile?.name,
                    year: filterProfile?.year,
                    number: filterProfile?.number,
                    gmap: filterProfile?.gmap,
                    iframe: filterProfile?.iframe,
                    title: filterProfile?.title,
                    subtitle: filterProfile?.subtitle,
                    fromday: filterProfile?.fromday,
                    today: filterProfile?.today,
                    fromtime: filterProfile?.fromtime,
                    totime: filterProfile?.totime,
                    email: filterProfile?.email,
                    Broadcastlink: filterProfile?.Broadcastlink
                })
            }
        }
    }, [profile]);

    const fetchProfile = async () => {
        const response = await fetch('/api/sdprofile');
        const data = await response.json();
        setProfile(data?.data)
    }

    const fetchProduct = async () => {
        const response = await fetch('/api/sdproduct');
        const data = await response.json();
        setProducts(data?.data)
    }

    useEffect(() => {
        fetchProfile()
        fetchProduct()
    }, [])

    useEffect(() => {
        const name = sessionStorage.getItem('admin')
        setUsername(name)
    }, [])

    const handleAddClick = () => {
        if (productlength < 20) {
            setOpenproduct(true)
        } else {
            alert("Product Limit Cannot exceed more than 20")
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch('/api/sdproduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": deleteid }),
            });

            const data = await response.json();
            fetchProduct()
            handleDeleteclose()
            alert("Product Deleted Successfully")
        } catch (error) {
            console.error('Error Delete service:', error);
        }
    }

    const handleDeleteClick = (id) => {
        setOpen(true)
        setDeleteProduct(true)
        setDeleteid(id)
    }

    const handleDeleteclose = () => {
        setOpen(false)
        setDeleteProduct(false)
        setDeleteid()
    }

    const handleProfileInputChange = (event) => {
        const { name, value } = event.target;
        setProfiledata(prev => ({ ...prev, [name]: value }));
    }

    const UpdateProfile = async (payload) => {
        try {
            const response = await fetch('/api/sdprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

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
            name: profiledata.name,
            year: profiledata.year,
            number: profiledata.number,
            gmap: profiledata.gmap,
            iframe: profiledata.iframe,
            title: profiledata.title,
            subtitle: profiledata.subtitle,
            fromday: profiledata.fromday,
            today: profiledata.today,
            fromtime: profiledata.fromtime,
            totime: profiledata.totime,
            email: profiledata.email,
            Broadcastlink: profiledata.Broadcastlink
        }
        handleProfileClose(true)
        UpdateProfile({ "id": 1, ...payload })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPrevurl(prev => prev.concat(files.map(f => window.URL.createObjectURL(f))));
        setImagefiles(event.target.files)
    }

    const handleEdit = (data) => {
        setEdit(true)
        setData({
            name: data.name,
            price: data.price,
            image: data.image
        })
        handleModelClick("product")
        setEditId(data.id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!data.name || !data.price || imagefiles.length === 0) {
            console.error("name, , and images are required.");
            return;
        }
        formData.append('name', data.name);
        formData.append('price', data.price.toString());
        Array.from(imagefiles).forEach((file) => {
            formData.append('image', file);
        });

        try {
            const response = await fetch('/api/sdproduct', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Image uploaded successfully:', result);
                setImagefiles(null);
                alert("Product Added Successfully")
                fetchProduct()
                handleCloseProduct()
                setData({
                    name: "",
                    price: "",
                    image: []
                })
            } else {
                console.error('Error Adding Service:', result.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const UpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('id', editId)
        if (imagefiles) {
            Array.from(imagefiles).forEach((file) => {
                formData.append('image', file);
            });
        }
        try {
            const response = await fetch('/api/sdproduct', {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            fetchProduct()
            handleCloseProduct()
            alert("Product Updated Successfully")
        } catch (error) {
            console.log('Upload failed: ' + error.message);
            alert("Error while Updating Image")
        }
    };

    const handlelogout = () => {
        setOpen(false)
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('id')
        auth(false)
        window.location.href = '/admin';
    }

    const handleModelClick = (type) => {
        if (type === "product") {
            handleAddClick()
        } else if ("profile") {
            setOpenProfile(true)
        }
        setModelType(type)
    }

    return (
        <Box className="bg-white !min-h-[100vh] !pt-[10px]">
            <FirstSection
                username={username}
                editclick={handleModelClick}
                addclick={handleModelClick}
                handleOpen={handleOpen}
                color={"var(--yellowmild)"}
            />

            <CustomTable
                headerData={newHeader}
                color={"var(--yellowmild)"}
                bodyData={products}
                handleEdit={handleEdit}
                handleDeleteClick={handleDeleteClick}
            />

            <LogoutModel
                open={open}
                close={deleteproduct ? handleDeleteclose : handleClose}
                yes={deleteproduct ? handleDeleteProduct : handlelogout}
                no={deleteproduct ? handleDeleteclose : handleClose}
                title={deleteproduct ? "Delete" : "Logout"}
                desc={deleteproduct ? "Delete This Product" : "logout"}
                color={"var(--yellowmild)"}
            />

            <CommonAdminModel
                open={modelType === "product" ? openproduct : openprofile}
                close={modelType === "product" ? handleCloseProduct : handleProfileClose}
                input={modelType === "product" ? inputs : profileinputs}
                onchange={modelType === "product" ? handleInputChange : handleProfileInputChange}
                data={modelType === "product" ? data : profiledata}
                submit={modelType === "product" && edit ? UpdateProduct : modelType === "product" && !edit ? handleSubmit : handleProfileUpdate}
                edit={modelType === "product" && edit}
                model={modelType === "product" ? "service" : "profile"}
                filechange={modelType === "product" && handleFileChange}
                fileclick={modelType === "product" ? () => setPrevurl([]) : undefined}
                prevurl={prevurl}
                buttontext={modelType === "product" && edit ? "Update Product" : modelType === "product" && !edit ? "Add Product" : "Edit"}
                color={"var(--yellowmild)"}
            />
        </Box>
    )
}

export default SunilDiamondAdminDashboard