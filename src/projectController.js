import { projectFactory } from './projectFactory.js'
import { entryFactory } from './entryFactory.js'
import { DOMController } from './domController.js'

let projectController = (() => {

	let projectsCounter = 0;
	let projectArray = [];

	const addtoArray = (projectObj) => {

		projectArray.push(projectObj);
		projectsCounter+=1; 

	};

	const editProject = (projectId, project_name,project_descrip) => {

		projectArray[projectId].proj_name = project_name;
		projectArray[projectId].proj_description = project_descrip;

	};

	const deleteProject = (indexToRemove) => {
		projectArray.splice(indexToRemove,1);
		projectsCounter -= 1;

		for(let i =0;i<projectArray.length;i++)
		{
			projectArray[i].projectId = i;
		}

	};

	const addNewProject = (project_name,project_descrip) => {
		let newProj = projectFactory();
		newProj.proj_name = project_name;
		newProj.proj_description = project_descrip;

		newProj.projectId = projectsCounter;
		addtoArray(newProj);
	};

	const addEntrytoProject = (projectId,task) => {	
		let entry = entryFactory();
		entry.entry_descrip = task;
		entry.entryId = projectArray[projectId].returnCounter();
		projectArray[projectId].addtoEntryArray(entry);
	};

	const editEntryinProject = (projectId, entryId,task) => {
		let entry = entryFactory();
		entry.entry_descrip = task;
		projectArray[projectId].editEntryArray(entryId,entry);
	};

	const deleteEntryinProject = (projectId, entryId) => {
		projectArray[projectId].deleteEntry(entryId);
	};

	const returnProjectsCounter = () => {
		return projectsCounter;
	};

	return {addNewProject,addEntrytoProject, editEntryinProject,editProject,deleteProject,deleteEntryinProject,returnProjectsCounter,projectArray};
})();

export {projectController}
