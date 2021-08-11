// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
}
  
var damage = randomNumber(30 - 3, 30);
alert(damage);