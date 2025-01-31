UnphaseDb {
	classvar db;

	*getDb {
		if (db.isNil) {
			db = Dictionary.new();
		}
		^db;
	}

	*reset {
		db = Dictionary.new();
	}

	*set { |key, value|
		this.getDb.put(key, value)
	}

	*get { |key|
		^this.getDb.at(key)
	}

	*createId { ^(UniqueID.next.asString ++ Date.seed.asString) }

	*create { |model, data|
		// check if the model exists, if not create it
		var currentModel = db.at(model) ?? {
			db.put(model, Dictionary.new());
			db.at(model);
		};
		// save it into a unique ID field
		currentModel.put(this.createId, data);
	}
}