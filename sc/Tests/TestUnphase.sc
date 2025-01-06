TestUnphase : UnitTest {

	var <>db;

	setUp {
		db = UnphaseDb.new()
	}

	tearDown {
		0.5.wait;
	}

	test_db_before_init {
		this.assertEquals(
			db.data,
			nil,
			"When the class is initialised the value of data should be nil");
	}
	test_db_after_init {
		db.init();
		this.assertEquals(
			db.data,
			(),
			"after calling the init method, data should be an empty Event");
	}
	test_db_attach_ui {

	}

}
