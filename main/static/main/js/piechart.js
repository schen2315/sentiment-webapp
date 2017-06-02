// var s = Snap(".piechart");
// var pos, neg, neut, all_sec;
// var cx = 150, cy = 150, radius = 90;
// var c = s.path(describeArc(150,150,90,0,135))
// var d = s.path(describeArc(150,150, 90, 135, 270))
// var e = s.path(describeArc(150,150, 90, 270, 360))
// var g = s.group(c, d, e)
// g.attr({
//     // fill: "green",
//     "fill-opacity": 0.0,
//     strokeWidth: 30
// })
// c.attr({
//     stroke: "#F7B733"
// })
// d.attr({
//    stroke: "#FC414A"
// })
// e.attr({
//    stroke: "#007849"
// })
//var el = [c, d, e];
// var chart = [pos, neg, neut];
// var colors = ["#007849", "#FC414A", "#F7B733"]
//give ratios of positive, negative, and neutral tweets to total # of tweets

var pie = (function() {
	var s = Snap(".piechart");
	var pos, neg, neut, all_sec, chart;
	var cx = 150, cy = 150, radius = 90;
	var colors = ["#007849", "#FC414A", "#F7B733"];
	var $score = $(".piechart-info");

	//give ratios of positive, negative, and neutral tweets to total # of tweets
	function fillChart(pos, neg, neut) {
		var pos_score = pos, neg_score = neg, neut_score = neut;
		var pos_sec = [0, ratio2deg(pos)],
			neg_sec = [pos_sec[1], pos_sec[1] + ratio2deg(neg)],
			neut_sec = [neg_sec[1], 360];

		pos = s.path(describeArc(cx, cy, radius, pos_sec[0], pos_sec[1]))
		neg = s.path(describeArc(cx, cy, radius, neg_sec[0], neg_sec[1]))
		neut = s.path(describeArc(cx, cy, radius, neut_sec[0], neut_sec[1]))

		all_sec = s.group(pos, neg, neut)
		all_score = [pos_score, neg_score, neut_score]
		all_sent = ["Positive", "Negative", "Neutral"]
		chart = [pos, neg, neut]
		all_sec.attr({ "fill-opacity": 0.0, strokeWidth: 30 })
		chart.forEach(function(item, index) {
			item.attr({
				stroke: colors[index], 
				score: all_score[index],
				sentiment: all_sent[index]
			}).mouseover(function() {
			  this.attr({
			     strokeWidth: 40
			  })
			  // console.log("Score: " + this.attr("score"))
			  $score.text( this.attr("sentiment") + ": " + this.attr("score"))
			}).mouseout(function() {
			  this.attr({
			     strokeWidth: 30
			  })
			})
		})

	}
	function ratio2deg(ratio) {
		return ratio*360
	}
	return {
		fillChart: fillChart
	}
})();




