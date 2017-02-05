		$(".nav a").on("click", function(){
			$(".nav").find(".active").removeClass("active");
			$(this).parent().addClass("active");
		});
			
			/*10렙 순피 1175
			11렙 순피 1190
			12렙 순피 1205
			->레벨당 15 상승.
			*/
		//클래스 선언:임시
		function status(){
			this.att;
			this.mainstat;
			this.substat;
			this.attmult;
			this.mainstatmult;
			this.substatmult;
			this.fixedatt;
			this.fixedmainstat;
			this.fixedsubstat;
			this.weaponconst;
			this.totalatt = function(){
				return (this.att*(1+(this.attmult/100)) + this.fixedatt)/100;
			};
			this.totalstat = function(){
				return eval((this.stat*(1+(this.statmult/100)) + this.fixedstat));
			};
			this.statvalue = function(){
				return Math.round((this.mainstat*(1+(this.mainstatmult/100)))*4
				+ (this.substat*(1+(this.substatmult/100))));
			};
			this.total = function(){
				var a = Math.round(1.2*this.totalatt()*this.statvalue());
				if(a<1) {
					return 4;
				}
				else {
					return a;
				}
			};
		}
		var Mystat = new status();
		
		
		//키 입력시 갱신
		document.onkeyup = function(){
		Mystat.att = parseFloat(document.basestat.att.value);
		Mystat.mainstat = parseFloat(document.basestat.mainstat.value);
		Mystat.substat = parseFloat(document.basestat.substat.value);
		Mystat.attmult = parseFloat(document.mult.att.value);
		Mystat.mainstatmult = parseFloat(document.mult.mainstat.value)+parseFloat(document.mult.allstat.value);
		Mystat.substatmult = parseFloat(document.mult.substat.value)+parseFloat(document.mult.allstat.value);
		Mystat.fixedatt = parseFloat(document.fixed.att.value);
		Mystat.fixedmainstat = parseFloat(document.fixed.mainstat.value);
		Mystat.fixedsubstat = parseFloat(document.fixed.substat.value);
		document.attReport.result.value = Math.ceil(Mystat.total()/5) + " ~ " + Mystat.total();
		document.reports.totalstat.value = Mystat.statvalue();
		document.reports.totalatt.value = Mystat.totalatt();
		};
		
		//마우스 클릭시 갱신
		document.onclick = function(){
		Mystat.att = parseFloat(document.basestat.att.value);
		Mystat.mainstat = parseFloat(document.basestat.mainstat.value);
		Mystat.substat = parseFloat(document.basestat.substat.value);
		Mystat.attmult = parseFloat(document.mult.att.value);
		Mystat.mainstatmult = parseFloat(document.mult.mainstat.value)+parseFloat(document.mult.allstat.value);
		Mystat.substatmult = parseFloat(document.mult.substat.value)+parseFloat(document.mult.allstat.value);
		Mystat.fixedatt = parseFloat(document.fixed.att.value);
		Mystat.fixedmainstat = parseFloat(document.fixed.mainstat.value);
		Mystat.fixedsubstat = parseFloat(document.fixed.substat.value);
		document.attReport.result.value = Math.ceil(Mystat.total()/5) + " ~ " + Mystat.total();
		document.reports.totalstat.value = Mystat.statvalue();
		document.reports.totalatt.value = Mystat.totalatt();
		};