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
//2번파방옵션, 1516만파방
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

		if(prot==1 && mystar>11 && mystar<18){//올파방
			basesale++;//100% 가격 추가
		}else if(event!=3 && prot==2 && mystar>14 && mystar<17){//151617파방
			basesale++;//100% 가격 추가
		}else if(event==3 && prot==2 && mystar==16){
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
console.log(nologs.checked);
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
	if(spentmeso>maxmeso){maxmeso = spentmeso}
	if(spentmeso<minmeso){minmeso = spentmeso}
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
var trace = {
	x: spentmesolist,
	opacity: 0.75,
	type: 'histogram',
};
var layout = {
  bargap: 0.05,
  bargroupgap: 0.2
};
var data = [trace];
Plotly.newPlot('myDiv',data, layout);

 res += '총'+ itemcount +'개 아이템을 '+parseInt(document.sf.startstar.value)+'성에서 ';
 res+= parseInt(document.sf.endstar.value) + '성으로 만들기 위해 ' +mytry+'회 강화했습니다.<br>';
 res+= '아이템당 평균 소모 메소 '+ addCommas(totalspentmeso/itemcount) + ' 메소 (약 ' +eokcut(totalspentmeso/itemcount)+ ')<br>';
 if(itemcount!=1){
 res+= '최대 메소 소모량 ' + addCommas(maxmeso) + ' 메소 (약 ' +eokcut(maxmeso)+ ')<br>';
 res+= '최저 메소 소모량 ' + addCommas(minmeso) + ' 메소 (약 ' +eokcut(minmeso)+ ')<br>';
}
 res+= '아이템당 평균 파괴당한 횟수 ' + (cr/itemcount)+'회<br>';
 res+= '아이템당 평균 시행 횟수 ' + (mytry/itemcount)+'회<br>';

	document.getElementById("resinside").innerHTML = res;
	document.getElementById("loginside").innerHTML = logs;

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
	 spentmesolist.push(Math.floor(spentmeso/10000000)*10000000);
	}
	var rankcount=0;
	for(var i=0;i<25000;i++){
		if(spentmesolist[i]<(totalspentmeso/itemcount)){
			rankcount++;
		}
	}
	var rankperc = (rankcount/25000*100);
	res+= '상위 ' + rankperc.toFixed(3) +'%의 운입니다(당신보다 돈을 많이 쓴 사람이 ' +(100-rankperc).toFixed(3)+'%입니다.).<br><br>'
	res+= '<button type="button" class="btn btn-dark btn-lg" onclick="retsim()">돌아가기</button> ';
  res+= '<button type="button" class="btn btn-dark btn-lg" onclick="starforce()">같은 설정으로 다시 강화&통계 재설정</button> ';
  res+= '<button type="button" class="btn btn-dark btn-lg" onclick="getlog()">강화 로그 보기</button><br>';
 	document.getElementById("resinside").innerHTML = res;


	var trace = {
	 x: spentmesolist,
	 opacity: 0.75,
	 type: 'histogram',
	 marker: {
    color: "rgba(80, 80, 80, 0.7)",
    },
	};
	var layout = {
		title: document.sf.lev.value + '제 ' +parseInt(document.sf.startstar.value) + "→" + parseInt(document.sf.endstar.value) + "성까지 소모 메소 통계",
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
function getlog(){
	document.getElementById("logtab").click();
}
function getres(){
	document.getElementById("restab").click();
}

function eokcut(num){
	var x = Math.floor(num/10000000);
	var y = "";
	if(x>9){y+= (parseInt(x/10).toString()) + '억 ';}
	if(x%10!=0){y += (x%10).toString() +'천만 ';}
	y+= '메소';
	return y;
}

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
