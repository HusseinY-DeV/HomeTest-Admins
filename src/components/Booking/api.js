const back = process.env.REACT_APP_BACK;



export const getBookings = async () => {
    
    const response = await fetch(`${back}/bookings`, {
        method : "GET",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    return data;
}


export const getBooking = async (id) => {
    
    const response = await fetch(`${back}/bookings/${id}`, {
        method : "GET",
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    return data;
}


export const deliver  = async (id) => {
    const response = await fetch(`${back}/admindeliver/${id}`,{
        method  : "DELETE",
    })

    const data = await response.json();

    return data;
}