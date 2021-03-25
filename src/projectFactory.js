const projectFactory = () => {
  let projectId = 0;
  let proj_name = "";
  let proj_description = "";
  let entryCounter = 0;
  let entryArray = [];

  const returnCounter = () => entryCounter;
  const addtoEntryArray = (task) => {
    entryArray.push(task);
    entryCounter += 1;
  };

  const editEntryArray = (entryId, task) => {
    entryArray[entryId] = task;
  };

  const deleteEntry = (entryId) => {
    entryArray.splice(entryId, 1);
  };
  return {
    entryArray,
    returnCounter,
    addtoEntryArray,
    editEntryArray,
    deleteEntry,
  };
};

export { projectFactory };
