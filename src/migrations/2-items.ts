export async function upgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    CREATE TABLE IF NOT EXISTS \`items\` (
      \`id\` INT NOT NULL UNIQUE AUTO_INCREMENT,
      \`name\` VARCHAR(45) NULL,
      \`userId\` INT NULL,
      PRIMARY KEY (\`id\`)
    );
  `);
}

export async function downgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    DROP TABLE IF EXISTS \`items\`;
  `);
}
