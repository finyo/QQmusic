
$(function() {



//模态框
 $('.motai-qiehuan').click(function() {
        
        //账号登录显示
      	$('.zh-login').css('display','block');
        
        //二维码登录隐藏
      	$('.ewm-login').css('display','none');

      	$(this).html('');

      	$(this).next().html('');
  });

  $('.ks-login').click(function() {
       
       //账号登录隐藏
    	$('.zh-login').css('display','none');
      
      //二维码登录显示
    	$('.ewm-login').css('display','block');

    	$('.motai-qiehuan').html('账号密码登录');

    	$('.motai-qiehuan').next().html(' | '); 

  });


//定时器全局变量
var progresstimer;

//歌词滚定全量
var gecigundong;

//序列号全局变量
$songxuhao = 0;

//分全局定流量定义
var fen;

//秒全局变量定义
var miao;

//获取播放器ID
var audio = document.getElementById('mainplayer');

//设置播放标志位
var palystatue = 0;

//点击歌曲名时事件
  function onpalysong(){
      
     //获取要播放的歌曲名
     $songname = $(this).attr('alt');

     //获取歌曲序号
     $nameattr = $(this).attr('name');
     $songxuhaosplit = $nameattr.split('song');
     $songxuhao = $songxuhaosplit[1];


     //获取播放器现在的歌曲地址
     $thelastsrc = $('#mainplayer').attr('src');

     //设置被点击歌曲播放地址
     $nowsrc = './songs/'+$songname+'.mp3';
      
      //判断 如果播放状态为停止0 且地址不同（还没有播放地址）则开启播放
      if(!palystatue && $thelastsrc != $nowsrc){
          
        //将播放地址改为当前点击的歌曲地址
	      audio.src =  $nowsrc;
        
        //歌曲播放
        audio.play();
          
        //获取歌曲名字
	      $songname2 = $(this).html();

        //获取歌手名
	      $singer = $(this).next().next().html();
          
        //歌词栏设置歌手名字
	      $('.lrcsinger').html( " - "+$singer );
          
        //歌词栏设置歌曲名字
	      $('.lrsongname').html($songname2);
	       
	      //歌词栏显示歌曲对应专辑图片
	      $('.lrcimg').attr("src","./images/"+$songname+".jpg");
          
        //背景图设置为对应图片
	      $('.imgfilter').attr("src","./images/"+$songname+".jpg");
          
        //列表播放logo改变
	   	  $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");//所有logo设置为停止状态
	   	  $(this).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");//被点击歌曲列表的logo设置为播放状态
          
        //动态gif改变
	      $('.songName>embed').css('opacity','0');//所有歌曲的前面GIF隐藏
	   	  $(this).find('embed').css('opacity','1');//被播放歌曲的gif显示
          
        //底部播放logo改变 为播放状态
	   	  $('.spbutton').css("background","url('./images/player.png') -30px 0");
        
        //播放状态标志位发生改变
	   	  palystatue = 1;
        
        //开启状态条定时器
        progresstimer = setInterval(progressTime,50);
        
        //开启歌词滚定条定时器
        gecigundong = setInterval(gecigundong,3000);
        
        //以为无法立即获取被切换歌曲的总时长 设一次性定时器 获取歌曲总时长
	   	  setTimeout(function() {

	   	     //获取歌曲时长
           var time = audio.duration;
           
           //强制转换为整数
           var zhengtime = parseInt(time);
           
           //获取秒数
           miao = zhengtime%60;
           
           //计算分钟
           var zhengtime1 = zhengtime/60;

           var zhengtime2 = zhengtime1.toString();

           var zhengtime3 = zhengtime2.split('.');

           fen = zhengtime3[0];
           
           var list = document.getElementsByClassName('songtime');
          
           if(miao < 10){
 
           list[$songxuhao].innerHTML = "0"+fen+":"+"0"+miao;
           
           }else{

           list[$songxuhao].innerHTML = "0"+fen+":"+miao;

           }
           
	   	  },1000);
          	
      }else if(!palystatue){
        
        //若状态为暂停 则播放 （防止重新播放） 
        audio.play();
          
        //动态gif改变   
	      $('.songName>embed').css('opacity','0');
	   	  $(this).find('embed').css('opacity','1');
         
        //列表logo发生改变
	   	  $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");
	   	  $(this).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");
        
        //底部播放器图片发生改变
	   	  $('.spbutton').css("background","url('./images/player.png') -30px 0");

        //播发状态改变
	   	  palystatue = 1;
        
        //开启实时状态条定时器
        progresstimer = setInterval(progressTime,50);

      }else{
        
        //播放停止
        audio.pause();
        
        //所有图片发生改变 播放状态为停止
        $('.songName>embed').css('opacity','0');
        $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");
	      $('.spbutton').css("background","url('./images/player.png') 0 0");
         
        palystatue = 0;
         
        //清除定时器
        clearInterval(progresstimer);

        clearInterval(gecigundong);

      }

   }






     //点击歌曲列表里的logo时播放事件
     function logopalysong(){
     
     //获取当前被点击的歌曲名
     $songname = $(this).attr('alt');
     
     //获取当前播放器的播放地址
     $thelastsrc = $('#mainplayer').attr('src');
     
     //设置当前被点击歌曲的播放地址
     $nowsrc = './songs/'+$songname+'.mp3';

     //获取歌曲序号
     $nameattr = $(this).attr('name');
    
     $songxuhaosplit = $nameattr.split('song');

     $songxuhao = $songxuhaosplit[1];
      
      //判断 如果播放状态为停止0 且地址不同（还没有播放地址）则开启播放
      if(!palystatue && $thelastsrc != $nowsrc){
          
	      audio.src = $nowsrc;

        audio.play();

	      $singer = $(this).next().next().html();
	     
	      $('.lrsongname').html($songname);

	      $('.lrcsinger').html('');

	   	  $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

	   	  $(this).css("background","url('./images/icon_list_menu.png') -80px -200px");

	      $('.lrcimg').attr("src","./images/"+$songname+".jpg");

	      $('.imgfilter').attr("src","./images/"+$songname+".jpg");

	      $('.songName>embed').css('opacity','0');

   	    $(this).parent().prev().find('embed').css('opacity','1');

   	    $('.spbutton').css("background","url('./images/player.png') -30px 0");

	   	  palystatue = 1;

        progresstimer = setInterval(progressTime,50);

	   	  setTimeout(function() {

	   	   //获取歌曲时长
           var time = audio.duration;
           
           var zhengtime = parseInt(time);
           
           //获取秒数
           miao = zhengtime%60;
           
           //计算分钟
           var zhengtime1 = zhengtime/60;

           var zhengtime2 = zhengtime1.toString();

           var zhengtime3 = zhengtime2.split('.');

           fen = zhengtime3[0];
           
          var list = document.getElementsByClassName('songtime');
          
           if(miao < 10){
 
           list[$songxuhao].innerHTML = "0"+fen+":"+"0"+miao;
           
           }else{

           list[$songxuhao].innerHTML = "0"+fen+":"+miao;

           }
           
	   	  },1000);

      }else if(!palystatue){
         
          audio.play();
             
	      $('.songName>embed').css('opacity','0');

   	      $(this).parent().prev().find('embed').css('opacity','1');

	   	  $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

	   	  $(this).css("background","url('./images/icon_list_menu.png') -80px -200px");

	   	  palystatue = 1;

	   	  $('.spbutton').css("background","url('./images/player.png') -30px 0");

        progresstimer = setInterval(progressTime,50);

      }else{
        
        audio.pause();

        $('.songName>embed').css('opacity','0');

        $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");
         
        palystatue = 0;

        $('.spbutton').css("background","url('./images/player.png') 0 0");

        clearInterval(progresstimer)

      }

}




// 底部暂停播放按钮
function zanbo() {
       
       //获取当前播放器的播放地址
       $thelastsrc = $('#mainplayer').attr('src');
       
       //获取当前列表的歌曲数量
       $songLength = $('.songName').length;
       
       //建立随机下标
       var num = Math.floor(Math.random()*$songLength);
        
        //如果播放器还没有播放地址 点击随机播放
       if($thelastsrc == ''){

          $songname = $('.songName').eq(num).attr('alt');

          audio.src = './songs/'+$songname+'.mp3';

          $songname2 = $('.songName').eq(num).html();

          $singer = $('.songName').eq(num).next().next().html();

          $('.lrcsinger').html( " - "+$singer );

	        $('.lrsongname').html($songname2);

          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

	   	    $('.songName').eq(num).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

	        $('.lrcimg').attr("src","./images/"+$songname+".jpg");

	        $('.imgfilter').attr("src","./images/"+$songname+".jpg");

	        $('.songName>embed').css('opacity','0');

	   	    $('.songName').eq(num).find('embed').css('opacity','1');

	   	    $(this).css("background","url('./images/player.png') -30px 0");

	   	    palystatue = 1;

	   	    audio.play();

          rogresstimer = setInterval(progressTime,50);
          
          setTimeout(function() {

	   	     //获取歌曲时长
           var time = audio.duration;
           
           var zhengtime = parseInt(time);
           
           //获取秒数
           miao = zhengtime%60;
           
           //计算分钟
           var zhengtime1 = zhengtime/60;

           var zhengtime2 = zhengtime1.toString();

           var zhengtime3 = zhengtime2.split('.');

           fen = zhengtime3[0];
           
          var list = document.getElementsByClassName('songtime');
          
           if(miao < 10){
 
           list[num].innerHTML = "0"+fen+":"+"0"+miao;
           
           }else{

           list[num].innerHTML = "0"+fen+":"+miao;

           }
           
	   	  },1000);
       }else if(palystatue){

            audio.pause();

       	    $('.songName>embed').css('opacity','0');

            $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

    		$(this).css("background","url('./images/player.png') 0 0");

    		palystatue = 0;

        clearInterval(rogresstimer);

       }else{

            audio.play();

    		$(this).css("background","url('./images/player.png') -30px 0");

    		palystatue = 1;

        rogresstimer = setInterval(progressTime,50);

       }

   }



//上一首歌曲
function thelast() {

   	   //获取当前播放器的播放地址
       $thelastsrc = $('#mainplayer').attr('src');
       
       //获取当前列表的歌曲数量
       $songLength = $('.songName').length;
       
       //建立随机下标
       var num = Math.floor(Math.random()*$songLength);
        
       //如果播放器还没有播放地址 点击随机播放
       if($thelastsrc == ''){

          $songname = $('.songName').eq(num).attr('alt');

          audio.src = './songs/'+$songname+'.mp3';

          $songname2 = $('.songName').eq(num).html();

          $singer = $('.songName').eq(num).next().next().html();

          $('.lrcsinger').html( " - "+$singer );

	        $('.lrsongname').html($songname2);

          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

  	   	  $('.songName').eq(num).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

  	      $('.lrcimg').attr("src","./images/"+$songname+".jpg");

  	      $('.imgfilter').attr("src","./images/"+$songname+".jpg");

  	      $('.songName>embed').css('opacity','0');

  	   	  $('.songName').eq(num).find('embed').css('opacity','1');

           $('.spbutton').css("background","url('./images/player.png') -30px 0");

  	   	  palystatue = 1;

  	   	  audio.play();

          rogresstimer = setInterval(progressTime,50);       

       }else{

       	  if($songxuhao == 0) {
          
	          $songxuhao = ($songLength-1);

	          $songname = $('.songName').eq($songxuhao).attr('alt');

	          audio.src = './songs/'+$songname+'.mp3';

	          audio.play();

	          $songname2 = $('.songName').eq($songxuhao).html();

	          $singer = $('.songName').eq($songxuhao).next().next().html();

	          $('.lrcsinger').html( " - "+$singer );

		        $('.lrsongname').html($songname2);

	          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

		   	    $('.songName').eq($songxuhao).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

		        $('.lrcimg').attr("src","./images/"+$songname+".jpg");

		        $('.imgfilter').attr("src","./images/"+$songname+".jpg");
  
		        $('.songName>embed').css('opacity','0');

		   	    $('.songName').eq($songxuhao).find('embed').css('opacity','1');

             $('.spbutton').css("background","url('./images/player.png') -30px 0");

	   	      palystatue = 1;

            rogresstimer = setInterval(progressTime,50);
       	  	
       	  }else{
            
              $songxuhao--;

              $songname = $('.songName').eq($songxuhao).attr('alt');

              audio.src = './songs/'+$songname+'.mp3';

              audio.play();
  
	            $songname2 = $('.songName').eq($songxuhao).html();

	          $singer = $('.songName').eq($songxuhao).next().next().html();

	          $('.lrcsinger').html( " - "+$singer );

		        $('.lrsongname').html($songname2);

	          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

		   	    $('.songName').eq($songxuhao).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

		        $('.lrcimg').attr("src","./images/"+$songname+".jpg");

		        $('.imgfilter').attr("src","./images/"+$songname+".jpg");

		        $('.songName>embed').css('opacity','0');

		   	    $('.songName').eq($songxuhao).find('embed').css('opacity','1');

             $('.spbutton').css("background","url('./images/player.png') -30px 0");

		   	    palystatue = 1;

            rogresstimer = setInterval(progressTime,50);

       	  }

       }

   }




//下一首播放歌曲
function thenext() {

   	   //获取当前播放器的播放地址
       $thelastsrc = $('#mainplayer').attr('src');
       
       //获取当前列表的歌曲数量
       $songLength = $('.songName').length;
       
       //建立随机下标
       var num = Math.floor(Math.random()*$songLength);
        
        //如果播放器还没有播放地址 点击随机播放
       if($thelastsrc == ''){

          $songname = $('.songName').eq(num).attr('alt');

          audio.src = './songs/'+$songname+'.mp3';

          $songname2 = $('.songName').eq(num).html();

          $singer = $('.songName').eq(num).next().next().html();

          $('.lrcsinger').html( " - "+$singer );

	        $('.lrsongname').html($songname2);

          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

	   	  $('.songName').eq(num).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

	      $('.lrcimg').attr("src","./images/"+$songname+".jpg");

	      $('.imgfilter').attr("src","./images/"+$songname+".jpg");

	      $('.songName>embed').css('opacity','0');

	   	  $('.songName').eq(num).find('embed').css('opacity','1');

         $('.spbutton').css("background","url('./images/player.png') -30px 0");

	   	  palystatue = 1;

	   	  audio.play();

        rogresstimer = setInterval(progressTime,50);

       }else{

       	  if($songxuhao == ($songLength-1)) {
          
	          $songxuhao = 0;

	          $songname = $('.songName').eq($songxuhao).attr('alt');

	          audio.src = './songs/'+$songname+'.mp3';

	          audio.play();

	          $songname2 = $('.songName').eq($songxuhao).html();

	          $singer = $('.songName').eq($songxuhao).next().next().html();

	          $('.lrcsinger').html( " - "+$singer );

		      $('.lrsongname').html($songname2);

	          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

		   	  $('.songName').eq($songxuhao).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

		      $('.lrcimg').attr("src","./images/"+$songname+".jpg");

		      $('.imgfilter').attr("src","./images/"+$songname+".jpg");

		      $('.songName>embed').css('opacity','0');

		   	  $('.songName').eq($songxuhao).find('embed').css('opacity','1');

           $('.spbutton').css("background","url('./images/player.png') -30px 0");

	   	      palystatue = 1;

            rogresstimer = setInterval(progressTime,50);
         	  }else{
            
              $songxuhao++;

              $songname = $('.songName').eq($songxuhao).attr('alt');

              audio.src = './songs/'+$songname+'.mp3';

              audio.play();
  
	            $songname2 = $('.songName').eq($songxuhao).html();

	           $singer = $('.songName').eq($songxuhao).next().next().html();

	           $('.lrcsinger').html( " - "+$singer );

		        $('.lrsongname').html($songname2);

	          $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");

		   	  $('.songName').eq($songxuhao).next().find('i').eq(0).css("background","url('./images/icon_list_menu.png') -80px -200px");

		      $('.lrcimg').attr("src","./images/"+$songname+".jpg");

		      $('.imgfilter').attr("src","./images/"+$songname+".jpg");

		      $('.songName>embed').css('opacity','0');

		   	  $('.songName').eq($songxuhao).find('embed').css('opacity','1');

           $('.spbutton').css("background","url('./images/player.png') -30px 0");

		   	  palystatue = 1;

          rogresstimer = setInterval(progressTime,50);

       	  }

       }

   }


//添加本地歌曲操作
       var str;

       $('#addsong').change(function(){
       
       //获取上传的文件路径
       str=$(this).val(); 
       
       var arr=str.split('\\');

       var my=arr[arr.length-1];

       var realname1 = my.split('.');

       var realname2 = realname1[0];

       var typeSong = realname1[1];

       if(typeSong == 'mp3'){

       var realname3 = realname2.split('-');

       var singer = realname3[0];

       var songname = realname3[1];

       $songLength = $('.songName').length;

       $songNum =  'song'+$songLength;

       var newli = '<li class="songrow"><input class="checksong" type="checkbox"/><label name="'+$songNum+'" class="songName" alt="'+realname2+'"><embed src="./images/wave.gif"/>'+songname+'</label><label><i name="'+$songNum+'" class="songNamei" alt="'+realname2+'">&nbsp;</i><i class="dl-personal" data-toggle="modal" data-target="#mymodal-data">&nbsp;</i><i class="dl-personal" data-toggle="modal" data-target="#mymodal-data">&nbsp;</i><i class="dl-personal" data-toggle="modal" data-target="#mymodal-data">&nbsp;</i></label><label>'+singer+'</label><label class="songtime"></label></li>'
       
       $('.Songlist').append(newli);

       $('.songName').click(onpalysong);

       $('.songNamei').click(logopalysong);
        
       }else{
          
          alert('文件格式不对');

       }


  }) ;




//全选操作 
function allselect() {

           var list = document.getElementsByClassName('checksong');

           //循环遍历
			for(var i=0;i<list.length;i++){ 
				list[i].checked = this.checked;
			}

}

//删除操作
function removesong() {

var list = document.getElementsByClassName('checksong');
    //循环遍历
	for(var i=0;i<list.length;i++){ 
		if(list[i].checked){
			console.log(list[i]);
	        $('.Songlist>li').eq(i+1).remove();
		}
	}

}


//列表清空操作
function removeall() {

       $('#sureclear').hide();

	     $('.songrow').remove();

}

//取消列表清空操作
function unremoveall() {

       $('#sureclear').hide();
 

}

//确定清空列表弹出框
function surebox() {

       $('#sureclear').show();

}


  var percent = Math.floor((100 / audio.duration) * audio.currentTime);

  var percentTimer = null;

  var n =0;

function progressTime(){
       


      //获取播放时间与总时间的百分比
      var percent = Math.floor((100 / audio.duration) * audio.currentTime);
    
      //获取实时播放时间（进度）
      var aTime =parseInt(audio.currentTime);
    
      //歌曲的总时长
      var aLength =parseInt(audio.duration);

      if(aTime > 59){

      var beishu = parseInt(aTime/60);

      }
   
      if(aTime<10){

        $('.updataTime').html('00:0'+aTime);

      }else if(aTime>59){
        
        var newaTime = aTime - (beishu*60);

        if(newaTime<10){
         
         $('.updataTime').html('0'+beishu+':0'+newaTime);

        }else{

         $('.updataTime').html('0'+beishu+':'+newaTime);

        }

    }else{

       $('.updataTime').html('00:'+aTime);

    }

  if(percent >= 100){

    clearInterval(percentTimer);

     $('.songName>embed').css('opacity','0');

        $('.songNamei').css("background","url('./images/icon_list_menu.png') -80px 0px");
         
        palystatue = 0;

        $('.spbutton').css("background","url('./images/player.png') 0 0");

  }else{

  $('#hualun').css('width',percent+'%');

  }

}


function gecigundong() {

var songgeci = document.getElementById('songgeci');

var  songgecilist = songgeci.getElementsByTagName('p');

if( songgecilist[0] == undefined){
 clearInterval(gecigundong);
console.log('播放完毕')

}else{
  
 songgecilist[0].remove();

 songgecilist[0].style.color = "yellow";
}

  
}


/*// baba

// 不能小于的位置
console.log($('.voicecontrol').offset().left);

// 不能超过的位置
console.log($('.voicecontrol').offset().left + $('.voicecontrol').width()　);

// zaizai
$('.voicecontrol').on('click',function() {

  var $that = $(this);

  $(document).on('mouseover', function(e) {

     
     if('left',e.clientX<$('.voicecontrol').offset().left){

    $that.css('left',$('.voicecontrol').offset().left);
     }else{

    $that.css('left',e.clientX - $('.voicecontrol').offset().left);

     }


  })


}).on('mouseup', function() {

  $(document).off('mouseover', function(e){

    $that.css('left',e.clientX - $('.voicecontrol').offset().left);

  })

})*/

// voiceCon.onmousedown = function() {

//   var moveleft = event.offsetX;

//   voiceCon.onmousemove = function(e) {
    
//   var e = e || window.event;

//    this.style.left =  moveleft + 'px';

//   }

// }


/*
$('voicecontrol').click(function(e) {
    
    var ev = e || window.event;
    
    $eventLeft = event.offsetX

    console.log($eventLeft)





})
*/


$('.jingying').click(function() {

if(audio.muted){
    audio.muted = false;
    $(this).css('background',"url('./images/player.png') 0 -144px");
  }else{
    audio.muted = true; 
    $(this).css('background',"url('./images/player.png') 0 -182px");
  }

})



 $('.thelast').click(thelast);
 $('.thenext').click(thenext);
 $('.songName').click(onpalysong);
 $('.songNamei').click(logopalysong);        
 $('.spbutton').click(zanbo);
 $('.maincheck').click(allselect);
 $('.removesong').click(removesong);
 $('#showSure').click(surebox);
 $('#sureclearbtn').click(removeall);
 $('#unsureclearbtn').click(unremoveall);

});