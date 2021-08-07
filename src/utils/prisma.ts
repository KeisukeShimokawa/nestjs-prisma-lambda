import util from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

// https://stackoverflow.com/questions/30763496/how-to-promisify-nodes-child-process-exec-and-child-process-execfile-functions
// https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
export const resetDatabase = async (): Promise<void> => {
  await exec('npx migrate reset --force');
};
