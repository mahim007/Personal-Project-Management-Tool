import React, { Component } from "react";
import ProjectTask from "../ProjectTask/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks } = this.props;
    const todoTasks = project_tasks.map((task) => {
      if (task.status === "TO_DO")
        return <ProjectTask key={task.id} projectTask={task} />;
    });
    const inProgressTasks = project_tasks.map((task) => {
      if (task.status === "IN_PROGRESS")
        return <ProjectTask key={task.id} projectTask={task} />;
    });
    const doneTasks = project_tasks.map((task) => {
      if (task.status === "DONE")
        return <ProjectTask key={task.id} projectTask={task} />;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoTasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressTasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneTasks}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
