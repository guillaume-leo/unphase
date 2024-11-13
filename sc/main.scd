(
~import = { |filename, opt|
	(filename ++ ".scd").loadRelative[0].value(opt)
}
)

(
var ui;

Window.closeAll;

ui = ~import.value("webview", "http://localhost:5173/");

)