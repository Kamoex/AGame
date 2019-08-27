
// 检查表中字段是否存在
export const SQL_FUN_DROP_ADD_COLUMN = 'DROP PROCEDURE IF EXISTS ADD_COLUMN';
export const SQL_FUN_ADD_COLUMN = 
'CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_COLUMN`(`tableName` varchar(255), `colName` varchar(255), `type` varchar(255), `info` varchar(255))\
BEGIN\
	declare tmp_sql varchar(500);\
	declare sql_run varchar(500);\
	select count(*) into @colname from information_schema.columns where table_name = tableName and column_name = colName;\
	if @colName is null then\
		set tmp_sql = "";\
		set tmp_sql = concat(tmp_sql, "alter table ", tableName);\
		set tmp_sql = concat(tmp_sql, " add ", colName, " ", type, " ", info, ";");\
		set @sql = tmp_sql;\
		prepare sql_run from @sql;\
        execute sql_run;\
	end if;\
END';


export class SQLProcedure {

    /**
     * 添加字段
     * @param tableName 表名
     * @param colName 字段名
     * @param colType 字段类型
     * @param colInfo 字段其他信息
     */
    public static ADD_COLUMN(tableName: string, colName: string, colType: string, colInfo: string = ""): string {
        return `call ADD_COLUMN('${tableName}', '${colName}', '${colType}', '${colInfo}')`;
    }
}