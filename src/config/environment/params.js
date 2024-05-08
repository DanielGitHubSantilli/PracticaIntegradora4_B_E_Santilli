import {
      Command
} from 'commander';

const program = new Command();

program
      .option('-m, --mode <mode>', 'Ambiente MODE', 'dev')

program.parse()

console.log("Options => ", program.opts());

export default program.opts();