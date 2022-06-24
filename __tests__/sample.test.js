function sum(a, b) {
  return a + b;
}

test("C001 adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("C002 adds 4 + 3 to equal 1", () => {
  expect(sum(4, 3)).toBe(1);
});

test.skip("C003 adds 3 + 3 to equal 6", () => {
  expect(sum(3, 3)).toBe(6);
});

test.todo("C004 adds 99 + 0 to equal 99");
