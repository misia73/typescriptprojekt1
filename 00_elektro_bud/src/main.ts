interface Produkt {
  ean: string;
  nazwa: string;
  kategoria: string;
  sektor: string;
  regal: string;
  polka: string;
  ilosc: number;
}

let produkty: Produkt[] = [
  { ean: "1", nazwa: "kabel usb-c", kategoria: "kable", sektor: "a", regal: "1", polka: "2", ilosc: 120 },
  { ean: "2", nazwa: "gniazdko", kategoria: "sprzet", sektor: "b", regal: "3", polka: "1", ilosc: 30 },
];

const pole = (id: string) => document.getElementById(id) as HTMLInputElement;
const tabela = document.getElementById("tabela") as HTMLTableSectionElement;

function pokaz(): void {
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

function dodajProdukt(): void {
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
  for (const id of ["ean", "nazwa", "kategoria", "sektor", "regal", "polka"]) pole(id).value = "";
  pokaz();
}

function edytujProdukt(p: Produkt): void {
  p.nazwa = prompt("Nazwa:", p.nazwa) ?? p.nazwa;
  p.kategoria = prompt("Kategoria:", p.kategoria) ?? p.kategoria;
  pokaz();
}

function zmienStan(p: Produkt, rodzaj: string): void {
  const ilosc = Number(prompt("Ilosc (" + rodzaj + "):"));
  if (!Number.isInteger(ilosc) || ilosc <= 0) {
    alert("Zla ilosc!");
    return;
  }
  if (rodzaj === "wydanie" && ilosc > p.ilosc) {
    alert("Na stanie jest tylko " + p.ilosc + " szt.!");
    return;
  }
  p.ilosc += rodzaj === "przyjecie" ? ilosc : -ilosc;
  pokaz();
}

tabela.onclick = (e: MouseEvent) => {
  const przycisk = e.target as HTMLButtonElement;
  const p = produkty.find((x) => x.ean === przycisk.dataset.ean);
  if (!p) return;
  if (przycisk.dataset.akcja === "edytuj") edytujProdukt(p);
  else zmienStan(p, przycisk.dataset.akcja ?? "");
};

pole("dodaj").onclick = dodajProdukt;
pokaz();
