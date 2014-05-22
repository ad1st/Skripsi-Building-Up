
    /*------------------------------------------------------------------------------------*/
    // 01. Halaman Splash
    /*------------------------------------------------------------------------------------*/
    $( document ).on( "swipeleft", "#Splash_Page", function()
    {
        console.log("swiped");
        $.mobile.changePage("#Login_Page");
    });
    
    /*------------------------------------------------------------------------------------*/
    // 02. Halaman Login
    /*------------------------------------------------------------------------------------*/

    $(document).on("pagecreate", "#Login_Page", function ()
    {
        $(document).on("swipeleft swiperight", "#Login_Page", function (e)
        {
            if (e.type === "swiperight")
            {
                console.log("swiperight");
                $.mobile.changePage("#Splash_Page");
            }
            else if (e.type === "swipeleft")
            {
                console.log("swipeleft");
                $.mobile.changePage("#Daftar_Page");
            }

            if (window.navigator.onLine)
            {
                console.log('Status Koneksi Online.');
                $("#status_koneksi").text('Status Koneksi Online');
            }
            else
            {
                console.log('Please check your internet connection and try again.');
                $("#status_koneksi").text('Status Koneksi Offline');
            }
        });

        $("#attempting_login").click(function ()
        {
            var data = $("#form_login").serialize();
            console.log(data);

            $.ajax({
                type: "POST",
                url: "http://moneybook.esy.es/php/login.php",
                data: data,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Authenticating', textVisible: 'textVisible' })
                },
                success: function (login)
                {
                    $.mobile.loading("hide");
                    console.log(login);

                    if (login == 'true')
                    {
                        $.mobile.changePage($('#Main_Page'));
                    }
                    else
                    {
                        $.mobile.changePage('#Error_PopUp', { role: "dialog" });
                    }
                }
            });
        });
    });

    /*------------------------------------------------------------------------------------*/
    // 03. Halaman Daftar
    /*------------------------------------------------------------------------------------*/

    $(document).on("pagebeforeshow", "#Daftar_Page", function ()
    {
        $(document).on("swiperight", "#Daftar_Page", function ()
        {
            console.log("swiped");
            $.mobile.changePage("#Login_Page");

        });

        $("#attempting_daftar").click(function ()
        {

            var data = $("#daftar").serialize();
            console.log(data);

            $.ajax({
                type: "POST",
                url: "php/daftar.php",
                data: data,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Data Sedang Dikirim', textVisible: 'textVisible' })
                },
                success: function (value)
                {
                    $.mobile.loading("hide");
                    console.log(value);
                },
                complete : function () 
                {
                    $.mobile.changePage("#Login_Page")
                }
            });
        });
    });

    /*------------------------------------------------------------------------------------*/
    // 04. Halaman Rencana
    /*------------------------------------------------------------------------------------*/

    $(document).on("pagecreate", "#Setup_Rencana_Page", function ()
    {
        $("#create_setup").click(function ()
        {
            $.mobile.changePage($('#Setup_Rencana_Pemasukan'));
            var setup = $('#form_setup').serialize();
            console.log(setup);

            $.ajax({
                type: 'POST',
                url: 'php/rencana.php',
                data: setup,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Mengirim Data', textVisible: 'textVisible' })
                },
                success: function (status)
                {
                    console.log(status);
                    $.mobile.loading("hide");
                },
                complete: function ()
                {
                    $.mobile.changePage($('#Setup_Rencana_Pemasukan'))
                }
            });
        });
    });

    $(document).on("pagecreate", "#Setup_Rencana_Pemasukan", function ()
    {
        $("#save_pemasukan").click(function ()
        {
            $.mobile.changePage($('#Setup_Rencana_Pengeluaran'));
            var pemasukan = $('#form_rencana_pemasukan').serialize();
            console.log(pemasukan);

            $.ajax({
                type: 'POST',
                url: 'php/kategori_pemasukan.php',
                data: pemasukan,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Mengirim Data', textVisible: 'textVisible' })
                },
                success: function ()
                {
                    $.mobile.changePage($('#Setup_Rencana_Pengeluaran'));
                },
                complete: function (status)
                {
                    console.log(status);
                    $.mobile.loading("hide")
                }
            });
        });

        var inc = 1
        $("#tambah_kategori_pemasukan").click(function ()
        {
            if (inc > 5) return;

            var tambah_input_pemasukan = $(
                    "<div class='ui-block-a'>" +
                    "<input type='text' name= 'kategori_pemasukan[]'></div>" +
                    "<div class='ui-block-b' style='padding-left: 5%;'>" +
                    "<input type='text' name='nominal_pemasukan[]'></div>");

            inc++;
            console.log(inc);

            $("#pemasukan_rencana").append(tambah_input_pemasukan).trigger('create');
        });

        $("#hapus_kategori_pemasukan").click(function ()
        {
            if (inc != 1)
            {
                $('#pemasukan_rencana :last').remove();
                $('#pemasukan_rencana').refresh();
                inc--;
                console.log(inc);
            }
        });
    });
    
    $(document).on("pagecreate", "#Setup_Rencana_Pengeluaran", function ()
    {
        var exp = 1
        $("#tambah_kategori_pengeluaran").click(function ()
        {
            if (exp > 5) return;

            var tambah_input_pemasukan = $(
                    "<div class='ui-block-a'>" +
                    "<input type='text' name= 'kategori_pengeluaran[]'></div>" +
                    "<div class='ui-block-b' style='padding-left: 5%;'>" +
                    "<input type='text' name='nominal_pengeluaran[]'></div>");

            exp++;
            console.log(exp);

            $("#pengeluaran_rencana").append(tambah_input_pemasukan).trigger('create');
        });

        $("#hapus_kategori_pengeluaran").click(function ()
        {
            if (exp != 1)
            {
                $('#pengeluaran_rencana :last').remove();
                $('#pemasukan_rencana').refresh();
                exp--;
                console.log(exp);
            }
        });
        
        $("#save_pengeluaran").click(function ()
        {
            var pengeluaran = $('#form_rencana_pengeluaran').serialize();
            console.log(pengeluaran);

            $.ajax({
                type: 'POST',
                url: 'php/kategori_pengeluaran.php',
                data: pengeluaran,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Mengirim Data', textVisible: 'textVisible' })
                },
                success: function (status)
                {
                    console.log(status);
                },
                complete: function ()
                {
                    $.mobile.loading("hide")
                    $.mobile.changePage($('#Data_OK'));
                }
            });
        });
    });    

    /*------------------------------------------------------------------------------------*/
    // 06. Halaman Transaksi_1. Pemasukan
    /*------------------------------------------------------------------------------------*/
    $(document).on("pagebeforeshow", "#Pemasukan_Page", function ()
    {
        $.ajax({
            url: 'php/getKategoriPemasukan.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 3000,
            success: function (data, status)
            {
                $('#kategori_inc option').remove();
                $.each(data, function (i, item)
                {
                    $("#kategori_inc").append('<option value=' + this.nama + '>' + this.nama + '</option>');
                    $("#kategori_inc").selectmenu('refresh');
                });
            }
        });
    });

    $(document).on("pagecreate", "#Pemasukan_Page", function ()
    {
        $("#tambah_pemasukan").click(function ()
        {
            var pemasukan = $("#form_transaksi_pemasukan").serialize();
            console.log(pemasukan);
            console.log("test");

            $.ajax({
                type: 'POST',
                url: 'php/transaksi_pemasukan.php',
                data: pemasukan,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Data Sedang Dikirim', textVisible: 'textVisible' })
                },
                complete: function (data)
                {
                    console.log(data);
                    $.mobile.loading("hide")
                },
                success: function ()
                {
                    $.mobile.changePage($('#Transaksi_OK'));
                }
            });
        });
    });   

    /*------------------------------------------------------------------------------------*/
    // 07. Halaman Transaksi_2. Pengeluaran
    /*------------------------------------------------------------------------------------*/
    $(document).on("pagebeforeshow", "#Pengeluaran_Page", function ()
    {
        $.ajax({
            url: 'php/getKategoriPengeluaran.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 3000,
            success: function (data, status)
            {
                $('#kategori_exp option').remove();
                $.each(data, function (i, item)
                {
                    $("#kategori_exp").append('<option value=' + this.nama + '>' + this.nama + '</option>');
                    $("#kategori_exp").selectmenu('refresh');
                });
            }
        });
    });

    $(document).on("pagecreate", "#Pengeluaran_Page", function ()
    {
        $("#tambah_pengeluaran").click(function ()
        {            
            var pengeluaran = $("#form_transaksi_pengeluaran").serialize();
            console.log(pengeluaran);

            $.ajax({
                type: 'POST',
                url: 'php/transaksi_pengeluaran.php',
                data: pengeluaran,
                beforeSend: function ()
                {
                    $.mobile.loading("show", { text: 'Data Sedang Dikirim', textVisible: 'textVisible' })
                },
                complete: function (data)
                {
                    console.log(data);
                    $.mobile.loading("hide")
                },
                success: function ()
                {
                    $.mobile.changePage($('#Transaksi_OK'));
                }
            });
        });
    });

    /*------------------------------------------------------------------------------------*/
    // 08. Halaman Catatan_1. Pemasukan
    /*------------------------------------------------------------------------------------*/
    $(document).on("pagebeforeshow", "#Catatan_Pemasukan_Page", function (event)
    {
        $("#contacts_inc").empty().listview('refresh');
        $.ajax({
            url: 'php/catatan_pemasukan.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function (data, status)
            {
                $('#contacts_inc').listview('refresh');

                $("#contacts_inc").append('<li data-role="list-divider">List Transaksi Pemasukan</li>');

                $.each(data, function (i, item)
                {
                    $("#contacts_inc").append('<li><h2>' + this.deskripsi + '</h2><p>Nominal : Rp <i>' + this.nominal + '</i></p>' + '<p class="ui-li-aside"><i>' + this.tanggal + '</i></p></li>');
                });
            },
            complete: function ()
            {
                $('#contacts_inc').listview('refresh');
            }
        });
    });

    /*------------------------------------------------------------------------------------*/
    // 09. Halaman Catatan_2. Pengeluaran
    /*------------------------------------------------------------------------------------*/
    $(document).on("pagebeforeshow", "#Catatan_Pengeluaran_Page", function (event)
    {
        $("#contacts_exp").empty().listview('refresh');
        $.ajax({
            url: 'php/catatan_pengeluaran.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 3000,
            success: function (data, status)
            {
                $("#contacts_exp").append('<li data-role="list-divider">List Transaksi Pengeluaran</li>');

                $.each(data, function (i, item)
                {
                    $("#contacts_exp").append('<li><h2>' + this.deskripsi + '</h2><p>Nominal : Rp <i>' + this.nominal + '</i></p>' + '<p class="ui-li-aside"><i>' + this.tanggal + '</i></p></li>');
                });
            },
            complete: function ()
            {
                $('#contacts_exp').listview('refresh');
            }
        });
    });

    /*------------------------------------------------------------------------------------*/
    // 10. Halaman Laporan
    /*------------------------------------------------------------------------------------*/
    $(document).on("pagebeforeshow", "#Laporan_Page", function ()
    {
        var akumulasi = new Array();
        var jum = 0;

        $.ajax({
            url: 'php/get_val_max.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            beforeSend: function ()
            {
                $.mobile.loading("show", { text: 'Sedang Mengambil Data', textVisible: 'textVisible' })
            },
            success: function (data)
            {
                $.each(data, function (i, item)
                {
                    akumulasi[i] = item.nominal;
                    $("#progressbar").append('<b>' + item.nama + '</b><br><div id=' + item.nama + '></div><br>');
                    $("#" + item.nama).progressbar({ max: item.maksimal });
                    $("#" + item.nama).progressbar("option", {
                        value: eval(item.akumulasi)
                    });
                });
            },
            complete: function (status)
            {
                console.log(status);
                console.log("Sukses");
                $.mobile.loading("hide");
            }
        });

        $("#refresh").click(function ()
        {
            location.reload();
        });
    });