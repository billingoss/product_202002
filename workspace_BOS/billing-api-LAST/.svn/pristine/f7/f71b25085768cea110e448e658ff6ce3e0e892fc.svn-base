$(document).ready(function() {
	debugger;
	//drawVisualization();
	//drawStuff();
});
google.load('visualization', '1', {
	'packages' : [ 'corechart' ]
});
//google.setOnLoadCallback(drawVisualProductratio);

function drawVisualProductratio(jsondata) {
	visualization_data = new google.visualization.DataTable();
	visualization_data.addColumn('string', '상품별 구매 현황');
	visualization_data.addColumn('number', '상품별 가입 건수');
	for (var i = 0; i < jsondata.length; i++) {
		mes = jsondata[i].productnm;
		total = jsondata[i].productratio;
		visualization_data.addRow([ mes, total ]);
	}
	visualization = new google.visualization.PieChart(document
			.getElementById('piechart'));
	visualization.draw(visualization_data, {
		title : '상품별 구매 현황',
		height : 250,
		width : 420
	});
}

/*
google.load('visualization', '1', {
	'packages' : [ 'corechart' ]
});
google.setOnLoadCallback(drawProductRank);
*/

function drawProductRank(jsondata) {
	visualization_data = new google.visualization.DataTable();
	visualization_data.addColumn('string', '상품별 구매 현황');
	visualization_data.addColumn('number', '건수');
	for (var i = 0; i < jsondata.length; i++) {
		mes = jsondata[i].productnm;
		total = jsondata[i].productcnt;
		visualization_data.addRow([ mes, total ]);
	}
	visualization = new google.visualization.BarChart(document
			.getElementById('productrankchart'));
	visualization.draw(visualization_data, {
		title : '이번달 상품 판매 순위 ',
		height : 250,width : 420
	});
};

/*
google.load('visualization', '1', {
	'packages' : [ 'corechart' ]
});
google.setOnLoadCallback(drwaInvoiceMonthChart);
*/

function drwaInvoiceMonthChart(jsondata) {
	visualization_data = new google.visualization.DataTable();
	visualization_data.addColumn('string', '월별 매출 현황');
	visualization_data.addColumn('number', '월별 매출');
	for (var i = 0; i < jsondata.length; i++) {
		mes = jsondata[i].salemonthym;
		total = jsondata[i].salemonthamt;
		visualization_data.addRow([ mes, total ]);
	}
	visualization = new google.visualization.ColumnChart(document
			.getElementById('monthlyinvoicebarchart'));
	visualization.draw(visualization_data, {
		title : '월별 매출 현황 ',
		height : 250, width : 840
	});
};