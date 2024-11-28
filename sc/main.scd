(
~import = { |filename, opt|
	(filename ++ ".scd").loadRelative[0].value(opt)
}
)

(
var ui, data;

data = ~import.value("data");

Window.closeAll;

ui = ~import.value("webview", (
	url: "http://localhost:5173/",
	data: data
));

)