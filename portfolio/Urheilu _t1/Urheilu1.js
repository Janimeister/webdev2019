class Henkilo {
    constructor(etunimet, sukunimet, kutsumanimi, syntymavuosi){
        this._etunimet = etunimet;
        this._sukunimet = sukunimet;
        this._kutsumanimi = kutsumanimi;
        this._syntymavuosi = syntymavuosi;
    }
}
class Urheilija extends Henkilo{
    constructor(etunimet, sukunimet, kutsumanimi, syntymavuosi, linkki_kuvaan, omapaino, laji, saavutukset){
        super(etunimet, sukunimet, kutsumanimi, syntymavuosi);
        this._linkki_kuvaan = linkki_kuvaan;
        this._omapaino = omapaino;
        this._laji = laji;
        this._saavutukset = saavutukset;
    }

    get linkki_kuvaan(){
        return this._linkki_kuvaan;
    }
    set linkki_kuvaan(linkki_kuvaan){
        this._linkki_kuvaan = linkki_kuvaan;
    }

    get omapaino(){
        return this._omapaino;
    }
    set omapaino(omapaino){
        this._omapaino = omapaino;
    }

    get laji(){
        return this._laji;
    }
    set laji(laji){
        this._laji =  laji;
    }

    get saavutukset(){
        return this._saavutukset;
    }
    set saavutukset(saavutukset){
        this._saavutukset = saavutukset;
    }
}

var Urheilija1 = new Urheilija("Kalle", "Kullervo", "Kalle", 1994, "www.google.com/Kalle", 78, "Jääkiekko", "Kultamitali kotikisoissa");
var Urheilija2 = new Urheilija("Liisa", "Lissinen", "Liisa", 1992, "www.google.com/Liisa", 55, "Jalkapallo", "Pronssia MM kisoissa");

console.log(Urheilija1._etunimet);
console.log(Urheilija1.omapaino);
console.log(Urheilija2.saavutukset);
console.log(Urheilija2._sukunimet);
console.log(Urheilija2.linkki_kuvaan);