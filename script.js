var data = new Date();
var miesiace = new Array("Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień");
$(document).ready(function(){
    console.log('Kalkulator roboczogodzin załadowany!');
    $('.aktualna-data').text(leadingZero(data.getMonth()+1)+'/'+data.getFullYear());
    $('.dupa').text("Liczba dni w miesiącu "+miesiace[data.getMonth()]+" wynosi: "+daysInMonth(data.getMonth()+1, data.getFullYear()));
    $('#slider').click(function(){
        $('#slider-content').toggle();
    });
});
function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}
function leadingZero(i) {
    return (i < 10)? "0"+i : i;
}
let liczbadni = daysInMonth(data.getMonth()+1, data.getFullYear());
function GenerujTabele(){
    let licznik = 0;
    for(let i = 1; i <= liczbadni; i++){
        $('tr:eq('+licznik+')').after('<tr><td class="text-center">'+i+'</td><td class="wartosc'+i+'"><input class="form-control text-center" type="text" id="wartosc1-'+i+'"></input></td><td><input class="form-control text-center" type="text" id="wartosc2-'+i+'"></input></td><td class="text-center suma-'+i+'">------</td></tr>');
        licznik++;
    }
    return;
}
function ObliczGodziny(){
    let tab = new Array();
    let sumagodzin = 0;
    for(let i = 1; i <= liczbadni; i++){
        //Przypisywanie atrybutu value do pól (potrzebne do generowania dokumentu)
        $('#wartosc1-'+i+'').attr('value', $('#wartosc1-'+i+'').val());
        $('#wartosc2-'+i+'').attr('value', $('#wartosc2-'+i+'').val());

        if(($('#wartosc2-'+i+'').val()-$('#wartosc1-'+i+'').val()) == 0){
            $('.suma-'+i+'').text('------');
        }
        else{
            $('.suma-'+i+'').text(($('#wartosc2-'+i+'').val()-$('#wartosc1-'+i+'').val()));
            tab.push(parseInt($('.suma-'+i+'').text()));
        }
    }
    for(let x = 0; x < tab.length; x++){
        sumagodzin +=tab[x];
        $('#suma-godzin').html('Łącznie przepracowano: <strong> '+sumagodzin+' </strong>h');
    }
    $('#dane-pracownika').html('Nazwa firmy: <strong>'+$('#nazwafirmy').val()+'</strong></br>Imię i nazwisko: <strong>'+$('#imienazwisko').val()+'</strong>');
    return;
}
function printDiv(){
    var divToPrint = document.getElementById('roboczogodziny');
    var newWin = window.open('','Print-Window');

    newWin.document.open();
    newWin.document.write('<html><head><title>Lista godzin'+'['+data.getDate()+'-'+miesiace[data.getMonth()]+'-'+data.getFullYear()+']</title> \
    <style>table,tr,td{border: 1px solid black; text-align: center;} input[type=text]{text-align: center;}</style></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
    newWin.document.close();

    setTimeout(function(){newWin.close();},10);
}
function ObliczSpalanie(){
    var spalone = document.getElementById("SpalonePaliwo").value;
    var km = document.getElementById("Kilometry").value;
    var wynik = (spalone/km)*100;
    if(isNaN(wynik)){
        document.getElementById("Wyniki").innerHTML = "Niepoprawne dane!";
        return;
    }
    return;
}