UnphaseDb {
	var <>data;
	var <>ui;

	*new {
		^super.new.init();
	}

	init {
		data = this.defaultData.value;
	}
	attachUi { |unphaseUI|
		ui = unphaseUI;
		unphaseUI.attachDb(this);
	}

	defaultData {
		var data = Dictionary.newFrom([
			"matrix": Dictionary.new()
		]);

		64.do({ |i|
			data.at("matrix").put("step_"++(i+1), Dictionary.newFrom([
				"pitch": [60],
				"vel": [64],
				"i": 0,
			]));
		});

		^data;
	}

	traverseDb { |key|
		var path = key.split($.).drop(-1);
		var size = path.size - 1;
		var currentDict = data;
		path.do({|k, i|
			currentDict = currentDict.at(k);
		});
		^currentDict;
	}

	getValue { |key|
		var path = key.split($.);
		^this.traverseDb(key)[path.last];

	}

	setValue { |key, value, reactive = true|
		var dict = this.traverseDb(key);
		var isParamObserved = ui.observedParams.detect{|p| p == key}.notNil;
		(key + value).postln;
		if (reactive && ui.notNil && isParamObserved) {
			var res = (key: key, value: value);
			^ui.webview.runJavaScript("window.updateParam(" + JSONlib.convertToJSON(res) + ")");
		} {
			dict.put(key.split($.).last, value);
		}
	}
}