import React , {useEffect,useState} from 'react';
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';
import {getBookings} from "./api";


const columns = [
    { id: 'order', label: 'Order n#', minWidth: 100, align: "center" },
    {
      id: 'fname',
      label: 'First name',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'lname',
      label: 'Last name',
      minWidth: 170,
      align: 'center',
    },
    {
        id: 'date',
        label: 'Delivery date',
        minWidth: 170,
        align: 'center',
      }  
 ];


 const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      minHeight: "90vh",
    },
  });



const BookingPage = styled.div`
    margin-top : 12vh;
    padding: 10px;
    text-align:center;
    min-height: 90vh;

    p {
        text-align : center;
        margin: 10px;
        color: #3a3a3a;
    }

`;


const Booking = (props) => {

    const history = useHistory();
    const [rows,setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = React.useState(0);
    const [loading,setLoading] = useState(true);
    const [render,setRender] = useState(false);
    const classes = useStyles();


    const handleRowClick = (id) => {
        history.push(`/bookings/${id}`)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setRender(!render);
      };

    useEffect(() => {
        props.setPage("Bookings");
        (async () => {
            const response = await getBookings();
            let data = [...response.response.data];
            data = data.reverse();
            setLoading(false);
            setRows([...data]);
        })()
    }, [render]);


    return ( 
        <BookingPage>
            {rows.length == 0 && <p> <em> No bookings are currently available </em></p>}
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
                          <TableRow
                          onClick={(e) => {
                                e.preventDefault();
                                handleRowClick(row.id);
                          }}
                          hover role="checkbox" tabIndex={-1} key={row.id}>
                            <TableCell align="center">
                              {i+1}
                            </TableCell>
                            <TableCell align="center">
                                {row.first_name}
                            </TableCell>
                            <TableCell align="center">
                                {row.last_name}
                            </TableCell>
                            <TableCell align="center">
                                {row.test[0].pivot.date}
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
              </Paper>
            ) }
        </BookingPage>
     );
}
 
export default Booking;