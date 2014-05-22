<?php
    $con=mysqli_connect("localhost","u145501038_ozcan","rADItrC09h","u145501038_money");
    // Check connection
    if (mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // escape variables for security
    $id_tipe = $_POST['id_pengeluaran'];
    $tanggal = $_POST['tanggal_exp'];
    $nama = $_POST['kategori_exp'];
    $nominal = $_POST['jumlah_exp'];
    $deskripsi = $_POST['deskripsi_exp'];

        $sql="INSERT INTO transaksi (id_tipe, tanggal, nama, nominal, deskripsi) 
        VALUES ('$id_tipe', '$tanggal', '$nama', '$nominal', '$deskripsi')";

        if (!mysqli_query($con,$sql))
        {
          die('Error: ' . mysqli_error($con));
        }
        else {
            echo "Transaksi Pengeluaran Baru Berhasil Ditambahkan";
        }
?>
