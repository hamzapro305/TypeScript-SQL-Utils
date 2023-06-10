function select(tableName, columns) {
    var sql = "FROM ".concat(tableName, " SELECT ");
    for (var i = 0; i < columns.length; i++) {
        var element = columns[i];
        if (i != columns.length - 1) {
            sql += element + ", ";
        }
        else {
            sql += element;
        }
    }
    console.log(sql);
    return {};
}
select("person", ["id", "first_name as firstName"]);
