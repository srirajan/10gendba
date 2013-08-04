mongos> map_closest
function map_closest() {
    var pitt = [-80.064879, 40.612044];
    var phil = [-74.978052, 40.089738];

    function distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (distance(this.loc, pitt) < distance(this.loc, phil)) {
        emit("pitt",1);
    } else {
        emit("phil",1);
    }
}
mongos> var map_closest_reduce = function(k,v) {
...    var tot=0;
...    for (var ctr=0, len=v.length; ctr<len; ctr++) {
...        tot = tot + v[ctr]
...    }
...    return(tot);
... }

mongos> var mymapred = {"out" : "mr_res", "query" : {"state":"PA"}}

mongos> 
mongos> 
mongos> 
mongos> db.zips.mapReduce(map_closest, map_closest_reduce, mymapred)
{
	"result" : "mr_res",
	"timeMillis" : 88,
	"counts" : {
		"input" : 1458,
		"emit" : 1458,
		"reduce" : 19,
		"output" : 2
	},
	"ok" : 1,
}
mongos> db.mr_res.find()
{ "_id" : "phil", "value" : 732 }
{ "_id" : "pitt", "value" : 726 }

