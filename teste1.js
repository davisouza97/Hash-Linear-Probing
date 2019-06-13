var div = document.getElementById("lista");
var botao = document.getElementById("botao");


class Hash {
    constructor(numero) {
        this.lista = new Array(numero); //this == publico/ var == private
        this.size = this.lista.length;
        var controleLoop = 0;
        this.mod = function (indice) {
            return indice % this.size;
        };

        this.add = function (item) {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   " + item.chave);

            var mod = this.mod(item.chave);

            console.log("mod add ::  " + mod);

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
            var modulo = this.mod(item.chave);
            for (let i = modulo; i < this.size;) {
                if (this.lista[i] === undefined) {
                    this.lista[i] = item;
                    break;
                }
                if (i === this.size - 1) {
                    i = -1;
                }
                i++;
                if (i === modulo) {
                    console.log("lista percorrida inteiramente");
                    break;
                }
            }
        };
        this.excluir = function (item) {
            var modulo = this.mod(item.chave);
            console.log("mod remoção ::  " + modulo);
            if (modulo < 0 || modulo >= this.size || this.lista[modulo] === undefined) {
                console.log("valor não existe")
                return;
            } else {
                for (let i = this.mod(item.chave); i < this.size;) {
                    if (this.lista[i].chave === item.chave) {
                        console.log("Remocao" + this.lista[i].chave + "--" + this.lista[i].dado);
                        this.lista[i] = undefined;
                        if (this.lista[i + 1] !== undefined) {
                            this.reposicionar(i, i + 1);
                        }
                        break;
                    }
                    if (i === this.size - 1) {
                        i = -1;
                    }
                    i++;
                    if (i === modulo) {
                        console.log("lista percorrida inteiramente");
                        break;
                    }
                }
            }
        }
        this.reposicionar = function (destino, origem) {
            var posicao = origem;
            if (this.lista[posicao] === undefined) {
                return;
            }
            else {
                if (this.mod(this.lista[posicao].chave) !== posicao) {  //colisao
                    this.lista[destino] = this.lista[posicao];
                    this.lista[posicao] = undefined;
                    return
                }
                if (this.mod(this.lista[posicao].chave) === posicao) { //nao colisao
                    this.reposicionar(destino, posicao + 1);
                }
            }
            if (this.lista[posicao + 1] !== undefined) {
                this.reposicionar(posicao, posicao + 1);
            }

        }
    }

};

class Item {
    constructor(chave) {
        this.chave = chave;
        this.dado = "#" + chave + "#";
    }
}

/*
var hash = new Hash(13);

var um = new Item(0);
var dois = new Item(1);
var tres = new Item(13);

hash.add(um);   //pos 0
hash.add(dois); //pos 1
hash.add(tres); //pos 0(vai para 2)

console.log("############################");

for (let index = 0; index < hash.lista.length; index++) {
    console.log(hash.lista[index]);
}

console.log("############################");

hash.excluir(dois);

console.log("############################");

for (let index = 0; index < hash.lista.length; index++) {
    console.log(hash.lista[index]);
}

console.log("############################");

*/