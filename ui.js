function UI() {
    this.btn_start = document.querySelector(".btn_start"),
    this.btn_next = document.querySelector(".next_btn"),
    this.btn_replay = document.querySelector(".btn_replay"),
    this.btn_quit = document.querySelector(".btn_quit"),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.score_box = document.querySelector(".score_box"),
    this.option_list = document.querySelector(".option_list"),
    this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>',
    this.incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>',
    this.time_text = document.querySelector(".time_text"),
    this.time_second = document.querySelector(".time_second"),
    this.time_line = document.querySelector(".time_line")
}


//Bu fonksiyon, UI nesnesini oluşturur ve HTML'deki belirli öğelere erişimi sağlar. Bu öğeler, quiz uygulamasının farklı bileşenleridir (başlatma düğmesi, sonraki düğmesi, tekrar oynatma düğmesi, quiz kutusu vb.).






UI.prototype.soruGoster = function(soru) {
    // Soru metnini bir <span> elementi içinde saklar.
    let question = `<span>${soru.soruMetni}</span>`;
    // Seçenekleri saklamak için boş bir string başlatır.
    let options = '';

    // soru.cevapSecenekleri içindeki her bir cevabı döngü ile işler.
    for(let cevap in soru.cevapSecenekleri) {
        // Her bir seçeneği bir <div> elementi içinde saklar.
        options += 
            `
                <div class="option"> 
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
                </div>
            `;
    }
     // Soruyu HTML'de .question_text sınıfına sahip elemana ekler.
    document.querySelector(".question_text").innerHTML = question;

     // Seçenekleri HTML'de this.option_list'e (UI nesnesinin option_list elemanı) ekler.
    this.option_list.innerHTML = options;

    // Tüm seçenekleri seçer.
    const option = this.option_list.querySelectorAll(".option");

     // Her bir seçeneğe tıklama (onclick) olayı ekler.
    for(let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

//Açıklama: Bu fonksiyon, bir soru nesnesini alır ve HTML içeriğini güncelleyerek soruyu ve cevap seçeneklerini gösterir. Ayrıca, seçeneklere tıklama olayını ekler.





UI.prototype.soruSayisiniGoster = function(soruSirasi, toplamSoru) {
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}
//Açıklama: Bu fonksiyon, mevcut soru sırasını ve toplam soru sayısını gösterir.



UI.prototype.skoruGoster = function(toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}
//Açıklama: Bu fonksiyon, kullanıcının toplam doğru cevap sayısını ve toplam sorulara göre yüzdesini gösterir.







