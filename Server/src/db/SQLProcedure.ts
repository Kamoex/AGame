
/** 检查表中字段是否存在 */
const SQL_FUN_ADD_COLUMN = 'ADD_COLUMN';
export const SQL_FUN_DROP_ADD_COLUMN = `DROP PROCEDURE IF EXISTS ${SQL_FUN_ADD_COLUMN}`;
export const SQL_FUN_CREATE_ADD_COLUMN = 
`CREATE PROCEDURE ${SQL_FUN_ADD_COLUMN}(IN p_TableName varchar(100) , IN p_ColumnName varchar(100) , IN p_ColumnType varchar(200)  , IN p_ColumnOtherInfo varchar(200))\
   BEGIN\
      declare tmpColumnName varchar(100);\
      declare tmpSqlStr varchar(500);\
      declare tmpSqlToRun varchar(500);\
   select column_name into tmpColumnName from information_schema.columns\
          where table_name = p_TableName  and column_name = p_ColumnName ;\
   if tmpColumnName  is null then\
      set tmpSqlStr = ' ';\
      set tmpSqlStr = concat(tmpSqlStr ,'  ALTER TABLE ' , p_TableName);\
      set tmpSqlStr = concat(tmpSqlStr ,' ADD ', p_ColumnName, ' '  ,p_ColumnType , ' '  ,p_ColumnOtherInfo , ' ; ' );\
      SET @sql = tmpSqlStr;\
    prepare tmpSqlToRun from @sql;\
    EXECUTE tmpSqlToRun;\
   end if;\
   END`;


export class SQLProcedure {

    /**
     * 添加字段
     * @param tableName 表名
     * @param colName 字段名
     * @param colType 字段类型
     * @param colInfo 字段其他信息
     */
    public static ADD_COLUMN(tableName: string, colName: string, colType: string, colInfo: string = ""): string {
        return `call ${SQL_FUN_ADD_COLUMN}('${tableName}', '${colName}', '${colType}', '${colInfo}')`;
    }
}