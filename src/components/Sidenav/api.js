const back = process.env.REACT_APP_BACK;

export const adminLogout = async (token) => {
    const response = await fetch(`${back}/admin/logout`,{
        method : "POST",
        headers : {
            Authorization : `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}