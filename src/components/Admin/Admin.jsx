import React , {useState,useEffect} from 'react'
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loader from "react-loader-spinner";
import {getAllAdmins,addAdmin,deleteAdmin,getAdminId,updateAdmin} from './api';
import { Button, responsiveFontSizes } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';


const columns = [
    { id: 'username', label: 'Username', minWidth: 100, align: "center" },
    {
      id: 'edit',
      label: 'Edit',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 170,
      align: 'center',
    } 
 ];


 const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

const AdminContainer = styled.div`
    height: 90vh;
    margin-top:10vh;
    display: flex;
    position : relative;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    gap:10px;
`;

const EditModal = styled.div`
width: 60%;
position:absolute;
height:40vh;
padding: 10px;
top: 30%;
background-color: #fafafafa;
z-index: 10;
gap: 20px;
display: flex;
flex-direction : column;
align-items: center;
justify-content: center;
border-radius: 7px;
transition: all 0.3s ease;
opacity : ${({show}) => show ? "1" : "0"};
pointer-events : ${({show}) => show ? "fill" : "none"};
.btn__container {
      width:50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    i {
      color : red;
    }

    h3 {
      color : green;
      text-align: center;
    }
`;


const AddModal = styled.div`
    width: 60%;
    position:fixed;
    height:50vh;
    padding: 10px;
    top: 25%;
    background-color: #eeee;
    z-index: 10;
    gap: 20px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    transition: all 0.3s ease;
    opacity : ${({open}) => open ? "1" : "0"};
    pointer-events : ${({open}) => open ? "fill" : "none"};

    .btn__container {
      width:50%;
      display: flex;
      justify-content: space-around;
      gap: 5px;
      align-items: center;
    }

    i {
      color : red;
      margin: 10px;
    }

    strong {
      color : white;
      margin: 10px;
    }

    h3 {
      color : green;
      text-align: center;
    }
`;






const Admin = (props) => {

    const history = useHistory();
    const [rows,setRows] = useState([]);
    const [admins,setAdmins] = useState([]);
    const [page, setPage] = React.useState(0);
    const [loading,setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState("");
    const [nameErr,setNameErr] = useState("");
    const [passErr,setPassErr] = useState("");
    const [del,setDelStatus] = useState("");
    const [render,setRender] = useState(false);
    const [id,setId] = useState(0);
    const [open, setOpen] =useState(false);
    const [newPass,setNewPass] = useState("");
    const [passStatus,setPassStatus] = useState("");
    const [newpassErr,setnewPassErr] = useState("");
    const [show,setShow] = useState(false);
    const [admin,setAdmin] = useState("");

    const classes = useStyles();
    
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setRender(!render);
      };

    const handleSubmit = async () => {
      const data = await addAdmin(username,password);
      if(data.errors){
        if(data.errors.password) 
        {
          setPassErr(data.errors.password[0]);
        }else {
          setPassErr("");
        }
        if(data.errors.username)
        {
          setNameErr(data.errors.username[0]);
        }else {
          setNameErr("");
        }
        return;
      }
      setUsername("");
      setPassword("");
      setSuccess(data.response);
      setRender(!render);

      setTimeout(() => {
        setSuccess("");
        setOpen(false);
      },1000);
    }


    const handleE =  async (id) => {
      setId(id);
      const response = await getAdminId(id);
      if(response.status == "success")
      {
        setAdmin(response.response.username);
        setShow(true);
      }
    }

    const handleCl = () => {
      setShow(false);
    }

    const handleEdit = async () => {
      const response = await updateAdmin(id,newPass);
      if(response.errors)
      {
        setnewPassErr(response.errors.password[0]);
        setNewPass("");
        return;
      }
      setnewPassErr("");
      setPassStatus(response.response);
      setNewPass("");
      setTimeout(() => {
        setPassStatus("");
        setShow(false);
      },1500);
    }

    const handleDelete = async (id) => {
      setId(id);
      const response = await deleteAdmin(id);
      if(response.response)
      {
        setDelStatus(response.response);
        setRender(!render);
      }
      setTimeout(() => {
        setDelStatus("");
      },2500)
    }


      useEffect(() => {
        props.setPage("Admins");
          (async () =>{
              setLoading(true);
              const response = await getAllAdmins(page);
              setLoading(false);
              if(response.response == undefined)
              {
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                history.push("/");
                return;
              }
              const data = [...response.response.data];
              const newData = data.filter(d => {
                return d.id != localStorage.getItem("id");
              })
              setRows([...newData]);
          })();
      }, [render]);
    
    return ( 
        <AdminContainer>
      <Button variant="contained"
 color="primary" type="button" onClick={handleOpen}>
   Add Admin
      </Button>
      {rows.length == 0 && <p>No admins other than you ! Make sure to add some !</p>}
      {del && <h3><em>{del}</em></h3>}
      <AddModal open={open}>
        <h2>Add Admin</h2>
        {success && <h4>{success}</h4>}
        {nameErr && <p> <i> {nameErr} </i></p>}
        <TextField placeholder="Username"
        onChange={e => {
          setUsername(e.target.value);
          setNameErr("");
        }}
        value={username}
        type="text" />
        {passErr && <p> <i> {passErr} </i></p>}
        <TextField placeholder="Password" 
        onChange={e => {
          setPassword(e.target.value);
          setPassErr("");
        }}        
        value={password}
        type="password" />
        <div className="btn__container">
        <Button variant="contained"
        color="primary"
        onClick={handleSubmit}
        > Add </Button>
        <Button variant="contained"
        color="secondary" onClick={handleClose}> Cancel </Button>
        </div>
      </AddModal>

      <EditModal show={show}>
      <h2>Edit {admin}</h2>
      {passStatus && <h3>{passStatus}</h3>}
      {newpassErr && <p><i>{newpassErr}</i></p>}
      <TextField placeholder="New Password" 
        onChange={e => {
          setNewPass(e.target.value);
          setnewPassErr("");
        }}        
        value={newPass}
        type="password" />

      <div className="btn__container">
        <Button variant="contained"
        color="primary"
        onClick={handleEdit}
        > Submit </Button>
        <Button variant="contained"
        color="secondary" onClick={handleCl}> Cancel </Button>
        </div>
      </EditModal>


               {loading ? (<Loader
        type="ThreeDots"
        color="#9bff6d"
        height={100}
        width={100}
        timeout={100000}
            />) : (
                <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="center">
                    {row.username}
                  </TableCell>
                  <TableCell align="center">
                  <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={() => {
                  handleE(row.id);
                }}
                  >
                    Edit
                  </Button>
                  </TableCell>
                  <TableCell align="center">
                  <Button
              color="secondary"
              variant="contained"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                handleDelete(row.id);
              }}
                  >
                    Delete
                  </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>)}
        </AdminContainer>
     );
}
 
export default Admin;

