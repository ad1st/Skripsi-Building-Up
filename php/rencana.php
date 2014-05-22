<?php
    $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $tanggal_awal = $_POST[tanggal_awal];
    $tanggal_akhir = $_POST[tanggal_akhir];    

    $sql = "INSERT INTO rencana (tanggal_awal, tanggal_akhir) VALUES ('$tanggal_awal', '$tanggal_akhir')";
    $query = mysql_query ($sql);
        
        if ($query){
            echo "Rencana Baru Berhasil Dibuat";
        }
        else {
            echo "Terjadi kesalahan";
            echo mysql_error();
        }  

?>
