import React, {useState} from "react";
import {connect} from "react-redux";
import {fetchTodoListRequest} from "../store/actions/todoActions";
import {
    Box,
    Collapse, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, TableSortLabel
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


class TodoList extends React.PureComponent {
    state = {
        sort_field: null,
        sort_direction: 'asc',
        page: 0
    }

    handleSort = (property) => (event) => {
        const isAsc = this.state.sort_field === property && this.state.sort_direction === 'asc';
        const sort_direction = isAsc ? 'desc' : 'asc';
        this.fetchTodoList(property, sort_direction)
    };

    componentDidMount() {
        this.fetchTodoList();
    }

    fetchTodoList = (sort_field = this.state.sort_field,
                     sort_direction = this.state.sort_direction,
                     page = this.state.page) => {

        this.setState({...this.state, page, sort_field, sort_direction})
        this.props.fetchTodoListRequest(sort_field, sort_direction, page + 1)
    }

    render() {
        const {tasks, count} = this.props;

        return <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableCell/>
                    <TableCell
                        sortDirection={this.state.sort_field === 'id'? this.state.sort_direction : 'asc'}
                    >
                        <TableSortLabel
                            active={this.state.sort_field === 'id'}
                            direction={this.state.sort_field === 'id'? this.state.sort_direction : 'asc'}
                            onClick={this.handleSort('id')}
                        >
                            ID
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                        align="center"
                        sortDirection={this.state.sort_field === 'username'? this.state.sort_direction : 'asc'}
                    >
                        <TableSortLabel
                            active={this.state.sort_field === 'username'}
                            direction={this.state.sort_field === 'username'? this.state.sort_direction : 'asc'}
                            onClick={this.handleSort('username')}
                        >
                            Name
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                        align="center"
                        sortDirection={this.state.sort_field === 'email'? this.state.sort_direction : 'asc'}
                    >
                        <TableSortLabel
                            active={this.state.sort_field === 'email'}
                            direction={this.state.sort_field === 'email'? this.state.sort_direction : 'asc'}
                            onClick={this.handleSort('email')}
                        >
                            Email
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                        align="center"
                        sortDirection={this.state.sort_field === 'status'? this.state.sort_direction : 'asc'}
                    >
                        <TableSortLabel
                            active={this.state.sort_field === 'status'}
                            direction={this.state.sort_field === 'status'? this.state.sort_direction : 'asc'}
                            onClick={this.handleSort('status')}
                        >
                            status
                        </TableSortLabel>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {tasks.map((row) => (
                        <TodoRow {...row}/>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[3]}
                            colSpan={5}
                            count={Number(count)}
                            rowsPerPage={tasks.length}
                            page={this.state.page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={(e, newPage) => {
                                this.fetchTodoList(undefined, undefined, newPage)
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    }
}

function TodoRow ({id, username, email, status, text}) {

    const [open, setOpen] = useState(false);

    return <React.Fragment>
        <TableRow>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell>
                {id}
            </TableCell>
            <TableCell align="center">
                {username}
            </TableCell>
            <TableCell align="center">
                {email}
            </TableCell>
            <TableCell align="center">
                {status}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        {text}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
}



const mapStateToProps = state => ({
    tasks: state.todo.tasks,
    count: state.todo.count
});

const mapDispatchToProps = {
    fetchTodoListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
