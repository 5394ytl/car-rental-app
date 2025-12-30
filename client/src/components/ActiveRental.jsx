import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRentals, deleteRental } from '../redux/RentalSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../redux/ProductSlice';

const columns = [
    { id: 'startDate', label: 'Start Date', minWidth: 170 },
    { id: 'endDate', label: 'End Date', minWidth: 170 },
    { id: 'usedScore', label: 'Used Score', minWidth: 100, align: "center" },
    { id: 'product', label: 'Product', minWidth: 100, align: "center" }
    // ,{ id: 'update', label: 'Update', minWidth: 100, align: "center" },
    // { id: 'delete', label: 'Delete', minWidth: 100, align: "center" }
];

const ActiveRental = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user.data);
    useEffect(() => {
        dispatch(getRentals(user));
    }, [dispatch]);
    const rentals = useSelector(state => state.rentalReducer.Rentals);
    const today = new Date()
    console.log("rentals",rentals)
    const activeRentals = rentals && rentals.filter((x) => new Date(x.endDateTime) > today)
    console.log("active",activeRentals);
    const navigate = useNavigate();

    const ToProductList = () => {
        navigate('/product')
    }

    // const update = (id) => {

    // }

    // const del = (id) => {
    //     dispatch(deleteRental(id));
    //     dispatch(getRentals(user));
    // }
    return (<>
        <h1 id='title'>Active Rental <CarRentalIcon fontSize="large" /></h1>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align='center'
                                    style={{ minWidth: column.minWidth, color: '#284087', fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeRentals ? (
                            activeRentals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="center" component="th" scope="row">{row.startDateTime}</TableCell>
                                            <TableCell align="center">{row.endDateTime}</TableCell>
                                            <TableCell align="center">{row.usedScore}</TableCell>
                                            <TableCell align="center">{row.productId}</TableCell>
                                            {/* {new Date(row.startDateTime) > today ?
                                                <TableCell align="center"><button class="b1" onClick={update}>update</button></TableCell> :
                                                <TableCell align="center"><button class="b2">update</button></TableCell>}
                                            {new Date(row.startDateTime) > today ?
                                                <TableCell align="center"><button class="b1" onClick={del}>delete</button></TableCell> :
                                                <TableCell align="center"><button class="b2">delete</button></TableCell>} */}
                                        </TableRow>
                                    );
                                })) : <h1 id='rentalHistories'>Not Found Active Rental</h1>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={activeRentals && activeRentals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <Button onClick={ToProductList}>New Rental</Button>
    </>
    );
}
export default ActiveRental;