import { Button, TextField } from '@material-ui/core';
import React , {useEffect,useState} from 'react';
import styled from "styled-components";
import {getTests,addTest,deleteTest, editTest} from "./api";
import Loader from "react-loader-spinner";




const TestPage = styled.div`
    margin-top:11vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    min-height: 90vh;


    i {
        color:green;
        margin: 5px;
        font-size: 15px;
    }

`;

const TestContainer = styled.div`

    width: 100%;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    grid-template-areas:
      ". . ."
      ". . .";
      padding: 20px;
`;


const AddModal = styled.div`

    width: 35%;
    padding: 30px;
    margin: 0 auto;
    position: fixed;
    height: 80vh;
    top: 15%;
    background-color: #fafafafa;
    z-index: 10;
    gap: 30px;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    transition: all 0.3s ease;
    opacity : ${({open}) => open ? "1" : "0"};
    pointer-events : ${({open}) => open ? "fill" : "none"};

    .btn__container {
      width:100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      gap:15px;
      align-items: center;
    }

    i {
        color:red;
        font-size: 15px;
    }

    strong {
        color:green;
        font-size: 15px;
    }
`;


const EditModal = styled.div`
width: 35%;
position:fixed;
height: 60vh;
padding: 10px;
top: 30%;
background-color: #fafafafa;
z-index: 10;
gap: 25px;
display: flex;
flex-direction : column;
align-items: center;
justify-content: center;
border-radius: 7px;
transition: all 0.3s ease;
opacity : ${({show}) => show ? "1" : "0"};
pointer-events : ${({show}) => show ? "fill" : "none"};
.btn__container {
      width: 60%;
      display: flex;
      justify-content: space-between;
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



const EachTest = styled.div`

text-align:center;
display:flex;
flex-direction: column;
justify-content:center;
gap: 10px;
align-items:center;
background-color: #eeee;
color : #3a3a3a;
padding: 20px;
border-radius: 7px;

.btn__container {
    width:70%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    gap:25px;
    align-items: center;
  }

`;



const Test = ({setPage}) => {

    const [tests,setTests] = useState([]);

    const [loading,setLoading] = useState(true);
    const [open,setOpen] = useState(false);
    const [show,setShow] = useState(false);
    const [render,setRender] = useState(false);

    const [name,setName] = useState("");
    const [quan,setQuan] = useState("");
    const [price,setPrice] = useState("");

    const [nameStatus,setNameStatus] = useState("");
    const [quanStatus,setQuanStatus] = useState("");
    const [priceStatus,setPriceStatus] = useState("");

    const [addSuccess,setAddSuccess] = useState("");
    const [deleteSuccess,setDeleteSuccess] = useState("");
    const [editSuccess,setEditSuccess] = useState("");
    
    const [newName,setNewName] = useState("");
    const [newQuan,setNewQuan] = useState("");
    const [newPrice,setNewPrice] = useState("");

    const [newNameErr,setNewNameErr] = useState("");
    const [newQuanErr,setNewQuanErr] = useState("");
    const [newPriceErr,setNewPriceErr] = useState("");
    const [id,setId] = useState(null);


    const handleAddTest = async () => {
        const response = await addTest(name,price,quan);
        if(response.errors)
        {
            if(response.errors.name)
            {
                setNameStatus(response.errors.name[0]);
            }
            if(response.errors.quantity)
            {
                setQuanStatus(response.errors.quantity[0]);
            }
            if(response.errors.price)
            {
                setPriceStatus(response.errors.price[0])
            }
            return;
        }

        setPriceStatus("");
        setQuanStatus("");
        setNameStatus("");
        setName("");
        setPrice("");
        setQuan("");
        setAddSuccess(response.response);
        setRender(!render);

        setTimeout(() => {
            setOpen(false);
            setAddSuccess("");
        },1500);
    } 


    const handleTestDelete = async (id) => {

        const response = await deleteTest(id);
        setDeleteSuccess(response.response);
        setRender(!render);
        setTimeout(() => {
            setDeleteSuccess("");
        },1500);

    }


    const handleEditTest = async () => {
        const response = await editTest(id,newName,newQuan,newPrice);
        if(response.errors)
        {
            if(response.errors.name)
            {
                setNewNameErr(response.errors.name[0]);
            }

            if(response.errors.price)
            {
                setNewPriceErr(response.errors.price[0]);
            }

            if(response.errors.quantity)
            {
                setNewQuanErr(response.errors.quantity[0]);
            }
            return;
        }

        setId("");
        setEditSuccess(response.response);
        setRender(!render);

        setTimeout(() => {
            
            setShow(false);
            setNewName("");
            setNewPrice("");
            setNewQuan("");
            setEditSuccess("");

        },1500);
    }

    useEffect(() => {
        setPage("Tests");
        (async () => {
            const response = await getTests();
            setLoading(false);
            setTests([...response.response]);
        })();

    }, [render]);

    return ( 
        <TestPage>
            <Button variant="contained" color="primary"
        onClick={e => {
            setOpen(true);
            }}
        >Add a Test
            </Button>


      <EditModal show={show}>
          <h2>Edit {newName}</h2>
          {editSuccess && <h3>{editSuccess}</h3>}
          {newNameErr && <p><i>{newNameErr}</i></p>}
          <TextField type="text" placeholder="New name" 
          onChange = {e => {
              setNewName(e.target.value);
              setNewNameErr("");
          }}
          value={newName}
          />
          {newPriceErr && <p><i>{newPriceErr}</i></p>}
          <TextField type="number" placeholder="New price in L.L"
            onChange = {e => {
            setNewPrice(e.target.value);
            setNewPriceErr("");
            }}
            value={newPrice}
          />
            {newQuanErr && <p><i>{newQuanErr}</i></p>}
          <TextField type="number" placeholder="New Quantity"
          onChange = {e => {
            setNewQuan(e.target.value);
            setNewQuanErr("");
            }}
            value={newQuan}
          />
          <div className="btn__container">
          <Button variant="outlined" color="primary"
          onClick={handleEditTest}
             >
                 Edit
             </Button>
             <Button variant="outlined" color="secondary"
             onClick = {e => {
                 setShow(false)
             }}
             >
                 Cancel
             </Button>
          </div>
      </EditModal>

     <AddModal open={open}>

         <h2>New Test</h2>
         {addSuccess && <p><strong>{addSuccess}</strong></p>}
         {nameStatus && <p><i>{nameStatus}</i></p>}
         <TextField type="text" placeholder="Name"
         onChange={e => {
             setName(e.target.value);
             setNameStatus("");
         }}
         value={name}
         />  
        {priceStatus && <p><i>{priceStatus}</i></p>}
         <TextField type="number" placeholder="Price (in L.L)" 
         onChange={e => {
             setPrice(e.target.value);
             setPriceStatus("");
         }}
         value={price}
         />  
        {quanStatus && <p><i>{quanStatus}</i></p>}
         <TextField type="number" placeholder="Quantity"
         onChange={e => {
             setQuan(e.target.value);
             setQuanStatus("");
         }}
         value={quan}
         />  
         <div className="btn__container">
             <Button variant="outlined" color="primary"
             onClick={handleAddTest}
             >
                 Add
             </Button>
             <Button variant="outlined" color="secondary"
             onClick={e => {
                 setOpen(false);
                 setNameStatus("");
                 setPriceStatus("");
                 setQuanStatus("");
             }}
             >
                 Cancel
             </Button>
         </div>
     </AddModal>

  {deleteSuccess && <p><i>{deleteSuccess}</i></p>}

{loading ? (<Loader
        type="ThreeDots"
        color="#9bff6d"
        height={100}
        width={100}
        timeout={100000} //3 secs
            />) : (<TestContainer>
            {tests.map(test => {
                return (
                    <EachTest key={test.id}>
                        <p> <strong>Test name :</strong> {test.name}</p>
                        <p> <strong>Price :</strong> {test.price} L.L </p>
                        <p> <strong>Quantity :</strong> {test.quantity}</p>
                        <div className="btn__container">
                            <Button variant="contained"
                                color="primary"
                                onClick={() => {
                                    setShow(true);
                                    setNewName(test.name);
                                    setNewPrice(test.price);
                                    setNewQuan(test.quantity);
                                    setId(test.id)
                                }}
                            >
                                Edit
                            </Button>
                            <Button  variant="contained"
                                color="secondary"
                                onClick = {e => {
                                    handleTestDelete(test.id);
                                }}
                                >
                                Delete
                            </Button>
                        </div>
                    </EachTest>
                )
            })}
            </TestContainer>
             )}
        </TestPage>
     );
}
 
export default Test;