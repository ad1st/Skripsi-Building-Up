<?php
    $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $inc = "SELECT nama FROM kategori Where id_tipe='2'";
    $hasil5 = mysql_query($inc) or die ("Query error: " . mysql_error());

      //fetch dalam bentuk array
            $record = array();
            while($rows = mysql_fetch_assoc($hasil5)) {
            $record[] = $rows;
            }
 
            //menuliskannya dalam bentuk json menggunakan fungsi json_encode
            echo $_GET['jsoncallback'] . '(' . json_encode($record) . ');';
?>
