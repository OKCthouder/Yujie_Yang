/*!
 * Adapted from Bootstrap docs JavaScript
 */


!function ($) {

  $(function () {
      
		orderTheLeftNavigations();

    function orderTheLeftNavigations(){
	    $('#navigation .sidenav').html($("#markdown-toc").html());
	    $('#navigation .sidenav ul').addClass("nav");
	    $("#markdown-toc").remove();

      // 添加Bootstrap表格样式 table-hover 
      $(".docs-content table").addClass("table table-hover");
  	}

  	$(window).load(initilizeAfterLoad);

    function initilizeAfterLoad(){
      repairTheImagesWhichCrossTheMaxWidth();
      resetHeadersStyles();
    }

    // 重新计算图片显示大小。
  	function repairTheImagesWhichCrossTheMaxWidth(){
  		var images = $(".docs-content img");
  		if(images != undefined && images.length > 0){
  			for(var i=0; i< images.length;i++){
  				var imgWidth = images[i].width;
  				if( imgWidth >= 757 ){
  					 images[i].width = 757;
  				}
  			}
  		}
  	}

    // 设置标题样式
    function resetHeadersStyles(){
      resetHeaderItemStyles($(".docs-content h1"));
      resetHeaderItemStyles($(".docs-content h2"));
    }

    function resetHeaderItemStyles(headers){
      if(headers != undefined && headers.length > 0){
        for(var i=0; i< headers.length;i++){
          
          var header = headers[i];
          console.log($(header).html());
          $(header).html($(header).html() + '<span class="anchor-target" id="' + header.id + '"></span>' +
            '<a href="#' + header.id + '" name="' + header.id + '" class="anchor glyphicon glyphicon-link"></a>');
          $(header).removeAttr('id');
        }
      }
    }
  })

}(jQuery)

$(function () {
    var topPosition = "<div id='top'></div>"; //定义顶部锚点的标签
    var goToTopButton = "<p id='goToTop'><a href='#top'><span></span></a></p>"; //定义按钮标签
    $("div.goToTop-test").prepend(topPosition); //在container的div最前面加上锚点标签
    $("div.goToTop-test").append(goToTopButton); //在container的div最后面加上按钮标签
    $("#goToTop").hide(); //首先将#goToTop隐藏
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $("#goToTop").fadeIn(1500);
            } else {
                $("#goToTop").fadeOut(1500);
            }
        }); //当点击跳转链接后，回到页面顶部位置
        $("#goToTop").click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    });
});