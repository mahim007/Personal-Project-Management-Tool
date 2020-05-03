package com.mahim.ppmtool.services;

import com.mahim.ppmtool.domain.Backlog;
import com.mahim.ppmtool.domain.ProjectTask;
import com.mahim.ppmtool.exceptions.ProjectNotFoundException;
import com.mahim.ppmtool.repositories.BacklogRepository;
import com.mahim.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer BacklogSequence = backlog.getPTSequence();
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);
            projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);
            if (projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == "" || projectTask.getStatus() ==  null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch(Exception ex) {
            throw new ProjectNotFoundException("Backlog with id: '" + projectIdentifier + "' not found!");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(id);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with id:" + id + "' not found.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (backlog == null) throw  new ProjectNotFoundException("Backlog with id: '" + backlog_id + "' not found!");

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project task: '" + pt_id + "' not found.");
        }

        if (!projectTask.getBacklog().getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project task :'" + pt_id + "' does not exist in project '" + backlog_id + "'");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String pt_id) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id);
        projectTask = updatedProjectTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id);
        projectTaskRepository.delete(projectTask);
    }
}
