type Status = 'disabled' | 'failed' | 'passed' | 'pending' | 'skipped' | 'todo';
type StringGetter = () => string;

export type IJestTestRailReporterOptions = {
  host: string;
  username: string;
  password: string;
  project: { id: number };
  statusIds?: Record<Status, number>;
  testRun: {
    name: string | StringGetter,
    description?: string | StringGetter,
  };
};

export default IJestTestRailReporterOptions;
