# jest-testrail-reporter

Reporter for [Jest](https://jestjs.io/) to create test runs in [TestRail](https://www.gurock.com/testrail/), link test cases and update their status automatically.

### Installation

To install the library in your project, use below command:

```shell
npm install jest-testrail-reporter --save-dev

# or using Yarn
yarn add jest-testrail-reporter --dev
```

### Usage

Just include the reporter in your `jest.config.js` as follows:

```js
{
  reporters: [

    // ... other reporters

    ["jest-testrail-reporter", {
      host: 'https://yourorg.testrail.io',
      username: 'name@example.com',
      password: 'password' || 'api key',
      project: { id: 1 },
      testRun: {
        name() {
          return "Test Run #" + new Date().getTime();
        },
      },
    }],
  ]
}
```

Possible options and their respective types/values are as below:

| **Name**            | **Type**           | **Required**       | **Default value** |
|---------------------|--------------------|--------------------|-------------------|
| host                | `string`           | :white_check_mark: |                   |
| username            | `string`           | :white_check_mark: |                   |
| password            | `string`           | :white_check_mark: |                   |
| project             | `map`              | :white_check_mark: |                   |
| project.id          | `number`           | :white_check_mark: |                   |
| statusIds           | `map`              | :x:                | *see below*       |
| statusIds.disabled  | `number`           | :white_check_mark: | 2                 |
| statusIds.failed    | `number`           | :white_check_mark: | 5                 |
| statusIds.passed    | `number`           | :white_check_mark: | 1                 |
| statusIds.pending   | `number`           | :white_check_mark: | 4                 |
| statusIds.skipped   | `number`           | :white_check_mark: | 3                 |
| statusIds.todo      | `number`           | :white_check_mark: | 3                 |
| testRun             | `map`              | :white_check_mark: |                   |
| testRun.name        | `string, function` | :white_check_mark: |                   |
| testRun.description | `string, function` | :x:                |                   |

### License

See [LICENSE](LICENSE) file.
