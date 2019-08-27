

```html
<!DOCTYPE html>
<html>

<head>
    <title></title>
    <style type="text/css">
    @keyframes load{
    	from{transform: rotate(0deg);}
    	to{transform: rotate(360deg);}

    }
    #loader-mask {   /* 设置位置,盖住所用内容 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 99999;
	}
    #loader {
        border-radius: 50%;
        text-align: center;
        width: 10rem;
        height: 10rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -5rem 0 0 -5rem;
        border-top: 0.5rem solid #191919;
        border-right: 0.5rem solid rgba(245, 245, 245, 0.5);
        border-bottom: 0.5rem solid rgba(245, 245, 245, 0.5);
        border-left: 0.5rem solid rgba(245, 245, 245, 0.5);
        -webkit-animation: load 1.1s infinite linear;
        animation: load 1.1s infinite linear  ;/* linear动画从头到尾的速度是相同的
      																					默认ease 动画以低速开始，然后加快，在结束前变慢 */
    }
    </style>
    <script type="text/javascript">
    	window.addEventListener('load',()=>{
    		document.getElementById('loader-mask').style.display='none'
    	},false)
    </script>
</head>

<body>
	<div id="loader-mask">
	    <div id="loader"></div>	
	</div>

	<div>
		dsadasd
	</div>

</body>

</html>
```

