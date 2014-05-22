<?php   
    $con=mysqli_connect("localhost","u145501038_ozcan","rADItrC09h","u145501038_money");
    // Check connection
    if (mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
       
    $tipe = $_POST['id_tipe'];
    $nama = $_POST['kategori_pengeluaran'];
    $nominal = $_POST['nominal_pengeluaran'];

    for ($i=0;$i<count($nama);$i++) {
        $sql="INSERT INTO kategori (id_tipe, nama, nominal) 
        VALUES ('$tipe','$nama[$i]', '$nominal[$i]')";

    if (!mysqli_query($con,$sql))
        {
          die('Error: ' . mysqli_error($con));
        }
        else {
            echo "Kategori Pengeluaran Baru .$nama[$i]. Berhasil Ditambahkan\n";        
        }
    }
    echo "So far so fine";
?>

