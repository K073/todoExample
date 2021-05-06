import React from "react";
import {connect} from "react-redux";
import {fetchTodoListRequest} from "../store/actions/todoActions";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow
} from "@material-ui/core";


class TodoList extends React.PureComponent {

    componentDidMount() {
        this.props.fetchTodoListRequest()
    }

    render() {
        const {tasks} = this.props;
        console.log(tasks);
        return <TableContainer component={Paper}>
            <Table >
                <TableBody>
                    {tasks.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.username}
                            </TableCell>
                            <TableCell>
                                {row.email}
                            </TableCell>
                            <TableCell>
                                {row.text}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={tasks.length}
                            rowsPerPage={1}
                            page={0}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={() => {}}
                            onChangeRowsPerPage={() => {}}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    }
}



const mapStateToProps = state => ({
    tasks: state.todo.tasks
});

const mapDispatchToProps = {
    fetchTodoListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
