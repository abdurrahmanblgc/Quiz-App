const quiz = new Quiz(sorular);
const ui = new UI();


ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    startTimer(10);
    startTimerLine();
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
});
//Açıklama: Bu olay dinleyici, "Start Quiz" düğmesine tıklandığında quiz kutusunu aktif hale getirir, zamanlayıcıyı başlatır ve ilk soruyu gösterir.



ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btn_next.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        ui.quiz_box.classList.remove("active"); //buradaki active css ile bağlantılı
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

//Açıklama: Bu olay dinleyici, "Sonraki Soru" düğmesine tıklandığında geçerli soru dizinini artırır, zamanlayıcıyı sıfırlar ve sonraki soruyu gösterir. Eğer tüm sorular tamamlandıysa, skor kutusunu gösterir.




ui.btn_quit.addEventListener("click", function() {
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});
//Açıklama: Bu olay dinleyiciler, testi yeniden başlatma ve bitirme işlevlerini sağlar. Testi yeniden başlatmak için, tüm değerler sıfırlanır ve quiz tekrar başlatılır.




function optionSelected(option) {
    clearInterval(counter); //clearInterval javascriptte bir zamanlayıcıyı durdurmak için kullanılır.
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent; //option elemanının içindeki span etiketi içinde yer alan b etiketini seçer.
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.btn_next.classList.add("show");
}
//Açıklama: Bu fonksiyon, bir seçenek tıklandığında çalışır. Seçeneğin doğru olup olmadığını kontrol eder, doğru ise doğru ikonu ve yanlış ise yanlış ikonu ekler. Ayrıca, diğer seçenekleri devre dışı bırakır ve "Sonraki Soru" düğmesini gösterir.




let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.time_second.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);

            ui.time_text.textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children) {

                if(option.querySelector("span b").textContent == cevap) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                }

                option.classList.add("disabled");
            }

            ui.btn_next.classList.add("show");
        }
    }
}
//Açıklama: Bu fonksiyon, bir zamanlayıcı başlatır ve her saniye geri sayar. Süre bittiğinde, doğru cevabı gösterir ve diğer seçenekleri devre dışı bırakır.




let counterLine;
function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;
        ui.time_line.style.width = line_width + "px";

        if(line_width > 549) {
            clearInterval(counterLine);
        }
    }
}
//Açıklama: Bu fonksiyon, bir zaman çizgisi başlatır ve her 20 milisaniyede bir genişliğini artırır. Çizgi tamamlandığında zamanlayıcı durdurulur.

