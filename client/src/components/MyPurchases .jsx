import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { getPurchase } from '../redux/MyPurchasesSlice'

const columns = [
    { id: 'date', label: 'Purchase Date', minWidth: 170 },
    { id: 'ScoreBalance', label: 'Score Balance', minWidth: 100, align: "center" },
    { id: 'Package', label: 'Package', minWidth: 100, align: "center" },
];
function createData(purchaseDate, descriptionPackage, scoreBalance) {
    return { purchaseDate, descriptionPackage, scoreBalance };
}

export default function StickyHeadTable() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user.data)
    // useEffect(async() => {
    //    await dispatch(getPurchase(user.id));
    // }, [dispatch]);
    // const MyPurchases = useSelector(state => state.MyPurchasesReducer.MyPurchases)
    const MyPurchases = user.purchases;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const moveToPackages = async () => {
        navigate('/Package');
    }


    return (<>
        <h1 id='title'>My Purcheses<CarRentalIcon fontSize="large" /></h1>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    style={{ minWidth: column.minWidth, color: '#284087', fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {MyPurchases
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell align="center" component="th" scope="row">{row.date}</TableCell>
                                        <TableCell align="center">{row.scoreBalance}</TableCell>
                                        <TableCell align="center">{row.package.description}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={MyPurchases.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <Button sx={{ color: '#284087' }} id='logIn' onClick={moveToPackages}>new purchase</Button>
    </>
    );
}
