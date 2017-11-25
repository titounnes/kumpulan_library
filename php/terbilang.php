<?php
function convert($feed) {
    //mendefinisikan satuan 
    $units = array('','ribu ','juta','milyar','triliun','biliun');
    //Mendefinisikan bilangan
    $angka = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan");
    //membuat function untuk memecah bilangan menjadi array beranggota 3 digit
  
  //menginisiasi luaran
  $output = '';
  if (strlen($feed) % 3 > 0) {
    $feed = substr('00', 0, (3 - strlen($feed) % 3)) . (string) $feed;
    //1234 akan diubah menjadi 001234
  }
 $segment3 = str_split($feed, 3);
 //Membilang setiap segmen 3 digit
 foreach($segment3 as $key => $val){
  	//memecah 3 digit menjadi arrau 1 digit
     
    $digit = str_split($val, 1);
    //menentukan nilai ratusan
    if($digit[0] == '1'){
    	$output .= 'seratus ';
    }else if($digit[0] != '0'){
   		$output .= $angka[$digit[0]] . ' ratus ';  	
    }
    //menentukan nilai puluhan
    if($digit[1] == '1'){
    	if($digit[2] == '0'){
      	$output .= 'sepuluh ';
      }else{
      	$output .= $angka[$digit[2]] . 'belas '; 
      }          
    }else if($digit[1] != '0'){
    	$output .= $angka[$digit[1]] . ' puluh ' . $angka[$digit[2]] . ' ';
    }else{
    	if($digit[0] == '0' && $digit[1]=='0' && $digit[2]=='1'){
      	$output .= 'se';
      }else{
      	$output .= $angka[$digit[2]] . ' ';
      }
    }
    $output .= $units[count($segment3)-$key-1] . ' ';
 }
  return $output;
}


echo convert(12345794573);
