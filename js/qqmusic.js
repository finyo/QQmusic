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

    
     //鼠标经过图片时加载遮罩层的效果
     $('.lunbo-img>li').mouseover(function() {

        $zhezhao = $('.lunbo-img-zj').css('height');

       $('.img-zhezhao').css('height',$zhezhao);

     });

    
      //实现轮播图功能
      $imgI = 0;

      $imglength = $('#lunbo>div');

      function lbsport() {

          // 初始化小焦点图
          $('.jiaodian>li').css('opacity','0.3');

          // 获取每张轮播图的实时宽度
          $imgWidth = parseInt($imglength.eq(1).css('width'));

          $imgI++;

         if($imgI>4){

          $imgI = 0;

          $('#lunbo').css({'left':'0px'});

          $('.jiaodian>li').eq(0).css('opacity','1');

         }else{

          if($imgI == 4){

         $('.jiaodian>li').eq(0).css('opacity','1');

         }else{

         $('.jiaodian>li').eq($imgI).css('opacity','1');

         }

         $('#lunbo').animate({'left':((-$imgWidth)*$imgI)+'px'},500);
         
         }

  } 


    //开启定时器
    timer = setInterval(lbsport,5000);

   //鼠标移上轮播图时 停止轮播
    $('#lunbo').mouseenter(function() {

        clearInterval(timer);

    });


    //鼠标离开轮播图时 开启轮播
    $('#lunbo').mouseleave(function() {

      timer = setInterval(lbsport,5000);

    });

    
       //轮播小焦点图鼠标移入事件
       $('.jiaodian>li').mouseover(function() {

           clearInterval(timer);

           if(!$("#lunbo").is(":animated")){

           $imgWidth = parseInt($imglength.eq(1).css('width'));

           $('.jiaodian>li').css('opacity','0.3');

           $(this).css('opacity','1');

           $imgI = $(this).html();

           $('#lunbo').animate({'left':((-$imgWidth)*$imgI)+'px'},500);

           }
    });
    

    //轮播小焦点图 鼠标移出事件
    $('.jiaodian>li').mouseout(function() {

       timer = setInterval(lbsport,5000);

    })

    
      //左箭头指向
       $('.ic-left').click(function() {


              clearInterval(timer);

              console.log($imgI)  

              $('.jiaodian>li').css('opacity','0.3');

              if($imgI >= 4){

                $('.jiaodian>li').eq(0).css('opacity','1');

              }else if($imgI == 3){

                $('.jiaodian>li').eq(0).css('opacity','1');

              }else{

               $('.jiaodian>li').eq($imgI+1).css('opacity','1');  
                
              }


              //实时获取轮播图的Left值
              $imgLeft = parseInt($('#lunbo').css('left'));

              //实时获取轮播图的宽度
              $imgWidth = parseInt($imglength.eq(1).css('width'));

              // 判断动画是否还在执行 防止发生bug
              if(!$("#lunbo").is(":animated")){

              //第一张图片被点击向左运行时
              if($imgLeft == 0){

              $imgI = 1;

              $('#lunbo').animate({'left':((-$imgWidth)*$imgI)+'px'},500);

              timer = setInterval(lbsport,5000);

              //当到最后一张图片的时候 归位      
              }else if($imgI >= 4){


              $imgI = 0; 

              $('#lunbo').css({'left':'0px'});

              $('#lunbo').animate({'left':((-$imgWidth)*$imgI)+'px'},500);

              timer = setInterval(lbsport,5000); 

              }else{

              $imgI++;

              $('#lunbo').animate({'left':((-$imgWidth)*$imgI)+'px'},500);

              timer = setInterval(lbsport,5000);    

               } 

             }

      });


   
      //右箭头指向
      $('.ic-right').click(function() {

        clearInterval(timer);

        $('.jiaodian>li').css('opacity','0.3');

        $('.jiaodian>li').eq($imgI-1).css('opacity','1');


        //获取当前的left值
        $imgLeft = parseInt($('#lunbo').css('left'));

        $imgWidth = parseInt($imglength.eq(1).css('width'));

      //判断是否还在运动 如果还在运动则不执行动画
      if(!$("#lunbo").is(":animated")){

        //若是在第一张时 改变left值
        if($imgLeft == 0){

            $imgI = 1;

            $('#lunbo').css({'left':(-$imgWidth)*4+'px'});

            //重新获取left值 后再判断运动 
            $imgLeft = parseInt($('#lunbo').css('left'));

            $('#lunbo').animate({'left':($imgWidth+$imgLeft)+'px'},500); 
         
            
            timer = setInterval(lbsport,5000); 
        
        }else{

        //或者$imgI值大于4
        if($imgI == 4){

          $imgI = 1;

          $('#lunbo').animate({'left':($imgWidth+$imgLeft)+'px'},500); 

          timer = setInterval(lbsport,5000);     

        }else{

            $('#lunbo').animate({'left':($imgWidth+$imgLeft)+'px'},500);       
               
            $imgI++; 
           }
        
         }
     
    }

 });
       $xzmaJd = 1; 

         //小焦点图鼠标移入事件
        $('.xzmaJd>li').on('click',function() {

               clearInterval(xztimer);

               $('.xzmaJd>li').css('opacity','0.3');

               $(this).css('opacity','1');

               $xzmaJd = $(this).html();

               $('.icm-right').animate({width:'0px'},100);
               $('.icm-left').animate({width:'0px'},100);

               $leftZ = parseInt($('#xzmaItem').css('width'));

               // 获取图片的实时宽度
               $xzimgWidth = parseInt($('#xzmaItem>img').eq(0).css('width'));
                
               // 获取到达最左边不会超出的距离
               $leftZ -= $xzimgWidth;
   
              if(!$("#xzmaItem>img").is(":animated")){

                if($xzmaJd == 1){
                    
                    $('#xzmaItem>img').eq(1).animate({left:$leftZ + 'px',height:'200px',marginTop:'30px','marginLeft':'0','width':'380px',opacity:'0.6','zIndex':'2'},1000);
                    
                    $('#xzmaItem>img').eq(2).animate({left:'0',height:'200px',marginTop:'30px',opacity:'0.6','marginLeft':'0'},1000);
                    
                    $('#xzmaItem>img').eq(0).animate({left:'50%',height:'260px',marginTop:'0px','width':'600px','marginLeft':'-300px',opacity:'1','zIndex':'3'},1000);
                    $('.xzmaJd>li').off('click')
               
                }else if($xzmaJd == 3){
                    
                    $('#xzmaItem>img').eq(1).animate({left:$leftZ + 'px',height:'200px',marginTop:'30px','marginLeft':'0','width':'380px',opacity:'0.6','zIndex':'2'},1000);
                    
                    $('#xzmaItem>img').eq(0).animate({left:'0',height:'200px',marginTop:'30px',opacity:'0.6','marginLeft':'0'},1000);
                    
                    $('#xzmaItem>img').eq(2).animate({left:'50%',height:'260px',marginTop:'0px','width':'600px','marginLeft':'-300px',opacity:'1','zIndex':'3'},1000);
                   
                   $('.xzmaJd>li').off('click')
               
                }else{
                   
                    $('#xzmaItem>img').eq(1).animate({left:$leftZ + 'px',height:'200px',marginTop:'30px','marginLeft':'0','width':'380px',opacity:'0.6','zIndex':'2'},1000);
                    
                    $('#xzmaItem>img').eq(2).animate({left:'0',height:'200px',marginTop:'30px',opacity:'0.6','marginLeft':'0'},1000);
                   
                    $('#xzmaItem>img').eq(0).animate({left:'50%',height:'260px',marginTop:'0px','width':'600px','marginLeft':'-300px',opacity:'1','zIndex':'3'},1000);
                   
                    $('.xzmaJd>li').off('click');
                }
                

           
           }
        });


        

       //实现旋转木马效果
       function xzmove() {
       
           clearInterval(xztimer);

           var xzmaItem = document.getElementById('xzmaItem');

           var xzImg = xzmaItem.getElementsByTagName('img');
           
           $('.xzmaJd>li').css('opacity','0.3');

           $xzmaJd++;

           if($xzmaJd>2){
     
              $xzmaJd = 0;

              $('.xzmaJd>li').eq($xzmaJd).css('opacity','1');

           }else{
             
              $('.xzmaJd>li').eq($xzmaJd).css('opacity','1');

       }

       
       //第一个子元素
       var firstImg = xzImg[0];
       
       //获取外边容器的宽度
       $leftZ = parseInt($('#xzmaItem').css('width'));

       // 获取图片的实时宽度
       $xzimgWidth = parseInt($('#xzmaItem>img').eq(0).css('width'));
       
       // 获取到达最左边不会超出的距离
       $leftZ -= $xzimgWidth;

     if(!$("#xzmaItem>img").is(":animated")){
       
         //图片进行移动
        
         $('#xzmaItem>img').eq(0).animate({left:$leftZ + 'px',height:'200px',marginTop:'30px','marginLeft':'0',opacity:'0.6'},1000);
        
         $('#xzmaItem>img').eq(1).animate({left:'0',height:'200px',marginTop:'30px',opacity:'0.6','marginLeft':'0'},1000);
         
         $('#xzmaItem>img').eq(2).animate({left:'50%',height:'260px',marginTop:'0px','marginLeft':'-300px',opacity:'1'},1000);

         $('#xzmaItem>img').eq(0).remove();

         $('#xzmaItem').append(firstImg);

         xztimer = setInterval(xzmove,4000);

         }
       
      }
      
      //开启旋转木马
      xztimer = setInterval(xzmove,4000);
      
      $('.icm-left').click(xzmove);

      $('.icm-right').click(xzmove);

     window.onscroll = function() {

        $pageHeight = $(document).height(); 

        scrollEvent(80,390,'.ic-right');

        scrollEvent(80,390,'.ic-left');

        scrollEvent(600,1080,'.icm-left');

        scrollEvent(600,1080,'.icm-right');

        scrollEvent(100,$pageHeight,'#navTop');

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

            },30);
         }

       $('#navTop').click(topMove);

     
     //设置底部图片选项功能
     function setImg() {

           var source = this.getAttribute("class");

           var whichpic = document.getElementById('whichpic');

           whichpic.setAttribute("src","./images/"+source+".jpg");

           $('#whichpic').animate({'opacity':'0.8'},200).animate({'opacity':'1'},500);

           $('.singermsgnav>div').css({'background':'rgba(0, 0, 0, 0.1)'});

           $(this).css({'background':'rgba(0, 0, 0, 0.5)'});

       }

     $('.select1').click(setImg);
     $('.select2').click(setImg);
     $('.select3').click(setImg);
     $('.select4').click(setImg);




});
