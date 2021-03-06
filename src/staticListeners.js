import {projectController} from './projectController.js'
import {DOMController} from './domController.js'


let staticListeners = () => {		

		let project_panel = document.querySelector("#project-panel");
		let project_entries = document.querySelector("#project-main");
		let all_btn = document.querySelector("#all");

		let addModal = document.getElementById("modalWindow");
		let editModal = document.getElementById("editModalWindow");
		let add_proj_btn = document.querySelector("#add-project");
		let modal_close_btn = document.getElementsByClassName("close")[0];
		let edit_modal_close_btn = document.getElementsByClassName("close")[1];
		let add_submit_btn = document.querySelector("#submit-add");
		let edit_submit_btn = document.querySelector("#submit-edit");

		all.addEventListener("click",function(){
			let nodelist = document.querySelectorAll(".panel-item");
			nodelist.forEach(node=>{
				if(node.classList.contains("panel-highlight"))
				{
					node.classList.remove("panel-highlight");
				}
			});
			this.classList.add("panel-highlight");
			DOMController.toggleisAllTab();
			DOMController.updateAllDOM();

		});

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
			if(DOMController.returnisAllTab()){
				DOMController.updateAllDOM();
				DOMController.updateProjectPanelDOM();
			}
			else
			{
				
				DOMController.updateDOM(id);
				DOMController.updateProjectPanelDOM();
				
				let highlight_panel_item = document.querySelector("#panel-"+id);
				highlight_panel_item.classList.add("panel-highlight");
			}


			addModal.style.display = "none";
		});

		edit_submit_btn.addEventListener("click",function(){
			//console.log(this);
			DOMController.sendEditedDetails(this);
			editModal.style.display="none";
		});
}
export {staticListeners}
