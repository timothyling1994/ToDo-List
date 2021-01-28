const entryFactory = () => {
	
	let entry = {

		entryId:0,
		dueDate: "",
		entry_descrip:"",
		checked:false,

	};

	const editField = (fieldName,newValue) => {
		entry[fieldName] = newValue;
	};

	const returnField = (fieldName) => {
		return entry[fieldName];
	};

	const changeChecked = ()=>
	{
		entry.checked = !entry.checked; 
	};

	return {editField, changeChecked,returnField};	
};

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
		DOMController.updateProjectPanelDOM();
	};

	const deleteProject = (indexToRemove) => {
		projectArray.splice(indexToRemove,1);
		projectsCounter -= 1;

		for(let i =0;i<projectArray.length;i++)
		{
			projectArray[i].projectId = i;
		}

		DOMController.updateDOM();
		DOMController.updateProjectPanelDOM();
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

	const returnProjectsCounter = () => {
		return projectsCounter;
	};

	return {addNewProject,addEntrytoProject, editProject,deleteProject,returnProjectsCounter,projectArray};
})();

let projectFactory = () => {

	let projectId = 0;
	let proj_name = "";
	let proj_description = "";

	let entryCounter = 0;

	let entryArray = [];

	const returnCounter = () =>{
		return entryCounter;
	}
	const addtoEntryArray = (task) => {
		entryArray.push(task);
		entryCounter += 1;
	};

	return {entryArray,returnCounter,addtoEntryArray};
};

let DOMController = (() => {

	let project_panel;
	let project_entries;
	let toEdit;

	const init = () => {

		project_panel = document.querySelector("#project-panel");
		project_entries = document.querySelector("#project-main");

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
			updateProjectPanelDOM();

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
			addTasksDOM(id);

		}
	};

	const updateProjectPanelDOM = () => {
		deletePanelDOM();

		let length = projectController.projectArray.length;
		let panel = document.querySelector("#project-panel");

		let add_proj_btn = document.querySelector("#add-project");


		for (let i = 0;i<length; i++)
		{
			let project_name = projectController.projectArray[i].proj_name; 
			let newDiv = document.createElement("div");
			newDiv.setAttribute("id","panel-"+i);
			newDiv.classList.add("panel-item");

			let text = document.createTextNode(project_name);
			newDiv.appendChild(text);

			panel.insertBefore(newDiv,add_proj_btn);

		}
	};

	const deletePanelDOM = () =>
	{
		let nodelist = document.querySelectorAll(".panel-item");
		nodelist.forEach(node=>{
			node.parentElement.removeChild(node);
		});
	};

	const deleteDOM = () => {
		while(project_entries.firstChild)
		{
			project_entries.removeChild(project_entries.lastChild);
		}
	};

	const addTasksDOM = (addToProjectId) => {
		
		let length = projectController.projectArray[addToProjectId].entryArray.length;
		let divSearch = "#project-" + addToProjectId;
		let addToProject = document.querySelector(divSearch);


		for (let i=0;i<length;i++)
		{
			let currentEntry = projectController.projectArray[addToProjectId].entryArray[i];

			let taskDOM = document.createElement("div");
			taskDOM.classList.add("task-row");
			taskDOM.setAttribute("id","entry-"+i);
			let checkbox = document.createElement("div");
			checkbox.classList.add("check-box");

			if(currentEntry.returnField("checked") == true)
			{
				checkbox.classList.add("checked");
			}

			checkbox.addEventListener("click",function(){
				if(this.classList.contains("checked"))
				{
					this.classList.remove("checked");
					let projectId = this.closest(".project").getAttribute("value");
					let entryId = taskDOM.closest(".task-row").getAttribute("id").substr(6);
					projectController.projectArray[projectId].entryArray[entryId].changeChecked();
				}
				else
				{
					this.classList.add("checked");
					let projectId = this.closest(".project").getAttribute("value");
					let entryId = taskDOM.closest(".task-row").getAttribute("id").substr(6);
					projectController.projectArray[projectId].entryArray[entryId].changeChecked();
				}
			});

			taskDOM.appendChild(checkbox);



			let taskText = projectController.projectArray[addToProjectId].entryArray[i].entry_descrip;
			let textNode = document.createTextNode(taskText);
			taskDOM.appendChild(textNode);



			addToProject.insertBefore(taskDOM,addToProject.querySelector(".add-task"));
		}

	};

	const entryDetailsDOM = (addToProjectId, addEntryBtn) => {

		let divSearch = "#project-" + addToProjectId;
		let addToProject = document.querySelector(divSearch);

		let entryDetails = document.createElement("div");
		entryDetails.classList.add("task-row");

		let task_name_input = document.createElement("input");
		task_name_input.classList.add("task-name-input");
		task_name_input.setAttribute("type","text");

		let due_date = document.createElement("div");
		due_date.setAttribute("id","due-date");

		let submit_task_btn = document.createElement("div");
		submit_task_btn.classList.add("submit-task");
		let text = document.createTextNode("Submit");
		submit_task_btn.appendChild(text);

		submit_task_btn.addEventListener("click",function(){

			let task = this.parentElement.querySelector(".task-name-input").value;
			let projectId = this.closest(".project").getAttribute("value");
			projectController.addEntrytoProject(projectId,task);
			updateDOM();		
		});

		let cancel_task_btn = document.createElement("div");
		cancel_task_btn.classList.add("cancel-task");
		text = document.createTextNode("Cancel");
		cancel_task_btn.appendChild(text);

		cancel_task_btn.addEventListener("click",function(){
			this.closest(".project").removeChild(this.parentElement);
		});

		entryDetails.appendChild(task_name_input,entryDetails);
		entryDetails.appendChild(due_date,entryDetails);
		entryDetails.appendChild(submit_task_btn,entryDetails);
		entryDetails.appendChild(cancel_task_btn,entryDetails);

		addToProject.insertBefore(entryDetails,addEntryBtn);

	}

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
		newProjectDiv.setAttribute("id","project-"+ project_id);
		newProjectDiv.setAttribute("value",project_id);
		newProjectDiv.classList.add("project");

		newProjectDiv.appendChild(projectInfo,newProjectDiv);
		newProjectDiv.appendChild(projectBtns,newProjectDiv);

		let divider = document.createElement("div");
		divider.classList.add("main-divider");
		newProjectDiv.appendChild(divider);


		let addEntryBtn = document.createElement("div");
		addEntryBtn.classList.add("add-task");
		let span = document.createElement("span");
		let spanText = document.createTextNode("+");
		span.appendChild(spanText);
		span.classList.add("plus-icon");

		let addEntryText = document.createTextNode(" Add Task");
		addEntryBtn.appendChild(span);
		addEntryBtn.appendChild(addEntryText);
		addEntryBtn.addEventListener("click",function(){
			let addtoProjectId = this.closest(".project").getAttribute("value");
			entryDetailsDOM(addtoProjectId, this);
		});

		newProjectDiv.appendChild(addEntryBtn,newProjectDiv);


		project_entries.appendChild(newProjectDiv,project_entries);


	};

	return{init,updateDOM,updateProjectPanelDOM, deleteDOM};

})();


function theDomHasLoaded(e) {
	DOMController.init();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


