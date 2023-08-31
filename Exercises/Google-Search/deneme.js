var name = prompt("What is your name");
var cevaplar = name.slice(0, 1);
var cevaplar_buyuk = cevaplar.toUpperCase();
var cevap_devami = name.slice(1, name.length);
cevap_devami = cevap_devami.toLowerCase();
alert(cevaplar_buyuk + cevap_devami);