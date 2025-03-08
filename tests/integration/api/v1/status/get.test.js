test("GET to api/v1/status returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.versao_postgres).toBeDefined();
  expect(responseBody.versao_postgres).toMatch(/^PostgreSQL/);
  expect(responseBody.conexoes_maximas).toBeDefined();
  expect(responseBody.conexoes_maximas).toMatch(/^\d+$/);
  expect(responseBody.conexoes_usadas).toBeDefined();
  expect(responseBody.conexoes_usadas).toMatch(/^\d+$/);
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/,
  );
});
