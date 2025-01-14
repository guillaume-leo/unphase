UnphaseDb {
	var <>data;
	var <>ui;

	*new {
		^super.new.init();
	}

	init {
		var defaultUiLayout;
		data = Dictionary.new;
		defaultUiLayout = Dictionary.newFrom([
			"name": "root",
			"split": 50,
			"children": []
		]);
		data.put("ui_layout", defaultUiLayout);
	}

	traverseDb { |key|
		var path = key.split($.).drop(-1);
		var size = path.size - 1;
		var currentDict = data;
		path.do({|k, i|
			var formatedKey = this.formatStringToNum(k);
			formatedKey.postln;
			currentDict = currentDict.at(formatedKey);
		});
		^currentDict;
	}

	getValue { |key|
		var path = key.split($.);
		var lastKey = this.formatStringToNum(path.last);
		^this.traverseDb(key)[lastKey];
	}

	formatStringToNum { |val|
		var isNumber = val == val.asInteger.asString;
		if (isNumber) {
			^val.asInteger;
		} {
			^val;
		}
	}

	setValue { |key, value, reactive = true|
		var dict = this.traverseDb(key);
		(key + value).postln;
		if (reactive && ui.notNil) {
			var res = (key: key, value: value);
			var isParamObserved = ui.observedParams.detect{|p| p == key}.notNil;
			if (isParamObserved) {
				^ui.webview.runJavaScript("window.updateParam(" + JSONlib.convertToJSON(res) + ")");
			}
		} {
			dict.put(key.split($.).last, value);
		}
	}
}