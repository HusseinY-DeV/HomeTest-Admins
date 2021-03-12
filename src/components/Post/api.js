const back = process.env.REACT_APP_BACK;


export const getPosts = async () => {
    const response = await fetch(`${back}/admin/my-posts/${localStorage.getItem("id")}}`, {
        method : "GET",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    return data;
}


export const addPost = async (dataObj) => {
    const response = await fetch(`${back}/post/admin/${localStorage.getItem("id")}`, {
        method: "POST",
        headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            "X-Requested-With" : "XMLHttpRequest"
        },
        body : dataObj
    });

    const data = await response.json();


    return data;
}


export const deletePost = async (postId) => { 

    const response = await fetch(`${back}/post/${postId}`,
    {
        method : "DELETE",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await response.json();
    return data;
}

export const editPost = async (formData,postId) => { 

    const response = await fetch(`${back}/post/${postId}?_method=PUT`,
    {
        method : "POST",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            "X-Request-With" : "XMLHttpRequest",
            Accept : "application/json"
        },
        body : formData
    });

    const data = await response.json();
    return data;
}


export const getPost = async (id) => {

    const response = await fetch(`${back}/post/${id}`,{
        method: "GET",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    return data;
}