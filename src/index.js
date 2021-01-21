/*const entryFactory = () => {
	
	let entry = {

		entryId:0,
		projectId:"",
		projectName:"",
		title: "",
		description: "",
		dueDate: "",
		priority:1, 

	};

	const editField = (fieldName,newValue) => {
		entry[fieldName] = newValue;
	};

	const returnField = (fieldName) => {
		return entry[fieldName];
	};

	return {editField, returnField};	
};*/

let projectController = (() => {

	//projectArray with projectId has index
	let projectsCounter = 0;
	let projectArray = [];

	const addtoArray = (projectObj) => {

		projectArray.push(projectObj);
		projectsCounter+=1; 

	};

	/*const editArray = (projectId, fieldName, newValue) => {

		projectArray[projectId] = project;

	};*/

	const editProject = (projectId, project_name,project_descrip) => {
		projectArray[projectId].proj_name = project_name;
		projectArray[projectId].project_descrip = project_descrip;
		//link DOMController
	};

	const addNewProject = (project_name,project_descrip) => {
		let newProj = projectFactory();
		newProj.proj_name = project_name;
		newProj.proj_description = project_descrip;

		newProj.projectId = projectsCounter;
		addtoArray(newProj);
	};

	const returnProjectsCounter = () => {
		return projectsCounter;
	};

	return {addNewProject,returnProjectsCounter,projectArray};
})();

let projectFactory = () => {

	let projectId = 0;
	let proj_name = "";
	let proj_description = "";

	let entryCounter = 0;

	let entryArray = [];

	/*
	const returnEntryArray = (index) => {
		return entryArray[index];
	};

	const addEntry = (entryIdVal, projectIdVal, projectNameVal, titleVal, descriptionVal,dueDateVal,priorityVal) => {
		
		let newEntry = entryFactory();

		newEntry.editField("entryId",entryIdVal);
		newEntry.editField("projectId",projectIdVal);
		newEntry.editField("projectName",projectNameVal);
		newEntry.editField("title",titleVal);
		newEntry.editField("description",descriptionVal);
		newEntry.editField("dueDate",dueDateVal);
		newEntry.editField("priority",priorityVal);
	};

	const editEntry = (entryId, fieldName, newValue) => {
		
	};		

	const addtoEntryArray = (entry) => {
		entryArray.push(newEntry);
		entryCounter += entryCounter;
	};*/

	return {entryArray};
};

let DOMController = (() => {

	let project_panel;
	let project_entries;

	const init = () => {
		project_panel = document.querySelector("#project-panel");
		project_entries = document.querySelector("#project-entries");

		let addModal = document.getElementById("modalWindow");

		let add_proj_btn = document.querySelector("#add-project");

		add_proj_btn.addEventListener("click",function(){
			addModal.style.display = "block";
		});

		let modal_close_btn = document.getElementsByClassName("close")[0];

		modal_close_btn.addEventListener("click",function(){
			addModal.style.display = "none";
		});

		let add_submit_btn = document.querySelector("#submit");
		add_submit_btn.addEventListener("click",function(){

			let proj_name = document.querySelector("#project-name-input").value;
 			let proj_descrip = document.querySelector("#project-descrip-input").value;

			projectController.addNewProject(proj_name,proj_descrip);
			let id = projectController.returnProjectsCounter() - 1;
			addNewProjectDOM(proj_name,proj_descrip,id);

			addModal.style.display = "none";
		});

	}

	const addNewProjectDOM = (project_name, project_descrip, project_id) => {

		let newProjectDiv =  document.createElement("div");
		newProjectDiv.setAttribute("id","project-"+project_id);
		newProjectDiv.classList.add("project");

		let projectInfo = document.createElement("div");
		projectInfo.setAttribute("id","project-info");


		let nameDiv =  document.createElement("div");
		let nameTextNode = document.createTextNode(project_name);
		nameDiv.appendChild(nameTextNode);
		nameDiv.classList.add("project-name")

		let descriptionDiv =  document.createElement("div");
		let descripTextNode = document.createTextNode(project_descrip);
		descriptionDiv.appendChild(descripTextNode);
		descriptionDiv.classList.add("project-description")

		projectInfo.appendChild(nameDiv,projectInfo);
		projectInfo.appendChild(descriptionDiv,projectInfo);
		newProjectDiv.appendChild(projectInfo,newProjectDiv);


		let projectBtns = document.createElement("div");
		projectBtns.setAttribute("id","project-btns-container");

		let editBtn = document.createElement("div");
		editBtn.classList.add("project-btns")
		let editText = document.createTextNode("Edit");
		editBtn.appendChild(editText);

		let deleteBtn = document.createElement("div");
		deleteBtn.classList.add("project-btns")
		let deleteText = document.createTextNode("Delete");
		deleteBtn.appendChild(deleteText);

		projectBtns.appendChild(editBtn,projectBtns);
		projectBtns.appendChild(deleteBtn,projectBtns);
		newProjectDiv.appendChild(projectBtns,newProjectDiv);


		project_entries.appendChild(newProjectDiv,project_entries);

	};

	return{init};

})();


function theDomHasLoaded(e) {
	DOMController.init();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


