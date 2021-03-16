import React , { useEffect , useState } from 'react'
import styled from "styled-components";
import profile from "../../images/admin.png";
import {getAdminById,editAdminPassword} from "./api";
import Loader from "react-loader-spinner";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const ProfileContainer = styled.div`
    height : 90vh;
    display: flex;
    margin-top:10vh;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
        color : red;
    }

    em {
        color : green;
    }
`;


const Profile = (props) => {
    
    const [admin,setAdmin] = useState({});
    const [loading,setLoading] = useState(false);
    const [password,setPassword] = useState("");
    const [err,setErr] = useState(""); 
    const [success,setSuccess] = useState("");  
    const id = localStorage.getItem("id");


    const handleChangePassword = async () => {
        const response = await editAdminPassword(id,password);
        if(response.errors)
        {
            setErr(response.errors.password);
            setPassword("");
            return;
        }
        setSuccess(response.response);
        setPassword("");
        setTimeout(() => {
        setSuccess("");
        },2500)
    }
    useEffect(() => {
        props.setPage("HomeTest");
        (async () => {
            setLoading(true);
            const response = await getAdminById(id);
            setLoading(false);
            setAdmin({...response.response});
        })();

    }, []);

    return ( 
        <ProfileContainer>
            {loading ? (<Loader
        type="ThreeDots"
        color="#9bff6d"
        height={100}
        width={100}
        timeout={100000} //3 secs
            />) : (
            <>
            <img src={profile} width="200px" />
            <p><i>{err}</i></p>
            <p><em>{success}</em></p>
            <p><strong>Username</strong> : {admin.username}</p>
            <TextField style={{textAlign: "center"}} placeholder="New password" type="password" value={password} onChange={e => {
                setPassword(e.target.value);
                setErr("");
            }} />
            {password == "" ? (
            <Button type="submit" disabled variant="contained" color="primary">
            Change Password
            </Button>

            ) : (
                <Button type="submit"  variant="contained" color="primary"  onClick={handleChangePassword}>
                Change Password
                </Button>
            )}
            </>
            )}
        </ProfileContainer>
     );
}
 
export default Profile;