import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {editTodoRequest, fetchTodoListRequest} from "../store/actions/todoActions";
import {
    Box, Button,
    Collapse, Grid, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, TableSortLabel, TextareaAutosize
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

    todoChange = id => value => {
        this.props.editTodoRequest(id, value)
    }

    render() {
        const {tasks, count} = this.props;

        return <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((row) => (
                        <TodoRow key={row.id} edit={this.todoChange(row.id)} {...row}/>
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

function TodoRow ({id, username, email, status, text, edit}) {
    const userData = useSelector(state => state.user.userData)

    const minCompleteStatusNumber = 10
    const [open, setOpen] = useState(false);
    const [updatedText, setText] = useState(text);
    const [complete, setComplete] = useState(status >= minCompleteStatusNumber)

    const changed = text !== updatedText;

    const currentStatus = complete ? changed ? 11 : 10 : changed ? 1 : 0;

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
                    <Box justify="space-between" margin={2}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center">
                            <Grid item xs={12}>
                                {!userData ? text :
                                    <TextareaAutosize
                                        style={{width: '100%'}}
                                    value={updatedText}
                                    rowsMax={4}
                                    onChange={(e) => setText(e.target.value)}
                                    />}
                            </Grid>
                            <Grid item>
                                {userData && <Button
                                    color={complete ? "secondary" : "primary"}
                                    onClick={() => setComplete(!complete)}
                                >{!complete ? '✓ Complete' : '☓ uncompleted'}</Button>}
                            </Grid>
                            <Grid item>
                                {userData && <Button
                                    onClick={() => edit({text: updatedText,
                                            token: userData.message.token,
                                        status: currentStatus > status ? currentStatus : status})}
                                    variant={'contained'}
                                    color={"primary"}>Save</Button>}
                            </Grid>
                        </Grid>
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
    fetchTodoListRequest,
    editTodoRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
