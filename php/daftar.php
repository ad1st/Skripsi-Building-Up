<?php
    $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $nama = $_POST[nama_daftar];
    $email = $_POST[email_daftar];
    $password = $_POST[password_daftar];

    $sql = "INSERT INTO user (nama, email, password) VALUES ('$nama', '$email', '$password')";
    $query = mysql_query ($sql);
        
        if ($query){
            echo "Insert Berhasil";
        }
        else {
            echo "Terjadi kesalahan";
        }  

?>
