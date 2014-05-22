<?php

    $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $sql = "SELECT * FROM transaksi WHERE id_tipe='1'";
    $result = mysql_query($sql) or die ("Query error: " . mysql_error());

      //fetch dalam bentuk array
            $records = array();
            while($row = mysql_fetch_assoc($result)) {
            $records[] = $row;
            }
 
            //menuliskannya dalam bentuk json menggunakan fungsi json_encode
            echo $_GET['jsoncallback'] . '(' . json_encode($records) . ');';

?>
