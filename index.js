		$(".nav a").on("click", function(){
			$(".nav").find(".active").removeClass("active");
			$(this).parent().addClass("active");
		});
		
		//직업명 테이블
		var jobtable_name = [
		"히어로", "팔라딘", "다크나이트",
		"아크메이지(불,독)","아크메이지(썬,콜)","비숍",
		"보우마스터","신궁",
		"나이트로드","섀도어","듀얼블레이드",
		"캡틴", "바이퍼", "캐논슈터",
		"소울마스터", "미하일", "플레임위자드", "윈드브레이커", "나이트워커", "스트라이커",
		"아란", "에반", "루미너스", "메르세데스", "팬텀", "은월",
		"블래스터", "데몬슬레이어", "데몬어벤져", "배틀메이지", "와일드헌터", "제논", "메카닉",
		"카이저", "엔젤릭버스터", "제로", "키네시스"
		];
		
		//직업별 스탯 테이블, 완전한 패시브만 반영
		//스탯코드, 피, 힘, 덱, 인, 럭, 피퍼, 힘퍼, 덱퍼, 인퍼, 럭퍼, 공격력/마력, 숙련도, 공%, 뎀%, 최종뎀%, 방무, 보공, 크리
		var jobtable_adv =[
		[10, 0, 30, 30, 0, 0, 20, 0, 0, 0, 0, 30, 0.9, 0, 0, 0, 50, 0, 25],//히어로0
		[10, 0, 30, 30, 0, 0, 20, 0, 0, 0, 0, 110, 0.9, 0, 57, 42],//팔라딘1
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//다크나이트
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//불독
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//선골
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//비숍5
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//보우마스터
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//신궁
		[40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//나로
		[40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//섀도어
		[40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//듀블10
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//캡틴
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//바이퍼
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//캐논
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//소마
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//미하일15
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//플위
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//윈브
		[40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//나워
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//스커
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//아란20
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//에반
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//루미
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//매르
		[40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//팬텀
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//은월25
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//블래
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//데슬
		[50, 600, 0, 0, 0, 0, 40, 0, 0, 0, 0, 90, 0.9, 0, 40, 25],//데벤
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//배메
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//와헌30
		[60, 1000, 30, 30, 0, 30, 60, 20, 20, 0, 20, 80, 0.9, 0, 40, 0],//제논
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//메카닉
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//카이저
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//킹젤릭갓스터
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//제로35
		[30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0],//키네시수
		[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0, 0, 0]//초보자37
		];
		
			
			/*데벤 10렙 순피 1175
			11렙 순피 1190
			12렙 순피 1205
			->레벨당 15 상승.
			*/
			/*10레벨 스탯투자 피 1520, 피 
			
			/*스탯의 종류
			최종데미지%	데미지%	공격력%
			공격력 크리티컬데미지 크리티컬
			스탯 부스탯 HP 공격속도 숙련도
			방어율무시 보스공격력 데미지%증가 최종데미지%증가
			*/
			
			
		//캐릭터 스탯 클래스
		function status(){
			this.jobcode = 37;
			//직업코드, 기본 초보자
			this.statcode = 10;
			//어떤 것이 주스탯,부스탯인지 결정하는 값
			/*10: 힘직업. str주 dex부
			20: 덱1스직업. dex주 str부
			30: 인트직업. int주 luk부
			40: 럭직업. luk주 dex부, 여기까지 주스탯*4 + 부스탯
			50: 데벤져. HP주 str부
			60: 제논. str dex luk, 스탯합*3.5*/
			this.att;//공격력
			this.stat = [50, 4, 4, 4, 4];
			//hp, 힘, 덱, 인, 럭
			this.attmult;//공퍼
			this.statmult = [0, 0, 0, 0, 0];
			//hp, 힘, 덱, 인, 럭퍼
			this.fixedatt;//잠재 영향 없는 고정공격력
			this.fixedstat = [0, 0, 0, 0, 0];//고정스탯
			this.weaponconst = 1.2;//무기상수
			this.mastery = 0.2;//숙련도
			this.finaldam;//최종뎀
			this.totaldam;//총뎀
			this.bossdam;//보공
			this.crit;//크리티컬
			this.critdam;//크리뎀
			
			this.totalatt = function(){
				return (this.att*(1+(this.attmult/100)) + this.fixedatt);
			};
			//공퍼 적용된 공격력 계산
			this.statvalue = function(){
				switch(this.statcode){
					case 10://힘
					return Math.round((this.stat[1]*(1+(this.statmult[1]/100)))*4
					+ (this.stat[2]*(1+(this.statmult[2]/100))));
					break;
					case 20://덱1스
					return Math.round((this.stat[2]*(1+(this.statmult[2]/100)))*4
					+ (this.stat[1]*(1+(this.statmult[1]/100))));
					break;
					case 30://인트
					return Math.round((this.stat[3]*(1+(this.statmult[3]/100)))*4
					+ (this.stat[4]*(1+(this.statmult[4]/100))));
					break;
					case 40://럭
					return Math.round((this.stat[4]*(1+(this.statmult[4]/100)))*4
					+ (this.stat[2]*(1+(this.statmult[2]/100))));
					break;
					case 50://데벤, 연산식 작업중
					return Math.round((this.stat[0]*(1+(this.statmult[0]/100)))*4
					+ (this.stat[1]*(1+(this.statmult[1]/100))));
					break;
					case 60://제논
					return Math.round((this.stat[1]*(1+(this.statmult[1]/100)))*3.5
					+ (this.stat[2]*(1+(this.statmult[2]/100)))*3.5
					+ (this.stat[4]*(1+(this.statmult[4]/100)))*3.5);
					break;
					default: alert("행님 이거 오류인대요??;; 주작자제하자 제발??");
					break;
				}
			};//스탯퍼 적용된 스탯 계산
			this.totalmax = function(){
				var a = Math.round(this.weaponconst*this.totalatt()*this.statvalue()/100);
				if(a<1) {
					return 4;
				}
				else {
					return a;
				}
			};//실제 스공창에 표시되는 공격력 계산(최대)
			this.totalmin = function(){
				return Math.round(this.totalmax() * this.mastery);//실제 스공창에 표시되는 공격력 계산(최소)
			};
			
		}
		
		var Mystat = new status();
		
		//직업 선택시 인터페이스에 반영
		function selectjob(jc){//input : 직업코드
			
			Mystat.jobcode = jc;//직업코드 변경
			Mystat.statcode = jobtable_adv[jc][0];
			document.jobname.jobname.value = jobtable_name[jc];//직업 탭의 내 직업 변경
			document.basestat.lev.value = 10;
			document.basestat.stat1.value = 4;//스탯, 레벨수치 초기화
			var a = '<p style="font-weight:bolder">현재 직업은 ' + jobtable_name[jc] + "입니다.</p>";
			var b = "";
			switch(jobtable_adv[jc][0]){
				case 10:
				a +='<p style="font-weight:bolder">주 스탯 : STR, 부 스탯: DEX</p>';
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="STR";
				document.getElementById("stathead2").innerHTML="DEX";
				document.getElementById("stathead3").innerHTML="얘는 제논이 씁니다";
				break;
				case 20:
				a +="<p>주 스탯 : DEX, 부 스탯: STR</p>";
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="DEX";
				document.getElementById("stathead2").innerHTML="STR";
				document.getElementById("stathead3").innerHTML="얘는 제논이 씁니다";
				break;
				case 30:
				a +="<p>주 스탯 : INT, 부 스탯: LUK</p>";
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="INT";
				document.getElementById("stathead2").innerHTML="LUK";
				document.getElementById("stathead3").innerHTML="얘는 제논이 씁니다";
				break;
				case 40:
				a +="<p>주 스탯 : LUK, 부 스탯: DEX</p>";
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="LUK";
				document.getElementById("stathead2").innerHTML="DEX";
				document.getElementById("stathead3").innerHTML="얘는 제논이 씁니다";
				break;
				case 50:
				a +="<p>주 스탯 : HP, 부 스탯: STR</p>";
				a +="<p>주의 : 실제 게임에서의 수치와 맞지 않을 수 있습니다. 정확한 데이터를 수집하고 있습니다.</p>";
				a +="<p>현재 카리스마로 상승하는 HP를 템피로 계산하여 순피에 포함하지 않고 있습니다.</p>";
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="HP";
				document.getElementById("stathead2").innerHTML="STR";
				document.getElementById("stathead3").innerHTML="얘는 제논이 씁니다";
				break;
				case 60:
				a +="<p>주 스탯 : STR, DEX, LUK</p>";
				a +="<p>192레벨 이하에서의 분배 방식은 현재 개발중입니다.</p>";
				a +="<p>현재 럭 제논 기준으로 스탯을 산출하고 있으며, 다른 스탯을 사용하는 분배 방식은 현재 개발중입니다.</p>";
				document.getElementById("myjob").innerHTML = a;
				document.getElementById("stathead1").innerHTML="STR";
				document.getElementById("stathead2").innerHTML="DEX";
				document.getElementById("stathead3").innerHTML="LUK";
				break;
				default:
				break;
			}
		}
		
		//키 입력, 마우스 클릭시 스공 갱신
		//기본 스탯 + 아이템 스탯
		function refreshstat(stat) {
			//곻격력 파싱
			stat.att = jobtable_adv[stat.jobcode][11] + parseFloat(document.itemstat.att.value);
			stat.attmult = jobtable_adv[stat.jobcode][13] + parseFloat(document.itemstat.attp.value);
			//스탯 파싱
			switch(stat.statcode){
				case 10:
				break;
				case 20:
				break;
				case 30:
				break;
				case 40:
				break;
				case 50:
				break;
				case 60:
				break;
				default:
				break;
			}
			
		}
			
/*통합중
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
				document.attReport.result.value = Mystat.totalmin() + " ~ " + Mystat.totalmax();
				document.reports.totalstat.value = Mystat.statvalue();
				document.reports.totalatt.value = Mystat.totalatt();
				document.reports.d1.value = Mystat.mainstat;
			};
		
		//마우스 클릭시 갱신
		document.onclick = function (){
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
				document.attReport.result.value = Mystat.totalmin() + " ~ " + Mystat.totalmax();
				document.reports.totalstat.value = Mystat.statvalue();
				document.reports.totalatt.value = Mystat.totalatt();
			};
*/
	
//레벨에 따른 스탯연산(데벤, 제논 제외)
function calclevelstat(stat){
	if(document.basestat.lev.value<=250 && document.basestat.lev.value>=0){
		//보너스 스탯 고려
		switch(stat.statcode){
			case(50)://데벤
			if(document.basestat.lev.value<=99 && document.basestat.lev.value>=60){//3차전직 상태
				document.basestat.stat1.value = (document.basestat.lev.value*90)+495;
			}
			else if(document.basestat.lev.value<=59){//3차 이전
				document.basestat.stat1.value = (document.basestat.lev.value*90)+420;
			}
			else {//4차 이후
				document.basestat.stat1.value = (document.basestat.lev.value*90)+570;
			}
			break;
			case(60)://제논
			if(document.basestat.lev.value<=99 && document.basestat.lev.value>=60){//3차전직 상태
				var statcon=document.basestat.lev.value*5;
				switch(statcon % 3){
					case 0:
					document.basestat.stat1.value = 7+parseInt(statcon/3);
					document.basestat.stat2.value = 7+parseInt(statcon/3);
					document.basestat.stat3.value = 7+parseInt(statcon/3);
					break;
					case 1:
					document.basestat.stat1.value = 7+parseInt(statcon/3);
					document.basestat.stat2.value = 7+parseInt(statcon/3);
					document.basestat.stat3.value = 8+parseInt(statcon/3);
					break;
					case 2:
					document.basestat.stat1.value = 7+parseInt(statcon/3);
					document.basestat.stat2.value = 8+parseInt(statcon/3);
					document.basestat.stat3.value = 8+parseInt(statcon/3);
					break;
					default:
					alert("오루가 떳내요?? 재논은 좀 복잡해서 오류 뜰수도 잇음");
					break;
				}
			}
			else if(document.basestat.lev.value<=59){//3차 이전
				var statcon=document.basestat.lev.value*5;
				switch(statcon % 3){
					case 0:
					document.basestat.stat1.value = 5+parseInt(statcon/3);
					document.basestat.stat2.value = 5+parseInt(statcon/3);
					document.basestat.stat3.value = 6+parseInt(statcon/3);
					break;
					case 1:
					document.basestat.stat1.value = 5+parseInt(statcon/3);
					document.basestat.stat2.value = 6+parseInt(statcon/3);
					document.basestat.stat3.value = 6+parseInt(statcon/3);
					break;
					case 2:
					document.basestat.stat1.value = 6+parseInt(statcon/3);
					document.basestat.stat2.value = 6+parseInt(statcon/3);
					document.basestat.stat3.value = 6+parseInt(statcon/3);
					break;
					default:
					alert("오루가 떳내요?? 재논은 좀 복잡해서 오류 뜰수도 잇음");
					break;
				}
				
			}
			else if(document.basestat.lev.value<=193 && document.basestat.lev.value>=100){//193렙, 멀티래터럴 VI 이전
				var statcon=document.basestat.lev.value*5;
				switch(statcon % 3){
					case 0:
					document.basestat.stat1.value = 8+parseInt(statcon/3);
					document.basestat.stat2.value = 9+parseInt(statcon/3);
					document.basestat.stat3.value = 9+parseInt(statcon/3);
					break;
					case 1:
					document.basestat.stat1.value = 9+parseInt(statcon/3);
					document.basestat.stat2.value = 9+parseInt(statcon/3);
					document.basestat.stat3.value = 9+parseInt(statcon/3);
					break;
					case 2:
					document.basestat.stat1.value = 9+parseInt(statcon/3);
					document.basestat.stat2.value = 9+parseInt(statcon/3);
					document.basestat.stat3.value = 10+parseInt(statcon/3);
					break;
					default:
					alert("오루가 떳내요?? 재논은 좀 복잡해서 오류 뜰수도 잇음");
					break;
				}
			}
			else {//194렙부터, 멀티래터럴 VI 이후
				var statcon = (statcon=document.basestat.lev.value-193)*5;
				document.basestat.stat1.value = 330;
				document.basestat.stat2.value = 330;
				document.basestat.stat3.value = 331+statcon;
			}
			break;
			default://나머지
			if(document.basestat.lev.value<=99 && document.basestat.lev.value>=60){//3차전직 상태
				document.basestat.stat1.value = (document.basestat.lev.value*5)+13;
			}
			else if(document.basestat.lev.value<=59){//3차 이전
				document.basestat.stat1.value = (document.basestat.lev.value*5)+8;
			}
			else {//4차 이후
				document.basestat.stat1.value = (document.basestat.lev.value*5)+18;
			}
		}
			
		if(document.basestat.lev.value>=140){
			//showHyper();
		}
		else {
			var hhp = "<p>하이퍼 스탯은 레벨 140 이상에서 습득 가능합니다.</p>";
			document.getElementById("hyperstat").innerHTML = hhp;
		}
	}
	else {
		alert("1에서 250 사이의 레벨을 입력해 주세요");
		document.basestat.lev.value = 10;
		document.basestat.stat1.value = 4;
	}
}

//하이퍼스탯 관련 창
function showHyper(){
	var a;
}
		
