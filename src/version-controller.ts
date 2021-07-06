import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { write } from 'original-fs';

export class VersionController {
    private versionJson: any = null;
    private localVersionJson: any = null;
    private key: string = 'Z2hwXzhVUFI2NFlzV0k4SWt3V2VUU3prRjZHdThIcjN5VzRGQVdiOA==';

    public async newVersionAvailableAsync() {
        await this.getVersionFileAsync();
        this.readLocalVersionFile();

        if (this.versionJson == null || this.localVersionJson == null)
            console.warn('Error checking versions available...');

        return this.compareVersions();
    }

    public async executeUpdateAsync() {
        try {
            var tk = Buffer.from(this.key, 'base64').toString('binary');
            var response = await fetch('https://api.github.com/repos/Arthus15/Wordout/contents/build', {
                method: 'Get',
                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` }
            });

            if (response.status == 200) {
                var body = await response.text();
                var parsedBody = JSON.parse(body);
                var files = await this.readFilesContentAsync(parsedBody);

                for (let i in files) {
                    var content = await this.getFileContentAsync(files[i].download_url);

                    if (content) {
                        var filepath = files[i].path;
                        await this.updateFileAsync(content, path.join(__dirname, filepath.split('/').slice(1, filepath.length).join("/")));
                    }
                }
            }
            else
                throw console.warn('Error getting version file: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private async getVersionFileAsync() {
        try {
            var tk = Buffer.from(this.key, 'base64').toString('binary');
            var response = await fetch('https://api.github.com/repos/Arthus15/Wordout/contents/version.json', {
                method: 'Get',
                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` }
            });

            if (response.status == 200) {
                var jsonbody = await response.text();
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

        let onlineVersionSplited = onlineVersion.split('.');
        let localVersionSplited = localVersion.split('.');

        for (let i = 0; i < localVersionSplited.length; i++) {
            if (onlineVersionSplited[i] > localVersionSplited[i])
                return true;
        }

        return false;
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
            var tk = Buffer.from(this.key, 'base64').toString('binary');
            var response = await fetch(url, {
                method: 'Get',
                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` }
            });

            if (response.status == 200) {
                var body = await response.text();
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
            var response = await fetch(file_url, {
                method: 'Get',
                headers: { "Content-Type": "text/plain", "accept": "application/vnd.github.v3+json", "Authorization": `token ${tk}` }
            });

            if (response.status == 200)
                return await response.text();
            else
                throw console.warn('Error getting file content: ', response);
        } catch (err) {
            console.warn(err);
        }
    }

    private async updateFileAsync(content: string, filePath: string) {
        await fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`${filePath} has been succesfully updated`);
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