import { AggregatedResult, Config, Reporter, ReporterOnStartOptions, TestContext } from "@jest/reporters";
import TestRail from "@dlenroc/testrail";
import IJestTestRailReporterOptions from "./IJestTestRailReporterOptions";

export class JestTestRailReporter implements Reporter {

  private readonly api: TestRail;

  constructor(_: Config.GlobalConfig, private options: IJestTestRailReporterOptions) {
    if (!options) {
      throw new Error("Please specify reporter options.")
    }

    if (!options.host || !options.username || !options.password) {
      throw new Error("Please ensure host, username & password options are set.")
    }

    this.api = new TestRail({
      host: options.host,
      username: options.username,
      password: options.password,
    });
  }

  async onRunComplete(contexts: Set<TestContext>, results: AggregatedResult) {
    console.log("Test run completed.");
  }

  async onRunStart(results: AggregatedResult, options: ReporterOnStartOptions) {
    console.log("Test run started.");
  }

  getLastError(): Error | void {
  }
}

export default JestTestRailReporter;
