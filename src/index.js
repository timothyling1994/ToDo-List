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
		projectArray[projectId].proj_description = project_descrip;

		DOMController.updateDOM();
	};

	const deleteProject = (indexToRemove) => {
		projectArray.splice(indexToRemove,1);
		projectsCounter -= 1;

		for(let i =0;i<projectArray.length;i++)
		{
			projectArray[i].projectId = i;
		}

		DOMController.updateDOM();
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

	return {addNewProject,editProject,deleteProject,returnProjectsCounter,projectArray};
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
	let toEdit;

	const init = () => {

		project_panel = document.querySelector("#project-panel");
		project_entries = document.querySelector("#project-entries");

		let addModal = document.getElementById("modalWindow");
		let editModal = document.getElementById("editModalWindow");
		let add_proj_btn = document.querySelector("#add-project");
		let modal_close_btn = document.getElementsByClassName("close")[0];
		let edit_modal_close_btn = document.getElementsByClassName("close")[1];
		let add_submit_btn = document.querySelector("#submit-add");
		let edit_submit_btn = document.querySelector("#submit-edit");

		add_proj_btn.addEventListener("click",function(){
			addModal.style.display = "block";
		});

		modal_close_btn.addEventListener("click",function(){
			addModal.style.display = "none";
		});

		edit_modal_close_btn.addEventListener("click",function(){
			editModalWindow.style.display = "none";
		});

		add_submit_btn.addEventListener("click",function(){

			let proj_name = document.querySelector("#project-name-input").value;
 			let proj_descrip = document.querySelector("#project-descrip-input").value;

			projectController.addNewProject(proj_name,proj_descrip);
			let id = projectController.returnProjectsCounter() - 1;
			addNewProjectDOM(proj_name,proj_descrip,id);

			addModal.style.display = "none";
		});

		edit_submit_btn.addEventListener("click",function(){
			sendEditedDetails();
			editModal.style.display="none";
		});

	}

	const sendEditedDetails = () => {

		let edited_proj_name = document.querySelector("#edit-project-name-input").value;
		let edited_proj_descrip = document.querySelector("#edit-project-descrip-input").value;

		console.log("after submit:" + toEdit);
		projectController.editProject(toEdit, edited_proj_name,edited_proj_descrip);


	};
	

	const updateDOM = () => {
		deleteDOM();

		let length = projectController.projectArray.length;

		for (let i = 0;i<length; i++)
		{
			let project_name = projectController.projectArray[i].proj_name; 
			let project_descrip = projectController.projectArray[i].proj_description;
			let id = projectController.projectArray[i].projectId;

			addNewProjectDOM(project_name,project_descrip,id);
		}
	};

	const deleteDOM = () => {
		while(project_entries.firstChild)
		{
			project_entries.removeChild(project_entries.lastChild);
		}
	};

	const addNewProjectDOM = (project_name, project_descrip, project_id) => {

		let editModal = document.querySelector("#editModalWindow");

		let projectInfo = document.createElement("div");
		projectInfo.setAttribute("class","project-info");
		//projectInfo.setAttribute("value","project-info");

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


		let projectBtns = document.createElement("div");
		projectBtns.setAttribute("class","project-btns-container");

		let editBtn = document.createElement("div");
		editBtn.classList.add("project-btns");

		editBtn.addEventListener("click",function(){

			let edit_name = document.querySelector("#edit-project-name-input");
			let edit_descrip = document.querySelector("#edit-project-descrip-input");

			let name_placeholder = this.parentElement.previousSibling.firstChild.textContent;
			let descrip_placeholder = this.parentElement.previousSibling.firstChild.nextSibling.textContent;
			toEdit = this.closest(".project").getAttribute("value");

			console.log("before submit:" + toEdit);
			edit_name.value = name_placeholder;
			edit_descrip.value = descrip_placeholder;

			editModal.style.display="block";

		});


		let editText = document.createTextNode("Edit");
		editBtn.appendChild(editText);

		let deleteBtn = document.createElement("div");
		deleteBtn.classList.add("project-btns");
		deleteBtn.addEventListener("click",function(){
			let deleteProjectId = this.closest(".project").getAttribute("value");
			projectController.deleteProject(deleteProjectId);
		});
		let deleteText = document.createTextNode("Delete");
		deleteBtn.appendChild(deleteText);

		projectBtns.appendChild(editBtn,projectBtns);
		projectBtns.appendChild(deleteBtn,projectBtns);


		let newProjectDiv =  document.createElement("div");
		newProjectDiv.setAttribute("id","project-"+project_id);
		newProjectDiv.setAttribute("value",project_id);
		newProjectDiv.classList.add("project");

		newProjectDiv.appendChild(projectInfo,newProjectDiv);
		newProjectDiv.appendChild(projectBtns,newProjectDiv);

		let addEntryBtn = document.createElement("div");
		addEntryBtn.classList.add("add-task");
		let span = document.createElement("span");
		let spanText = document.createTextNode("+");
		span.appendChild(spanText);
		span.classList.add("plus-icon");

		let addEntryText = document.createTextNode("Add Task");
		addEntryBtn.appendChild(span);
		addEntryBtn.appendChild(addEntryText);
		addEntryBtn.addEventListener("click",function(){
			
		});

		newProjectDiv.appendChild(addEntryBtn,newProjectDiv);


		project_entries.appendChild(newProjectDiv,project_entries);


	};

	return{init,updateDOM, deleteDOM};

})();


function theDomHasLoaded(e) {
	DOMController.init();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


