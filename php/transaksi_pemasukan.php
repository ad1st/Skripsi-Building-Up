<?php
    $con=mysqli_connect("localhost","u145501038_ozcan","rADItrC09h","u145501038_money");
    // Check connection
    if (mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // escape variables for security
    $id_tipe = $_POST['id_pemasukan'];
    $tanggal = $_POST['tanggal_inc'];
    $nama = $_POST['kategori_inc'];
    $nominal = $_POST['jumlah_inc'];
    $deskripsi = $_POST['deskripsi_inc'];

        $sql="INSERT INTO transaksi (id_tipe, tanggal, nama, nominal, deskripsi) 
        VALUES ('$id_tipe', '$tanggal', '$nama', '$nominal', '$deskripsi')";

        if (!mysqli_query($con,$sql))
        {
          die('Error: ' . mysqli_error($con));
        }
        else{
            echo "Transaksi Pemasukan Baru Berhasil Ditambahkan";    
        }
?>
