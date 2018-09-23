		$(".nav a").on("click", function(){
			$(".nav").find(".active").removeClass("active");
			$(this).parent().addClass("active");
		});

//스타포스 성공확률 테이블
var sfsuccP = [0.95, 0.90, 0.85, 0.85, 0.80, 0.75, 0.70, 0.65, 0.60, 0.55,
	0.45, 0.35, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
	0.30, 0.30, 0.03, 0.02, 0.01];
//스타포스 파괴확률 테이블
//실패확률과 곱해진 확률, 13렙에서 0.7%는 하락확률 70% 중 1%
var sfdestP = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	-1,-1,0.01,0.02,0.02, 0.03,0.03,0.03,0.04,0.04,
	0.1, 0.1, 0.2, 0.3, 0.4];
//1번파방옵션, 올파방
var sfdestP01 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	-1,-1,-1,-1,-1, -1,-1,0.03,0.04,0.04,
	0.1, 0.1, 0.2, 0.3, 0.4];
//2번파방옵션, 1516만 파방
var sfdestP02 = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	-1,-1,0.01,0.02,0.02, -1,-1,0.03,0.04,0.04,
	0.1, 0.1, 0.2, 0.3, 0.4];

	//파괴방지 따라 파괴테이블 선택
	function seldest(prot){
			switch(prot){
				case "0":
				return sfdestP;
				break;
				case "1":
				return sfdestP01;
				break;
				case "2":
				return sfdestP02;
				break;
				default:
				return sfdestP;
				break;
			}
	}
	//각 시도시의 메소소모량함수
	function spendmeso(mystar,itemlev,events,prot,mvps,pc){
		var basecost=0;
		var basesale=0;
		var totalcost=0;

		basecost = basemeso(mystar,itemlev);
		basesale = 1-mvps-pc;//기본할인율
		if(events==2){//30%할인이벤트면
			basesale = basesale*0.7;//곱적용 할인
		}



		if(prot==1 && mystar>11 && mystar<17){//올파방
			basesale++;//100% 가격 추가
			if(events==3 && mystar==15){//5 10 15성 이벤트때는
				basesale--;//15성은 가격추가 안됨
			}
		}else if(events!=3 && prot==2 && mystar>14 && mystar<17){//151617파방
			basesale++;//100% 가격 추가
		}else if(events==3 && prot==2 && mystar==16){
			basesale++;
		}

		return basesale*basecost;
	}

	function basemeso(mystar,itemlev){
		var basecost=0;
		if(mystar<10){
			basecost = 1000 + Math.pow(itemlev,3) * (mystar+1) / 25;
		}else if(mystar<15){
			basecost = 1000 + Math.pow(itemlev,3) * Math.pow(mystar+1,2.7) / 400;
		}else{
			basecost = 1000 + Math.pow(itemlev,3) * Math.pow(mystar+1,2.7) / 200;
		}//베이스강화비 산정
		basecost = Math.ceil(basecost/100)*100;
		return basecost;
	}
	function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//출처: http://fruitdev.tistory.com/160 [과일가게 개발자]

function starforce(){
	var itemlev = document.sf.lev.value;//아이템레벨
	var catchplus = document.sf.sfcatch.value * 0.01;//스타캐치 확률증가
	var itemcost = parseInt(document.sf.startstar.value);//아이템원가
	var myStar = parseInt(document.sf.startstar.value);//시작스타포스
	var targetStar = parseInt(document.sf.endstar.value);//타겟스타포스
	var itemcount = document.sf.itemcount.value;//몇 개 만드나?
	var nologs = document.getElementById('nologs');
	var chancetime = 0;//찬스타임 플래그
	var cr=0;//파괴횟수
	var mytry=0;//시도횟수
	var events = $(":input:radio[name=events]:checked").val();//이벤트
	var prot = $(":input:radio[name=prot]:checked").val();//파괴방지
	var mvps = $(":input:radio[name=mvps]:checked").val();//mvp할인
	var pc = $(":input:radio[name=pc]:checked").val();//pc방할인
	var spentmesolist = [];
	var spentmeso = 0;//소모메소
	var totalspentmeso = 0;
	var maxmeso=0;
	var minmeso=100000000000000;
	var straight=0;
	var res ='';
	var logs = '<button type="button" class="btn btn-dark btn-lg" onclick="getres()">돌아가기</button><br>';

	if(targetStar<myStar){
		alert('별을 깎고싶다면 지금 게임을 켜서 누르는게 좋지 않을까요?');
		return 0;
	}
	if(itemcount<1){
		alert('그렇게 하셔도 죽은 아이템은 못 살려요...');
		return 0;
	}
	if(itemlev<0){
		alert('모지? 돈을 만들고 싶은건가?ㅋㅋ');
		return 0;
	}
 for(var i=0;i<itemcount;i++){
	 spentmeso = 0;
	 myStar = parseInt(document.sf.startstar.value);
	 straight=0;

	while(myStar<targetStar){//목표 스타포스보다 적으면 반복
		if(chancetime==2){//찬스타임이면
			if(nologs.checked!=true){
			logs+= (myStar) + '→' + (myStar+1) + ' 강화 성공(찬스타임), ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모<br>';
		}
			spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
			myStar++;//별하나추가
			chancetime=0;//찬스타임 플래그 초기화
			straight++;
		}else if(events==3 && myStar<16 && myStar%5==0){//5,10,15성 이벤
			if(nologs.checked!=true){
			logs+= (myStar) + '→' + (myStar+1) + ' 강화 성공(5,10,15성 이벤트), ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모<br>';
		}
			spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
			myStar++;//별하나추가
			chancetime=0;//찬스타임 플래그 초기화
			straight++;
		}else{
			if(Math.random()<sfsuccP[myStar] + catchplus){//성공시
				if(nologs.checked!=true){
				logs+= (myStar) + '→' + (myStar+1) + ' 강화 성공, ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모<br>';
			}
				spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
				myStar++;//별하나 더함
				chancetime=0;//찬스타임 플래그 초기화
				straight++;
			}else {//성공 못할시
				if(Math.random()<seldest(prot)[myStar]){//파괴될시
					if(nologs.checked!=true){
					logs+= '<span style="color:red">'+(myStar) + '→12 강화 실패(파괴), ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모</span><br>';
				}
					spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
					spentmeso+=itemcost;//파괴시 아이템 원가 추가
					myStar = 12;//12성으로 돌아감
					chancetime=0;//찬스타임 플래그 초기화
					cr++;//파괴횟수 추가
					straight=-1;
				}else{//파괴안된 보통 실패시
					if(myStar<6 || myStar%5==0){//5의 배수이거나 5성 아래일시
						//별 유지
						if(nologs.checked!=true){
						logs+= (myStar) + '→' + (myStar) + ' 강화 실패(유지), ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모<br>';
					}
						spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
						straight=-1;
					}else{//그게 아닐시
						if(nologs.checked!=true){
						logs+= (myStar) + '→' + (myStar-1) + ' 강화 실패(하락), ' + spendmeso(myStar,itemlev,events,prot,mvps,pc) +'메소 소모<br>';
					}
						spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
						myStar--;//별 하락
						chancetime++;//찬스타임 플래그 +1
						straight=-1;

					}
				}
			}
		}
		mytry++;//시도횟수 1회추가
	}
	if(nologs.checked!=true){
	logs+= '<span style="color:blue">'+(i+1) + '번째 아이템 ' + myStar + '성으로 강화 완료</span><br><br>'
	}
	totalspentmeso +=spentmeso;
	if(spentmeso>maxmeso){maxmeso = spentmeso;}
	if(spentmeso<minmeso){minmeso = spentmeso;}
	if(straight == parseInt(document.sf.endstar.value)-parseInt(document.sf.startstar.value)){
 	 res+= '와우! 스트레이트!<br>';
 	 res+= '<img src=icon_20.png><br>';
  }
}
if(nologs.checked!=true){
logs+= '<button type="button" class="btn btn-dark btn-lg" onclick="getres()">돌아가기</button><br>';
}else{
	logs+= '로그를 보지 않도록 설정되어 있습니다.';
}

 res += '총'+ itemcount +'개 아이템을 '+parseInt(document.sf.startstar.value)+'성에서 ';
 res+= parseInt(document.sf.endstar.value) + '성으로 만들기 위해 ' +mytry+'회 강화했습니다.<br>';
 if(itemcount!=1){ res+='나의 아이템당 평균 ';}
 res+= '소모 메소 '+ addCommas(totalspentmeso/itemcount) + ' 메소 (약 ' +eokcut(totalspentmeso/itemcount)+ ')<br>';
 if(itemcount!=1){
 res+= '내 최대 메소 소모량 ' + addCommas(maxmeso) + ' 메소 (약 ' +eokcut(maxmeso)+ ')<br>';
 res+= '내 최저 메소 소모량 ' + addCommas(minmeso) + ' 메소 (약 ' +eokcut(minmeso)+ ')<br>';
}
 if(itemcount!=1){ res+='내 아이템당 평균 ';}
 res+= '파괴당한 횟수 ' + (cr/itemcount)+'회<br>';
 if(itemcount!=1){ res+='내 아이템당 평균 ';}
 res+= '시행 횟수 ' + (mytry/itemcount)+'회<br>';



var allspentmeso = 0;
	for(var i=0;i<25000;i++){
		spentmeso = 0;
		myStar = parseInt(document.sf.startstar.value);

	 while(myStar<targetStar){//목표 스타포스보다 적으면 반복
		 if(chancetime==2){//찬스타임이면
			 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
			 myStar++;//별하나추가
			 chancetime=0;//찬스타임 플래그 초기화
		 }else if(events==3 && myStar<16 && myStar%5==0){//5,10,15성 이벤
			 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
			 myStar++;//별하나추가
			 chancetime=0;//찬스타임 플래그 초기화
		 }else{
			 if(Math.random()<sfsuccP[myStar] + catchplus){//성공시
				 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
				 myStar++;//별하나 더함
				 chancetime=0;//찬스타임 플래그 초기화
			 }else {//성공 못할시
				 if(Math.random()<seldest(prot)[myStar]){//파괴될시
					 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
					 spentmeso+=itemcost;//파괴시 아이템 원가 추가
					 myStar = 12;//12성으로 돌아감
					 chancetime=0;//찬스타임 플래그 초기화
					 cr++;//파괴횟수 추가
				 }else{//파괴안된 보통 실패시
					 if(myStar<6 || myStar%5==0){//5의 배수이거나 5성 아래일시
						 //별 유지
						 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
					 }else{//그게 아닐시
						 spentmeso+=spendmeso(myStar,itemlev,events,prot,mvps,pc);//메소소모함
						 myStar--;//별 하락
						 chancetime++;//찬스타임 플래그 +1
					 }
				 }
			 }
		 }
	 }
	 allspentmeso+=spentmeso;
	 spentmesolist.push(Math.round(spentmeso/10000000)*10000000);
	 if(spentmeso>maxmeso){maxmeso = spentmeso}
 		if(spentmeso<minmeso){minmeso = spentmeso}
	}
	var rankcount=0;
	for(var i=0;i<25000;i++){
		if(spentmesolist[i]<(totalspentmeso/itemcount)){
			rankcount++;
		}
	}

	var rankperc = (rankcount/25000*100);
	var avrmeso = Math.round(allspentmeso/25000);
	res+= '상위 ' + rankperc.toFixed(3) +'%의 운입니다(당신보다 돈을 많이 쓴 사람이 ' +(100-rankperc).toFixed(3)+'%입니다.).<br>'
	res+= '전체 평균 메소 소모액은 ' + addCommas(avrmeso) + ' 메소 (약 ' +eokcut(avrmeso)+ ')입니다.<br>'
	res+= '최고흑우의 메소 소모량 ' + addCommas(maxmeso) + ' 메소 (약 ' +eokcut(maxmeso)+ ')<br>';
  res+= '최고운빨충의 메소 소모량 ' + addCommas(minmeso) + ' 메소 (약 ' +eokcut(minmeso)+ ')<br><br>';
	res+= '<button type="button" class="btn btn-dark btn-lg" onclick="retsim()">돌아가기</button> ';
  res+= '<button type="button" class="btn btn-dark btn-lg" onclick="starforce()">같은 설정으로 다시 강화&통계 재설정</button> ';
  res+= '<button type="button" class="btn btn-dark btn-lg" onclick="getlog()">강화 로그 보기</button><br>';
 	document.getElementById("resinside").innerHTML = res;
  document.getElementById("loginside").innerHTML = logs;

	var trace = {
	 x: spentmesolist,
	 opacity: 0.75,
	 type: 'histogram',
	 marker: {
    color: "rgba(80, 80, 80, 0.7)",
    },
	};
	var layout = {
		title: '25000개 아이템의 ' + document.sf.lev.value + '제 ' +parseInt(document.sf.startstar.value) + "→" + parseInt(document.sf.endstar.value) + "성까지 소모 메소 통계",
	 bargap: 0.05,
	 bargroupgap: 0.2
	};
	var data = [trace];
	document.getElementById("restab").click();
	Plotly.newPlot('myDiv',data, layout);
}
function retsim(){
	document.getElementById("autosim").click();
}
function retst(){
	document.getElementById("stautosim").click();
}
function getlog(){
	document.getElementById("logtab").click();
}
function getres(){
	document.getElementById("restab").click();
}

function eokcut(num){
	var x = Math.round(num/10000000);
	var y = "";
	if(x>9){y+= (parseInt(x/10).toString()) + '억 ';}
	if(x%10!=0){y += (x%10).toString() +'천만 ';}
	y+= '메소';
	return y;
}

function spelltrace(){
	var upg = parseInt(document.st.upg.value);//업횟(황망포)
	var stcost = parseInt(document.st.stcost.value);//주흔소모량
	var stdil = document.st.stdil.value/100;//손재주+길드스킬. %단위 나눔
	var stprot = document.st.stprot.value/100;//업횟깎이기 방지
	var itemcount = parseInt(document.st.stitemcount.value);//템갯수
	var nologs = document.getElementById('stnologs');
	var stprob = $(":input:radio[name=stprob]:checked").val();
	var stinno = $(":input:radio[name=stinno]:checked").val();
	var ghprob = $(":input:radio[name=goldham]:checked").val();
	var stevents = $(":input:radio[name=stevents]:checked").val();
	var stfever = $(":input:radio[name=stfever]:checked").val();
	var totalst = 0;
	var totalinno = 0;
	var totalwhite = 0;
	var totalconvst = 0;
	var spentst = 0;
	var spentinno = 0;
	var spentwhite = 0;
	var spentconvst = 0;
	var maxconvst = 0;
	var minconvst = 1000000000000000;
	var whitecount = 0;
	var innocount = 0;
	var straight=0;
	var notfit = 0;
	var upprob = 0;
	var myup=0;//현재강화
	var restup=upg-1;//남은업횟(황망 미적용)
	var gh=0;//황망사용여부
	var exp=0;
	var res="";
	var logs="";

	if(stevents==2){
		stcost = Math.round(stcost/2);
	}
	upprob = ((stprob==0)?((stfever==0)?0.3:0.45):((stfever==0)?0.15:0.25))+stdil;
	exp = Math.round(upprob*upg);//기대값
	logs+= '<button type="button" class="btn btn-dark btn-lg" onclick="getres()">돌아가기</button><br>';
	if(nologs.checked!=true){
	logs+='기대되는 최소 작 수치는 ' + exp + '작입니다.<br>';
}

	for(var i=0;i<itemcount;i++){
		spentmeso=0;
		spentinno=0;
		spentwhite=0;
		myup=0;
		gh=0;
		restup=upg-1;
		straight=0;

		while(myup<upg){//작 다할때까지

			if(Math.round(myup+(restup+(gh==1?0:1))*upprob)<exp-1||notfit==1){
				//기대값-1에 못 미칠 경우
					//혹은 마지막업횟인데 기대값이 안나올시
					if(nologs.checked!=true){
					if(notfit==0){
						logs+='<br> 현재 예상값(' + (Math.round(myup+(restup+(gh==1?0:1))*upprob))
						logs+=')이 기대값-1인 '+ (exp-1) + '에 못 미쳐 이노센트 사용<br>';
					}else{
						logs+='<br> 현재 예상값(' + (myup+(restup+(gh==1?0:1))*upprob).toFixed(3);
						logs+=')이 기대값 '+ (exp) + '에 못 미쳐 이노센트 사용<br>';
					}
				}
					while(innocount<1000000){
						if(stinno==0){//일반이노
							spentinno++;//소모부터
							if(Math.random()<0.5){
								myup=0;
								restup=upg-1;
								gh=0;
								if(nologs.checked!=true){
									if(innocount!=0){
								logs+='이노 ' + innocount +'회 실패 후 ';
							}
								logs+='이노 성공<br>';
							}
								innocount=0;
								break;
							}
							innocount++;
						}else{//아크이노
							spentst+=10000;
							if(Math.random()<0.45){
								myup=0;
								restup=upg-1;
								gh=0;
								if(nologs.checked!=true){
									if(innocount!=0){
								logs+='아크이노 ' + innocount +'회 실패 후 ';
							}
								logs+='아크이노 성공<br>';
							}
								innocount=0;
								break;
							}
							innocount++;
						}
					}
					notfit=0;
				}
			if(restup!=0){//주흔작 할지말지 판별, 남은업횟 0이 아님 주흔작 갈기기
			if(Math.random()<upprob){//성공
				myup++;
				restup--;
				spentst+=stcost;
				straight++;
				if(nologs.checked!=true){
				logs+='성공 ';
			}
			}else{//실패
				if(Math.random()<stprot){
					spentst+=stcost;
					if(nologs.checked!=true){
					logs+='업횟보호발동 ';
				}
				}else{
					spentst+=stcost;
					restup--;
					straight=-10;
					if(nologs.checked!=true){
					logs+='실패 ';

				}
				}
			}
			if(restup==0){
				if(gh==0 && (myup+(restup+(gh==1?0:1))*upprob)<exp-1){//황망바르기전에 exp-1이 안됨
					notfit = 1;
			}else if(gh==1 && (myup+(restup+(gh==1?0:1))*upprob)<exp){//황망바르고 exp가 안됨
				notfit = 1;
			}
		}else if(restup<3 && ghprob==1){//황망100%는 좀 더 까다롭게
			if(Math.round(myup+upprob*(restup+1))<exp){
				notfit = 1;
			}
		}
		}


				if(myup!=upg&&restup==0 && notfit==0){//남은 업횟 없고 이노때려야하는 애가 아닐

					if(gh==2 && myup+1==upg){
						restup++;
						gh=1;
						if(nologs.checked!=true){
						logs+='<br>황금망치 성공, 업횟 1 추가<br>';
					}
					}else if(gh==0){
						if(ghprob==0.5){//50퍼황망
						if(Math.random()<ghprob){//황망꽂기
							restup++;
							gh=1;
							if(nologs.checked!=true){
							logs+='<br>황금망치 성공, 업횟 1 추가<br>';
						}
						}else{
							gh=1;
							straight=-50;
							if(nologs.checked!=true){
							logs+='<br>황금망치 실패';
						}
						}
					}else{//100퍼황망
						gh=2;//황망 유예하기
						if(myup+upprob<exp){//기준값이 안될시
							notfit=1;
						}
					}
					}else{
						if(whitecount==0){
							if(nologs.checked!=true){
							logs+='<br>';
						}
						}
					if(Math.random()<0.1){//순백갈기기
						restup++;
						spentwhite++;
						if(nologs.checked!=true){
							if(whitecount!=0){
						logs+='순백 실패 '+ whitecount + '회 후 ';
					}
						logs+='순백 성공<br>';
					}
						whitecount=0;
					}else {
						spentwhite++;
						whitecount++;
					}
				}
				}



		}
		//작 끝
		if(nologs.checked!=true){
		logs+=', <span style="color:blue">' +(i+1)+ '번째 아이템 작 완료</span><br><br>';
	}
	totalst+=spentst;
	totalinno+=spentinno;
	totalwhite+=spentwhite;
	spentconvst = spentst + spentinno*5000 + spentwhite*2000;
	totalconvst+=spentconvst;
	if(spentconvst>maxconvst){maxconvst =  spentconvst;}
	if(spentconvst<minconvst){minconvst = spentconvst;}

	if(straight==upg){
		res+= '와우! 스트레이트!<br>';
  	res+= '<img src=icon_20.png><br>';
	}

	}//포문
	if(nologs.checked!=true){
	logs+= '<button type="button" class="btn btn-dark btn-lg" onclick="getres()">돌아가기</button><br>';
	}else{
		logs+= '로그를 보지 않도록 설정되어 있습니다.';
	}
  if(itemcount!=1){ res+='나의 아이템당 평균 ';}
	res+='주문의 흔적(아크이노 포함)을 '+ addCommas(totalst/itemcount) + '개 소비했습니다.<br>';
	if(itemcount!=1){ res+='나의 아이템당 평균 ';}
	res+='이노센트 주문서(아크이노 미포함)를 '+ addCommas(totalinno/itemcount) + '장 소비했습니다.<br>';
	if(itemcount!=1){ res+='나의 아이템당 평균 ';}
	res+='순백의 주문서를 '+ addCommas(totalwhite/itemcount) + '장 소비했습니다.<br>';
	res+='각 아이템을 주문의 흔적으로 환산 시 대략 ';
	if(itemcount!=1){ res+='나의 아이템당 평균 ';}
	res+=addCommas(totalconvst/itemcount) + '개의 주문의 흔적을 소비했습니다.<br>'
	if(itemcount!=1){
  res+= '내 최대 주문의 흔적 환산 소모량 ' + addCommas(maxconvst) + '개<br>';
  res+= '내 최저 주문의 흔적 환산 소모량 ' + addCommas(minconvst) + '개<br>';
 }

var allspentconvst = 0;
var spentconvstlist = [];
totalst = 0;
totalinno =0;
totalwhite = 0;
for(var i=0;i<100000;i++){
	spentst=0;
	spentinno=0;
	spentwhite=0;
	myup=0;
	gh=0;
	restup=upg-1;
	straight=0;
	spentconvst=0;
	while(myup<upg){//작 다할때까지

		if(Math.round(myup+(restup+(gh==1?0:1))*upprob)<exp-1||notfit==1){
			//기대값-1에 못 미칠 경우
				//혹은 마지막업횟인데 기대값이 안나올시
				while(innocount<1000000){
					if(stinno==0){//일반이노
						spentinno++;//소모부터
						if(Math.random()<0.5){
							myup=0;
							restup=upg-1;
							gh=0;

							innocount=0;
							break;
						}
						innocount++;
					}else{//아크이노
						spentst+=10000;
						if(Math.random()<0.45){
							myup=0;
							restup=upg-1;
							gh=0;

							innocount=0;
							break;
						}
						innocount++;
					}
				}
				notfit=0;
			}
		if(restup!=0){//주흔작 할지말지 판별, 남은업횟 0이 아님 주흔작 갈기기
		if(Math.random()<upprob){//성공
			myup++;
			restup--;
			spentst+=stcost;
			straight++;

		}else{//실패
			if(Math.random()<stprot){
				spentst+=stcost;

			}else{
				spentst+=stcost;
				restup--;
			straight=-10;
			}
		}
		if(restup==0){
			if(gh==0 && (myup+(restup+(gh==1?0:1))*upprob)<exp-1){//황망바르기전에 exp-1이 안됨
				notfit = 1;
		}else if(gh==1 && (myup+(restup+(gh==1?0:1))*upprob)<exp){//황망바르고 exp가 안됨
			notfit = 1;
		}
	}else if(restup<3 && ghprob==1){//황망100%는 좀 더 까다롭게
		if(Math.round(myup+upprob*(restup+1))<exp){
			notfit = 1;
		}
	}
	}


			if(myup!=upg&&restup==0 && notfit==0){//남은 업횟 없고 이노때려야하는 애가 아닐

				if(gh==2 && myup+1==upg){
					restup++;
					gh=1;

				}else if(gh==0){
					if(ghprob==0.5){//50퍼황망
					if(Math.random()<ghprob){//황망꽂기
						restup++;
						gh=1;

					}else{
						gh=1;
						straight=-50;

					}
				}else{//100퍼황망
					gh=2;//황망 유예하기
					if(myup+upprob<exp){//기준값이 안될시
						notfit=1;
					}
				}
				}else{
					if(whitecount==0){
					}
				if(Math.random()<0.1){//순백갈기기
					restup++;
					spentwhite++;
					whitecount=0;
				}else {
					spentwhite++;
					whitecount++;
				}
			}
			}
	}//작 끝
	totalst += spentst;
	totalinno += spentinno;
	totalwhite += spentwhite;

	spentconvst = spentst + spentinno*5000 + spentwhite*2000;
	allspentconvst+=spentconvst;
	spentconvstlist.push(spentconvst);
	if(spentconvst>maxconvst){maxconvst =  spentconvst;}
	if(spentconvst<minconvst){minconvst = spentconvst;}
}
var rankcount = 0;
for(var i=0;i<100000;i++){
	if(spentconvstlist[i]<(totalconvst/itemcount)){
		rankcount++;
	}
}

var rankperc = (rankcount/100000*100);
var avrconvst = Math.round(allspentconvst/100000);
res+= '상위 ' + rankperc.toFixed(3) +'%의 운입니다(당신보다 환산 주흔을 많이 쓴 사람이 ' +(100-rankperc).toFixed(3)+'%입니다.).<br>';
res+= '전체 평균 주흔 환산 소모량은 ' + addCommas(avrconvst) + '개입니다.<br>';
res+= '최고흑우의 주흔 환산 소모량 ' + addCommas(maxconvst) + '개<br>';
res+= '최고운빨충의 주흔 환산 소모량 ' + addCommas(minconvst) + '개<br>';
res+= '순수 주문의흔적 평균소모량 '+addCommas((totalst/100000).toFixed(1))+'개, ';
res+= '이노센트 평균소모량 ' + ((totalinno/100000).toFixed(1)) + '개, ';
res+= '순백 평균소모량 ' + ((totalwhite/100000).toFixed(1)) + '개.<br><br>';
	res+= '<button type="button" class="btn btn-dark btn-lg" onclick="retst()">돌아가기</button> ';
	res+= '<button type="button" class="btn btn-dark btn-lg" onclick="spelltrace()">같은 설정으로 다시 강화&통계 재설정</button> ';
	res+= '<button type="button" class="btn btn-dark btn-lg" onclick="getlog()">강화 로그 보기</button><br>';
	document.getElementById("resinside").innerHTML = res;
	document.getElementById("loginside").innerHTML = logs;

	var trace = {
	 x: spentconvstlist,
	 opacity: 0.75,
	 type: 'histogram',
	 marker: {
		color: "rgba(80, 80, 80, 0.7)",
		},
	};
	var layout = {
		title: '동일한 강화를 한 100000개 아이템의 환산 주문의 흔적 소모량 통계',
	 bargap: 0.05,
	 bargroupgap: 0.2
	};
	var data = [trace];
	document.getElementById("restab").click();
	Plotly.newPlot('myDiv',data, layout);

}//함수전체

function showsftable(){
	var lev = document.sftbl.sftlev.value;
	var j;
	var tablesize;
	var tblcontent = '<table class="table"><thead><tr><th scope="col">#</th>';
	tblcontent+='<th scope="col">비용(메소)</th></tr></thead><tbody>';
	if(lev<100){
		return 0;
	}else{
		if(lev<100){tablesize=5;}
		else if(lev<110){tablesize=8;}
		else if(lev<120){tablesize=10;}
		else if(lev<130){tablesize=15;}
		else if(lev<140){tablesize=20;}
		else{tablesize=25;}
		for(var i=0;i<tablesize;i++){
			j=i+1;
			tblcontent+='<tr>';
			tblcontent+='<th scope="row">' + i + '→' + j + '</th>';
			tblcontent+='<td>' + addCommas(basemeso(i,lev)) + ' 메소</td>';
			tblcontent+='</tr>';
		}
		tblcontent+='</tbody></table>';
		document.getElementById("showsftable").innerHTML = tblcontent;
		return 0;
	}
}

var probtable =[
	["95.0%","90.0%","85.0%","85.0%","80.0%","75.0%","70.0%","65.0%","60.0%","55.0%",
"45.0%","35.0%","30.0%","30.0%","30.0%","30.0%","30.0%","30.0%","30.0%","30.0%",
"30.0%","30.0%","3.0%","2.0%","1.0%"],
["5.0%","10.0%","15.0%","15.0%","20.0%","25.0%","","","","",
"55.0%","","","","","67.9%","","","","",
"63.0%","","","",""],
["","","","","","","30.0%","35.0%","40.0%","45.0%",
"","65.0%","69.3%","68.6%","68.6%","","67.9%","67.9%","67.2%","67.2%",
"","63.0%","77.6%","68.6%","59.4%"],
["","","","","","","","","","",
"","","0.7%","1.4%","1.4%","2.1%","2.1%","2.1%","2.8%","2.8%",
"7.0%","7.0%","19.4%","29.4%","39.6%"]];

function sfprobtable(){
	var tblcontent = '<table class="table">	<thead><tr>';
	var j;
	tblcontent+= '<th scope="col">*</th><th scope="col">성공</th><th scope="col">유지</th>';
	tblcontent+= '<th scope="col">실패</th><th scope="col">파괴</th></tr></thead><tbody>';
	for(var i=0;i<25;i++){
		j=i+1;
		tblcontent+='<tr>';
		tblcontent+='<th scope="row">' + i + '→' + j + '</th>';
		tblcontent+='<td>' + probtable[0][i] + '</td>';
		tblcontent+='<td>' + probtable[1][i] + '</td>';
		tblcontent+='<td>' + probtable[2][i] + '</td>';
		tblcontent+='<td>' + probtable[3][i] + '</td>';
		tblcontent+='</tr>';
	}
	tblcontent+='</tbody></table>';
	document.getElementById("protinside").innerHTML = tblcontent;
}
