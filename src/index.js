const entryFactory = () => {
	
	let projectName = "";
	let title = "";
	let description = "";
	let dueDate = "";
	let priority = 1; 

	const editField = (fieldName,newValue) => {
		console.log(this);
		this[fieldName] = newValue;
		//priority = newValue;	
	};

	const returnField = (fieldName) => {
		console.log(this);
		return this[fieldName];
		//console.log(this);
		//return priority;
	};

	return {priority, editField, returnField};	
};

let entry = {

	projectName: "",
	title:"",
	description: "",
	dueDate:"",
	priority:1,

	editField:function(fieldName,newValue){
		this[fieldName] = newValue;
	},
	returnField:function(fieldName){
		return this[fieldName];
	}
}

let projectFactory = () => {

	let entryArray = [];

	//let newEntry = Object.assign({},entryFactory());
	let newEntry = entryFactory();
	newEntry.editField.call(newEntry);
	//let newEntry = Object.assign({},entry); //THIS WORKS

	entryArray.push(newEntry);

	const returnEntryArray = () => {
		return entryArray[0];
	};

	return {entryArray,returnEntryArray};
};



let firstProject = projectFactory();


/*

let firstProject = projectFactory();
let secondProject = projectFactory();

//let newEntry1 = Object.assign({},entry); //THIS WORKS
let newEntry1 = Object.assign({},entryFactory()); 

newEntry1.editField("priority",9);
//console.log("project_name:" + newEntry1.priority);
console.log(newEntry1.returnField.call(newEntry1,"priority"));

newEntry1.editField("priority",10);
console.log(newEntry1.returnField.call(newEntry1,"priority"));

//console.log(firstProject.returnEntryArray().returnField("priority"));
//console.log(firstProject.returnEntryArray().returnField.call(entryFactory,"priority"));
//firstProject.returnEntryArray().editField.call(entryFactory,"priority",1000);
//console.log(firstProject.returnEntryArray().returnField.call(entryFactory,"priority"));

//console.log(newEntry1.returnField("priority"));
//newEntry1.editField("priority",666);
//console.log(newEntry1.returnField("priority"));

//console.log(secondProject.returnEntryArray().returnField.call(entryFactory,"priority"));


*/



