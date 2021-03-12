const back = process.env.REACT_APP_BACK;


export const getAdminById = async (id) => {
    const response = await fetch(`${back}/admin/${id}`,{
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}` 
        }
    });
    const data = await response.json();
    return data;
}

export const editAdminPassword = async (id,password) => {
    const response = await fetch(`${back}/admin/${id}`,{
        method : "PUT",
        headers : {
            "X-Requested-With" : "XMLHttpRequest",
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            password: password
        })
    });
    const data = await response.json();
    return data;
}