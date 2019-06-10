var _ = require('underscore');

var User = {

    create: function (req, res) {
        console.log("req: " + req);
        if (req.name == undefined || req.email == undefined || req.phone == undefined) {
            console.log("Bad params" + req.params);
        } else {
            var name = req.name; var email = req.email; var phone = req.phone;
        }

        if (!(_.isString(name) && !(name.length > 60))) {
            console.log("Bad name: " + name);
            return null;
        } else if (!(_.isString(email) && _.contains(email, "@") && !(email.length > 140))) {
            console.log("Bad email: " + email);
            return null;
        } else if (phone.length > 12 && _.contains(phone, "abcdefghijklmnopqrstuvwxyz")) {
            console.log("Bad phone: " + phone);
            return null;
        } else {
            var user = { "name": name, "email": email, "phone": phone };
            console.log("User created: " + user);
            return user;
        }
    }
}

module.exports = User;