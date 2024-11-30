({


})

(
var db;

db = ();

db.data = Dictionary.new();

db.write = { |self, key, value|
	var path = key.split($.);
	var size = path.size - 1;
	var currentDict = self.data;

	path.do({|k, i|
		if (i == size) {
			currentDict.put(k, value);
		};
		if (currentDict.at(k).isKindOf(Dictionary)) {
			currentDict = currentDict.at(k);
		};
		if (currentDict.at(k).isNil)
		{
			currentDict.put(k, Dictionary.new());
			currentDict = currentDict.at(k);
		};
	});
};

db.write("a.b.c", 123);
// TODO CREATE writeR for reactive side effect
db;
)
