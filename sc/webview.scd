({
arg opt;
var browser, webview, window, layout;

    webview = WebView();

    webview.onUrlChanged = {
    	|view, url|
    	// ON URL CHANGED
    };

    webview.onJavaScriptMsg = { |view, msg|
    	msg.postln;
    	if (msg.copyRange(0, 7) == "___SC___") {
    		var jsonDict;
    		var jsonString = msg.drop(8);
    		var req = jsonString.parseJSON;

    		// Fetch Data Action
    		if (req.at("action") == "observe") {
    			if (req.at("id").notNil) {
    				var data, res;
    				data = ();
    				req.at("keys").do({|key|
    					data.put(key, opt.data.at(key));
    				});
    				res = (
    					id: req.at("id"),
    					status: "success",
    					data: data
    				);
    				// response to ui
    				view.runJavaScript("window.processRequest(" + res.asJSON + ")");
    			};
    		};

    		// Update Action
    		if (req.at("action") == "update") {
    			var key = req.at("key");

    			if (opt.data.at(key).notNil) {
    				opt.data.put(key, req.at("value").interpret);
    			};

    			opt.data.postln;
    		}

    	}
    };
    layout =  GridLayout.rows([webview]);

    layout.margins_(0);

    window = Window.new("unphase_grid-seq").layout_(layout).front;

    webview.url = opt.url;

    [window, webview];

})
