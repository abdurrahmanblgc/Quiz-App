function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
    this.dogruCevapSayisi = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}
//Açıklama: Bu fonksiyon, quiz nesnesini oluşturur ve sorular dizisini, mevcut soru indeksini ve doğru cevap sayısını saklar. soruGetir metodu, geçerli soruyu döndürür.