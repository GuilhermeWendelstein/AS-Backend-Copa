const axios = require('axios');
// Busca os jogos na WorldCupAPI
async function listarJogos() {
  const response = await axios.get(process.env.WORLD_CUP_API);
// Trata os dados para não devolver o JSON gigante da API
  return response.data.map((jogo) => {
   // utilizei o ?. para ser opcional quando vir o time 
    return {
      jogo: `${jogo.homeTeam?.name || 'A definir'} x ${jogo.outsideTeam?.name || 'A definir'}`,
      time_a: jogo.homeTeam?.name || 'A definir',
      time_b: jogo.outsideTeam?.name || 'A definir',
      data_jogo: jogo.date,
      estadio: jogo.stadium,
      grupo: jogo.group,
      etapa: jogo.step,
      gols_a: jogo.homeScore,
      gols_b: jogo.outsideScore
    };
  });
}

module.exports = {
  listarJogos
};


