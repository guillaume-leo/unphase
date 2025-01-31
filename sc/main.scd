

~app = Unphase.new()
FlowLayout()
(
//normally you will only use the width of indentedRemaining
w = Window.new;
w.view.decorator = d = FlowLayout.new( w.view.bounds, 0@10, 5@5 );
f = Slider2D( w.view,150@150 ).background_( Color.rand );
Slider2D( w.view,150@150 ).background_( Color.rand );
Slider( w.view, d.indentedRemaining.width@150) //fits this view perfectly to the right innerBounds
    .background_( Color.rand );
w.front;
)
w.view.bounds
d = w.view.decorator
d.bounds = w.view.bounds;
d.reset
w.view.bounds
w.view.children.do(d.place(_))

GridLayout

w.view.children.do({|child|
	d.place(child)
})

w.view.children.do({ |item|
	item.remove;
})

w.view.children = [Knob(v.view)]

f.remove

children

/*window.layout_(GridLayout.columns([
	[container1, rows: 1],
	[container2, rows: 20]
]));
window.layout.setMinRowHeight(0, 50);
window.layout.vSpacing = 0;
window.layout.margins = [0,0,0,0];*/


(
var window, layout, container1, container2;
Window.closeAll;
window = Window("Grid Layout Example", Rect(100, 100, 400, 300), scroll: true);

container1 = CompositeView(window);
container1.background = Color.gray;

container2 = CompositeView(window);
container2.background = Color.blue;


window.layout_(VLayout(
	container1, container2
));

container1.resize = 1;
container2.resize = 10;


window.front;
)

(
var window, layout, header, main, headerHeight;

headerHeight = 50;

window = Window("FlowLayout Example", Rect(100, 100, 400, 300), scroll: true);

window.view.decorator = FlowLayout(window.view.bounds, 10@10, 20@5);

// Create the first container
header = CompositeView(window.view);
header.background = Color.gray;
header.bounds = Rect(0, 0, window.view.bounds.width, headerHeight);

main = CompositeView(window.view);
main.addFlowLayout( 10@10, 20@5 );
main.background = Color.red;
main.bounds = Rect(0, 100, window.view.bounds.width, window.view.bounds.height - headerHeight);

//resize window event
window.view.onResize_({ |view|
	var decorator;
	header.bounds = Rect(0, 0, window.view.bounds.width, headerHeight);
	main.bounds = Rect(0, headerHeight, window.view.bounds.width, window.view.bounds.height - headerHeight);
	decorator = window.view.decorator;
	decorator.bounds = window.view.bounds;
	decorator.reset;

	w.view.children.do(decorator.place(_));

});


16.do{ Slider2D( main,80@80 ).background_( Color.rand ) };

// Show the window
window.front;
)


(
var window, header, headerHeight, footer, footerHeight, main;
Window.closeAll;

headerHeight = footerHeight = 100;
window = Window.new("ui", Rect(0, 0, 1080, 720)).front;
//header
header = CompositeView(window, Rect(0, 0, window.view.bounds.width, headerHeight));
header.background = Color.red;
//main
main = ScrollView(
	window,
	Rect(
		0,
		headerHeight,
		window.view.bounds.width,
		window.view.bounds.height - headerHeight - footerHeight)
);

main.background = Color.green;
main.decorator = FlowLayout( Rect(0, 0, main.bounds.width, main.bounds.height), 10@10, 10@10 );
// main.addFlowLayout( 0@0, 0@0 );
//footer
footer = CompositeView(
	window,
	Rect(
		0,
		window.view.bounds.height - footerHeight,
		window.view.bounds.width,
		footerHeight)
);
footer.background = Color.blue;

// resize callback
window.view.onResize_({ |view|
	var newBounds = view.bounds;
	// update horizontal resize
	header.bounds = header.bounds.width_(newBounds.width);
	main.bounds = main.bounds.width_(newBounds.width);
	footer.bounds = footer.bounds.width_(newBounds.width);
	// update vertical resize
	main.bounds = main.bounds.height_(newBounds.height - headerHeight - footerHeight);
	footer.bounds = footer.bounds.top_(newBounds.height - footerHeight);
	// update main decorator
	main.decorator.bounds = Rect(0, 0, main.bounds.width, main.bounds.height);
	main.decorator.reset;
	main.children.do(main.decorator.place(_));



});

30.do{ Slider2D( main,80@80 ).background_( Color.rand ) };

)


// IMPROVED VERSION:

(
var window, header, footer, main, layout;
Window.closeAll;

window = Window.new("ui", UnphaseEnums.window_size).front;
//header
header = CompositeView();
header.fixedHeight_(UnphaseEnums.header_height);
header.background = Color.red;
//main
main = CompositeView();
main.background = Color.green;

main.addFlowLayout(10@10, 10@10);

//footer
footer = CompositeView();
footer.fixedHeight_(UnphaseEnums.footer_height);
footer.background = Color.blue;

layout = VLayout(
	header,
	main,
	footer
);

layout.margins = UnphaseEnums.margin_none;
layout.spacing = UnphaseEnums.spacing_xs;


window.layout_(layout);


/*30.do{ Slider2D( main,80@80 ).background_( Color.rand ) };*/
main.onResize_({|view|
	view.bounds.postln;
})

)

t = UnphaseEnums.window_size

t.WINDOW_SIZE
b= Synth.new("default", [freq: 100]);
b.free

(
var window, textView, userCode, r;

// Default user code
userCode = { "Synth.new('default', ['freq', 400]); 0.5.wait;" };

// GUI Setup
window = Window.new("Live Code Editor", Rect(100, 100, 400, 300)).front;
textView = TextView.new(window, Rect(10, 10, 380, 200))
    .string_(userCode.value) // Set initial code
    .font_(Font.default.copy.size_(14))
    .background_(Color.white);

// Routine that executes the user's code dynamically
r = Routine.new({
    loop {

        userCode.value.interpret; // Fetch latest version and run it
    }
}).play;

// Update `userCode` when the user edits the text
textView.action_({
    userCode = { textView.string };
});

// Stop routine when window closes
window.onClose_({ r.stop; });
)
)

r.stop

default.asString