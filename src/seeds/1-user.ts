export async function upgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    INSERT INTO \`user\` (name, balance) VALUES ('Test', 100);
  `);
}

export async function downgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    DELETE from \`user\`;
  `);
}
