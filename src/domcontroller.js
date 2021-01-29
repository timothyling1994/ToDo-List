import { compareAsc, format } from 'date-fns'
import { projectController } from './projectController.js'
import { staticListeners } from './staticListeners.js'

let DOMController = (() => {

	let project_panel;
	let project_entries;
	let toEdit;

	const init = () => {

		staticListeners();
		project_panel = document.querySelector("#project-panel");
		project_entries = document.querySelector("#project-main");
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


			let text_container = document.createElement("div");
			let taskText = projectController.projectArray[addToProjectId].entryArray[i].entry_descrip;
			let textNode = document.createTextNode(taskText);
			text_container.appendChild(textNode);

			text_container.addEventListener("click",function(){
		
				this.parentElement.style.display="none";
				let addToProjectId = this.closest(".project").getAttribute("value");

				entryDetailsDOM(addToProjectId, this.parentElement,true,text_container.textContent);
				//entryDetailsDOM(addToProjectId,addTaskbtn,true,text_container.textContent);
			});

			taskDOM.appendChild(text_container,taskDOM);



			addToProject.insertBefore(taskDOM,addToProject.querySelector(".add-task"));
		}

	};

	const entryDetailsDOM = (addToProjectId, addEntryBtn, editingEntry,editTaskName) => {

		editingEntry = editingEntry || false; 

		let divSearch = "#project-" + addToProjectId;
		let addToProject = document.querySelector(divSearch);

		let entryDetails = document.createElement("div");
		entryDetails.classList.add("task-row");

		let task_name_input = document.createElement("input");
		task_name_input.classList.add("task-name-input");
		task_name_input.setAttribute("type","text");

		if(editingEntry)
		{
			task_name_input.value=editTaskName;
		}

		let due_date = document.createElement("div");
		due_date.setAttribute("id","due-date");

		let submit_task_btn = document.createElement("div");
		submit_task_btn.classList.add("submit-task");
		let text = document.createTextNode("Submit");
		submit_task_btn.appendChild(text);

		submit_task_btn.addEventListener("click",function(){
			if(editingEntry)
			{

			}
			else
			{
				let task = this.parentElement.querySelector(".task-name-input").value;
				let projectId = this.closest(".project").getAttribute("value");
				projectController.addEntrytoProject(projectId,task);
				updateDOM();
			}		
		});

		let cancel_task_btn = document.createElement("div");
		cancel_task_btn.classList.add("cancel-task");
		text = document.createTextNode("Cancel");
		cancel_task_btn.appendChild(text);

		cancel_task_btn.addEventListener("click",function(){
			if(editingEntry)
			{
				console.log(this.parentElement.nextSibling);
				this.parentElement.nextSibling.style.display="flex";
				this.closest(".project").removeChild(this.parentElement);
				editingEntry = false;
			}
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

	return{init,updateDOM,updateProjectPanelDOM,sendEditedDetails,addNewProjectDOM,deleteDOM};

})();

export {DOMController}