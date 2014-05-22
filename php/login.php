<?php
     $con = mysql_connect("localhost","u145501038_ozcan","rADItrC09h");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }

    mysql_select_db("u145501038_money", $con);

    $email = $_POST[email_login];
    $password = $_POST[password_login];

    $query = "SELECT * FROM user WHERE email='$email' AND password='$password'";
    $hasil = mysql_query ($query);

        if (mysql_num_rows($hasil) > 0){             
            echo "true";            
        }
        else {                
            echo "false";            
        }    

?>
