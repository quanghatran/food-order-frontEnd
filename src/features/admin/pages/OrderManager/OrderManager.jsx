import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './orderManager.scss';

export default function OrderManager() {
  return (
    <Box className="listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="Orders Manager" />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
              <TableRow>
                <TableCell className="tableHeaderItem" align="center">
                  Basic Information
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Email
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Phone Number
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Address
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Open
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Close
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Modify
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
