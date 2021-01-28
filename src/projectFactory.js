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

export {projectFactory}