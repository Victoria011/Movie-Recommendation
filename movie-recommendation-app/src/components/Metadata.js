import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination } from "@mui/material";
import { TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton} from '@mui/material';
import { Tooltip, FormControlLabel, Switch, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
// import { DeleteIcon, FilterListIcon } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { useState } from "react";
import { alpha } from '@mui/material/styles';
  
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1]; // index difference
    });
    return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name',},
    {id: 'rowCount', numeric: true, disablePadding: false, label: 'Number of rows',},
    {id: 'fileSize', numeric: true, disablePadding: false, label: 'File size (bytes)',},
    {id: 'attribCount', numeric: true, disablePadding: false, label: 'Number of attributes',},
    {id: 'id', numeric: true, disablePadding: false, label: 'ID',},
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Metadata
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
};
  
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
  
const Metadata = ({metadata}) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('rowCount');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [featureDict, setFeatureDict] = useState([]);
    
  
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = metadata.map((n) => n.name);
            const featureList = metadata.map((n) => ({"name":n.name,"features":n.features.join(", ")}));
            setSelected(newSelecteds);
            console.log("select all featureList");
            console.log(featureList);
            setFeatureDict(featureList);
            return;
        }
        setSelected([]);
        setFeatureDict([]);
    };
  
    const handleClick = (event, name, features) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        let featureList = [];

        if (selectedIndex === -1) {
            let tmp_fl = features.join(", ");
            let tmp_f = {"name":name,"features":tmp_fl}
            newSelected = newSelected.concat(selected, name);
            featureList = featureList.concat(featureDict, tmp_f);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            featureList = featureList.concat(featureDict.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            featureList = featureList.concat(featureDict.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            featureList = featureList.concat(
              featureDict.slice(0, selectedIndex),
              featureDict.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        setFeatureDict(featureList);
        console.log("Selected dataset: ")
        console.log(newSelected);
        console.log("Selected featurelist ")
        console.log(featureList);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      console.log("metadata len = ");
      console.log(metadata.length);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - metadata.length) : 0;
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={metadata.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(metadata, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name, row.features)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.rowCount}</TableCell>
                        <TableCell align="right">{row.fileSize}</TableCell>
                        <TableCell align="right">{row.attribCount}</TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={metadata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box>
          {featureDict.map((fd) => (
            <Typography key={fd.name} variant="subtitle2" className="upload-msg-wrong" style={{marginBottom: 20}}>
              Extracted features for selected dataset {fd.name}:
              <Typography key={fd.name} variant="body1" >
                {fd.features}
              </Typography>
            </Typography>
          ))}
        </Box>
      </Box>
    );
}

export default Metadata
