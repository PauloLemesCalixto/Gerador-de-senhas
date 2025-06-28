const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-Senha'); // Corrigido para o 'S' maiúsculo
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    if (alfabeto === '') {
        alert("Por favor, selecione pelo menos uma opção de caractere!");
        return; // Não gera a senha se nada for selecionado
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha();
}

function classificaSenha() {
    const senha = campoSenha.value;
    const barraForca = document.querySelector('.barra');
    
    // Classifica a força da senha
    let forca = 0;
    if (senha.length >= 8) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/[a-z]/.test(senha)) forca++;
    if (/\d/.test(senha)) forca++;
    if (/[!@#$%&*()]/.test(senha)) forca++;

    // Atualiza a classe da força
    forcaSenha.classList.remove('fraca', 'media', 'forte'); // Limpa as classes
    if (forca <= 2) {
        forcaSenha.classList.add('fraca');
    } else if (forca === 3 || forca === 4) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('forte');
    }
}
