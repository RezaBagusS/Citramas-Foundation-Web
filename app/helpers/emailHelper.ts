const backendURL = "/api/v1/sendEmail";

interface EmailData {
    data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }
}

export default async function emailHelper({ data }: EmailData) {
    
    const res = await fetch(backendURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log("RESULT : ", result);
    
    return result;

}