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