const back = process.env.REACT_APP_BACK;


export const getAllAdmins = async (pageCount) => {
    const response = await fetch(`${back}/admin?page=${pageCount}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    return data;
}


export const getAdminId = async (id) => {
    const response = await fetch(`${back}/admin/${id}`,{
        method : "GET",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    return data;
}

export const addAdmin = async (username,password) => {
    const response = await fetch(`${back}/admin`,{
        method: "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            "X-Request-With" : "XMLHttpRequest",
            Authorization : `Bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();
    return data;
}


export const deleteAdmin = async (id) => {

    const response = await fetch(`${back}/admin/${id}`,{
        method: "DELETE",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}` 
        }
    });

    const data = await response.json();
    return data;
}

export const updateAdmin = async (id,password) => {

    const response = await fetch(`${back}/admin/${id}`,{
        method: "PUT",
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json", 
            Authorization : `Bearer ${localStorage.getItem("token")}` 
        },
        body : JSON.stringify({
            password : password
        })
    });

    const data = await response.json();
    return data;
}