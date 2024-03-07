import cloudinary from 'cloudinary';

export default function Cloudinary () {

    // upload preset => uy38q9nq
    // cloud name => dlomhf01t
    // api key =>  174219366869358

    cloudinary.v2.config({
        cloud_name: "dlomhf01t",
        api_key: "962176665597759",
        api_secret: "81XP_m2FQd3lfIe--LwTpqGfk2U"
    });

    return cloudinary;
}


  
