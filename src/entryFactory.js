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

export {entryFactory}