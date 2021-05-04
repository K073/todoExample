import React from "react";
import {connect} from "react-redux";
import {fetchTodoListRequest} from "../store/actions/todoActions";

class TodoList extends React.PureComponent {

    componentDidMount() {
        this.props.fetchTodoListRequest()
    }

    render() {
        return <React.Fragment>

        </React.Fragment>
    }
}

const mapStateToProps = state => ({
    tasks: state.todo.tasks
});

const mapDispatchToProps = {
    fetchTodoListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
