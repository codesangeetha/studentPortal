
const baseRouteFn = (req, res) => {
    res.send('Good Morning');
};

const homePageFn = (req, res) => {
    res.render("homePage");
}

module.exports = baseRouteFn;

module.exports = homePageFn;

