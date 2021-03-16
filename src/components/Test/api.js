const back = process.env.REACT_APP_BACK;

export const getTests = async () => {

    const response = await fetch(`${back}/tests`,{
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    return data;
} 

export const addTest = async (name,price,quantity) => {
    const response = await fetch(`${back}/tests`,{
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            "Accept" : "application/json",
            "Content-type" : "application/json",
            "X-Requested-With" : "XMLHttpRequest"
        },
        body : JSON.stringify({
            name,
            price,
            quantity
        })    
    });

    const data = await response.json();
    return data;
}

export const deleteTest = async (id) => {
    
    const response = await fetch(`${back}/tests/${id}`,{
        method : "DELETE",
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();
    return data;
}

export const editTest = async (id,name,quantity,price) => {
    const response = await fetch(`${back}/tests/${id}`,{
        method : "PUT",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            "X-Requested-With" : "XMLHttpRequest",
            "Accept" : "application/json",
            "Content-type" : "application/json" 
        },
        body : JSON.stringify({
            name,
            quantity,
            price
        })
    })

    const data = await response.json();
    return data;
}