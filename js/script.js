/* =========================================================
   Portfólio — Adoglésio Gomes
   Menu responsivo, destaque da seção atual, header ao rolar
   e envio da mensagem pelo WhatsApp (mantido do projeto original).
   ========================================================= */

(function () {
  "use strict";

  var TELEFONE = "5573999257758"; // WhatsApp usado no formulário

  /* ---------- menu responsivo ---------- */
  var botao = document.getElementById("menu-botao");
  var menu = document.getElementById("menu");

  function fecharMenu() {
    if (!menu || !botao) return;
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu de navegação");
  }

  if (botao && menu) {
    botao.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", String(aberto));
      botao.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
    });

    menu.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) fecharMenu();
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") fecharMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) fecharMenu();
    });
  }

  /* ---------- header ao rolar ---------- */
  var cabecalho = document.querySelector(".navegacao");

  function aoRolar() {
    if (!cabecalho) return;
    cabecalho.classList.toggle("rolando", window.scrollY > 24);
  }

  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* ---------- seção atual destacada no menu ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu-link"));
  var secoes = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && secoes.length) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle("ativo", link.getAttribute("href") === "#" + entrada.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secoes.forEach(function (secao) {
      observador.observe(secao);
    });
  }

  /* ---------- formulário: valida e abre o WhatsApp ---------- */
  var formulario = document.getElementById("formulario");

  function validarCampo(campo, erro) {
    var vazio = campo.value.trim() === "";
    campo.setAttribute("aria-invalid", String(vazio));
    erro.hidden = !vazio;
    return !vazio;
  }

  if (formulario) {
    var nome = document.getElementById("nome");
    var mensagem = document.getElementById("mensagem");
    var erroNome = document.getElementById("erro-nome");
    var erroMensagem = document.getElementById("erro-mensagem");

    [[nome, erroNome], [mensagem, erroMensagem]].forEach(function (par) {
      par[0].addEventListener("input", function () {
        if (par[0].getAttribute("aria-invalid") === "true") validarCampo(par[0], par[1]);
      });
    });

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var nomeOk = validarCampo(nome, erroNome);
      var mensagemOk = validarCampo(mensagem, erroMensagem);

      if (!nomeOk) {
        nome.focus();
        return;
      }
      if (!mensagemOk) {
        mensagem.focus();
        return;
      }

      var texto = "Olá, Adoglésio! Meu nome é " + nome.value.trim() + ". " + mensagem.value.trim();
      var url = "https://api.whatsapp.com/send?phone=" + TELEFONE + "&text=" + encodeURIComponent(texto);

      window.open(url, "_blank", "noopener");
    });
  }
})();
