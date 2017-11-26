var digit3 = function(data) {

  //mendefinisikan satuan 
  var units = ['', 'ribu ', 'juta', 'milyar', 'triliun', 'Kuadriliun','Kuantiliun','Sekstiliun','Septiliun','Oktiliun','Noniliun','Desiliun'];
  //Mendefinisikan bilangan
  var angka = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
  //membuat function untuk memecah bilangan menjadi array beranggota 3 digit

	var number = data.toString().split('.');
	feed = number[0];
  //menginisiasi luaran
  var output = '';

  if (feed.length % 3 > 0) {
    feed = '00'.substr(0, (3 - feed.length % 3)) + feed;
    //1234 akan diubah menjadi 001234
  }

  //menyisipkan titik sebagai separator
  //001234 akan diubah menjadi 001.123
  while (/(\d+)(\d{3})/.test(feed)) {
    feed = feed.replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }

  var segment3 = feed.split('.');
  //Membilang setiap segmen 3 digit
  $.each(segment3, function(i, v) {
    if (v * 1 != 0) {
      //memecah 3 digit menjadi arrau 1 digit
      var digit = v.split('');

      //menentukan nilai ratusan
      output += digit[0] == '1' ?
        'seratus' :
        (digit[0]!='0' ? angka[digit[0]] + ' ratus ' : '');

      //menentukan nilai puluhan
      if (digit[1] == '1') {
        output += (digit[2] == '0') ? 'sepuluh ' : (digit[2] == '1' ? ' se' : angka[digit[2]]) + 'belas ';
      } else if (digit[1] != '0') {
        output += angka[digit[1]] + ' puluh ' + angka[digit[2]] + ' ';
      } else {
        if (digit[0] == '0' && digit[1] == '0' && digit[2] == '1') {
          output += (i == segment3.length - 1) ? 'se' : 'satu ';
        } else {
          output += angka[digit[2]] + ' ';
        }
      }
      output += units[segment3.length - i - 1] + ' ';
    }
  })
	var decimal = '';
	if(typeof number[1] != 'undefined'){
		decimal = ' koma ';
		angka[0] = ' nol';
		$.each(number[1].split(''), function(i, v){
			decimal += ' ' + angka[v];
		})
	}
  return output + decimal ;
}

var currency = function(feed, number, decimal){
	var segment = feed.split('.');
	var number = segment[0].toString().split('').reverse().join('');

	while (/(\d+)(\d{3})/.test(number)) {
    number = number.replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }
	return number.split('').reverse().join('') + (typeof segment[1] != 'undefined' ? ','+segment[1] : '');
}

$(document).on('click', '#converter', function() {
  var feed = $('#number').val();
  if (isNaN(feed)) {
    alert('Yang anda tulis bukan bilangan')
    return false;
  }
	$('#currency').html(currency(feed))
  $('#output').html(digit3(feed))
})
