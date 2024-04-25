const User = require("./../models/user");

const getUser = async (req, res) => {
	try{
		const user = await User.findById(req.user._id); 
		if(!user) {
			return res.status(404).json({
				success : 'failed',
				message : 'User not found'
			}); 
		}
		return res.status(200).json({
			success : 'ok',
			message : 'User found', 
			data : user
		})
	}
	catch(err) {
		console.log(err); 
		res.status(500).json({
			success : 'failed', 
			message : 'Internal Server error'
		})
	}
}

const updateUserDetails = async (req, res) => {
	const { purposes, location } = req.body;
	const userId = req.user._id;

  // check if inputs are provided
  	if (!(purposes || location)) {
    	return res.status(400).json({
      		success: "failed",
      		message: "Invalid Inputs",
    	});
  	}	

  	try {
		// check if user exits
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: "failed",
				message: "User not found",
			});
		}

		if(req.file) {
			user.avatar = req.file.path; 
			
		}
		if(purposes) {
			user.purpose = [...user.purposes, ...purposes];  
		}
		if(location) {
			user.location = location; 
		}

		await user.save(); 
		res.status(200).json({
			success : 'ok', 
			message : 'User updated'
		})

  	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: "failed",
			message: "Internal Server Error",
		});
  	}
};

module.exports = {
	getUser,
	updateUserDetails,
}