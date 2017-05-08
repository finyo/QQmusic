$(function() {
  
  // 顶部导航下拉菜单	
  $('.singer-search').click(function() {

  	 $(this).next().next().slideToggle(200);

  });


  //小屏幕时 显示的下拉菜单
   $('.mobile-menu').click(function() {

     $('.mobilemenu-list').slideToggle(200);

  });


  // 模态框
  $('.motai-qiehuan').click(function() {

      	$('.zh-login').css('display','block');

      	$('.ewm-login').css('display','none');

      	$(this).html('');

      	$(this).next().html('');
  });

  $('.ks-login').click(function() {

    	$('.zh-login').css('display','none');

    	$('.ewm-login').css('display','block');

    	$('.motai-qiehuan').html('账号密码登录');

    	$('.motai-qiehuan').next().html(' | '); 

  });


  //模态框判断闭包
  function mtpanduan() {

       if($('.username').val() != '' && $('.password').val() != ''){

        var $name =($('.username').val());

        $('.dl-personal').html($name);

        $('.dl-personal').css('fontSize','12px');

        $('.dl-personal').css('color','#31C27C');

        $('.dl-personal').removeAttr('data-toggle');
       };
  }


   // 鼠标点击判断
   $('.btn-login').click(mtpanduan);


   // 键盘点击判断
   document.onkeydown = function (event) {

     var e = event || window.event || arguments.callee.caller.arguments[0];

     if (e && e.keyCode == 13) {

         mtpanduan

       }
    };

     window.onscroll = function() {

        $pageHeight = $(document).height(); 

        scrollEvent(100,$pageHeight,'#navTop');
        scrollEvent(750,1200,'.dingnav');

        $scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if($scrollTop>-5 && $scrollTop<800){

             $('.myVideo').trigger('play');// 播放

             $('.myVideo').removeClass("myVideo")

        }else{

           // document.getElementById('myVideo').pause(); //暂停播放

        }

      }


    //封装滚动事件
    function scrollEvent(minTop,maxTop,obj,timer) {

        $scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
           
        if($scrollTop>minTop && $scrollTop<maxTop){

             $(obj).show(500);

           }else{

             $(obj).hide(500);

           }

       }



       //滚回顶部事件
       moveanitimer = null;
       function topMove() {

             clearInterval(moveanitimer)

             moveanitimer = setInterval(function() {
        
             localTop = document.documentElement.scrollTop || document.body.scrollTop;
             
             $speed = (localTop/8);
             
             if(localTop <= 0){

             clearInterval(moveanitimer)

             }else{

             $Runmove = localTop-$speed

             $(document).scrollTop($Runmove); 

             }

            },10);
         }

         $('#navTop').click(topMove);

           //进入页面加载事件
           function loading() {

            $('.loading').css({'display':'none'});

            $('.body').css({'display':'block'});

            $('#myVideo').css({'display':'block'});  

           }

           function loadingVideo() {

                $('.loading').css({'display':'none'});

                $('.body').css({'display':'block'});
               
                $('#myVideo').trigger('play');// 播放

                $(document).scrollTop(150); 
           }



           setTimeout(loading,2000);
            
            function loadingV() {
               
               //获取设置MV介绍信息
               $instrull = $(this).attr('alt');

               $('.instrull').html($instrull);

               //获取设置MV名
               $nma = $(this).attr('name');

               $('#MVmsg').html($nma);
               $('.MVmsg').html($nma);


               $('.body').css({'display':'none'});

               $('.loading').css({'display':'block'});

               $videosrc = $(this).attr('class');

               $('.videoSrc').attr('src','./videos/'+$videosrc+'.mp4');

               $('#myVideo').attr('src','./videos/'+$videosrc+'.mp4');

               setTimeout(loadingVideo,2000);
            }


            $('.TS1').click(loadingV);
            $('.TS2').click(loadingV);
            $('.TS3').click(loadingV);
            $('.TS4').click(loadingV);
            
             liked = 1;

            $('.liked').click(function() {
               if(liked){
              $('.liked').css("background","url('./images/icon_sprite.png') -180px -180px");
               liked = 0;
               }else{
                 $('.liked').css("background","url('./images/icon_sprite.png') -160px -180px");
                 liked = 1;
               }
            })



});
