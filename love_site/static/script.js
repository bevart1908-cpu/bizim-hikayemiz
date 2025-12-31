// Sayfada quiz alanı yoksa hata vermesin diye güvenli kontrol
let score = 0;
let current = 0;

const questions = [
  {
    q: "Nerede Tanıştık?",
    options: ["Gebze", "Ankara", "Arabistan"],
    answer: 0   // Gebze doğru
  },
  {
    q: "En sevdiğim kahve türü hangisi?",
    options: ["Türk Kahvesi", "Americano", "Filtre Kahve"],
    answer: 0   // Türk Kahvesi doğru
  },
  {
    q: "Ben moralim bozukken ne yaparsan hemen toparlarım?",
    options: ["Sarılmak", "Mesaj atmak", "Yalnız bırakmak"],
    answer: 0   // aynı kaldı
  }
];

function scrollToSection(id){
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:"smooth"});
}

function renderQuiz() {
  const box = document.getElementById("quizBox");
  if (!box) return;

  const q = questions[current];

  box.innerHTML = `
    <p class="q">${q.q}</p>
    <div class="btn-row">
      ${q.options.map((opt, i) => `<button type="button" onclick="pick(${i})">${opt}</button>`).join("")}
    </div>
    <div class="result" id="quizResult"></div>
    <p class="hint">Soru ${current + 1} / ${questions.length} • Skor: ${score}</p>
  `;
}

function pick(i) {
  const result = document.getElementById("quizResult");
  const q = questions[current];

  if (i === q.answer) {
    score += 10;
    if (result) result.textContent = "Doğru 😍 +10";
  } else {
    if (result) result.textContent = "Yanlış 😏";
  }

  setTimeout(() => {
    current++;

    if (current < questions.length) {
      renderQuiz();
    } else {
      finishQuiz();
    }
  }, 650);
}

function finishQuiz() {
  const box = document.getElementById("quizBox");
  if (!box) return;

  let msg = "Güzel gittin 😄";
  if (score >= 20) msg = "Tam soulmate 💍";
  if (score === questions.length * 10) msg = "Efsanesin… beni benden iyi biliyorsun 🥹❤️";

  box.innerHTML = `
    <h3>Quiz Bitti 🎉</h3>
    <p><strong>Skor:</strong> ${score} / ${questions.length * 10}</p>
    <p>${msg}</p>
    <button class="primary" type="button" onclick="showFinal()">Sürprizi Aç 💌</button>
  `;
}

function showFinal(){
  const finalBox = document.getElementById("finalMessage");
  if (!finalBox) return;

  finalBox.querySelector(".card").innerHTML = `
    <h2>💖 Final</h2>
    <p>
      Bu siteyi yazarken her satırda seni düşündüm.<br><br>
      <strong>İyi ki doğdun ❤️</strong>
    </p>
  `;

  finalBox.scrollIntoView({behavior:"smooth"});
}

// Sayfa yüklenince quiz’i bas
window.addEventListener("load", () => {
  renderQuiz();
});
// 💌 Rastgele mesajlar
const loveMessages = [
  "Seni seçmek her gün verdiğim en güzel karar 💖",
  "Gülüşün benim en sevdiğim manzara 😍",
  "Yanında olunca her şey daha kolay geliyor.",
  "Seninle sıradan günler bile özel.",
  "İyi ki varsın… iyi ki benim hikâyemsin ❤️",
  "Birlikte olduğumuz her an, kalbime kayıtlı ✨",
  "Benim en güzel tesadüfüm sensin 🍀"
];

function newLoveMessage(){
  const el = document.getElementById("loveText");
  if (!el) return;
  const msg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  el.textContent = msg;
}

// 🎵 Müzik Play/Pause
function toggleMusic(){
  const music = document.getElementById("bgMusic");
  if (!music) return;

  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// 📸 Galeri Lightbox
function openLightbox(imgSrc, capText){
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCap");
  if(!box || !img || !cap) return;

  img.src = imgSrc;
  cap.textContent = capText || "";
  box.classList.add("show");
}

function forceCloseLightbox(){
  const box = document.getElementById("lightbox");
  if(box) box.classList.remove("show");
}

function closeLightbox(e){
  // İçeriğe tıklayınca kapanmasın, dışa tıklayınca kapansın
  if(e.target.id === "lightbox") forceCloseLightbox();
}

// Sayfa yüklenince galeriyi bağla
window.addEventListener("load", () => {
  document.querySelectorAll(".ph").forEach(ph => {
    ph.addEventListener("click", () => {
      const img = ph.querySelector("img");
      const cap = ph.querySelector(".cap");
      if(!img) return;

      openLightbox(img.src, cap ? cap.innerText : "");
    });
  });
});
// Kilitliyken scroll'u tamamen engelle
(function lockScrollIfNeeded(){
  const locked = document.body.classList.contains("locked");
  if(!locked) return;

  const prevent = (e) => { e.preventDefault(); };

  // Mouse tekerlek / trackpad
  window.addEventListener("wheel", prevent, { passive: false });
  // Mobil kaydırma
  window.addEventListener("touchmove", prevent, { passive: false });
  // Klavye ile scroll (oklar, space, page down/up)
  window.addEventListener("keydown", (e) => {
    const keys = ["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "];
    if(keys.includes(e.key)) e.preventDefault();
  }, { passive: false });
})();
