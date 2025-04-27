const testNotification =  (req, res) => {
    try {
        console.log("not listing...");
        
        res.status(200).json({
            message: 'Welcome to ms-notifications'
        });
    } catch (error) {
        console.log("Error fetching: ", error);
        res.status(500).json({
            message: "Failed to fetch",
            error: error.message
        });
    }
}
module.exports = {
    testNotification
};
