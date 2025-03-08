import database from "infra/database.js";

async function status(request, response) {
  const versaoPostgresResult = await database.query("SELECT version()");
  const versaoPostgres = versaoPostgresResult.rows[0].version;

  const conexoesMaximasResult = await database.query("SHOW max_connections");
  const conexoesMaximas = conexoesMaximasResult.rows[0].max_connections;

  const conexoesUsadasResult = await database.query(
    "SELECT count(*) FROM pg_stat_activity",
  );
  const conexoesUsadas = conexoesUsadasResult.rows[0].count;
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    versao_postgres: versaoPostgres,
    conexoes_maximas: conexoesMaximas,
    conexoes_usadas: conexoesUsadas,
    updated_at: updatedAt,
  });
}

export default status;
