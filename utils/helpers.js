const hbs = exphbs.create({
    // other configurations...
    helpers: {
        eq: function (v1, v2) {
            return v1 === v2;
        },
        json: function (context) {
            return JSON.stringify(context);
        },
    }
});
