export async function upgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    CREATE TABLE IF NOT EXISTS \`numbers\` (
      \`id\` INT NOT NULL UNIQUE AUTO_INCREMENT,
      \`number\` INT NULL,
      PRIMARY KEY (\`id\`)
    );
  `);
}

export async function downgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    DROP TABLE IF EXISTS \`numbers\`;
  `);
}
