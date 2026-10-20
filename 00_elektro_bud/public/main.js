"use strict";
let produkty = [
    { ean: "1", nazwa: "kabel usb-c", kategoria: "kable", sektor: "a", regal: "1", polka: "2", ilosc: 120 },
    { ean: "2", nazwa: "gniazdko", kategoria: "sprzet", sektor: "b", regal: "3", polka: "1", ilosc: 30 },
];
const pole = (id) => document.getElementById(id);
const tabela = document.getElementById("tabela");
function pokaz() {
    tabela.innerHTML = "";
    for (const p of produkty) {
        tabela.innerHTML += `<tr>
      <td>${p.ean}</td><td>${p.nazwa}</td><td>${p.kategoria}</td>
      <td>${p.sektor}-${p.regal}-${p.polka}</td><td>${p.ilosc}</td>
      <td>
        <button data-ean="${p.ean}" data-akcja="przyjecie">przyjmij</button>
        <button data-ean="${p.ean}" data-akcja="wydanie">wydaj</button>
        <button data-ean="${p.ean}" data-akcja="edytuj">edytuj</button>
      </td></tr>`;
    }
}
function dodajProdukt() {
    const ean = pole("ean").value.trim();
    const nazwa = pole("nazwa").value.trim();
    if (ean === "" || nazwa === "") {
        alert("wpisz EAN i nazwe");
        return;
    }
    if (produkty.some((p) => p.ean === ean)) {
        alert("taki EAN juz istnieje");
        return;
    }
    produkty.push({
        ean: ean, nazwa: nazwa, kategoria: pole("kategoria").value,
        sektor: pole("sektor").value, regal: pole("regal").value,
        polka: pole("polka").value, ilosc: 0,
    });
    for (const id of ["ean", "nazwa", "kategoria", "sektor", "regal", "polka"])
        pole(id).value = "";
    pokaz();
}
function edytujProdukt(p) {
    p.nazwa = prompt("Nazwa:", p.nazwa) ?? p.nazwa;
    p.kategoria = prompt("Kategoria:", p.kategoria) ?? p.kategoria;
    pokaz();
}
function zmienStan(p, rodzaj) {
    const ilosc = Number(prompt("Ilosc (" + rodzaj + "):"));
    if (!Number.isInteger(ilosc) || ilosc <= 0) {
        alert("zla ilosc");
        return;
    }
    if (rodzaj === "wydanie" && ilosc > p.ilosc) {
        alert("na stanie jest tylko " + p.ilosc);
        return;
    }
    p.ilosc += rodzaj === "przyjecie" ? ilosc : -ilosc;
    pokaz();
}
tabela.onclick = (e) => {
    const przycisk = e.target;
    const p = produkty.find((x) => x.ean === przycisk.dataset.ean);
    if (!p)
        return;
    if (przycisk.dataset.akcja === "edytuj")
        edytujProdukt(p);
    else
        zmienStan(p, przycisk.dataset.akcja ?? "");
};
pole("dodaj").onclick = dodajProdukt;
pokaz();
