function enviarWhatsApp(event) {
    event.preventDefault(); // Impede o envio do formulário padrão.

    const nome = document.getElementById("nome");
    const mensagem = document.getElementById("mensagem");

    const telefone = '5573999257758';
    const texto = `Olá, meu nome é ${nome.value} ${mensagem.value}`;

    const msgFormatada = encodeURIComponent(texto);
    const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${msgFormatada}`;

    window.open(url, '_blank');

}



