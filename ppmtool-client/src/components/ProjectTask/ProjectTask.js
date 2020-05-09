import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../actions/backlogActions";

class ProjectTask extends Component {
  onClick(backlog_id, pt_id) {
    this.props.deleteProjectTask(backlog_id, pt_id);
  }
  render() {
    const { projectTask } = this.props;
    let priorityString;
    let priorityClass;
    if (projectTask.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    } else if (projectTask.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    } else if (projectTask.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {projectTask.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{projectTask.summary}</h5>
          <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            onClick={this.onClick.bind(
              this,
              projectTask.projectIdentifier,
              projectTask.projectSequence
            )}
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteProjectTask })(ProjectTask);
