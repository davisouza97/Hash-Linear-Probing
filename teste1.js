function Hash(numero) {
    this.lista = new Array(parseInt(numero)); //this == publico/ var == private
    this.size = this.lista.length;
    
    this.mod = function (indice) {
        return indice % this.size;
    };

    this.add = function (item) {
        var mod = this.mod(item.chave);
        //console.log("mod add ::  " + mod);
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
            if (this.lista[i] != undefined && this.lista[i].chave === item.chave) {
                alert(item.chave + " item já existe existente");
                console.log("item ja add");
                return;
            }
            if (this.lista[i] === undefined) {
                alert(item.chave + " colidiu com chave existente");
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
    this.excluir = function (chave) {
        var modulo = this.mod(chave);
        //console.log("mod remoção ::  " + modulo);
        if (modulo < 0 || modulo >= this.size || this.lista[modulo] === undefined) {
            console.log("valor não existe");
            return;
        } else {
            for (let i = this.mod(chave); i < this.size;) {
                if (this.lista[i].chave === chave) {
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
    this.reposicionar = function (destino, proximo) {
        if (this.lista[proximo] === undefined) {//posição seguinte vazia(abortar)
            return;
        }
        else {
            if (this.mod(this.lista[proximo].chave) == proximo) {//item já tá no lugar certo
                // proximo++;
                this.reposicionar(destino, proximo + 1);
            } else {
                this.lista[destino] = this.lista[proximo];
                this.lista[proximo] = undefined;
                do {
                    destino++;
                } while (this.mod(this.lista[destino]) === destino);
                this.reposicionar(destino, proximo + 1);
            }
        }
    }

}


function Item(chave, nome) {
    this.chave = chave;
    this.dado = nome;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//variaveis na tela

var listElement = document.getElementById("lista");
var botao = document.getElementById("botao");
var input1 = document.getElementById("input1");
var id = document.getElementById("input2");
var nome = document.getElementById("input3");
var remove = document.getElementById("input4");
var inputMin = document.getElementById("rangeMin");
var inputMax = document.getElementById("rangeMax");
var m1 = document.getElementById("m1");
var m2 = document.getElementById("m2");
var m3 = document.getElementById("m3");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//var prog
var hash;
var min, max;

//

function criaLista() {
    if (input1.value != "") {
        console.log(input1.value);
        hash = new Hash(input1.value);
        min = parseInt(inputMin.value);
        max = parseInt(inputMax.value);
        console.log(hash);
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'block';
        m1.value = input1.value;
        m2.value = min;
        m3.value = max;
        //https://pt.stackoverflow.com/questions/4605/remover-elemento-da-p%C3%A1gina-com-javascript    
        /** 
        if (botao.parentNode) {
            botao.parentNode.removeChild(botao);
            input1.parentElement.removeChild(input1);
        }
        */
        renderHash();
    }
}

function renderHash() {
    console.log(hash);

    var tabela = document.getElementById("lista");
    var tamanho = tabela.rows.length;
    for (var index = 0; index < tamanho; index++) {
        tabela.deleteRow(0);
    }

    var linha = tabela.insertRow(0);
    for (var index = 0; index < this.hash.size; index++) {
        var celula = linha.insertCell();
        celula.innerHTML = index;
    }

    linha = tabela.insertRow(1);
    for (var index = 0; index < this.hash.size; index++) {
        var celula = linha.insertCell();
        celula.innerHTML = hash.lista[index] === undefined ? "vazio" : hash.lista[index].chave;
        var cor = "white";
        if(celula.innerHTML !== "vazio"){
            if(this.hash.mod(hash.lista[index].chave) === index){
                cor = "#eeffe6"
            }else{
                cor = "#ffe6cc"
            }
        }
        celula.style.backgroundColor = cor;
    }

    linha = tabela.insertRow(2);
    for (var index = 0; index < this.hash.size; index++) {
        var celula = linha.insertCell();
        celula.innerHTML = hash.lista[index] === undefined ? "vazio" : hash.lista[index].dado;
        var cor = "white";
        if(celula.innerHTML !== "vazio"){
            if(this.hash.mod(hash.lista[index].chave) === index){
                cor = "#eeffe6"
            }else{
                cor = "#ffe6cc"
            }
        }
        celula.style.backgroundColor = cor;
    }
}

function add() {
    var campoId = id.value;
    var campoNome = nome.value;
    if (campoId < min || campoId > max) {
        console.log("chave fora do universo possivel de chaves");
        alert("chave fora do universo possivel de chaves");
    } else {
        var item = new Item(campoId, campoNome);
        hash.add(item);
        renderHash();
    }
}

function retirar() {

    var vlr = remove.value;
    if (vlr < min || vlr > max) {
        console.log("chave fora do universo possivel de chaves");
        alert("chave fora do universo possivel de chaves");
    } else {
        hash.excluir(vlr);
        renderHash();
    }
}
