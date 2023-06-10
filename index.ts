type Tables = {
    person: {
        id: string;
        first_name: string;
    };
    product: {
        id: string;
        createdAt: Date;
    };
};

type TableNames = keyof Tables;

type Alias<T extends string> = T extends `${string} as ${infer A}` ? A : never;

type Original<T extends string> = T extends `${infer O} as ${string}`
    ? O
    : never;

type SqlAliases<ColumnNames extends string> = ColumnNames extends ColumnNames
    ? `${ColumnNames} as ${string}`
    : never;

type SelectReturn<
    Name extends TableNames,
    SelectColumns extends Columns<keyof Tables[Name] & string>
> = {
    [C in SelectColumns as Alias<C> extends never ? C : Alias<C>]: 
        C extends keyof Tables[Name]
            ? Tables[Name][C]
            : Original<C> extends keyof Tables[Name]
                ? Tables[Name][Original<C>]
                : never;
};

type Columns<ColumnNames extends string> =
    | ColumnNames
    | SqlAliases<ColumnNames>;

function select<
    Name extends TableNames,
    SelectColumns extends Columns<keyof Tables[Name] & string>
>(
    tableName: Name,
    columns: SelectColumns[],
    callBack: (sql: string) => SelectReturn<Name, SelectColumns>
): SelectReturn<Name, SelectColumns> {
    let sql = `FROM ${tableName} SELECT `

    for (let i = 0; i < columns.length; i++) {
        const element = columns[i];
        if(i != columns.length - 1){
            sql += element + ", "
        }else {
            sql += element
        }
    }

    return callBack(sql)
}

export default select
