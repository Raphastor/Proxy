  class Posicao{
    constructor(x, y, z){
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  class Vida{
    constructor(total, atual){
      this.total = total;
      this.atual = atual;
    }
  }

  class Transform{
    constructor(position, rotation, scale){
      this.position = position || new Vector3(0, 0, 0);
      this.rotation = rotation || new Vector3(0, 0, 0);
      this.scale = scale || new Vector3(0, 0, 0);
    }
  }

  
  class PlayerData {
    constructor(id, nome, avatar, vida, acao = 0, posicao, yRotacao = 0){
      this.idUsuario = id;
      this.nome = nome;
      this.avatar = avatar;
      this.vida = vida || new Vida(100, 100);
      this.acao = acao || 0;
      this.posicao = posicao || new Posicao(0, 0, 0);
      this.yRotacao = yRotacao == null ? 0 : yRotacao; 
      this.timestamp =  Date.now();
    }
  }

class JogoData{
  constructor(){
    this.playerData = [];
    }

    AddPlayer(player)
    {
      this.playerData.push(player);
    }

    UpdatePlayer(jogo, player)
    {
      const usuarioIndex = jogo.playerData.findIndex(u => u.idUsuario === player.idUsuario)
      if(usuarioIndex !== -1)
      {        
        //const usuarioRemovido = jogo.playerData.splice(usuarioIndex, 1)[0];
        jogo.playerData[usuarioIndex] = player;
      }else{
        jogo.AddPlayer(player);
      }
    }

    DeletePlayer(jogo, idPlayer)
    {
      const newPlayArray = jogo.playerData.filter((player) => {
        return player.idUsuario !== idPlayer;
      });
      return newPlayArray;
    }    
}

//Este if precisou ter para evitar erro do index.html
if (typeof module !== 'undefined' && module.exports) {
  //Precisa da linha abaixo para que o index.js reconheça a classe 
 
  module.exports = PlayerData;
  module.exports = JogoData; 
} 
  


