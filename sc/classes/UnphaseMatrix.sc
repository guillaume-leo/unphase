UnphaseMatrix {
	var db;

	*new { |unphaseDb|
		^super.new.init(unphaseDb);
	}

	init { |unphaseDb|
		db = unphaseDb;
		db.data.put("matrix", Dictionary.newFrom([
				"tracks": [],
				"directions": ["ni"],

			]));
		this.createTrack();
	}

	createTrack {
		var tracks = db.getValue("matrix.tracks");
		var newTrack = Dictionary.new;
		newTrack.put("currentStep", 1);
		newTrack.put("name", "noname_" + Date.seed);

		64.do({ |i|
			newTrack.put("step_"++(i+1), Dictionary.newFrom([
				"pitch": [60],
				"vel": [64],
				"dur": [1],
				"delta": [1],
				"next": ["g"],
				"i": 0,
			]));
		});

		db.setValue("matrix.tracks", tracks.add(newTrack), false);
	}

}