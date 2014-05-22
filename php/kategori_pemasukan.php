<?php   

    $con=mysqli_connect("localhost","u145501038_ozcan","rADItrC09h","u145501038_money");
    // Check connection
    if (mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
       
    $tipe = $_POST['id_tipe'];
    $nama = $_POST['kategori_pemasukan'];
    $nominal = $_POST['nominal_pemasukan'];

    for ($i=0;$i<count($nama);$i++) {
        $sql="INSERT INTO kategori (id_tipe, nama, nominal) 
        VALUES ('$tipe','$nama[$i]', '$nominal[$i]')";

        if (!mysqli_query($con,$sql))
        {
          die('Error: ' . mysqli_error($con));
        }
        echo "Kategori Pemasukan Baru Berhasil Ditambahkan";
    }
    echo "so far so fine";
?>

