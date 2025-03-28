/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0 20px 0px rgba(0, 0, 0, 0.26)',
        'default': '0 0 9px 0px #00000045'
      },
      colors: {
        orange: '#F67807',
        bluedark: '#1C1563',
        darkbblue: "#3B3663",
        lightColor: '#A0A0A0',
        grey: '#B9B9B9',
        darkgrey: "#A8A8A8",
        greydark: '#949494',
        blackgrey: "#535353",
        greyblack: "#969696",
        lightblack: "#777777",
        purpledark: '#96307A',
        lightgrey: '#727272',
        yellowmild: '#B08550',
        mildgrey: '#9B9B9B',
        greyjoin: "#9E9E9E",
        greypro: "#F5F5f5",
        greysize: "#A4A4A4",
        detailgrey: "#686868",
        blacklight: "#1D1D1D",
        imagegrey: '#8A8A8A',
        darkbrown: '#9E5C09',
        bluebg: '#151C4A',
        blue: '#122245',
        descgrey: '#747474',
        footergrey: "#C0C0C0"
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        poorstory: '"Poor Story", system-ui'
      },
      animation: {
        fade: 'fadeIn 1.5s ease-in-out',
        fadeup: 'fadeoutup 1.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        fadeoutup: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translate3d(0, -100%, 0)",
          },
        },
      },
      fontSize: {
        // normal fonts
        companytitle: "23px",
        subtitle: "30px",
        desc: "12px",
        roundedicontext: "15px",
        clickmap: "13px",
        rainaexplorebtn: "12px",
        joinusbtn: "25px",
        joinusinfo: "12px",
        formsubmitbtn: "15px",
        rainaborderbtn: "15px",
        rainacontactcard: "13px",
        rainaenquiryfield: "13px",
        rainacontactbtn: "15px",
        rainaaboutusdesc: "20px",
        rainaaboutustitle: "14px",
        rainaproductlistinfo: "14px",
        rainasizebtn: "15px",
        rainaproductname: "18px",
        rainaproductdetailinfo: "15px",
        rainaproductdetaildesc: "12px",
        rainaaboutusinfo: "12px",
        rainapdf: "10px",
        rainasharebtn: "11px",
        sdsubtitle: "18px",
        sdcontactcardtitle: "15px",
        sdcontactcardsubtitle: "10px",
        sdcontactcardbtn: "12px",
        sdaboutus: "10px",
        sdproductinfo: "15px",
        sdexplorebtn: "13px",
        atsexplore: "14px",
        atscontactinfo: "10.5px",
        atsgetintouchtitle: "20px",
        atsgetintouchsubtitle: "10px",
        atsinput: "10px",
        atsservicetitle: "20px",
        atsservicedesc: "12px",
        atsservicebutton: "12px",
        atscountertitle: "20px",
        atscounterdesc: "11px",
        admintable: "14px",
        adminwelcometitle: "20px",
        footer: "12px",
        atsservicepagetitle: "16px",
        atsservicemdsteps: "11px",
        atsdmgdwelcometitle:"14px",
        atsdmgdinfo: "18px",
        inputlabel: "13px",

        //responsive font sizes
        // footer
        footer_md: "11px",
        footer_sm: "10px",

        // rainaproductname

        rainaproductname_md: "16px",
        rainaproductname_sm: "14px",

        // rainaproductdetails

        rainaproductdetailinfo_elg: "14px",
        rainaproductdetailinfo_lg: "13px",
        rainaproductdetailinfo_md: "12px",
        rainaproductdetailinfo_sm: "10px",

        // rainaproductlist
        
        rainaproductlistinfo_lg: "13px",
        rainaproductlistinfo_md: "12px",
        rainaproductlistinfo_sm: "11px",
        rainaproductlistinfo_esm: "10px",

        // sunildiamondproductlist

        sdproductinfo_lg: "14px",
        sdproductinfo_md: "13px",
        sdproductinfo_sm: "12px",

        // sunildiamondcard

        sdcontactcardsubtitle_lg: "9px",
        sdcontactcardsubtitle_md: "8px",
        sdcontactcardsubtitle_sm: "7px",

        // sunildiamondsubtitle

        sdsubtitle_lg: "17px",
        sdsubtitle_md: "16px",
        sdsubtitle_sm: "15px",
        sdsubtitle_esm: "13.5px",

        // sunildiamondcontactbtn

        sdcontactcardbtn_lg: "11px",
        sdcontactcardbtn_md: "10px",
        sdcontactcardbtn_sm: "9px",

        // sunildiamondcompanytitle

        companytitle_elg: "20px",
        companytitle_lg: "18px",
        companytitle_md: "17px",
        companytitle_sm: "15px",
        companytitle_esm: "14px",

        // sunildiamondcontactcardtitle

        sdcontactcardtitle_lg: "14px",
        sdcontactcardtitle_md: "13px",
        sdcontactcardtitle_sm: "12px",

        // sunildiamond desc

        desc_lg: "11px",
        desc_md: "10px",
        desc_sm: "9.5px",

        // ats servicetitle
        
        atsservicetitle_md: "17px",
        atsservicetitle_sm: "14px",

        // ats servicedesc

        atsservicedesc_md: "11px",
        atsservicedesc_sm: "10px",

        // ats contact info

        atscontactinfo_lg: "9px",
        atscontactinfo_md: "8.5px",

        //ats counter desc

        atscounterdesc_lg: "10.4px",
        atscounterdesc_md: "8.5px",

        // ATS Service Page

        // Main Title

        atsservicepagetitle_lg: "13.7px",
        atsservicepagetitle_md: "12.7px",
        atsservicepagetitle_sm: "11px",

        // mobile service steps

        atsservicemdsteps_lg: "10px",
        atsservicemdsteps_md: "9px",

        // dmgd welcome title

        atsdmgdwelcometitle_lg: "13px",
        atsdmgdwelcometitle_md: "12px",

        // dmgd info

        atsdmgdinfo_lg: "16px",
        atsdmgdinfo_md: "15px",
        atsdmgdinfo_sm: "14px",

        // Admin title

        adminwelcometitle_mobile: "16px",

        // Admin Button

        adminbutton_sm: "12px",

      },
      lineHeight: {
        companytitlelh: "34px",
        subtitlelh: "45px",
        desclh: "18px",
        roundedicontextlh: "22.5px",
        clickmaplh: "19.5px",
        joinusbtnlh: "45px",
        joinusinfolh: "18px",
        rainaexplorebtnlh: "16.5px",
        rainacontactcardlh: "19.5px",
        rainaborderbtnlh: "18px",
        rainaaboutusdesclh: "30px",
        rainaaboutustitlelh: "21px",
        rainasizebtnlh: "19.5px",
        rainaproductdetailinfolh: "23px",
        rainaproductdetaildesclh: "18px",
        rainaaboutusinfolh: "18px",
        sdsubtitlelh: "28.5px",
        sdaboutuslh: "18px",
        atsexplorelh: "21px",
        atscontactinfolh: "18px",
        atsgetintouchtitlelh: "30px",
        atsgetintouchsubtitlelh: "15px",
        atsinputlh: "15px",
        atsservicetitlelh: "16px",
        atsservicedesclh: "18px",
        atsservicebuttonlh: "18px",
        atsservicepagetitlelh: "24px",
        atsdmgdwelcometitlelh: "21px",
        atsdmgdinfolh: "27px",
      }
    },
  },
  plugins: [],
};
