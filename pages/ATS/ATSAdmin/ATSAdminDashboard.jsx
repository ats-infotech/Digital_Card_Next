'use client'
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import FirstSection from "@/common/admincomponents/FirstSection"
import { CustomTable } from "@/common/admincomponents/TableSection"
import { CommonAdminModel, LogoutModel, } from "../modals/centralizedmodel"

const ATSAdminPage = ({ auth }) => {

    const [username, setUsername] = useState()
    const [profile, setProfile] = useState([])
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const handleProfileClose = () => {
        setOpenProfile(false)
        fetchProfile()
    }
    const [profiledata, setProfiledata] = useState({
        facebook: "",
        instagram: "",
        linkdin: "",
        twitter: "",
        mail: "",
        number: "",
        website: "",
        location: "",
        gmap: "",
        iframe: "",
        project: Number,
        client: Number,
        countries: Number
    })
    const [openprofile, setOpenProfile] = useState(false)
    const [services, setServices] = useState([])
    const [data, setData] = useState({
        title: "",
        description: "",
        image: []
    })
    const [openservice, setOpenservice] = useState(false)
    const handleCloseService = () => {
        setOpenservice(false)
        setPrevurl([])
        setData({
            title: "",
            description: "",
            image: []
        })
        setEdit(false)
        setEditId()
    }
    const [prevurl, setPrevurl] = useState([])
    const [imagefiles, setImagefiles] = useState([])
    const [deleteService, setDeleteService] = useState(false)
    const [deleteid, setDeleteid] = useState()
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState()
    const [serviceinfo, setServiceinfo] = useState([])
    const [servicedesc, setServicedesc] = useState([])
    const [particulardescId, setParticulardescId] = useState()
    const [particularsubdescId, setParticularsubdescId] = useState()
    const [subdesc, setSubdesc] = useState(false)
    const [ssubdesc, setSsubdesc] = useState(false)
    const [title, setTitle] = useState()
    const [subtitle, setSubtitle] = useState()
    const [information, setInformation] = useState({
        information: ""
    })
    const [opendesc, setOpendesc] = useState(false)
    const [deletedesc, setDeletedesc] = useState(false)
    const [deletedescId, setDeletedescId] = useState()
    const handleOpenDesc = () => setOpendesc(true)
    const [modelType, setModelType] = useState()
    let servicelength = services.length

    const profileinputs = [
        {
            name: 'facebook',
            type: 'url',
            text: 'Facebook Url',
            required: true
        },
        {
            name: 'instagram',
            type: 'url',
            text: 'Instagram Url',
            required: true
        },
        {
            name: 'linkdin',
            type: 'url',
            text: 'Linkdin Url',
            required: true
        },
        {
            name: 'twitter',
            type: 'url',
            text: 'Twitter Url',
            required: true
        },
        {
            name: 'mail',
            type: 'email',
            text: 'Mail',
            required: true
        },
        {
            name: 'number',
            type: 'text',
            text: 'Contact Number',
            required: true
        },
        {
            name: 'location',
            type: 'text',
            text: 'Location',
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
        },
        {
            name: 'project',
            type: 'number',
            text: 'Projects',
            required: true
        },
        {
            name: 'client',
            type: 'number',
            text: 'Clients',
            required: true
        },
        {
            name: 'countries',
            type: 'number',
            text: 'Countries',
            required: true
        }
    ]

    const inputs = [
        {
            name: 'title',
            type: 'text',
            text: "Title"
        },
        {
            name: 'description',
            type: 'text',
            text: 'Description'
        }
    ]

    const descrptioninput = [
        {
            name: 'information',
            type: 'text',
            text: ssubdesc ? 'Description' : 'Subtitle'
        }
    ]

    const newHeader = [
        {
            title: 'Sr.no',
            keys: 'index',
        },
        {
            title: 'Title',
            keys: 'title',
        },
        {
            title: 'Description',
            keys: 'description',
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

    const newSubHeader = [
        {
            title: 'Sr.no',
            keys: 'index',
        },
        {
            title: ssubdesc ? 'Description' : 'Subtitle',
            keys: ssubdesc ? 'description' : 'title',
        },
        {
            title: 'Action',
            keys: 'action',
        },
    ]

    useEffect(() => {
        if (profile && profile.length > 0) {
            const filterProfile = profile.find(p => p.id === 1);
            if (filterProfile) {
                setProfiledata({
                    facebook: filterProfile?.facebook,
                    instagram: filterProfile?.instagram,
                    linkdin: filterProfile?.linkdin,
                    twitter: filterProfile?.twitter,
                    mail: filterProfile?.mail,
                    number: filterProfile?.number,
                    website: filterProfile?.website,
                    location: filterProfile?.Location,
                    gmap: filterProfile?.gmap,
                    iframe: filterProfile?.iframe,
                    project: filterProfile?.Projects,
                    client: filterProfile?.Clients,
                    countries: filterProfile?.Countries
                })
            }
        }
    }, [profile]);

    const fetchProfile = async () => {
        const response = await fetch('/api/atsprofile');
        const data = await response.json();
        setProfile(data?.data)
    }

    const fetchService = async () => {
        const response = await fetch('/api/atsservice');
        const data = await response.json();
        setServices(data?.data)
    }

    const fetchinfo = async () => {
        const response = await fetch('/api/atsserviceinfo');
        const data = await response.json();
        setServiceinfo(data?.data)
    }
    const fetchdec = async () => {
        const response = await fetch('/api/atsservicedescription');
        const data = await response.json();
        setServicedesc(data?.data)
    }

    const handleAddClick = () => {
        if (servicelength < 20) {
            setOpenservice(true)
        } else {
            alert("Service Limit Cannot exceed more than 20")
        }
    }

    useEffect(() => {
        fetchProfile()
        fetchService()
        fetchinfo()
        fetchdec()
    }, [])

    useEffect(() => {
        const name = sessionStorage.getItem('admin')
        setUsername(name)
    }, [])

    const handlelogout = () => {
        setOpen(false)
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('id')
        auth(false)
        window.location.href = '/admin';
    }

    const handleProfileInputChange = (event) => {
        const { name, value } = event.target;
        setProfiledata(prev => ({ ...prev, [name]: value }));
    }

    const UpdateProfile = async (payload) => {
        try {
            const response = await fetch('/api/atsprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.message === "Profile Updated successfully") {
                alert("Profile Updated Successfully")
            }
            fetchProfile()
        } catch (error) {
            console.error('Error update ATS Service Information:', error);
            alert("Error While Updating Profile")
        }
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        const payload = {
            facebook: profiledata.facebook,
            instagram: profiledata.instagram,
            linkdin: profiledata.linkdin,
            twitter: profiledata.twitter,
            mail: profiledata.mail,
            number: profiledata.number,
            website: profiledata.website,
            Location: profiledata.location,
            gmap: profiledata.gmap,
            iframe: profiledata.iframe,
            Projects: parseInt(profiledata.project),
            Clients: parseInt(profiledata.client),
            Countries: parseInt(profiledata.countries)
        }
        handleProfileClose(true)
        UpdateProfile({ "id": 1, ...payload })
    }

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPrevurl(prev => prev.concat(files.map(f => window.URL.createObjectURL(f))));
        setImagefiles(event.target.files)
    }

    useEffect(() => {
        return () => {
            prevurl.forEach((url) => window.URL.revokeObjectURL(url));
        };
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleDescInputChange = (event) => {
        const { name, value } = event.target;
        setInformation(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!data.title || !data.description || imagefiles.length === 0) {
            console.error("Title, description, and images are required.");
            return;
        }
        formData.append('title', data.title);
        formData.append('description', data.description);
        Array.from(imagefiles).forEach((file) => {
            formData.append('image', file);
        });
        try {
            const response = await fetch('/api/atsservice', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Image uploaded successfully:', result);
                setImagefiles(null);
                alert("Service Added Successfully")
                fetchService()
                handleCloseService()
                setData({
                    title: "",
                    description: "",
                    image: []
                })
            } else {
                console.error('Error Adding Service:', result.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleDeleteService = async () => {
        const filterinfo = serviceinfo.filter((items) => deleteid === items.ServiceId);
        const infoid = filterinfo.map((items) => items.id);
        const filterdescs = servicedesc.filter((items) => infoid.includes(items.SubServiceId));
        const descid = filterdescs.map((items) => items.id);

        try {
            const servicedescresponse = await fetch('/api/atsallservicedescription', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: descid }),
            });

            const servicedescdata = await servicedescresponse.json();

            const serviceinforesponse = await fetch('/api/atsallserviceinfo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: infoid }),
            });

            const serviceinfodata = await serviceinforesponse.json();

            const serviceresponse = await fetch('/api/atsservice', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": deleteid }),
            });

            const data = await serviceresponse.json();
            if (data.message === "Service and associated image deleted successfully") {
                alert("Service and all Subtitles and Descriptions related to it Deleted Successfully")
            }

            fetchService()
            fetchinfo()
            fetchdec()
            handleDeleteclose()
        } catch (error) {
            console.error('Error Delete service:', error);
        }
    }

    const handleDeleteClick = (id) => {
        if (ssubdesc || subdesc) {
            setOpen(true)
            setDeletedesc(true)
            setDeletedescId(id)
        } else {
            setOpen(true)
            setDeleteService(true)
            setDeleteid(id)
        }
    }

    const handleDeleteclose = () => {
        if (ssubdesc || subdesc) {
            setOpen(false)
            setDeletedesc(false)
            setDeletedescId()
        } else {
            setOpen(false)
            setDeleteService(false)
            setDeleteid()
        }
    }

    const handleEdit = (data) => {
        setEdit(true)
        setEditId(data.id)
        if (ssubdesc) {
            setInformation({
                information: data.description
            })
        } else if (subdesc) {
            setInformation({
                information: data.title
            })
        } else {
            setData({
                title: data.title,
                description: data.description,
                image: data.image
            })
        }
        handleModelClick("service")
    }

    const UpdateService = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('id', editId)
        Array.from(imagefiles).forEach((file) => {
            formData.append('image', file);
        });
        try {
            const response = await fetch('/api/atsservice', {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            if (result.message === "Item updated successfully") {
                alert("Service Updated Successfully")
            }
            fetchService()
            handleCloseService()
        } catch (error) {
            console.log('Upload failed: ' + error.message);
            alert("Error while Updating Image")
        }
    };

    const handledesc = (data) => {
        setParticulardescId(data.id)
        setTitle(data.title)
        setSubdesc(true)
    }

    const handleBack = () => {
        setParticulardescId()
        setSubdesc(false)
        setTitle()
    }

    const handlesubdesc = (data) => {
        setParticularsubdescId(data.id)
        setSubtitle(data.title)
        setSsubdesc(true)
    }

    const handleSubBack = () => {
        setSsubdesc(false)
        setParticularsubdescId()
        setSubtitle()
    }

    const handleDescClose = () => {
        setOpendesc(false)
        setEdit()
        setEditId()
        setInformation({
            information: ""
        })
    }

    const descriptionpayload = {
        "description": information.information,
        "SubServiceId": particularsubdescId
    }
    const subtitlepayload = {
        "title": information.information,
        "ServiceId": particulardescId
    }

    const createSubDesc = async () => {
        try {
            if (ssubdesc) {
                const response = await fetch('/api/atsservicedescription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(descriptionpayload),
                });
                const data = await response.json();
                if (data.message === "Create ats service description SuccessFully") {
                    alert("Description Added Successfully")
                }
            } else if (subdesc) {
                const response = await fetch('/api/atsserviceinfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subtitlepayload),
                });
                const data = await response.json();
                if (data.message === "Create ats service Subtitle SuccessFully") {
                    alert("Subtitle Added Successfully")
                }
            }
            fetchdec()
            fetchinfo()
            handleDescClose()
        } catch (error) {
            console.error('Error creating ATS Service Information:', error);
            alert("Error while Adding ATS Service Information")
        }
    }

    const UpdateSubDesc = async (payload) => {

        try {
            if (ssubdesc) {
                const response = await fetch('/api/atsservicedescription', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                if (data.message === "ats service description Updated successfully") {
                    alert("Description Updated Successfully")
                }
            } else if (subdesc) {
                const response = await fetch('/api/atsserviceinfo', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                if (data.message === "ats service Subtitle Updated successfully") {
                    alert("Subtitle Updated Successfully")
                }
            }
            fetchdec()
            fetchinfo()
            handleDescClose()
        } catch (error) {
            console.error('Error update ATS Service Information:', error);
        }
    }

    const handleDescSubmit = (e) => {
        e.preventDefault()
        createSubDesc()
    }

    const handleDescUpdate = (e) => {
        e.preventDefault()
        if (ssubdesc) {
            UpdateSubDesc({ "id": editId, ...descriptionpayload })
        } else if (subdesc) {
            UpdateSubDesc({ "id": editId, ...subtitlepayload })
        }
    }

    const handleDeleteDesc = async () => {
        try {
            if (ssubdesc) {
                const response = await fetch('/api/atsservicedescription', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "id": deletedescId }),
                });
                const data = await response.json();
                if (data.message === "ats service description deleted successfully") {
                    alert("Description Deleted Successfully")
                }

            } else if (subdesc) {
                const filterdescs = servicedesc.filter((items) => deletedescId === items.SubServiceId)
                const idd = filterdescs.map((items) => items.id)
                try {
                    const response = await fetch('/api/atsallservicedescription', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: idd }),
                    });
                    const responses = await fetch('/api/atsserviceinfo', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "id": deletedescId }),
                    });

                    const data = await responses.json();
                    if (data.message === "ats service Subtitle deleted successfully") {
                        alert("Subtitle and related descriptions deleted Successfully")
                    }
                    fetchinfo()
                    fetchdec()
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            handleDeleteclose()
            fetchinfo()
            fetchdec()
        } catch (error) {
            console.error('Error Delete ATS Service Information:', error);
        }
    }

    const handleModelClick = (type) => {
        if ((ssubdesc || subdesc) && type === "service") {
            handleOpenDesc()
        } else if (type === "service") {
            handleAddClick()
        } else if (type === "profile") {
            setOpenProfile(true)
        }
        setModelType(type)
    }

    const filteredserviceinfo = serviceinfo.filter((items) => items.ServiceId === particulardescId)
    const filteredservicedesc = servicedesc.filter((items) => items.SubServiceId === particularsubdescId)

    return (
        <Box className="bg-white !min-h-[100vh] !pt-[10px]">
            <FirstSection
                card={"ats"}
                username={username}
                handleOpen={handleOpen}
                addclick={handleModelClick}
                editclick={handleModelClick}
                desc={subdesc}
                subdesc={ssubdesc}
                color={"var(--orange)"}
            />

            <CustomTable
                headerData={subdesc ? newSubHeader : newHeader}
                color={"var(--orange)"}
                bodyData={ssubdesc ? filteredservicedesc : subdesc ? filteredserviceinfo : services}
                handleEdit={handleEdit}
                handleDeleteClick={handleDeleteClick}
                handleRediractOnclick={handledesc}
                handleSubRedirect={handlesubdesc}
                subdesc={subdesc} ssubdesc={ssubdesc}
                tablename={"ats"} handleback={handleBack}
                handlesubback={handleSubBack}
                title={title}
                subtitle={subtitle}
            />

            <LogoutModel
                color={"var(--orange)"}
                open={open}
                close={deleteService || deletedesc ? handleDeleteclose : handleClose}
                yes={deleteService ? handleDeleteService : deletedesc ? handleDeleteDesc : handlelogout}
                no={deleteService || deletedesc ? handleDeleteclose : handleClose}
                title={deleteService || deletedesc ? "Delete" : "Logout"}
                desc={deleteService ? "Delete This Service" : deletedesc && ssubdesc ? "Delete This Description" : deletedesc && subdesc ? "Delete This Subtitle" : "logout"}
            />

            <CommonAdminModel
                open={modelType === "service" && (subdesc || ssubdesc) ? opendesc : modelType === "service" ? openservice : openprofile}
                close={modelType === "service" && (subdesc || ssubdesc) ? handleDescClose : modelType === "service" ? handleCloseService : handleProfileClose}
                input={modelType === "service" && (subdesc || ssubdesc) ? descrptioninput : modelType === "service" ? inputs : profileinputs}
                onchange={modelType === "service" && (subdesc || ssubdesc) ? handleDescInputChange : modelType === "service" ? handleInputChange : handleProfileInputChange}
                submit={modelType === "service" && (subdesc || ssubdesc) && edit ? handleDescUpdate :
                    modelType === "service" && (subdesc || ssubdesc) && !edit ? handleDescSubmit :
                        modelType === "service" && edit ? UpdateService :
                            modelType === "service" && !edit ? handleSubmit :
                                handleProfileUpdate}
                data={modelType === "service" && (subdesc || ssubdesc) ? information : modelType === "service" ? data : profiledata}
                color={"var(--orange)"}
                model={modelType === "service" && (subdesc || ssubdesc) ? "description" : modelType === "service" ? "service" : "profile"}
                edit={modelType === "service" && edit}
                subdesc={modelType === "service" && (subdesc || ssubdesc) && ssubdesc}
                title={modelType === "service" && (subdesc || ssubdesc) && title}
                subtitle={modelType === "service" && (subdesc || ssubdesc) && subtitle}
                prevurl={modelType === "service" && !subdesc && !ssubdesc && prevurl}
                filechange={modelType === "service" && !subdesc && !ssubdesc && handleFileChange}
                fileclick={modelType === "service" && !subdesc && !ssubdesc ? () => setPrevurl([]) : undefined}
                buttontext={
                    edit && ssubdesc && modelType === "service" ? "Edit Description" :
                        !edit && ssubdesc && modelType === "service" ? "Add Description" :
                            edit && subdesc && modelType === "service" ? "Edit Subtitle" :
                                !edit && subdesc && modelType === "service" ? "Add Subtitle" :
                                    edit && modelType === "service" && !subdesc && !ssubdesc ? "Update Service" :
                                        !edit && modelType === "service" && !subdesc && !ssubdesc ? "Add Service" :
                                            "Edit"}
            />
        </Box>
    )
}

export default ATSAdminPage