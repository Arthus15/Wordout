import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export class VersionController {
    private versionJson: any = null;
    private localVersionJson: any = null;

    public async newVersionAvailableAsync() {
        await this.getVersionFileAsync();
        this.readLocalVersionFile();

        if (this.versionJson == null || this.localVersionJson == null)
            console.warn('Error checking versions available...');

        return this.compareVersions();
    }

    private async getVersionFileAsync() {
        try {
            var response = await fetch('https://api.github.com/repos/Arthus15/Wordout/contents/version.json', {
                method: 'Get',
                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json" }
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
}