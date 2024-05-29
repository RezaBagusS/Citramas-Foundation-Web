

// const backendURL = "https://be-travel-go.vercel.app";
const backendURL = "/api/v1/tabActivity";


export const getTabActivity = () => {

    const response = fetch(`${backendURL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

    const data = response.then((res) => {
        return res.json();
    }).then((data) => {
        return {
            error: data.error,
            message: data.message,
            data: data.data,
        };
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        console.log("done");
    });

    return data;
};