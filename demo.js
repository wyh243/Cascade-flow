function WaterFall(id,mt,ml){
				this.wrap = document.getElementById(id);
				this.aLi = this.wrap.getElementsByTagName("li");
				this.mt = mt;
				this.ml = ml;
				this.allWid = this.wrap.offsetWidth;
				this.perWid = this.aLi[0].offsetWidth + this.ml;
				this.col = Math.floor(this.allWid/this.perWid);
				this.arrH = [];
				this.initPos();
				this.conPos(this.col);
			}
			WaterFall.prototype.initPos = function(){
				for(var i = 0; i < this.col; i++){
					this.aLi[i].style.left = this.perWid * i + "px";
					this.aLi[i].style.top = 0;
					this.arrH.push(this.aLi[i].offsetHeight);
				}
			}
			WaterFall.prototype.getMinIndex = function(arr){
					var minItem = Math.min.apply(null, arr);
					var minIndex = arr.indexOf(minItem);
					return minIndex;
			}
			WaterFall.prototype.conPos = function(initIndex){
				for(var i = initIndex; i < this.aLi.length; i++){
					var minIndex = this.getMinIndex(this.arrH);
					this.aLi[i].style.left = minIndex*this.perWid + "px";
					this.aLi[i].style.top = this.arrH[minIndex] + this.mt + "px";
					this.arrH[minIndex] = this.arrH[minIndex] + this.aLi[i].offsetHeight + this.mt;
				}
			}
			WaterFall.prototype.scroll = function(){
				
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var cH = document.documentElement.clientHeight || document.body.clientHeight;
				var minIndex = this.getMinIndex(this.arrH);
				if(this.arrH[minIndex] <= scrollTop + cH) {
					var data = ["img2/1.jpg", "img2/3.jpg", "img2/5.jpg", "img2/7.jpg", "img2/8.jpg", "img2/9.jpg", "img2/6.jpg", "img2/3.jpg"];
					for(var k = 0; k < data.length; k++) {
						var oLi = document.createElement("li");
						oLi.innerHTML = "<img src='" + data[k] + "'>";
						this.wrap.appendChild(oLi);
					}
					this.conPos(this.aLi.length-data.length);
				}
			}
			
			
			window.onresize = window.onload = function(){
				var waterfall = new WaterFall("water",10,10);
				window.onscroll = function(){
					waterfall.scroll();
				}
				
				
				
			}
			
	