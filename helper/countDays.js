function countDue (num) {
    let today = new Date();
    let due = today.setDate(today.getDate() + num)
    return new Date(due);
}

module.exports = countDue;