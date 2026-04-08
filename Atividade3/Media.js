var nome = prompt("Nome");
var nota1 = parseFloat(prompt("Nota 1"));
var nota2 = parseFloat(prompt("Nota 2"));
var nota3 = parseFloat(prompt("Nota 3"));

var media = (nota1 + nota2 + nota3) / 3;
alert("Media aritmetica: " + media.toFixed(2));