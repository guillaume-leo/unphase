UnphaseUi {
	var <>webview, layout, window, <>observedParams, envMode, <>db, <>matrix;

    *new { |unphaseDb, unphaseMatrix|
        ^super.new.init(unphaseDb, unphaseMatrix);
    }

	init { |unphaseDb, unphaseMatrix|
		// create a bi-directional communication between the DB and the UI
		db = unphaseDb;
		db.ui = this;
		// access matrix sequencer instance from here
		matrix = unphaseMatrix;

		// create ui
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

		window.front;
		window.fullScreen;

		window.bounds = Rect(0, 0, window.bounds.width, window.bounds.height);
    }

	onUrlChanged { |view, url|
		^("url changed to:" + url).postln;
	}

	computeAction { |req|
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

	onJavaScriptMsg { |view, msg|
		var req;

		if (msg.copyRange(0, 7) != "___SC___") {
			^("javascript: " ++ msg).postln;
		};
		req = JSONlib.convertToSC(msg.drop(8));
		req.postln;
		this.computeAction(req);
	}
}



