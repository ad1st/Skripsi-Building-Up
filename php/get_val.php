<?php
 $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $ress = "SELECT transaksi.nama, SUM(transaksi.nominal) AS nominal
                FROM transaksi
                WHERE transaksi.id_tipe = 2
                GROUP BY transaksi.nama";
    $results = mysql_query($ress) or die ("Query error: " . mysql_error());

    //fetch dalam bentuk array
    $records = array();
    while($row = mysql_fetch_assoc($results)) {
    $records[] = $row;
    }
 
    //menuliskannya dalam bentuk json menggunakan fungsi json_encode
    echo $_GET['jsoncallback'] . '(' . json_encode($records) . ');';
?>
