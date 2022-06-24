import { AggregatedResult, Config, Reporter, ReporterOnStartOptions, TestContext } from "@jest/reporters";
import TestRail  from "@dlenroc/testrail";
import IJestTestRailReporterOptions from "./IJestTestRailReporterOptions";

export class JestTestRailReporter implements Reporter {

  private readonly api: TestRail;
  private testRun?: TestRail.Run;

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
    const cases = results.testResults.map((tr) => tr.testResults)
      .flat()
      .filter(({ title }) => /\bC\d+\b/.test(title))
      .map(({ title, status }) => {
        const caseId = Number(/\bC(\d+)\b/.exec(title)![1]);
        return { caseId, status };
      });
    if (cases.length) {
      await this.api.updateRun(this.testRun!.id, {
        case_ids: cases.map(({ caseId }) => caseId),
      });
      const statusIds = this.options.statusIds ?? {
        "disabled": 2, // blocked
        "failed": 5, // failed
        "passed": 1, // passed
        "pending": 4, // retest
        "skipped": 3, // untested
        "todo": 3, // untested
      };
      const resultsForCases = cases.filter(({ status }) => status !== "skipped" && status !== "todo")
        .map(({ caseId, status }) => ({
          case_id: caseId,
          status_id: statusIds[status],
        }));
      await this.api.addResultsForCases(this.testRun!.id, {
        results: resultsForCases,
      });
    }

    await this.api.closeRun(this.testRun!.id);
  }

  async onRunStart(_: AggregatedResult, __: ReporterOnStartOptions) {
    const {
      project: { id: projectId },
      testRun: { name: testRunName, description: testRunDescription },
    } = this.options;
    const project = await this.api.getProject(projectId);
    const name = typeof testRunName === "function" ? testRunName() : testRunName;
    const description = typeof testRunDescription === "function" ? testRunDescription() : testRunDescription;
    this.testRun = await this.api.addRun(project.id, {
      name,
      description,
    });
  }

  getLastError(): Error | void {
  }
}

export default JestTestRailReporter;
