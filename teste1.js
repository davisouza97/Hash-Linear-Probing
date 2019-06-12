class Hash {
    constructor(numero) {
        this.lista = new Array(numero); //this == publico/ var == private
        this.size = this.lista.length;

        this.mod = function(indice){
            return indice % this.size;
        };

        this.add = function (item) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   "+item.chave);

            var mod = this.mod(item.chave);

            console.log("mod add ::  "+mod);

            if (mod < 0 || mod >= this.size) {
                return;
            }
            if (this.lista[mod] === undefined) //se vazio
            {
                this.lista[mod] = item;
            } else {
                this.colisao(item);
            }
        };
        this.colisao = function (item) {  //adicionar um controle para evitar loop infinito se a lista estiver cheia 
            for (let i = this.mod(item.chave); i < this.size;) {
                if (this.lista[i] === undefined) {
                    this.lista[i] = item;
                    break;
                }
                if (i === this.size - 1) {
                    i = -1;
                }
                i++;
            }
        };
        this.excluir = function (item) {
            var mod = this.mod(item.chave);
            console.log("mod remoção ::  "+mod);
            if (mod < 0 || mod >= this.size || this.lista[mod] === undefined) {
                console.log("valor não existe")
                return;
            }else{
            }
        }
    };
}

class Item {
    constructor(chave) {
        this.chave = chave;
        this.dado = "#" + chave + "#";
    }
}

var hash = new Hash(13);

var um = new Item(0);
var dois = new Item(1);
var tres = new Item(13);

hash.add(um);
hash.add(dois);
hash.add(tres);

console.log("############################");

for (let index = 0; index < hash.lista.length; index++) {
    console.log(hash.lista[index]);
}

console.log("############################");