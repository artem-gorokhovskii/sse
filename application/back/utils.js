let i = 0;
const generatePoint = () => ({
    id: i++,
    val: Math.round(Math.random() * 200) - 100
});

module.exports = {
    generatePoint
};