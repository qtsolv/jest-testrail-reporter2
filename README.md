# jest-testrail-reporter2

Reporter for [Jest](https://jestjs.io/) to create test runs in [TestRail](https://www.gurock.com/testrail/), link test cases and update their status automatically.

[![npm](https://img.shields.io/npm/dm/jest-testrail-reporter2)](https://www.npmjs.com/package/squerge)
[![npm](https://img.shields.io/npm/v/jest-testrail-reporter2)](https://www.npmjs.com/package/squerge)

### Installation

To install the library in your project, use below command:

```shell
npm install jest-testrail-reporter2 --save-dev

# or using Yarn
yarn add jest-testrail-reporter2 --dev
```

### Usage

You need to add the case ID in your test title anywhere (preferable in the beginning).

```js
// C001 is the case ID below
test("C001 - This is an example test", () => {
  // ... your assertions
});

// or you can put it in the end
test("This is an example test - C001", () => {
  // ... your assertions
});

// or maybe anywhere, first match to C\d+ will be used
test("This is C001 test", () => {
  // ... your assertions
});
```

Finally, include the reporter in your `jest.config.js` as follows:

```js
{
  reporters: [

    // ... other reporters

    ["jest-testrail-reporter2", {
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
