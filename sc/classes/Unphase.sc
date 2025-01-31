Unphase {
	var <currentPath,
	<>window,
	<>sequencers;


    *new { |path|
		var instance = super.new;
		var filePath = path ?? PathName.tmp ++ "untitled" ++ instance.uid ++ ".scd";
        ^super.new.init(filePath);
    }

	init { |path|
		var layout, header, main, flow;
		currentPath = path;
		sequencers = Dictionary.newFrom([
			"seqUnits": Dictionary.new
		]);

		Window.closeAll;
		// create window
		window = Window.new("unphase_ui", Rect(0, 0, 500, 400));
		window.front;

		//layout
		layout = VLayoutView(window, window.bounds).background_(Color.black);

		header = View(layout, layout.bounds.height_(60)).background_(Color.red);
		main = View(layout, layout.bounds).background_(Color.blue);
		flow = FlowLayout(main.bounds, 10@10, 20@5);
		main.decorator = flow;
		16.do{ Slider2D( main,80@80 ).background_( Color.rand ) };


		//resize window event
		window.view.onResize_({ |view|
			layout.bounds_(view.bounds);
			main.bounds_(view.bounds.top_(60).height_(view.bounds.height - 60));
			main.decorator = flow;

		});



	}

	createSeqUnit { |opt|
		sequencers.at("seqUnits").put(this.uid, SeqUnit.new(opt));
	}




	uid {
		^UniqueID.next.asString ++ Date.seed.asString
	}


}