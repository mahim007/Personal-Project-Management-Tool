import React from "react";
import Backlog from "../components/ProjectBoard/Backlog";

export const boradAlgorithm = (errors, project_tasks) => {
  if (project_tasks.length < 1) {
    if (errors && errors.projectNotFound) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectNotFound}
        </div>
      );
    }else if (errors && errors.projectIdentifier) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectIdentifier}
        </div>
      );
    } else {
      return (
        <div className="alert alert-info text-center" role="alert">
          No project task found on this board
        </div>
      );
    }
  } else {
    return <Backlog project_tasks={project_tasks} />;
  }
};
