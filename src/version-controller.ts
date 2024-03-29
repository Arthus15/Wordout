import fs from 'fs';
import path from 'path';
import axios, { AxiosResponse } from 'axios';
import { ipcRenderer, remote } from 'electron';


async function startUpdateAsync() {
    var updater = new VersionController();
    await updater.executeUpdateAsync();
    ipcRenderer.sendSync('update-complete', true);
}
export class VersionController {
    private versionJson: any = null;
    private localVersionJson: any = null;
    private key: string = 'Z2hwXzhVUFI2NFlzV0k4SWt3V2VUU3prRjZHdThIcjN5VzRGQVdiOA==';
    private __fix_dirname: string;

    constructor() {
        var fix_dirName = __dirname.split('\\');
        fix_dirName = fix_dirName.slice(0, fix_dirName.length - 2);
        this.__fix_dirname = fix_dirName.join('\\');
    }

    public async newVersionAvailableAsync() {
        await this.getVersionFileAsync();
        this.readLocalVersionFile();

        if (this.versionJson == null || this.localVersionJson == null)
            console.warn('Error checking versions available...');

        return this.compareVersions();
    }

    public async executeUpdateAsync() {
        try {
            var response = await this.gitHubGetAsync('https://api.github.com/repos/Arthus15/Wordout/contents/build');

            if (response.status == 200) {
                var body = JSON.stringify(response.data);
                var parsedBody = JSON.parse(body);
                var files = await this.readFilesContentAsync(parsedBody);
                var progresBar = document.getElementById('progress-bar') as HTMLInputElement;

                for (let i in files) {
                    var content = await this.getFileContentAsync(files[i].download_url);

                    if (content) {
                        var filepath = files[i].path;
                        await this.updateFileAsync(content, path.join(this.__fix_dirname, filepath.split('/').slice(1, filepath.length).join("/")));
                        progresBar.value = (((+i as number) / files.length) * 100).toString();
                    }
                }

                progresBar.value = "100";
            }
            else
                throw console.warn('Error getting version file: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private async getVersionFileAsync() {
        try {
            var response = await this.gitHubGetAsync('https://api.github.com/repos/Arthus15/Wordout/contents/version.json');

            if (response.status == 200) {
                var jsonbody = JSON.stringify(response.data);
                var parsedBody = JSON.parse(jsonbody);
                this.versionJson = JSON.parse(Buffer.from(parsedBody.content, 'base64').toString('binary'));
            }
            else
                throw console.warn('Error getting version file: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private readLocalVersionFile() {
        try {
            var filePath = path.join(__dirname, 'version.json');
            var file = fs.readFileSync(filePath);
            var text = file.toString();
            this.localVersionJson = JSON.parse(text);
        }
        catch (err) {
            console.warn(err);
        }
    }

    //True if new version
    private compareVersions() {
        let onlineVersion = this.versionJson.version as string;
        let localVersion = this.localVersionJson.version as string;

        let onlineVersionParded = +(onlineVersion.split('.').join(''));
        let localVersionParsed = +(localVersion.split('.').join(''));

        return onlineVersionParded > localVersionParsed;
    }

    private async readFilesContentAsync(buildJson: any): Promise<UpdateFile[]> {
        var files: UpdateFile[] = [];

        for (let element in buildJson) {
            var json = buildJson[element];
            if (json.type == 'dir') {
                var dirContent = await this.getDirContentAsync(json.url);
                var result = await this.readFilesContentAsync(dirContent);
                files = files.concat(result);
            }
            else {
                var fileName = json.name as string;
                if (fileName.includes(".db") || fileName.includes(".png"))
                    continue;

                files.push(new UpdateFile(json.path, json.download_url));
            }
        }

        return files;
    }

    private async getDirContentAsync(url: string) {
        try {
            var response = await this.gitHubGetAsync(url);

            if (response.status == 200) {
                var body = JSON.stringify(response.data);
                var parsedBody = JSON.parse(body);
                return parsedBody;
            }
            else
                throw console.warn('Error getting dir tree: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private async getFileContentAsync(file_url: string) {
        try {
            var tk = Buffer.from(this.key, 'base64').toString('binary');

            var response = await axios.get(file_url, {
                headers: { headers: { "Content-Type": "text/plain", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` } }
            });

            if (response.status == 200)
                return file_url.endsWith('.json') ? JSON.stringify(response.data) : response.data;
            else
                throw console.warn('Error getting file content: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private async updateFileAsync(content: string, filePath: string) {
        try {
            fs.writeFileSync(filePath, content.toString());
        }
        catch (err) {
            console.error('Error writing file: ', err)
        }
    }

    private async gitHubGetAsync(url: string) {
        var tk = Buffer.from(this.key, 'base64').toString('binary');

        return await axios.get(url, {
            headers: { headers: { "Content-Type": "text/plain", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` } }
        });
    }
}

export class UpdateFile {
    path: string;
    download_url: string;

    constructor(path: string, download_url: string) {
        this.path = path;
        this.download_url = download_url;
    }
}