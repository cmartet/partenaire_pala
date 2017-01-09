module.exports = {
    handleServiceCallback: function (res) {
        return function (err, data) {

            if (err)
                res.status(400).send(err);

            else {
                if (data)
                    res.json(data);
                else
                    res.sendStatus(200);
            }
        };
    }
};