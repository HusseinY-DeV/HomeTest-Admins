const back = process.env.REACT_APP_BACK;

export const adminSignin = async (username,password) => {
    const response = await fetch(`${back}/login`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : username,
            password : password
        })
    });

    const data = await response.json();
    return data;
}