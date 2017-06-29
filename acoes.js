function listPermissions(multichain) {
	multichain.listPermissions({
		permissions = issue
	}, (err, res) => {
		if (err) { 
			console.log (err);
			return null;
		}
		else return res; 
	});
}