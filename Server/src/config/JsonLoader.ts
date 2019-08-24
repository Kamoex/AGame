import * as fs from 'fs';

export class JsonLoader {
    public static readonly TBL_DEFAULT_DIR: string = '/config/table/';
    protected jsonData: Array<any> = null;

    private static baseUrl: string;
    constructor() {
    }

    // 清空数据
    protected Clear(): void {
        this.jsonData.length = 0;
        this.jsonData = null;
    }

    // 读取配置表
    protected LoadTable(tblname: string): any {
        // var url: string = __dirname;
        // url = url.split('\AJS')[0];
        // let constr: string = fs.readFileSync(url + TblLoader.TBL_DEFAULT_DIR + tblname, 'utf8');
        let jsonCfg: string = fs.readFileSync(JsonLoader.TBL_DEFAULT_DIR + tblname, 'utf8');
        this.jsonData = JSON.parse(jsonCfg);
        if (this.jsonData.length <= 0)
            throw new Error("LoadTable File Error:" + tblname);

        return this.jsonData;
    }

    
    protected ProcessTable(fname: string): void {
        return;
    }

   
    public LoadTableData(fname: string): void {
        this.ProcessTable(fname);
        this.Clear();
    }

}