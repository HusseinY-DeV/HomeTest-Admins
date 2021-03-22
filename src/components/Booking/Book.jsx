import React , {useEffect,useState} from "react";
import styled from "styled-components";
import { getBooking,deliver } from "./api";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Loader from "react-loader-spinner";
import TableRow from '@material-ui/core/TableRow';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router';



const columns = [
    { id: 'order', label: 'N#', minWidth: 100, align: "center" },
    {
      id: 'fname',
      label: "Test name",
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'lname',
      label: 'Price',
      minWidth: 170,
      align: 'center',
    }
 ];

 const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      minHeight: "40vh",
    },
  });




const BookPage = styled.div`

  margin-top: 9vh;
  padding: 10px;
  min-height: 90vh;
  text-align: center;

  p {
      color : #3a3a3a;
      padding: 20px;
  }
  .date {
      font-family: Poppins;
      color : #e2e2e2:
      font-size : 1px;  
      display: block;
      margin: 14px 0px;
  }

  .btn {
      padding: 10px;
      margin-top: 10px;
  }

  h4 {
    margin: 10px;
  }

`;


const Notification = styled.div`

  position: fixed;
  top: 0px;
  right: 10px;
  text-align:center;
  width: fit-content;
  transition: all 0.3s ease;
  transform: ${({show}) => show ? "translateY(160%)" : "translateY(-120%)" };
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10px;

  p {
      background-color: #3f51b5;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      color: #eeee 
  }

`;


const Book = (props) => {


    const history = useHistory();
    const id  = props.match.params.id;

    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [date,setDate] = useState("");
    const [dDate,setDdate] = useState("");
    const [city,setCity] = useState("");
    const [building,setBuilding] = useState("");
    const [street,setStreet] = useState("");

    const [loading,setLoading] = useState(true);

    const [rows,setRows] = useState({});
    const [render,setRender] = useState(false);
    const [show,setShow] = useState(false);
    const [t,setT] = useState(null);


    function getSum(total, num) {
      return total + num;
    }

    const classes = useStyles();
    let price = [];
    let total = null;

    useEffect(() => {
        props.setPage("Booking");
        (async () => {
            
            const response = await getBooking(id);
            response.response[0].test.forEach(t => {
              price.push(t.price);
            })

            total = price.reduce(getSum,0);
            setT(total);
            
            setRows({...response.response[0]});
            setStreet(response.response[0].location.street);
            setCity(response.response[0].location.city);
            setBuilding(response.response[0].location.building);
            setFname(response.response[0].first_name);
            setLname(response.response[0].last_name);
            setDate(response.response[0].test[0].pivot.booked_date);
            setDdate(response.response[0].test[0].pivot.date)
            setLoading(false);
        })();

    }, [render]);

    return ( 
        <BookPage>
            <Notification show={show}>
               <p> Delivering... </p>     
            </Notification>

            <p><strong>Patient : </strong>{fname} {lname} <span className="date">Date booked : {date}</span>
            <span className="date">Delivery date : {dDate}</span>
            <span className="location">
              Location : {city} - {street} - {building}
            </span>
            </p>
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
                      {rows.test.map((row,i) => {
                        return (
                          <TableRow
                          hover role="checkbox" tabIndex={-1} key={i}>
                                   <TableCell align="center">
                              {i+1}
                            </TableCell>
                            <TableCell align="center">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.price} L.L
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ) }

            <h4>Total : {t} L.L </h4>
            <Button className="btn" variant="contained" color="primary" startIcon={<LocalShippingIcon/>}
            onClick = {async e => {
              const response = await deliver(id);
              console.log(response);
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                },2500);
                setTimeout(() => {
                    history.push("/bookings");
                },3200);
            
            }}
            >
                Deliver
            </Button>
        </BookPage>
      );
}
 
export default Book;