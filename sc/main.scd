(
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
		if (req.at("action") == "fetchData") {
			if (req.at("id").notNil) {
				var res = (
					id: req.at("id"),
					status: "success",
					data: (message: "Data from SuperCollider!")
				);
				view.runJavaScript("window.message(" + res.asJSON + ")");
			}
		}
	}
};

layout =  GridLayout.rows([webview]);

layout.margins_(0);

window = Window.new("unphase_grid-seq").layout_(layout).front;

webview.url = "http://localhost:5173/"
)



(
w=Window().layout_( GridLayout.rows(
    [Slider2D(), Slider2D(), [Slider(), rows:2]],
    [Slider2D(), Slider2D()],
    [[Slider().orientation_(\horizontal), columns:2]]
)).front;
)