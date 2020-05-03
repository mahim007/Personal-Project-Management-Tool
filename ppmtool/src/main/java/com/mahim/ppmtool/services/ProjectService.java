package com.mahim.ppmtool.services;

import com.mahim.ppmtool.domain.Backlog;
import com.mahim.ppmtool.domain.Project;
import com.mahim.ppmtool.exceptions.ProjectIdException;
import com.mahim.ppmtool.repositories.BacklogRepository;
import com.mahim.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
                project.setBacklog(backlog);
            } else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("PROJECT ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists!");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null) {
            throw new ProjectIdException("PROJECT ID '" + projectId + "' does not exist!");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);

        if (project == null) {
            throw new ProjectIdException("Can not find projectd with id: '" + projectId + "'.");
        }

        projectRepository.delete(project);
    }
}
