TestUnphase.run

(

Window.closeAll;
~db = UnphaseDb.new();
~ui = UnphaseUi.new();
~db.attachUi(~ui);
)

~db.data["matrix"][1]["pitch"]


(

var data = Dictionary[
	"matrix" -> Dictionary.new()
];
var matrixStep = Dictionary[
	"pitch" -> [60],
	"vel" -> [64]
];

64.do({ |i|
	data["matrix"].put(i + 1, matrixStep)
});

data;
)

