-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "placaVeiculo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_motorista" ("cpf", "createdAt", "id", "nome", "placaVeiculo", "updatedAt") SELECT "cpf", "createdAt", "id", "nome", "placaVeiculo", "updatedAt" FROM "motorista";
DROP TABLE "motorista";
ALTER TABLE "new_motorista" RENAME TO "motorista";
CREATE UNIQUE INDEX "motorista_cpf_key" ON "motorista"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
