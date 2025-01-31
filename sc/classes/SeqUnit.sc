SeqUnit {
	var <>state;

	*defaultState {
		^Dictionary.newFrom([
			"name": "untitled",
			"tag": "notag",
			"index": 0,
			"type": "matrix",
		])
	}

	*new { |opt|

		var instance = super.new;
		opt = opt ?? ();

		instance.state = this.defaultState;
		instance.state.x;

		^instance
	}
}