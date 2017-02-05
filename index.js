		$(".nav a").on("click", function(){
			$(".nav").find(".active").removeClass("active");
			$(this).parent().addClass("active");
		});
			
			/*10렙 순피 1175
			11렙 순피 1190
			12렙 순피 1205
			->레벨당 15 상승.
			*/
			
			/*스탯의 종류
			최종데미지%	데미지%	공격력%
			공격력 크리티컬데미지 크리티컬
			스탯 부스탯 HP 공격속도 숙련도
			방어율무시 보스공격력 데미지%증가 최종데미지%증가
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
		document.onkeyup = function (){
				//기본 스탯 파싱
				Mystat.mainstat = parseFloat(document.basestat.mainstat.value) + parseFloat(document.itemstat.mainstat.value);
				Mystat.substat = parseFloat(document.basestat.substat.value) + parseFloat(document.itemstat.substat.value);
				//아이템 스탯 파싱
				Mystat.att = parseFloat(document.itemstat.att.value);
				Mystat.attmult = parseFloat(document.itemstat.attp.value);
				Mystat.mainstatmult = parseFloat(document.itemstat.mainstatp.value)+parseFloat(document.itemstat.allstatp.value);
				Mystat.substatmult = parseFloat(document.itemstat.substatp.value)+parseFloat(document.itemstat.allstatp.value);
				//고정 스탯 파싱
				Mystat.fixedatt = parseFloat(document.fixed.att.value);
				Mystat.fixedmainstat = parseFloat(document.fixed.mainstat.value);
				Mystat.fixedsubstat = parseFloat(document.fixed.substat.value);
				document.attReport.result.value = Math.ceil(Mystat.total()/5) + " ~ " + Mystat.total();
				document.reports.totalstat.value = Mystat.statvalue();
				document.reports.totalatt.value = Mystat.totalatt();
				document.reports.d1.value = Mystat.mainstat;
			};
		
		//마우스 클릭시 갱신
		document.onclick = function (){
				//레벨 파싱
				//document.basestat.mainstat.value = (document.basestat.lev.value*5)+18;
				//기본 스탯 파싱
				Mystat.mainstat = parseFloat(document.basestat.mainstat.value) + parseFloat(document.itemstat.mainstat.value);
				Mystat.substat = parseFloat(document.basestat.substat.value) + parseFloat(document.itemstat.substat.value);
				//아이템 스탯 파싱
				Mystat.att = parseFloat(document.itemstat.att.value);
				Mystat.attmult = parseFloat(document.itemstat.attp.value);
				Mystat.mainstatmult = parseFloat(document.itemstat.mainstatp.value)+parseFloat(document.itemstat.allstatp.value);
				Mystat.substatmult = parseFloat(document.itemstat.substatp.value)+parseFloat(document.itemstat.allstatp.value);
				Mystat.fixedatt = parseFloat(document.fixed.att.value);
				Mystat.fixedmainstat = parseFloat(document.fixed.mainstat.value);
				Mystat.fixedsubstat = parseFloat(document.fixed.substat.value);
				document.attReport.result.value = Math.ceil(Mystat.total()/5) + " ~ " + Mystat.total();
				document.reports.totalstat.value = Mystat.statvalue();
				document.reports.totalatt.value = Mystat.totalatt();
			};
		
		function jobstat(){
			
		}