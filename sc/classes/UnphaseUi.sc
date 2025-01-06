UnphaseUi {
	var <>webview, layout, window, <>observedParams, envMode, <>db;

    *new {
        ^super.new.init();
    }

	init {
		webview = WebView();

		webview.onUrlChanged = { |view, url|
			this.onUrlChanged(view, url);
		};

		webview.onJavaScriptMsg = { |view, msg|
			this.onJavaScriptMsg(view, msg);
		};

		layout =  GridLayout.rows([webview]);
		layout.margins_(0);
		window = Window.new("unphase_ui").layout_(layout);
		webview.url = "http://localhost:5173/";

		envMode = "dev";
		observedParams = [];

		"ui initialised".postln;
    }

	attachDb { |newDb|
		db = newDb;
		^window.front;
	}

	onUrlChanged { |view, url|
		^("url changed to: " ++ url).postln;
	}

	onJavaScriptMsg { |view, msg|
		var req;

		if (msg.copyRange(0, 7) != "___SC___") {
			^("javascript: " ++ msg).postln;
		};
		req = JSONlib.convertToSC(msg.drop(8));
		req.postln;
		^Dictionary[
			"observe" -> {
				var res, data = ();
				observedParams = observedParams.add(req.param);
				data.put(req.param, db.getValue(req.param));
				res = (
					id: req.id,
					status: "success",
					data: data
				);
				webview.runJavaScript("window.processRequest(" + JSONlib.convertToJSON(res) + ")");

			},
			"free" -> {
				var index = observedParams.detectIndex { |p| p == req.param };
				if (index.notNil) {
					observedParams.removeAt(index);
				};

			},
			"update" -> {
				db.setValue(req.key, req.newValue, false);
			}
		][req.action].value;
	}
}



