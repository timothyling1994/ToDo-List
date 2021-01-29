/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domController.js":
/*!******************************!*\
  !*** ./src/domController.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMController\": () => /* binding */ DOMController\n/* harmony export */ });\n/* harmony import */ var _projectController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectController.js */ \"./src/projectController.js\");\n/* harmony import */ var _staticListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staticListeners.js */ \"./src/staticListeners.js\");\n\n\n\n\nvar DOMController = function () {\n  var project_panel;\n  var project_entries;\n  var toEdit;\n\n  var init = function init() {\n    (0,_staticListeners_js__WEBPACK_IMPORTED_MODULE_1__.staticListeners)();\n    project_panel = document.querySelector(\"#project-panel\");\n    project_entries = document.querySelector(\"#project-main\");\n  };\n\n  var sendEditedDetails = function sendEditedDetails() {\n    var edited_proj_name = document.querySelector(\"#edit-project-name-input\").value;\n    var edited_proj_descrip = document.querySelector(\"#edit-project-descrip-input\").value;\n    _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.editProject(toEdit, edited_proj_name, edited_proj_descrip);\n  };\n\n  var updateDOM = function updateDOM() {\n    deleteDOM();\n    var length = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray.length;\n\n    for (var i = 0; i < length; i++) {\n      var project_name = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[i].proj_name;\n      var project_descrip = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[i].proj_description;\n      var id = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[i].projectId;\n      addNewProjectDOM(project_name, project_descrip, id);\n      addTasksDOM(id);\n    }\n  };\n\n  var updateProjectPanelDOM = function updateProjectPanelDOM() {\n    deletePanelDOM();\n    var length = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray.length;\n    var panel = document.querySelector(\"#project-panel\");\n    var add_proj_btn = document.querySelector(\"#add-project\");\n\n    for (var i = 0; i < length; i++) {\n      var project_name = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[i].proj_name;\n      var newDiv = document.createElement(\"div\");\n      newDiv.setAttribute(\"id\", \"panel-\" + i);\n      newDiv.classList.add(\"panel-item\");\n      var text = document.createTextNode(project_name);\n      newDiv.appendChild(text);\n      panel.insertBefore(newDiv, add_proj_btn);\n    }\n  };\n\n  var deletePanelDOM = function deletePanelDOM() {\n    var nodelist = document.querySelectorAll(\".panel-item\");\n    nodelist.forEach(function (node) {\n      node.parentElement.removeChild(node);\n    });\n  };\n\n  var deleteDOM = function deleteDOM() {\n    while (project_entries.firstChild) {\n      project_entries.removeChild(project_entries.lastChild);\n    }\n  };\n\n  var addTasksDOM = function addTasksDOM(addToProjectId) {\n    var length = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[addToProjectId].entryArray.length;\n    var divSearch = \"#project-\" + addToProjectId;\n    var addToProject = document.querySelector(divSearch);\n\n    var _loop = function _loop(i) {\n      var currentEntry = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[addToProjectId].entryArray[i];\n      var taskDOM = document.createElement(\"div\");\n      taskDOM.classList.add(\"task-row\");\n      taskDOM.setAttribute(\"id\", \"entry-\" + i);\n      taskDOM.addEventListener(\"click\", function () {\n        console.log(\"hi\"); //entryDetailsDOM = (addToProjectId, addEntryBtn)\n      });\n      var checkbox = document.createElement(\"div\");\n      checkbox.classList.add(\"check-box\");\n\n      if (currentEntry.returnField(\"checked\") == true) {\n        checkbox.classList.add(\"checked\");\n      }\n\n      checkbox.addEventListener(\"click\", function () {\n        if (this.classList.contains(\"checked\")) {\n          this.classList.remove(\"checked\");\n          var projectId = this.closest(\".project\").getAttribute(\"value\");\n          var entryId = taskDOM.closest(\".task-row\").getAttribute(\"id\").substr(6);\n          _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[projectId].entryArray[entryId].changeChecked();\n        } else {\n          this.classList.add(\"checked\");\n\n          var _projectId = this.closest(\".project\").getAttribute(\"value\");\n\n          var _entryId = taskDOM.closest(\".task-row\").getAttribute(\"id\").substr(6);\n\n          _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[_projectId].entryArray[_entryId].changeChecked();\n        }\n      });\n      taskDOM.appendChild(checkbox);\n      var text_container = document.createElement(\"div\");\n      var taskText = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.projectArray[addToProjectId].entryArray[i].entry_descrip;\n      var textNode = document.createTextNode(taskText);\n      text_container.appendChild(textNode);\n      text_container.addEventListener(\"click\", function () {\n        var addTaskbtn = this.closest(\".project\").querySelector(\".add-task\");\n        var addToProjectId = this.closest(\".project\").getAttribute(\"value\");\n        console.log(text_container);\n        entryDetailsDOM(addToProjectId, addTaskbtn, true);\n      });\n      taskDOM.appendChild(text_container, taskDOM);\n      addToProject.insertBefore(taskDOM, addToProject.querySelector(\".add-task\"));\n    };\n\n    for (var i = 0; i < length; i++) {\n      _loop(i);\n    }\n  };\n\n  var entryDetailsDOM = function entryDetailsDOM(addToProjectId, addEntryBtn, editingEntry) {\n    editingEntry = editingEntry || false;\n    var divSearch = \"#project-\" + addToProjectId;\n    var addToProject = document.querySelector(divSearch);\n    var entryDetails = document.createElement(\"div\");\n    entryDetails.classList.add(\"task-row\");\n    var task_name_input = document.createElement(\"input\");\n    task_name_input.classList.add(\"task-name-input\");\n    task_name_input.setAttribute(\"type\", \"text\");\n    /*if(editingEntry)\n    {\n    \ttask_name_input.value=\n    }*/\n\n    var due_date = document.createElement(\"div\");\n    due_date.setAttribute(\"id\", \"due-date\");\n    var submit_task_btn = document.createElement(\"div\");\n    submit_task_btn.classList.add(\"submit-task\");\n    var text = document.createTextNode(\"Submit\");\n    submit_task_btn.appendChild(text);\n    submit_task_btn.addEventListener(\"click\", function () {\n      var task = this.parentElement.querySelector(\".task-name-input\").value;\n      var projectId = this.closest(\".project\").getAttribute(\"value\");\n      _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.addEntrytoProject(projectId, task);\n      updateDOM();\n    });\n    var cancel_task_btn = document.createElement(\"div\");\n    cancel_task_btn.classList.add(\"cancel-task\");\n    text = document.createTextNode(\"Cancel\");\n    cancel_task_btn.appendChild(text);\n    cancel_task_btn.addEventListener(\"click\", function () {\n      this.closest(\".project\").removeChild(this.parentElement);\n    });\n    entryDetails.appendChild(task_name_input, entryDetails);\n    entryDetails.appendChild(due_date, entryDetails);\n    entryDetails.appendChild(submit_task_btn, entryDetails);\n    entryDetails.appendChild(cancel_task_btn, entryDetails);\n    addToProject.insertBefore(entryDetails, addEntryBtn);\n  };\n\n  var addNewProjectDOM = function addNewProjectDOM(project_name, project_descrip, project_id) {\n    var editModal = document.querySelector(\"#editModalWindow\");\n    var projectInfo = document.createElement(\"div\");\n    projectInfo.setAttribute(\"class\", \"project-info\"); //projectInfo.setAttribute(\"value\",\"project-info\");\n\n    var nameDiv = document.createElement(\"div\");\n    var nameTextNode = document.createTextNode(project_name);\n    nameDiv.appendChild(nameTextNode);\n    nameDiv.classList.add(\"project-name\");\n    var descriptionDiv = document.createElement(\"div\");\n    var descripTextNode = document.createTextNode(project_descrip);\n    descriptionDiv.appendChild(descripTextNode);\n    descriptionDiv.classList.add(\"project-description\");\n    projectInfo.appendChild(nameDiv, projectInfo);\n    projectInfo.appendChild(descriptionDiv, projectInfo);\n    var projectBtns = document.createElement(\"div\");\n    projectBtns.setAttribute(\"class\", \"project-btns-container\");\n    var editBtn = document.createElement(\"div\");\n    editBtn.classList.add(\"project-btns\");\n    editBtn.addEventListener(\"click\", function () {\n      var edit_name = document.querySelector(\"#edit-project-name-input\");\n      var edit_descrip = document.querySelector(\"#edit-project-descrip-input\");\n      var name_placeholder = this.parentElement.previousSibling.firstChild.textContent;\n      var descrip_placeholder = this.parentElement.previousSibling.firstChild.nextSibling.textContent;\n      toEdit = this.closest(\".project\").getAttribute(\"value\");\n      edit_name.value = name_placeholder;\n      edit_descrip.value = descrip_placeholder;\n      editModal.style.display = \"block\";\n    });\n    var editText = document.createTextNode(\"Edit\");\n    editBtn.appendChild(editText);\n    var deleteBtn = document.createElement(\"div\");\n    deleteBtn.classList.add(\"project-btns\");\n    deleteBtn.addEventListener(\"click\", function () {\n      var deleteProjectId = this.closest(\".project\").getAttribute(\"value\");\n      _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.deleteProject(deleteProjectId);\n    });\n    var deleteText = document.createTextNode(\"Delete\");\n    deleteBtn.appendChild(deleteText);\n    projectBtns.appendChild(editBtn, projectBtns);\n    projectBtns.appendChild(deleteBtn, projectBtns);\n    var newProjectDiv = document.createElement(\"div\");\n    newProjectDiv.setAttribute(\"id\", \"project-\" + project_id);\n    newProjectDiv.setAttribute(\"value\", project_id);\n    newProjectDiv.classList.add(\"project\");\n    newProjectDiv.appendChild(projectInfo, newProjectDiv);\n    newProjectDiv.appendChild(projectBtns, newProjectDiv);\n    var divider = document.createElement(\"div\");\n    divider.classList.add(\"main-divider\");\n    newProjectDiv.appendChild(divider);\n    var addEntryBtn = document.createElement(\"div\");\n    addEntryBtn.classList.add(\"add-task\");\n    var span = document.createElement(\"span\");\n    var spanText = document.createTextNode(\"+\");\n    span.appendChild(spanText);\n    span.classList.add(\"plus-icon\");\n    var addEntryText = document.createTextNode(\" Add Task\");\n    addEntryBtn.appendChild(span);\n    addEntryBtn.appendChild(addEntryText);\n    addEntryBtn.addEventListener(\"click\", function () {\n      var addtoProjectId = this.closest(\".project\").getAttribute(\"value\");\n      entryDetailsDOM(addtoProjectId, this);\n    });\n    newProjectDiv.appendChild(addEntryBtn, newProjectDiv);\n    project_entries.appendChild(newProjectDiv, project_entries);\n  };\n\n  return {\n    init: init,\n    updateDOM: updateDOM,\n    updateProjectPanelDOM: updateProjectPanelDOM,\n    sendEditedDetails: sendEditedDetails,\n    addNewProjectDOM: addNewProjectDOM,\n    deleteDOM: deleteDOM\n  };\n}();\n\n\n\n//# sourceURL=webpack://todo-list/./src/domController.js?");

/***/ }),

/***/ "./src/entryFactory.js":
/*!*****************************!*\
  !*** ./src/entryFactory.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"entryFactory\": () => /* binding */ entryFactory\n/* harmony export */ });\nvar entryFactory = function entryFactory() {\n  var entry = {\n    entryId: 0,\n    dueDate: \"\",\n    entry_descrip: \"\",\n    checked: false\n  };\n\n  var editField = function editField(fieldName, newValue) {\n    entry[fieldName] = newValue;\n  };\n\n  var returnField = function returnField(fieldName) {\n    return entry[fieldName];\n  };\n\n  var changeChecked = function changeChecked() {\n    entry.checked = !entry.checked;\n  };\n\n  return {\n    editField: editField,\n    changeChecked: changeChecked,\n    returnField: returnField\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/entryFactory.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domController.js */ \"./src/domController.js\");\n\n\nfunction theDomHasLoaded(e) {\n  _domController_js__WEBPACK_IMPORTED_MODULE_0__.DOMController.init();\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", theDomHasLoaded, false);\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/projectController.js":
/*!**********************************!*\
  !*** ./src/projectController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectController\": () => /* binding */ projectController\n/* harmony export */ });\n/* harmony import */ var _projectFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFactory.js */ \"./src/projectFactory.js\");\n/* harmony import */ var _entryFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entryFactory.js */ \"./src/entryFactory.js\");\n/* harmony import */ var _domController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domController.js */ \"./src/domController.js\");\n\n\n\n\nvar projectController = function () {\n  //projectArray with projectId has index\n  var projectsCounter = 0;\n  var projectArray = [];\n\n  var addtoArray = function addtoArray(projectObj) {\n    projectArray.push(projectObj);\n    projectsCounter += 1;\n  };\n\n  var editProject = function editProject(projectId, project_name, project_descrip) {\n    projectArray[projectId].proj_name = project_name;\n    projectArray[projectId].proj_description = project_descrip;\n    _domController_js__WEBPACK_IMPORTED_MODULE_2__.DOMController.updateDOM();\n    _domController_js__WEBPACK_IMPORTED_MODULE_2__.DOMController.updateProjectPanelDOM();\n  };\n\n  var deleteProject = function deleteProject(indexToRemove) {\n    projectArray.splice(indexToRemove, 1);\n    projectsCounter -= 1;\n\n    for (var i = 0; i < projectArray.length; i++) {\n      projectArray[i].projectId = i;\n    }\n\n    _domController_js__WEBPACK_IMPORTED_MODULE_2__.DOMController.updateDOM();\n    _domController_js__WEBPACK_IMPORTED_MODULE_2__.DOMController.updateProjectPanelDOM();\n  };\n\n  var addNewProject = function addNewProject(project_name, project_descrip) {\n    var newProj = (0,_projectFactory_js__WEBPACK_IMPORTED_MODULE_0__.projectFactory)();\n    newProj.proj_name = project_name;\n    newProj.proj_description = project_descrip;\n    newProj.projectId = projectsCounter;\n    addtoArray(newProj);\n  };\n\n  var addEntrytoProject = function addEntrytoProject(projectId, task) {\n    var entry = (0,_entryFactory_js__WEBPACK_IMPORTED_MODULE_1__.entryFactory)();\n    entry.entry_descrip = task;\n    entry.entryId = projectArray[projectId].returnCounter();\n    projectArray[projectId].addtoEntryArray(entry);\n  };\n\n  var returnProjectsCounter = function returnProjectsCounter() {\n    return projectsCounter;\n  };\n\n  return {\n    addNewProject: addNewProject,\n    addEntrytoProject: addEntrytoProject,\n    editProject: editProject,\n    deleteProject: deleteProject,\n    returnProjectsCounter: returnProjectsCounter,\n    projectArray: projectArray\n  };\n}();\n\n\n\n//# sourceURL=webpack://todo-list/./src/projectController.js?");

/***/ }),

/***/ "./src/projectFactory.js":
/*!*******************************!*\
  !*** ./src/projectFactory.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectFactory\": () => /* binding */ projectFactory\n/* harmony export */ });\nvar projectFactory = function projectFactory() {\n  var projectId = 0;\n  var proj_name = \"\";\n  var proj_description = \"\";\n  var entryCounter = 0;\n  var entryArray = [];\n\n  var returnCounter = function returnCounter() {\n    return entryCounter;\n  };\n\n  var addtoEntryArray = function addtoEntryArray(task) {\n    entryArray.push(task);\n    entryCounter += 1;\n  };\n\n  return {\n    entryArray: entryArray,\n    returnCounter: returnCounter,\n    addtoEntryArray: addtoEntryArray\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/projectFactory.js?");

/***/ }),

/***/ "./src/staticListeners.js":
/*!********************************!*\
  !*** ./src/staticListeners.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"staticListeners\": () => /* binding */ staticListeners\n/* harmony export */ });\n/* harmony import */ var _projectController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectController.js */ \"./src/projectController.js\");\n/* harmony import */ var _domController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domController.js */ \"./src/domController.js\");\n\n\n\nvar staticListeners = function staticListeners() {\n  var project_panel = document.querySelector(\"#project-panel\");\n  var project_entries = document.querySelector(\"#project-main\");\n  var addModal = document.getElementById(\"modalWindow\");\n  var editModal = document.getElementById(\"editModalWindow\");\n  var add_proj_btn = document.querySelector(\"#add-project\");\n  var modal_close_btn = document.getElementsByClassName(\"close\")[0];\n  var edit_modal_close_btn = document.getElementsByClassName(\"close\")[1];\n  var add_submit_btn = document.querySelector(\"#submit-add\");\n  var edit_submit_btn = document.querySelector(\"#submit-edit\");\n  add_proj_btn.addEventListener(\"click\", function () {\n    addModal.style.display = \"block\";\n  });\n  modal_close_btn.addEventListener(\"click\", function () {\n    addModal.style.display = \"none\";\n  });\n  edit_modal_close_btn.addEventListener(\"click\", function () {\n    editModalWindow.style.display = \"none\";\n  });\n  add_submit_btn.addEventListener(\"click\", function () {\n    var proj_name = document.querySelector(\"#project-name-input\").value;\n    var proj_descrip = document.querySelector(\"#project-descrip-input\").value;\n    _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.addNewProject(proj_name, proj_descrip);\n    var id = _projectController_js__WEBPACK_IMPORTED_MODULE_0__.projectController.returnProjectsCounter() - 1;\n    _domController_js__WEBPACK_IMPORTED_MODULE_1__.DOMController.addNewProjectDOM(proj_name, proj_descrip, id);\n    _domController_js__WEBPACK_IMPORTED_MODULE_1__.DOMController.updateProjectPanelDOM();\n    addModal.style.display = \"none\";\n  });\n  edit_submit_btn.addEventListener(\"click\", function () {\n    _domController_js__WEBPACK_IMPORTED_MODULE_1__.DOMController.sendEditedDetails();\n    editModal.style.display = \"none\";\n  });\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/staticListeners.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;