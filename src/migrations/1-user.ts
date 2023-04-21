export async function upgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    CREATE TABLE IF NOT EXISTS \`user\` (
      \`id\` INT NOT NULL UNIQUE AUTO_INCREMENT,
      \`name\` VARCHAR(45) NULL,
      \`balance\` INT NULL,
      PRIMARY KEY (\`id\`)
    );
  `);
}

export async function downgrade(
  queryFn: (query: string, values?: any[]) => Promise<Array<any>>
): Promise<void> {
  await queryFn(`
    DROP TABLE IF EXISTS \`user\`;
  `);
}
