TestUnphase.run

(

Window.closeAll;
~db = UnphaseDb.new();
~matrix = UnphaseMatrix.new(~db);
~ui = UnphaseUi.new(~db, ~matrix);
)

~db.setValue("matrix.tracks.0.step_1.pitch", [50, 43])
~matrix.createTrack()
