UnphaseSeqProperty {

	classvar modelName = "seqProperties";
	var <>state;

	*defaultState {
		^Dictionary.newFrom([
			"name": "untitled",
			"tag": "notag",
			"index": 0,
			"type": "matrix",
			"seqId": UnphaseDb.createId
		])
	}

	*new { |opt|

		var instance = super.new;
		opt = opt ?? ();

		instance.state = this.defaultState;
		instance.state.putAll(opt);

		^instance
	}

	save {
		^UnphaseDb.create(modelName, state);
	}

	db {
		^UnphaseDb.getDb
	}
}