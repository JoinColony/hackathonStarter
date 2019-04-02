// An example action using the finalizeTask method
const finalizeTask = async (colonyClient, taskId) => {

  // Finalize the task
  await colonyClient.finalizeTask.send({ taskId });

  // Get the updated task
  const updatedTask = await colonyClient.getTask.call({ taskId });

  // Check out the logs to see the updated task
  console.log('Task:', updatedTask);

  // Return the updated task
  return updatedTask;

}

// Export finalizeTask action
module.exports = finalizeTask;
